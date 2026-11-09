import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter} from '../app/game.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks,specialChance,specialTier}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(specialChance(0),.0176);assert.equal(specialChance(1),.0176+.001);assert.equal(specialChance(984),1);assert.equal(specialChance(-2),.0176);
assert.equal(specialTier(0),'hyper');assert.equal(specialTier(1/16),'hit');assert.equal(specialTier(6/16),'hit');assert.equal(specialTier(.999),'hit');
assert.ok(Math.abs(specialChance(0)/16-.0011)<1e-12);assert.ok(Math.abs(specialChance(0)*15/16-.0165)<1e-12);
for(const [tier,roll] of [['hyper',0],['hit',.1],['hit',.8]])for(let choice=0;choice<cards.filter(c=>c.rarity===tier).length;choice++){
 const p=starter();p.chaseMisses=80;const queue=[.05,roll,(choice+.1)/cards.filter(c=>c.rarity===tier).length];const result=openPacks(p,1,()=>queue.length?queue.shift():.9);assert.equal(cards[result.hits[0].id].rarity,tier);assert.equal(p.chaseMisses,0,'Every top-tier pull resets luck');assert.equal(result.pulls[6],result.hits[0].id);assert.equal(p.owned[result.hits[0].id],1);
}
let p=starter();p.chaseMisses=80;const queue=[.05,.8,0];const bulk=openPacks(p,2,()=>queue.length?queue.shift():.9);assert.equal(bulk.hits.length,1);assert.equal(p.chaseMisses,1,'Second bulk pack starts with reset luck');
for(const tierRoll of [0,.1,.8]){p=starter();p.chaseMisses=984;const sequence=[.999,tierRoll,0];const d=openPacks(p,1,()=>sequence.length?sequence.shift():.9);assert.equal(d.hits.length,1);assert.equal(p.chaseMisses,0);}
p=starter();openPacks(p,1,()=>.9);assert.equal(p.chaseMisses,1);assert.equal(p.coins,470);
console.log('Passed: shared luck boosts both special tiers, every available special card resets luck, 10% higher starting odds, cap, misses and per-pack reset during bulk openings.');
