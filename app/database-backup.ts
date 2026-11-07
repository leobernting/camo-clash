export async function canExportDatabase(setting:string|undefined,authorization:string|null,now=Date.now()){
 if(!setting)return false;let access:any;try{access=JSON.parse(setting);}catch{return false;}
 if(typeof access.token!=='string'||access.token.length<64||!Number.isFinite(access.expires)||now>=access.expires)return false;
 const supplied=authorization?.startsWith('Bearer ')?authorization.slice(7):'';
 const hash=async(s:string)=>new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)));
 const [expected,actual]=await Promise.all([hash(access.token),hash(supplied)]);let difference=0;for(let i=0;i<expected.length;i++)difference|=expected[i]^actual[i];return difference===0;
}
