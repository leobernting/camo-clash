import {env} from 'cloudflare:workers';
import {accountUser} from '../../accounts';
import {cards} from '../../game';
export const dynamic='force-dynamic';
export async function POST(req:Request){try{
 if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)throw Error('Invalid origin.');
 const uid=await accountUser(req);if(!uid)return Response.json({error:'Sign in to trade.'},{status:401});const a:any=await req.json();const db=env.DB!;
 if(a.kind==='list'){const rows=await db.prepare("SELECT id,maker_name,offer,want,status,created,CASE WHEN maker=? THEN 1 ELSE 0 END AS mine FROM trades WHERE status='open' OR maker=? OR taker=? ORDER BY created DESC LIMIT 100").bind(uid,uid,uid).all();return Response.json({trades:rows.results});}
 if(a.kind==='create'){
 if(!Number.isInteger(a.offer)||!Number.isInteger(a.want)||!cards[a.offer]||!cards[a.want]||a.offer===a.want)throw Error('Choose two different cards.');
 const profile=await db.prepare('SELECT data FROM records WHERE id=?').bind('user:'+uid).first<any>();if(!profile)throw Error('Load your collection first.');
 const open=await db.prepare("SELECT COUNT(*) AS n FROM trades WHERE maker=? AND status='open'").bind(uid).first<any>();if(open.n>=10)throw Error('You can have up to 10 open offers.');
 await db.prepare('INSERT INTO trades(id,maker,maker_name,offer,want,status,created) VALUES(?,?,?,?,?,?,?)').bind(crypto.randomUUID(),uid,JSON.parse(profile.data).username||'Canopy Collector',a.offer,a.want,'open',Date.now()).run();return Response.json({ok:true});
 }
 if(a.kind==='accept'){const r=await db.prepare("UPDATE trades SET status='accepted',taker=? WHERE id=? AND status='open' AND maker<>?").bind(uid,a.id,uid).run();if(!r.meta.changes)throw Error('Offer is no longer available.');return Response.json({ok:true});}
 if(a.kind==='cancel'){const r=await db.prepare("UPDATE trades SET status='cancelled' WHERE id=? AND maker=? AND status='open'").bind(a.id,uid).run();if(!r.meta.changes)throw Error('Offer is no longer available.');return Response.json({ok:true});}
 throw Error('Unknown request.');
 }catch(e:any){const message=String(e.message);return Response.json({error:message.includes('spare')?'You need a spare copy outside your saved deck for this trade.':message},{status:400});}}
