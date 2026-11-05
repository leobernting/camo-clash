export const cosmetics=[
 {id:'sleeve-canopy',type:'sleeve',name:'Canopy Classic',price:0,description:'The original jungle green.',color:'#244d37',accent:'#bfda92',pattern:'leaf',symbol:'❧'},
 {id:'sleeve-moon',type:'sleeve',name:'Moonveil',price:90,description:'A little moonlight on every draw.',color:'#33294f',accent:'#d1b5ec',pattern:'stars',symbol:'☾'},
 {id:'sleeve-ember',type:'sleeve',name:'Ember Scales',price:120,description:'Warm copper, wild scales.',color:'#703a2e',accent:'#f3bc7d',pattern:'scales',symbol:'✹'},
 {id:'sleeve-prism',type:'sleeve',name:'Prismatic',price:180,description:'A spectrum worth showing off.',color:'#275b65',accent:'#efb9e4',pattern:'prism',symbol:'✧'},
 {id:'sleeve-gold',type:'sleeve',name:'Sovereign Gold',price:300,description:'For a collection fit for royalty.',color:'#574529',accent:'#f1d48a',pattern:'royal',symbol:'♛'},
 {id:'mat-forest',type:'mat',name:'Forest Floor',price:0,description:'Make yourself at home in the canopy.',color:'#dce8cf',accent:'#7d9e60',pattern:'leaf',symbol:'❧'},
 {id:'mat-moon',type:'mat',name:'Moonlit Lagoon',price:120,description:'Still water under a silver moon.',color:'#d4deef',accent:'#6c83b4',pattern:'stars',symbol:'☾'},
 {id:'mat-ember',type:'mat',name:'Ember Ridge',price:180,description:'A sun-warmed home for fierce camos.',color:'#efdfd0',accent:'#b67e5b',pattern:'scales',symbol:'✹'},
 {id:'mat-orchid',type:'mat',name:'Orchid Garden',price:220,description:'Bring a little bloom to the battle.',color:'#e8dced',accent:'#a379ae',pattern:'petals',symbol:'✿'},
 {id:'mat-aurora',type:'mat',name:'Aurora Canopy',price:350,description:'The sky comes down to play.',color:'#d1e8e3',accent:'#938ac0',pattern:'prism',symbol:'✧'}
];
export const avatars=['scout','moon','ember','orchid','crown','prism'];
export function cosmetic(id:string,type:string){return cosmetics.find(c=>c.id===id&&c.type===type)||cosmetics.find(c=>c.type===type)!;}
export function ensureCosmetics(p:any){p.cosmetics ||= {owned:['sleeve-canopy','mat-forest'],sleeve:'sleeve-canopy',mat:'mat-forest'};p.cosmetics.owned=Array.from(new Set(['sleeve-canopy','mat-forest',...(p.cosmetics.owned||[])]));for(const type of ['sleeve','mat'])if(!p.cosmetics.owned.includes(p.cosmetics[type])||!cosmetics.some(c=>c.id===p.cosmetics[type]&&c.type===type))p.cosmetics[type]=type==='sleeve'?'sleeve-canopy':'mat-forest';p.avatar=avatars.includes(p.avatar)?p.avatar:'scout';p.displayName ||= p.username||'Canopy Collector';p.bio ||= '';return p;}
export function buyCosmetic(p:any,id:string){ensureCosmetics(p);const item=cosmetics.find(c=>c.id===id);if(!item)throw Error('Cosmetic not found.');if(p.cosmetics.owned.includes(id))throw Error('You already own this cosmetic.');if(p.coins<item.price)throw Error('Not enough coins. Earn more in matches and quests.');p.coins-=item.price;p.cosmetics.owned.push(id);return item;}
export function equipCosmetic(p:any,id:string){ensureCosmetics(p);const item=cosmetics.find(c=>c.id===id);if(!item||!p.cosmetics.owned.includes(id))throw Error('Buy this cosmetic before equipping it.');p.cosmetics[item.type]=id;return item;}
export function appearance(p:any){ensureCosmetics(p);return {username:p.username||'',displayName:p.displayName,avatar:p.avatar,sleeve:p.cosmetics.sleeve,mat:p.cosmetics.mat};}
export function dressBattle(s:any,left:any,right:any){s.players[0].appearance=appearance(left);s.players[1].appearance=appearance(right);return s;}
export function editProfile(p:any,a:any){ensureCosmetics(p);const name=String(a.displayName||'').trim(),bio=String(a.bio||'').trim();if(name.length<2||name.length>24)throw Error('Display names need 2–24 characters.');if(bio.length>160)throw Error('Keep your bio within 160 characters.');if(!avatars.includes(a.avatar))throw Error('Choose an avatar from the list.');p.displayName=name;p.bio=bio;p.avatar=a.avatar;return p;}
export function publicProfile(p:any){ensureCosmetics(p);return {...appearance(p),bio:p.bio,wins:p.wins||0,packsOpened:p.packsOpened||0,uniqueCards:Object.values(p.owned||{}).filter((n:any)=>n>0).length,binder:(p.binder||[]).filter((id:number)=>p.owned?.[id]>0)};}
