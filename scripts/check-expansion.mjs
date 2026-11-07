import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {battle,act,starter,cards} from '../app/game.ts';
import {dailyQuests,syncQuests,claimQuest} from '../app/quests.ts';
const source=stripTypeScriptTypes(readFileSync(new URL('../app/packs.ts',import.meta.url),'utf8')).replace("'./game'",JSON.stringify(new URL('../app/game.ts',import.meta.url).href));
const {openPacks,specialChance}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
assert.equal(specialChance(0),.0176);assert.equal(specialChance(1),.0176+.001);assert.equal(specialChance(999),1);
let p=starter();const d=openPacks(p,5,()=>.9);assert.equal(p.coins,350);assert.equal(d.pulls.length,35);assert.equal(p.chaseMisses,5);
p.chaseMisses=20;let hitRoll=0;const hit=openPacks(p,1,()=>++hitRoll>=16?.9:0);assert.equal(hit.hits[0].id,18);assert.equal(p.chaseMisses,0);assert.equal(p.owned[18],1);
let q=starter();assert.throws(()=>openPacks(q,0));assert.throws(()=>openPacks(q,51));assert.throws(()=>openPacks(q,50));assert.equal(q.coins,500);
let s=battle(starter().deck,starter().deck);s.players[0].board[0]={id:0,hp:3,hidden:true,used:true};act(s,0,{kind:'end'});assert.equal(s.players[0].souls,0);assert.equal(s.players[0].board[0].hidden,true);act(s,1,{kind:'end'});assert.equal(s.players[1].souls,0);assert.equal(s.players[0].board[0].hidden,false);assert.equal(s.players[0].board[0].used,false);
s=battle(starter().deck,starter().deck);s.players[1].board[0]={id:0,hp:3,hidden:false,used:false};act(s,0,{kind:'end'});assert.equal(s.players[0].souls,0);
s=battle(starter().deck,starter().deck);s.players[0].souls=13;s.round=3;s.players[0].board[0]={id:0,hp:3,hidden:false,used:false};act(s,0,{kind:'end'});assert.equal(s.winner,0);assert.equal(s.players[0].souls,15);
console.log('Passed: 30-coin bulk packs, purchase limits, persisted luck increments/reset/cap, hyper ownership, turn-end 2 souls, hidden protection until owner turn, automatic reveal and bonus victory.');

const ranks=['common','uncommon','rare','epic','legendary','hit','superhit','hyper','chase','gold'];let batch=starter();batch.coins=1500;const ordered=openPacks(batch,50);assert.equal(ordered.pulls.length,350);for(let n=0;n<50;n++){const chunk=ordered.pulls.slice(n*7,n*7+7).map(id=>ranks.indexOf(cards[id].rarity));assert.ok(chunk[6]>=1);for(let j=1;j<7;j++)assert.ok(chunk[j]>=chunk[j-1]);}
let qp=starter(),qs=battle(qp.deck,qp.deck);qs.stats[0]={summons:5,attacks:5,kills:3};syncQuests(qp,'test',qs,0);const before=JSON.stringify(qp.quests.progress);syncQuests(qp,'test',qs,0);assert.equal(JSON.stringify(qp.quests.progress),before);claimQuest(qp,'attacks');assert.equal(qp.packTokens,1);assert.throws(()=>claimQuest(qp,'attacks'));assert.throws(()=>claimQuest(qp,'wins'));const coins=qp.coins;const fp=openPacks(qp,1,()=>.9,true);assert.equal(fp.pulls.length,7);assert.equal(qp.coins,coins);assert.equal(qp.packTokens,0);const nextday=Date.now()+86400000;dailyQuests(qp,nextday);syncQuests(qp,'test',qs,0,nextday);assert.equal(qp.quests.progress.summons,undefined);
console.log('Passed: seven-card packs sorted to a Uncommon-or-better finale, quest progress deduplication, reward claims, free packs, daily resets and stale-match exclusion.');
