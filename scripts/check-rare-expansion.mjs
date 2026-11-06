import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter,battle,act} from '../app/game.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks,specialCards}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(cards.length,110);assert.equal(cards.filter(c=>c.type==='camo').length,104);assert.equal(specialCards.length,23);for(const r of ['hit','superhit','chase'])assert.equal(cards.filter(c=>c.rarity===r).length,r==='chase'?3:10);
for(const card of cards.filter(c=>c.id>=54&&c.id<86)){
 const rolls=[];if(['hit','superhit','chase'].includes(card.rarity)){rolls.push(0,card.rarity==='chase'?0:card.rarity==='superhit'?.1:.5);const pool=cards.filter(c=>c.rarity===card.rarity);rolls.push((pool.findIndex(c=>c.id===card.id)+.1)/pool.length);}else rolls.push(.9);
 for(let slot=0;slot<7;slot++){if(slot===6&&['hit','superhit','chase'].includes(card.rarity))continue;const target=slot===6&&!['hit','superhit','chase'].includes(card.rarity),rarity=target?card.rarity:slot===6?'rare':'common';const pool=cards.filter(c=>!specialCards.includes(c.id)&&c.rarity===rarity);rolls.push(target?(rarity==='legendary'?.01:rarity==='rare'?.9:.2):slot===6?.9:.1,target?(pool.findIndex(c=>c.id===card.id)+.1)/pool.length:.5);}
 const p=starter();p.chaseMisses=0;const result=openPacks(p,1,()=>rolls.shift());assert.equal(result.pulls.length,7);assert.ok(result.pulls.includes(card.id),'Card missing: '+card.name);assert.equal(p.owned[card.id],1);assert.equal(result.pulls[6],card.id);if(['hit','superhit','chase'].includes(card.rarity))assert.equal(p.chaseMisses,0);else assert.equal(p.chaseMisses,1);
}
for(const [id,draw,gain,hidden] of [[54,0,0,false],[55,0,2,false],[56,0,0,true],[57,0,2,false],[58,0,0,false],[59,0,0,false],[60,1,0,false],[61,0,0,false],[62,0,0,true],[63,0,0,false],[64,0,0,false],[65,0,0,true]]){const s=battle(starter().deck,starter().deck);s.players[0].hand=[id];s.players[0].mana=20;act(s,0,{kind:'play',index:0,slot:4});assert.equal(s.players[0].board[4].id,id);assert.equal(s.players[0].board[4].hidden,hidden);assert.equal(s.players[0].hand.length,draw);assert.equal(s.players[0].mana,20-cards[id].cost+gain);}
assert.ok(!readFileSync(new URL('../app/card-art.tsx',import.meta.url),'utf8').includes('<image'));
console.log('Passed: 12 new high-rarity cards, expanded special tiers, every new pull obtainable with the rarest last, shared special-pull luck and resets for all three top tiers, plus every new summon ability.');
