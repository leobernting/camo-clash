import assert from 'node:assert/strict';
const base='http://127.0.0.1:5173/api/game';let cookie='';
async function call(a,status=200){const r=await fetch(base,{method:'POST',headers:{'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify(a)});const d=await r.json();assert.equal(r.status,status,JSON.stringify(d));cookie=r.headers.get('set-cookie')?.split(';')[0]||cookie;return d;}
await call({kind:'register',username:'decks_'+Date.now().toString(36),password:crypto.randomUUID()});let {profile:p}=await call({kind:'profile'});const first=p.activeDeckId,original=[...p.deck];assert.equal(p.decks.length,1);
({profile:p}=await call({kind:'deckDuplicate',id:first,name:'Forest friends'}));const second=p.activeDeckId;assert.equal(p.decks.length,2);const edited=[...original];edited[0]=8;({profile:p}=await call({kind:'save',field:'deck',list:edited}));assert.deepEqual(p.decks.find(d=>d.id===second).cards,edited);
await call({kind:'save',field:'deck',list:Array(40).fill(0)},400);await call({kind:'deckSelect',id:'other-profile-deck'},400);
({profile:p}=await call({kind:'deckSelect',id:first}));assert.deepEqual(p.deck,original);({profile:p}=await call({kind:'deckRename',id:first,name:'First crew'}));assert.equal(p.decks[0].name,'First crew');
await call({kind:'farmPlace',slot:0,id:0});await call({kind:'deckSelect',id:second});({profile:p}=await call({kind:'farmPickup',slot:0}));assert.deepEqual(p.deck,edited);assert.equal(p.decks[0].cards.length,40);
const {match}=await call({kind:'start'});for(const id of match.players[0].hand)assert.ok(match.players[0].hand.filter(n=>n===id).length<=edited.filter(n=>n===id).length);assert.equal(match.players[0].remaining+match.players[0].hand.length,40);
({profile:p}=await call({kind:'deckCreate',name:'New experiment'}));const third=p.activeDeckId;assert.equal(p.deck.length,0);await call({kind:'start'},400);await call({kind:'deckSelect',id:second});({profile:p}=await call({kind:'profile'}));assert.deepEqual(p.deck,edited);assert.equal(p.decks.length,3);
await call({kind:'deckDelete',id:third});await call({kind:'deckDelete',id:first});await call({kind:'deckDelete',id:second},400);
console.log('Passed API deck migration, duplicate/save/select/rename/delete persistence, validation, active deck match setup, empty draft rejection and farm restore to original deck.');
