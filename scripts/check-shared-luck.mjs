import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter} from '../app/game.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks,specialChance,specialTier}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(specialChance(0),.016);assert.equal(specialChance(1),.017);assert.equal(specialChance(984),1);assert.equal(specialChance(-2),.016);
assert.equal(specialTier(0),'chase');assert.equal(specialTier(1/16),'superhit');assert.equal(specialTier(6/16),'hit');assert.equal(specialTier(.999),'hit');
assert.equal(specialChance(0)/16,.001);assert.equal(specialChance(0)*5/16,.005);assert.equal(specialChance(0)*10/16,.01);
for(const [tier,roll] of [['chase',0],['superhit',.1],['hit',.8]])for(let choice=0;choice<cards.filter(c=>c.rarity===tier).length;choice++){
 const p=starter();p.chaseMisses=80;const queue=[.05,roll,(choice+.1)/cards.filter(c=>c.rarity===tier).length];const result=openPacks(p,1,()=>queue.length?queue.shift():.9);assert.equal(cards[result.hits[0].id].rarity,tier);assert.equal(p.chaseMisses,0,'Every top-tier pull resets luck');assert.equal(result.pulls[6],result.hits[0].id);assert.equal(p.owned[result.hits[0].id],1);
}
let p=starter();p.chaseMisses=80;const queue=[.05,.8,0];const bulk=openPacks(p,2,()=>queue.length?queue.shift():.9);assert.equal(bulk.hits.length,1);assert.equal(p.chaseMisses,1,'Second bulk pack starts with reset luck');
for(const tierRoll of [0,.1,.8]){p=starter();p.chaseMisses=984;const sequence=[.999,tierRoll,0];const d=openPacks(p,1,()=>sequence.length?sequence.shift():.9);assert.equal(d.hits.length,1);assert.equal(p.chaseMisses,0);}
p=starter();openPacks(p,1,()=>.9);assert.equal(p.chaseMisses,1);assert.equal(p.coins,470);
console.log('Passed: shared luck boosts all three top tiers, each of all seventeen special cards resets luck, original starting odds, cap, misses and per-pack reset during bulk openings.');
