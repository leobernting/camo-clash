export const POTATO_MENUS=['Collection','Deck builder','Pack shop','Farm'];
export function ensureSecrets(p:any){
 p.secrets ||= {potatoes:[],questStarted:false,rayClaimed:false,ninoClaimed:false,ballClaimed:false,cheeseForm:'ball'};
 if(p.campaign?.completed?.includes('crown')&&!p.secrets.ballClaimed){p.secrets.ballClaimed=true;p.owned[145]=1;}
 for(const id of [144,145,146,147])if(p.owned[id]>1)p.owned[id]=1;
 return p.secrets;
}
export function secretAction(p:any,a:any){const q=ensureSecrets(p);
 if(a.kind==='secretDealer'){if(q.rayClaimed)throw Error('The dealer only had one Shockwave Ray for you.');q.rayClaimed=true;p.owned[144]=1;return {reward:144,message:'The dealer slides a single Shockwave Ray across the table.'};}
 if(a.kind==='secretSewer'){q.questStarted=true;return {message:'Nino needs four potatoes. Search four different menus.'};}
 if(a.kind==='secretPotato'){
  if(!q.questStarted)throw Error('Visit Nino in the sewer first.');if(!POTATO_MENUS.includes(a.menu))throw Error('No potato here.');
  if(q.potatoes.includes(a.menu))throw Error('You already found this potato.');q.potatoes.push(a.menu);
  if(q.potatoes.length===4&&!q.ninoClaimed){q.ninoClaimed=true;p.owned[147]=1;return {reward:147,message:'Four potatoes! Nino joins your collection.'};}
  return {message:'Potato found! '+q.potatoes.length+' / 4.'};
 }throw Error('Unknown secret.');
}
export function awakenCheese(p:any){const q=ensureSecrets(p);if(q.cheeseForm==='guy')return false;
 q.cheeseForm='guy';q.ballClaimed=true;const copies=p.owned[145]||0;delete p.owned[145];p.owned[146]=Math.min(1,copies);
 const map=(list:number[])=>list.map(id=>id===145?146:id);p.deck=map(p.deck||[]);for(const d of p.decks||[])d.cards=map(d.cards);p.binder=map(p.binder||[]);
 for(const pen of p.farm?.pens||[])if(pen?.id===145)pen.id=146;return true;
}
