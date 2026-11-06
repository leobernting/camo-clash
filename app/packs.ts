import {cards,cardSets,rarityOrder} from './game';
export const specialCards=cards.filter(c=>['hit','superhit','hyper','chase','gold'].includes(c.rarity)).map(c=>c.id);
export const CHASE_CHANCE=1/2000;
export const GOLD_CHANCE=1/100000;
// A single hidden luck counter covers Hit, Super-hit and Hyper Rare together.
// Initial per-pack odds: Hit 1/100, Super-hit 1/200, Hyper Rare 1/1000.
// Each miss adds 0.1 percentage points to the combined special-pull chance.
export const specialChance=(misses:number)=>Math.min(1,.016+Math.max(0,misses)*.001);
export function specialTier(roll:number){return roll<1/16?'hyper':roll<6/16?'superhit':'hit';}
export function openPacks(p:any,count:number,random:()=>number=Math.random,free=false,setId='all'){
 if(setId!=='all'&&!cardSets.some(s=>s.id===setId))throw Error('Choose a valid card set.');const collection=setId==='all'?cards:cards.filter(c=>c.set===setId&&!c.mixedOnly);
 if(!Number.isInteger(count)||count<1||count>50)throw Error('Choose between 1 and 50 packs.');if(free?(p.packTokens||0)<count:p.coins<count*30)throw Error(free?'Not enough earned packs.':'Not enough coins. Packs cost 30 coins each.');
 if(free)p.packTokens-=count;else p.coins-=count*30;p.chaseMisses=p.chaseMisses||0;p.packsOpened=p.packsOpened||0;const pulls:number[]=[];const hits:any[]=[];
 for(let pack=0;pack<count;pack++){
  const chance=specialChance(p.chaseMisses);let special=-1;
  if(random()<chance){const tier=specialTier(random()),choices=collection.filter(c=>c.rarity===tier),pool=choices.length?choices:cards.filter(c=>c.rarity===tier);special=pool[Math.floor(random()*pool.length)].id;p.chaseMisses=0;}else p.chaseMisses++;
  const packPulls:number[]=[];for(let i=0;i<7;i++){
   let id:number;if(i===6&&special>=0)id=special;else{const r=random(),rarity=i===6?(r<.12?'legendary':r<.42?'epic':'rare'):(r<.55?'common':r<.9?'uncommon':r<.98?'rare':'epic');const pool=collection.filter(c=>!specialCards.includes(c.id)&&c.rarity===rarity);id=pool[Math.floor(random()*pool.length)].id;}
   packPulls.push(id);
  }
  // Independent fixed roll. Chases never read or modify the shared luck counter.
  if(random()<CHASE_CHANCE){const pool=collection.filter(c=>c.rarity==='chase'),chase=pool[Math.floor(random()*pool.length)].id;if(special>=0)packPulls[5]=special;packPulls[6]=chase;hits.push({pack:pack+1,id:chase});}
  if(setId==='all'&&random()<GOLD_CHANCE){const gold=cards.find(c=>c.rarity==='gold')!.id;packPulls[0]=gold;hits.push({pack:pack+1,id:gold});}
  packPulls.forEach(id=>p.owned[id]=(p.owned[id]||0)+1);
  packPulls.sort((a,b)=>rarityOrder.indexOf(cards[a].rarity)-rarityOrder.indexOf(cards[b].rarity));pulls.push(...packPulls);p.packsOpened++;if(special>=0)hits.push({pack:pack+1,id:special});
 }return {pulls,hits,profile:p};
}
