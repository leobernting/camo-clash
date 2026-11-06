import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,cardSets,starter,battle,act,unitAttack,unitArmor,maxHealth} from '../app/game.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));
const {openPacks}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const put=(s,id,i)=>s.players[0].board[i]={id,hp:cards[id].hp,maxHp:cards[id].hp,hidden:!!cards[id].startsHidden,used:false,flags:{},bonusAttack:0,tempAttack:0};
const fresh=()=>{const s=battle(starter().deck,starter().deck,false);s.players.forEach(p=>{p.pile=Array(100).fill(0);p.board[4]={id:51,hp:100,maxHp:100,hidden:false};});s.players[0].mana=100;return s;};
const cycle=s=>{act(s,0,{kind:'end'});act(s,1,{kind:'end'});s.players[0].mana=100;};
const play=(s,id,slot)=>{s.players[0].hand.push(id);act(s,0,{kind:'play',index:s.players[0].hand.length-1,slot});};
assert.equal(cards.length,110);assert.equal(new Set(cards.map(c=>c.name)).size,110);
for(const set of cardSets.filter(s=>s.id!=='core')){
 const pool=cards.filter(c=>c.set===set.id);assert.equal(pool.length,8);assert.ok(set.combo.every(id=>cards[id].set===set.id));
 for(const card of pool){const s=fresh();play(s,card.id,0);assert.equal(s.players[0].board[0].id,card.id);
  for(const setId of ['all',set.id]){
   const selected=setId==='all'?cards:pool,rolls=[],special=['hit','superhit'].includes(card.rarity);if(special){const tier=selected.filter(c=>c.rarity===card.rarity);rolls.push(0,card.rarity==='hit'?.8:.1,(tier.findIndex(c=>c.id===card.id)+.1)/tier.length);}else rolls.push(.99);
   for(let i=0;i<7;i++){if(special&&i===6)continue;const target=i===(['common','uncommon'].includes(card.rarity)?0:6)&&!special;const rarity=target?card.rarity:i===6?'rare':'common';const r=i===6?({rare:.9,epic:.2,legendary:.01}[rarity]):({common:.1,uncommon:.7,rare:.95,epic:.99}[rarity]);const choices=selected.filter(c=>c.rarity===rarity);rolls.push(r,target?(choices.findIndex(c=>c.id===card.id)+.1)/choices.length:.1);}
   const p=starter(),out=openPacks(p,1,()=>rolls.shift(),false,setId);assert.ok(out.pulls.includes(card.id),card.name+' obtainable in '+setId);assert.equal(out.pulls.length,7);assert.equal(p.coins,470);assert.ok(out.pulls.every(id=>setId==='all'||cards[id].set===setId));assert.ok(['rare','epic','legendary','hit','superhit','chase'].includes(cards[out.pulls[6]].rarity));if(special)assert.equal(p.chaseMisses,0);
  }
 }
 const p=starter();p.packTokens=2;const out=openPacks(p,2,()=>.9,true,set.id);assert.equal(out.pulls.length,14);assert.equal(p.packTokens,0);assert.equal(p.coins,500);assert.ok(out.pulls.every(id=>cards[id].set===set.id));
 const chase=starter(),rolls=[0,0,0];const outChase=openPacks(chase,1,()=>rolls.length?rolls.shift():.9,false,set.id);assert.equal(cards[outChase.pulls[6]].rarity,'chase');assert.equal(cards[outChase.pulls[6]].set,'core');assert.equal(chase.chaseMisses,0);
}
const invalid=starter();assert.throws(()=>openPacks(invalid,1,()=>0,false,'fake'),/valid card set/);assert.equal(invalid.coins,500);
for(const [source,ally,group,amount] of [[89,86,'armor',1],[93,86,'attack',2],[97,94,'armor',1],[99,94,'attack',1],[105,102,'armor',1],[107,102,'attack',1]]){const s=fresh();put(s,source,0);put(s,ally,1);put(s,0,2);const stat=group==='armor'?unitArmor:unitAttack;assert.equal(stat(s,0,1),(group==='armor'?0:cards[ally].attack)+amount);assert.equal(stat(s,0,2),group==='armor'?0:cards[0].attack);assert.equal(stat(s,0,0),group==='armor'?0:cards[source].attack);s.players[0].board[0]=null;assert.equal(stat(s,0,1),group==='armor'?0:cards[ally].attack);}
let s=fresh();put(s,86,0);put(s,88,1);put(s,92,2);put(s,87,3);let h=s.players[0].hand.length;act(s,0,{kind:'harvest',index:0});assert.equal(s.players[0].hand.length,h+1);assert.equal(s.players[0].mana,101);assert.equal(maxHealth(s.players[0].board[0]),cards[86].hp+1);assert.equal(maxHealth(s.players[0].board[2]),cards[92].hp);act(s,0,{kind:'harvest',index:3});assert.equal(s.players[0].hand.length,h+1);cycle(s);act(s,0,{kind:'harvest',index:0});assert.equal(maxHealth(s.players[0].board[0]),cards[86].hp+2);
s=fresh();put(s,90,0);h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].hand.length,h+1);put(s,86,1);h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].hand.length,h+2);
s=fresh();put(s,94,0);put(s,96,1);put(s,101,2);put(s,95,3);h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].hand.length,h+2);assert.equal(unitAttack(s,0,0),cards[94].attack+2);assert.equal(s.players[0].board[0].hidden,false);act(s,0,{kind:'hide',index:3});act(s,0,{kind:'hide',index:3});assert.equal(s.players[0].mana,99,'same-turn reveal cannot farm mana');assert.equal(s.players[0].hand.length,h+2);act(s,0,{kind:'end'});assert.equal(s.players[0].board[0].tempAttack,0);
s=fresh();put(s,98,0);put(s,100,1);h=s.players[0].hand.length;act(s,0,{kind:'end'});act(s,1,{kind:'end'});assert.equal(s.players[0].hand.length,h+2);assert.equal(s.players[0].mana,3);
s=fresh();put(s,102,0);put(s,104,1);put(s,109,2);put(s,103,3);h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].hand.length,h+1,'full-health healing gives no bonus');s.players[0].board[3].hp=1;h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].hand.length,h+2);assert.equal(s.players[0].board[3].hp,2);assert.equal(s.players[0].board[3].bonusAttack,1);play(s,12);assert.equal(s.players[0].board[3].bonusAttack,1);cycle(s);assert.equal(s.players[0].board[3].bonusAttack,1,'permanent buff survives turn');
s=fresh();put(s,106,0);put(s,108,1).hp=1;h=s.players[0].hand.length;cycle(s);assert.equal(s.players[0].board[1].hp,4);assert.equal(s.players[0].hand.length,h+2,'multiple actual heals draw only once');
console.log('Passed: 24 unique set cards, all mixed/set pulls, set-specific pools and Chase fallback, paid/free bulk packs, invalid-set rejection, Harvest/reveal/heal combos, auras, trigger caps and resets.');
