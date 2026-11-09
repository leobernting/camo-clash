import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {cards,starter} from '../app/game.ts';
import {isSecretDiscovered} from '../app/secrets.ts';
const require=createRequire(import.meta.url),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,p);
const Index=require('../app/card-index.tsx').default,Art=require('../app/underworld-art.tsx').default;
const Card=({id})=>React.createElement('b',null,cards[id].name),render=profile=>renderToStaticMarkup(React.createElement(Index,{profile,Card}));
for(const profile of [null,starter()]){const html=render(profile);for(const id of [144,145,146,147,148])assert.ok(!html.includes('data-card-id="'+id+'"'));for(const name of ['Shockwave Ray','Cheeseball','Cheezy','Nino'])assert.ok(!html.includes(name),name+' must not leak');assert.ok(!html.includes('value="secret"'));assert.equal((html.match(/class="indexentry"/g)||[]).length,160);assert.ok(html.includes('160'));
}
let p=starter();p.owned[144]=1;let html=render(p);assert.ok(html.includes('data-card-id="144"'));assert.ok(html.includes('value="secret"'));for(const id of [145,146,147])assert.ok(!html.includes('data-card-id="'+id+'"'));
p=starter();p.secrets={rayClaimed:true,ballClaimed:true,ninoClaimed:true,cheeseForm:'guy'};html=render(p);for(const id of [144,145,146,147])assert.ok(html.includes('data-card-id="'+id+'"'));assert.ok(html.includes('Cheezy'));assert.ok(!html.includes('Cheese Guy'));assert.equal((html.match(/class="indexentry"/g)||[]).length,164);
p=starter();p.farm={pens:[{kind:'camo',id:144}]};assert.ok(isSecretDiscovered(p,144));assert.ok(render(p).includes('data-card-id="144"'));assert.equal(isSecretDiscovered(null,144),false);
for(const id of [144,146]){assert.equal(cards[id].type,'camo');const art=renderToStaticMarkup(React.createElement(Art,{id}));assert.ok(art.includes('data-creature="chameleon"'));assert.ok(art.includes(cards[id].name));}
assert.equal(cards[144].name,'Shockwave Ray');assert.deepEqual([cards[144].cost,cards[144].attack,cards[144].hp],[3,2,5]);assert.equal(cards[146].name,'Cheezy');assert.deepEqual([cards[146].cost,cards[146].attack,cards[146].hp],[2,0,5]);assert.equal(cards[146].soulAttack,true);
console.log('Passed rendered index privacy for anonymous/unclaimed profiles, acquired-only reveals, retained discoveries/farm cards, hidden counts/options/tokens, Cheezy rename and both chameleon illustrations with unchanged stats.');
