import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {cards,starter,battle,act,canHarvest,harvestAmount,grantWelcomeCards,botDeck} from '../app/game.ts';
assert.equal(cards.length,128);assert.equal(cards[19].name,'Hat Camo');assert.equal(cards[20].name,'Camo Car');assert.equal(new Set(cards.map(c=>c.name)).size,128);
let p=starter();const saved=p.deck.slice(),coins=p.coins;grantWelcomeCards(p);for(const id of [19,20,26])assert.equal(p.owned[id],3);assert.deepEqual(p.deck,saved);assert.equal(p.coins,coins);p.owned[19]=5;grantWelcomeCards(p);assert.equal(p.owned[19],5);assert.equal(botDeck().length,40);assert.ok(botDeck().includes(20));
let s=battle(p.deck,p.deck);s.players[0].hand=[19,20,22,23,24,25,27,28,29];s.players[0].mana=30;act(s,0,{kind:'play',index:2,slot:4});assert.equal(s.players[0].board[4].id,22);assert.equal(s.players[0].board[4].hidden,true);
act(s,0,{kind:'play',index:2,slot:3});assert.equal(s.players[0].board[3].id,23);assert.equal(s.players[0].hand.length,7);
const before=s.players[0].mana;act(s,0,{kind:'play',index:2,slot:2});assert.equal(s.players[0].mana,before-3);
assert.equal(canHarvest(25),false);assert.equal(canHarvest(29),true);assert.equal(harvestAmount(25),0);assert.equal(harvestAmount(29),1);assert.equal(canHarvest(20),false);
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));const {openPacks}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const owned=starter();owned.coins=15000;const found=new Set();for(let i=0;i<10;i++){const d=openPacks(owned,50);d.pulls.forEach(id=>found.add(id));}for(let id=19;id<30;id++)assert.ok(found.has(id),'New card missing from pack pool: '+id);
const base='http://127.0.0.1:5173';const suffix=Date.now().toString(36);const registration=await fetch(base+'/api/game',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind:'register',username:'cards_'+suffix,password:crypto.randomUUID()})});assert.equal(registration.status,200);const cookie=registration.headers.get('set-cookie').split(';')[0];
async function call(a){const r=await fetch(base+'/api/game',{method:'POST',headers:{'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify(a)});return {r,d:await r.json()};}
let profile=await call({kind:'profile'});assert.equal(profile.d.profile.owned[19],3);const newDeck=[...profile.d.profile.deck];newDeck[6]=19;newDeck[7]=20;newDeck[8]=26;let savedDeck=await call({kind:'save',field:'deck',list:newDeck});assert.equal(savedDeck.r.status,200,JSON.stringify(savedDeck.d));assert.deepEqual(savedDeck.d.profile.deck,newDeck);
const invalid=[...newDeck];invalid[9]=19;invalid[10]=19;invalid[11]=19;assert.equal((await call({kind:'save',field:'deck',list:invalid})).r.status,400);
const game=await call({kind:'start'});assert.equal(game.d.match.players[0].remaining,35);const art=readFileSync(new URL('../app/card-art.tsx',import.meta.url),'utf8');assert.ok(art.includes('data-art="vector"'));assert.ok(!art.includes('<image'));assert.ok(!art.includes('camo-atlas'));
console.log('Passed: 128 unique cards, welcome copies without deck/currency loss, new summon/Harvest abilities, expanded pack pool, visual-deck save validation, 40-card match and inline vector artwork without raster references.');
