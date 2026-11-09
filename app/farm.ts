import {cards} from './game.ts';
export const FOOD_PRICE=10,BREED_FOOD=5,BREED_TIME=60_000,FARM_PENS=6;
export function ensureFarm(p:any,now=Date.now()){
 p.farm ||= {food:0,pens:Array(FARM_PENS).fill(null)};
 p.farm.pens=p.farm.pens.map((pen:any)=>pen?.kind==='egg'&&pen.readyAt<=now?{kind:'camo',id:pen.id,placedAt:pen.readyAt,busyUntil:0,restoreDeck:false,born:true}:pen);
 return p.farm;
}
export function validDeck(p:any,deck=p.deck){return Array.isArray(deck)&&deck.length===40&&deck.every((id:number)=>Number.isInteger(id)&&cards[id]&&!cards[id].tokenOnly&&deck.filter((n:number)=>n===id).length<=Math.min(3,p.owned?.[id]||0));}
export function farmAction(p:any,a:any,now=Date.now(),random:()=>number=Math.random){
 const farm=ensureFarm(p,now),slot=(n:any)=>Number.isInteger(n)&&n>=0&&n<FARM_PENS;
 if(a.kind==='farmFood'){
  if(!Number.isInteger(a.count)||a.count<1||a.count>100)throw Error('Choose 1 to 100 food.');
  if(p.coins<a.count*FOOD_PRICE)throw Error('Not enough coins for food.');p.coins-=a.count*FOOD_PRICE;farm.food+=a.count;return {message:'Food added to your pantry.'};
 }
 if(a.kind==='farmPlace'){
  if(!slot(a.slot)||farm.pens[a.slot])throw Error('Choose an empty pen.');
  if(!Number.isInteger(a.id)||cards[a.id]?.type!=='camo'||cards[a.id]?.tokenOnly||!(p.owned[a.id]>0))throw Error('Choose a camo you own.');
  p.owned[a.id]--;let removed=false;const copies=p.deck.filter((id:number)=>id===a.id).length;
  if(copies>p.owned[a.id]){p.deck.splice(p.deck.lastIndexOf(a.id),1);removed=true;}
  if(!p.owned[a.id])p.binder=p.binder.filter((id:number)=>id!==a.id);
  farm.pens[a.slot]={kind:'camo',id:a.id,placedAt:now,busyUntil:0,restoreDeck:removed,restoreDeckId:p.activeDeckId};
  return {message:removed?'Camo placed. One deck copy is resting here until you pick it up.':'Camo placed. Its card is held in this pen.'};
 }
 if(a.kind==='farmPickup'){
  if(!slot(a.slot)||!farm.pens[a.slot])throw Error('Choose an occupied pen.');const pen=farm.pens[a.slot];
  if(pen.kind==='egg')throw Error('Your egg is still hatching.');
  if(now<pen.busyUntil)throw Error('This parent is caring for an egg. Pick it up after the hatch timer ends.');
  p.owned[pen.id]=(p.owned[pen.id]||0)+1;
  const restore=pen.restoreDeckId&&pen.restoreDeckId!==p.activeDeckId?p.decks?.find((d:any)=>d.id===pen.restoreDeckId)?.cards:p.deck;
  if(pen.restoreDeck&&restore&&restore.length<40&&restore.filter((id:number)=>id===pen.id).length<Math.min(3,p.owned[pen.id]))restore.push(pen.id);
  farm.pens[a.slot]=null;return {message:'Camo picked up. Its card is back in your collection.'};
 }
 if(a.kind==='farmBreed'){
  if(!slot(a.first)||!slot(a.second)||a.first===a.second)throw Error('Choose two different parents.');
  const parents=[farm.pens[a.first],farm.pens[a.second]];
  if(parents.some(p=>!p||p.kind!=='camo'||p.busyUntil>now))throw Error('Choose two available camos in your farm.');
  const empty=farm.pens.findIndex((pen:any)=>!pen);if(empty<0)throw Error('Leave an empty pen for the egg.');
  if(farm.food<BREED_FOOD)throw Error('Breeding needs 5 food. Buy some for your pantry.');
  const family=cards[parents[random()<.5?0:1].id],pool=cards.filter(c=>c.type==='camo'&&!c.tokenOnly&&['common','uncommon','rare'].includes(c.rarity)&&c.set===family.set);
  const child=pool[Math.min(pool.length-1,Math.floor(random()*pool.length))];
  farm.food-=BREED_FOOD;parents.forEach(p=>p.busyUntil=now+BREED_TIME);farm.pens[empty]={kind:'egg',id:child.id,readyAt:now+BREED_TIME};
  return {message:'An egg! It will hatch in one minute. Parents are safe in their pens.'};
 }
 throw Error('Unknown farm action.');
}
