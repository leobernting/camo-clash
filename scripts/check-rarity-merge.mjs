import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter,rarityOrder} from '../app/game.ts';
import {rarityNames,cardSets} from '../app/card-rules.ts';
import {validDeck} from '../app/farm.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks,specialChance,specialTier,CHASE_CHANCE,GOLD_CHANCE,specialCards}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const formerSuper=[17,62,63,82,83,84,85,93,101,109,159],promoted=[16,61,78];
assert.equal(cards.filter(c=>c.rarity==='superhit').length,0);assert.equal(cards.filter(c=>c.rarity==='hit').length,19);assert.ok(!rarityOrder.includes('superhit'));assert.equal(rarityNames.superhit,undefined);
for(const id of formerSuper)assert.equal(cards[id].rarity,'hit',cards[id].name);for(const id of promoted){assert.equal(cards[id].rarity,'legendary');assert.ok(!specialCards.includes(id));}
assert.equal(specialTier(1/16-1e-9),'hyper');for(const roll of [1/16,.1,6/16-1e-9,6/16,.99])assert.equal(specialTier(roll),'hit');assert.equal(specialChance(0),.0176);assert.ok(Math.abs(specialChance(1)-.0186)<1e-12);assert.equal(CHASE_CHANCE,1/2000);assert.equal(GOLD_CHANCE,1/100000);
for(const set of ['all',...cardSets.map(s=>s.id)]){const pool=cards.filter(c=>!c.tokenOnly&&c.rarity!=='secret'&&(set==='all'||c.set===set)),hits=pool.filter(c=>c.rarity==='hit');assert.ok(hits.length);for(let choice=0;choice<hits.length;choice++){const queue=[0,.1,(choice+.1)/hits.length],p=starter(),pack=openPacks(p,1,()=>queue.shift()??.9,false,set);assert.ok(pack.pulls.includes(hits[choice].id));assert.equal(p.chaseMisses,0);assert.equal(pack.pulls.length,7);assert.equal(cards[pack.pulls[6]].rarity,'hit');}}
for(const id of promoted)for(const set of ['all','core']){const pool=cards.filter(c=>(set==='all'||c.set===set)&&c.rarity==='legendary'),queue=[.99,...Array.from({length:6},()=>[.1,0]).flat(),.01,(pool.findIndex(c=>c.id===id)+.1)/pool.length,.99,.99],p=starter();const pack=openPacks(p,1,()=>queue.shift()??.99,false,set);assert.ok(pack.pulls.includes(id),cards[id].name+' in '+set);assert.equal(p.chaseMisses,1);}
const p=starter();p.owned[17]=1;p.deck[0]=17;const inventory=JSON.stringify(p.owned);assert.ok(validDeck(p));assert.equal(cards[p.deck[0]].rarity,'hit');assert.equal(JSON.stringify(p.owned),inventory);
console.log('Passed all former Super-hit conversions, three Legendary promotions, stable card IDs/decks, every Hit in every pack set, promoted Legendary finales, merged chance boundaries, luck resets and fixed Chase/Gold odds.');
