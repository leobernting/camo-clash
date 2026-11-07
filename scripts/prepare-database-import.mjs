import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';
const [input,output]=process.argv.slice(2);if(!input||!output)throw Error('Usage: node scripts/prepare-database-import.mjs <backup.json> <output.sql>');
const raw=fs.readFileSync(input,'utf8'),backup=JSON.parse(raw);
if(backup.format!=='camo-clash-database'||backup.version!==1||!Array.isArray(backup.schema)||!Array.isArray(backup.tables?.records)||!Array.isArray(backup.tables?.trades))throw Error('Unsupported database backup.');
const literal=value=>value===null?'NULL':typeof value==='number'&&Number.isFinite(value)?String(value):typeof value==='string'?"'"+value.replaceAll("'","''")+"'":(()=>{throw Error('Unsupported database value');})();
const columns={records:['id','data','version'],trades:['id','maker','maker_name','offer','want','status','taker','created','recipient','recipient_name']};
const sql=['-- Camo Clash backup. Import into an EMPTY database only. Includes accounts and password hashes.'];
const schema=backup.schema.filter(s=>['records','trades'].includes(s.tbl_name));for(const table of ['records','trades'])if(!schema.some(s=>s.type==='table'&&s.name===table))throw Error('Missing table schema: '+table);
for(const entry of schema.filter(s=>s.type==='table'))sql.push(entry.sql+';');
for(const [table,keys] of Object.entries(columns))for(const row of backup.tables[table]){if(table==='records')JSON.parse(row.data);sql.push('INSERT INTO "'+table+'" ('+keys.map(k=>'"'+k+'"').join(',')+') VALUES ('+keys.map(k=>literal(row[k])).join(',')+');');}
// Recreate trade triggers AFTER the existing escrow rows, so importing cannot reserve cards twice.
for(const entry of schema.filter(s=>s.type!=='table'))sql.push(entry.sql+';');
const text=sql.join('\n')+'\n',test=new DatabaseSync(':memory:');test.exec(text);
for(const [table,keys] of Object.entries(columns)){const actual=test.prepare('SELECT '+keys.map(k=>'"'+k+'"').join(',')+' FROM "'+table+'" ORDER BY id').all();const expected=[...backup.tables[table]].sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);if(JSON.stringify(actual)!==JSON.stringify(expected.map(row=>Object.fromEntries(keys.map(k=>[k,row[k]])))))throw Error('Restore verification failed for '+table);}
test.close();fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,text,{flag:'wx'});
const manifest={exportedAt:backup.exportedAt,verifiedAt:new Date().toISOString(),records:backup.tables.records.length,trades:backup.tables.trades.length,sqlSha256:crypto.createHash('sha256').update(text).digest('hex'),jsonSha256:crypto.createHash('sha256').update(raw).digest('hex')};fs.writeFileSync(output+'.manifest.json',JSON.stringify(manifest,null,2));console.log(JSON.stringify(manifest));
