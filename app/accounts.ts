import {env} from './turso';
const encoder=new TextEncoder();
const hex=(a:ArrayBuffer)=>Array.from(new Uint8Array(a),x=>x.toString(16).padStart(2,'0')).join('');
const digest=async(s:string)=>hex(await crypto.subtle.digest('SHA-256',encoder.encode(s)));
async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encoder.encode(salt),iterations:100000},key,256));}
function equal(a:string,b:string){let different=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)different|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return different===0;}
export async function accountUser(req:Request){const token=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('camo_session='))?.slice(13);if(token){const row=await env.DB!.prepare('SELECT data FROM records WHERE id=?').bind('session:'+await digest(token)).first<any>();if(row){const session=JSON.parse(row.data);if(session.expires>Date.now())return session.uid;}return null;}return null;}
export async function authenticate(req:Request,a:any){
 const db=env.DB!,isRegister=a.kind==='register';
 if(a.kind==='logout'){const token=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('camo_session='))?.slice(13);if(token)await db.prepare('DELETE FROM records WHERE id=?').bind('session:'+await digest(token)).run();return Response.json({ok:true},{headers:{'Set-Cookie':'camo_session=loggedout; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000'+(new URL(req.url).protocol==='https:'?'; Secure':'')}});}
 const username=String(a.username||'').trim(),canonical=username.toLowerCase(),password=String(a.password||'');
 if(!/^[a-zA-Z0-9_]{3,20}$/.test(username))throw Error('Use a username with 3–20 letters, numbers or underscores.');if(password.length<10||password.length>128)throw Error('Use a password with 10–128 characters.');
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0].trim()||'local';const bucket='attempt:'+await digest(ip+':'+Math.floor(Date.now()/900000));
 await db.prepare("INSERT INTO records(id,data,version) VALUES(?,'{}',1) ON CONFLICT(id) DO UPDATE SET version=version+1").bind(bucket).run();const attempts=await db.prepare('SELECT version FROM records WHERE id=?').bind(bucket).first<any>();if(attempts.version>30)throw Error('Too many attempts. Try again in 15 minutes.');
 let row=await db.prepare('SELECT data FROM records WHERE id=?').bind('account:'+canonical).first<any>(),account:any;
 if(isRegister){if(row)throw Error('That username is already taken.');const salt=crypto.randomUUID();account={uid:'acct:'+crypto.randomUUID(),username,salt,hash:await passwordHash(password,salt)};try{await db.prepare('INSERT INTO records(id,data,version) VALUES(?,?,0)').bind('account:'+canonical,JSON.stringify(account)).run();}catch{throw Error('That username is already taken.');}

 }else{if(!row){await passwordHash(password,'unregistered-account');throw Error('Incorrect username or password.');}account=JSON.parse(row.data);if(!equal(await passwordHash(password,account.salt),account.hash))throw Error('Incorrect username or password.');}
 const token=hex(crypto.getRandomValues(new Uint8Array(32)).buffer);await db.prepare('INSERT INTO records(id,data,version) VALUES(?,?,0)').bind('session:'+await digest(token),JSON.stringify({uid:account.uid,expires:Date.now()+2592000000})).run();
 return Response.json({ok:true,username:account.username},{headers:{'Set-Cookie':'camo_session='+token+'; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000'+(new URL(req.url).protocol==='https:'?'; Secure':'')}});
}
