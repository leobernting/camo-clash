import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter,battle,act,grantWelcomeCards,canHarvest,harvestAmount,botDeck} from '../app/game.ts';
assert.equal(cards.length,129);assert.equal(cards.filter(c=>c.type==='camo').length,122);assert.equal(new Set(cards.map(c=>c.name)).size,129);
let p=starter();p.characterExpansion=1;p.owned[19]=1;const oldDeck=p.deck.slice();grantWelcomeCards(p);assert.equal(p.owned[19],1);for(const id of [30,36,45,51])assert.equal(p.owned[id],3);assert.deepEqual(p.deck,oldDeck);assert.equal(p.coins,500);p.owned[30]=1;grantWelcomeCards(p);assert.equal(p.owned[30],1);
for(const id of [31,37,40,42,46,52]){let s=battle(starter().deck,starter().deck);s.players[0].hand=[id];s.players[0].mana=10;const left=s.players[0].pile.length;act(s,0,{kind:'play',index:0});const n=0;assert.equal(s.players[0].hand.length,n);assert.equal(s.players[0].pile.length,left-n);}
for(const id of [34,49]){let s=battle(starter().deck,starter().deck);s.players[0].hand=[id];s.players[0].mana=10;act(s,0,{kind:'play',index:0});assert.equal(s.players[0].board[0].hidden,true);}
for(const [id,gain] of [[33,0],[43,0]]){let s=battle(starter().deck,starter().deck);s.players[0].hand=[id];s.players[0].mana=10;act(s,0,{kind:'play',index:0});assert.equal(s.players[0].mana,10-cards[id].cost+gain);}
let s=battle(starter().deck,starter().deck);s.players[0].board[0]={id:26,hp:1,hidden:false,used:false};s.players[0].hand=[41];s.players[0].mana=10;act(s,0,{kind:'play',index:0});assert.equal(s.players[0].board[0].hp,2);
assert.equal(canHarvest(39),false);assert.ok(canHarvest(44));assert.equal(harvestAmount(39),0);assert.equal(harvestAmount(44),2);assert.equal(botDeck().length,40);assert.ok(botDeck().some(id=>id>=30));
console.log('Passed: 122 camos/129 cards, unique names, one-time welcome grant preserving existing cards/decks/coins, new draw/mana/hidden/healing/Harvest abilities, and updated bot decks.');

const packSource=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks}=await import('data:text/javascript;base64,'+Buffer.from(packSource).toString('base64'));
for(let id=30;id<54;id++){const card=cards[id],targetSlot=card.rarity==='legendary'?6:0;const rolls=[.9];for(let slot=0;slot<7;slot++){const wanted=slot===targetSlot;let rarity,r;if(wanted){rarity=card.rarity;r=slot===6?{legendary:.01,epic:.2,rare:.8}[rarity]:{common:.1,uncommon:.6,rare:.95,epic:.99}[rarity];}else{rarity=slot===6?'rare':'common';r=slot===6?.8:.1;}const pool=cards.filter(c=>![16,17,18].includes(c.id)&&c.rarity===rarity);rolls.push(r,wanted?(pool.findIndex(c=>c.id===id)+.1)/pool.length:.5);}const result=openPacks(starter(),1,()=>rolls.shift());assert.ok(result.pulls.includes(id),'Card not obtainable in packs: '+card.name);}
console.log('Passed: every one of the 24 new camos is obtainable through the correct pack rarity pool.');
