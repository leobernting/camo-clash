import {env} from '../../turso';
import {canExportDatabase} from '../../database-backup';
export const dynamic='force-dynamic';
export async function POST(req:Request){
 const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 if(!await canExportDatabase((env as any).CAMO_DATABASE_EXPORT,req.headers.get('authorization')))return new Response('Not found',{status:404,headers});
 try{
  const [schema,records,trades]=await env.DB!.batch([
   env.DB!.prepare("SELECT type,name,tbl_name,sql FROM sqlite_master WHERE tbl_name IN ('records','trades') AND sql IS NOT NULL AND type IN ('table','index','trigger') ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 ELSE 2 END,name"),
   env.DB!.prepare('SELECT id,data,version FROM records ORDER BY id'),
   env.DB!.prepare('SELECT id,maker,maker_name,offer,want,status,taker,created,recipient,recipient_name FROM trades ORDER BY id')
  ]);
  return Response.json({format:'camo-clash-database',version:1,exportedAt:new Date().toISOString(),schema:schema.results,tables:{records:records.results,trades:trades.results}},{headers:{...headers,'Content-Disposition':'attachment; filename="camo-clash-database.json"'}});
 }catch{return new Response('Backup failed',{status:500,headers});}
}
