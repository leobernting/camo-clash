import assert from 'node:assert/strict';
import {cards,battle,act,harvestAmount,BALANCE_VERSION} from '../app/game.ts';

// Every repeatable generator was audited: cheap basic/conditional Harvest,
// three-mana utility engines, and expensive draw/aura/passive powerhouses.
const costs={0:1,5:2,16:2,17:3,29:3,37:2,44:3,74:5,86:1,87:2,91:4,103:2,112:5,113:5,116:1,117:3,118:3,119:2,120:2,121:3,122:3,123:3,124:3,125:2,126:2,127:4,128:5,149:1,151:2,154:2};
assert.deepEqual(cards.filter(c=>c.harvest||c.startMana).map(c=>c.id),Object.keys(costs).map(Number));
for(const [id,cost] of Object.entries(costs))assert.equal(cards[id].cost,cost,cards[id].name);
assert.equal(cards[5].hp,4,'Moss Boss trades durability for its cheap, unconditional Harvest 2');
assert.equal(cards[5].attack,1);
assert.equal(cards[122].startsHidden,true,'Moon Mint retains its premium protection');
const unit=id=>({id,hp:cards[id].hp,maxHp:cards[id].hp,hidden:!!cards[id].startsHidden,used:false,flags:{},bonusAttack:0,tempAttack:0});
for(const id of [5,37,120,121,122,126,151,154]){
 const s=battle([],[],false);s.players[0].hand=[id];s.players[0].mana=cards[id].cost;
 act(s,0,{kind:'play',index:0,slot:0});assert.equal(s.players[0].mana,0,cards[id].name+' charges its printed cost');
 if(cards[id].harvest){const expected=harvestAmount(id,s,0,0);act(s,0,{kind:'harvest',index:0});assert.equal(s.players[0].mana,expected);assert.throws(()=>act(s,0,{kind:'harvest',index:0}),/already acted/);}
}
for(const [id,ally] of [[120,119],[126,103],[151,149]]){const s=battle([],[],false);s.players[0].board[0]=unit(id);assert.equal(harvestAmount(id,s,0,0),1);s.players[0].board[1]=unit(ally);assert.equal(harvestAmount(id,s,0,0),2);}
const stale=battle([],[],false);stale.balanceVersion=BALANCE_VERSION-1;assert.throws(()=>act(stale,0,{kind:'end'}),/Start a new match/);
console.log('Passed: all 30 generator costs audited, eight changed generators charge correctly, Harvest uses an action, conditional generation preserved, Moss health and stale match rejection.');
