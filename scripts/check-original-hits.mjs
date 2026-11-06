import assert from 'node:assert/strict';
import {cards} from '../app/game.ts';
const expected={16:'Jellybean Juggler',17:'Clockwork Chomp',60:'Comet Courier',61:'Mantis Maestro',62:'Deep-Sea Sneaker',63:'Thunderbranch Titan'};
for(const [id,name] of Object.entries(expected)){assert.equal(cards[id].name,name);assert.ok(!/edition|holographic|chrome|prismatic|eclipse|solar/i.test(cards[id].text));}
assert.equal(cards.length,116);assert.equal(cards.filter(c=>c.rarity==='hit').length,10);assert.equal(cards.filter(c=>c.rarity==='superhit').length,10);assert.equal(cards.filter(c=>c.rarity==='chase').length,3);assert.equal(new Set(cards.map(c=>c.name)).size,116);
console.log('Passed: all six Hit/Super-hit cards are distinct original characters with no edition/reskin descriptions, stable card IDs, unchanged tier counts and unique names.');
