import {cards} from './game';
export const specialCards=[16,17,18];
export const chaseChance=(misses:number)=>Math.min(1,.001+Math.max(0,misses)*.001);
export function openPacks(p:any,count:number,random:()=>number=Math.random,free=false){
 if(!Number.isInteger(count)||count<1||count>50)throw Error('Choose between 1 and 50 packs.');if(free?(p.packTokens||0)<count:p.coins<count*30)throw Error(free?'Not enough earned packs.':'Not enough coins. Packs cost 30 coins each.');
 if(free)p.packTokens-=count;else p.coins-=count*30;p.chaseMisses=p.chaseMisses||0;p.packsOpened=p.packsOpened||0;const pulls:number[]=[];const hits:any[]=[];
 for(let pack=0;pack<count;pack++){
  const chance=chaseChance(p.chaseMisses);let special=-1;
  if(random()<chance){special=18;p.chaseMisses=0;}else{p.chaseMisses++;if(random()<1/200)special=17;else if(random()<1/100)special=16;}
  const packPulls:number[]=[];for(let i=0;i<7;i++){
   let id:number;if(i===6&&special>=0)id=special;else{const r=random(),rarity=i===6?(r<.12?'legendary':r<.42?'epic':'rare'):(r<.55?'common':r<.9?'uncommon':r<.98?'rare':'epic');const pool=cards.filter(c=>!specialCards.includes(c.id)&&c.rarity===rarity);id=pool[Math.floor(random()*pool.length)].id;}
   packPulls.push(id);p.owned[id]=(p.owned[id]||0)+1;
  }const rank=['common','uncommon','rare','epic','legendary','hit','superhit','chase'];packPulls.sort((a,b)=>rank.indexOf(cards[a].rarity)-rank.indexOf(cards[b].rarity));pulls.push(...packPulls);p.packsOpened++;if(special>=0)hits.push({pack:pack+1,id:special});
 }return {pulls,hits,profile:p};
}
