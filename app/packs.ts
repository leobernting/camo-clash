import {cards} from './game';
export const specialCards=[16,17,18];
export const chaseChance=(misses:number)=>Math.min(1,.001+Math.max(0,misses)*.001);
export function openPacks(p:any,count:number,random:()=>number=Math.random){
 if(!Number.isInteger(count)||count<1||count>50)throw Error('Choose between 1 and 50 packs.');if(p.coins<count*30)throw Error('Not enough coins. Packs cost 30 coins each.');
 p.coins-=count*30;p.chaseMisses=p.chaseMisses||0;p.packsOpened=p.packsOpened||0;const pulls:number[]=[];const hits:any[]=[];
 for(let pack=0;pack<count;pack++){
  const chance=chaseChance(p.chaseMisses);let special=-1;
  if(random()<chance){special=18;p.chaseMisses=0;}else{p.chaseMisses++;if(random()<1/200)special=17;else if(random()<1/100)special=16;}
  for(let i=0;i<5;i++){
   let id:number;if(i===4&&special>=0)id=special;else{const r=random(),rarity=i===4?(r<.12?'legendary':r<.42?'epic':'rare'):(r<.02?'legendary':r<.10?'epic':r<.33?'rare':'common');const pool=cards.filter(c=>c.id<16&&c.rarity===rarity);id=pool[Math.floor(random()*pool.length)].id;}
   pulls.push(id);p.owned[id]=(p.owned[id]||0)+1;
  }p.packsOpened++;if(special>=0)hits.push({pack:pack+1,id:special});
 }return {pulls,hits,profile:p};
}
