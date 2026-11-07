import {createClient,type Client,type InValue,type ResultSet} from '@libsql/client';
const rows=(result:ResultSet)=>result.rows.map(row=>Object.fromEntries(result.columns.map((name,index)=>[name,row[index]])));
export class TursoStatement{
 constructor(readonly database:TursoDatabase,readonly sql:string,readonly args:InValue[]=[]){ }
 bind(...args:InValue[]){return new TursoStatement(this.database,this.sql,args);}
 async first<T=Record<string,unknown>>():Promise<T|null>{return (rows(await this.database.client.execute({sql:this.sql,args:this.args}))[0] as T)||null;}
 async all<T=Record<string,unknown>>(){const result=await this.database.client.execute({sql:this.sql,args:this.args});return {results:rows(result) as T[],success:true,meta:{changes:result.rowsAffected}};}
 async run(){const result=await this.database.client.execute({sql:this.sql,args:this.args});return {success:true,results:rows(result),meta:{changes:result.rowsAffected}};}
}
export class TursoDatabase{
 constructor(readonly client:Client){}
 prepare(sql:string){return new TursoStatement(this,sql);}
 async batch(statements:TursoStatement[]){if(statements.some(s=>s.database!==this))throw Error('Cannot batch different databases.');const results=await this.client.batch(statements.map(s=>({sql:s.sql,args:s.args})),'write');return results.map(result=>({results:rows(result),success:true,meta:{changes:result.rowsAffected}}));}
}
let database:TursoDatabase|undefined;
export function getTursoDatabase(){
 if(database)return database;
 const url=process.env.TURSO_DATABASE_URL,authToken=process.env.TURSO_AUTH_TOKEN;
 if(!url)throw Error('Set TURSO_DATABASE_URL in the server environment.');
 if(!url.startsWith('file:')&&!authToken)throw Error('Set TURSO_AUTH_TOKEN in the server environment.');
 database=new TursoDatabase(createClient({url,authToken,intMode:'number'}));return database;
}
export const env={get DB(){return getTursoDatabase();},get CAMO_DATABASE_EXPORT(){return process.env.CAMO_DATABASE_EXPORT;}};
