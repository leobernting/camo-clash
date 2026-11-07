import fs from 'node:fs';
import {createClient} from '@libsql/client';
const input=process.argv[2];if(!input)throw Error('Usage: node --env-file=.env.local scripts/import-turso.mjs PATH_TO_BACKUP_JSON');
const url=process.env.TURSO_DATABASE_URL,authToken=process.env.TURSO_AUTH_TOKEN;if(!url||!url.startsWith('file:')&&!authToken)throw Error('Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN privately in .env.local.');
const data=JSON.parse(fs.readFileSync(input,'utf8'));if(data.format!=='camo-clash-database'||data.version!==1||!Array.isArray(data.schema)||!Array.isArray(data.tables?.records)||!Array.isArray(data.tables?.trades))throw Error('Unsupported backup.');
const client=createClient({url,authToken,intMode:'number'}),transaction=await client.transaction('write');
try{
 const existing=await transaction.execute("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('records','trades')");if(existing.rows.length)throw Error('Use a fresh database. Game tables already exist; nothing has been imported.');
 const schema=data.schema.filter(s=>['records','trades'].includes(s.tbl_name));for(const name of ['records','trades'])if(!schema.some(s=>s.type==='table'&&s.name===name))throw Error('Missing table schema.');
 for(const entry of schema.filter(s=>s.type==='table'))await transaction.execute(entry.sql);
 const tables={records:['id','data','version'],trades:['id','maker','maker_name','offer','want','status','taker','created','recipient','recipient_name']};
 for(const [table,keys] of Object.entries(tables))for(const row of data.tables[table]){if(table==='records')JSON.parse(row.data);await transaction.execute({sql:'INSERT INTO "'+table+'" ('+keys.map(k=>'"'+k+'"').join(',')+') VALUES ('+keys.map(()=>'?').join(',')+')',args:keys.map(k=>row[k])});}
 for(const entry of schema.filter(s=>s.type!=='table'))await transaction.execute(entry.sql);
 for(const [table,keys] of Object.entries(tables)){const result=await transaction.execute('SELECT '+keys.map(k=>'"'+k+'"').join(',')+' FROM "'+table+'" ORDER BY id'),actual=result.rows.map(r=>Object.fromEntries(keys.map((k,i)=>[k,r[i]]))),expected=[...data.tables[table]].sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0).map(r=>Object.fromEntries(keys.map(k=>[k,r[k]])));if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('Restore verification failed: '+table);}
 await transaction.commit();console.log(JSON.stringify({imported:true,records:data.tables.records.length,trades:data.tables.trades.length,exportedAt:data.exportedAt}));
}catch(error){await transaction.rollback();throw error;}finally{transaction.close();client.close();}
