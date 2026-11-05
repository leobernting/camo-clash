export const cards = [
 ['Sprout Scout',1,1,3,'common','camo','Harvest: generate 1 mana.','#87c957'],
 ['Ember Crest',2,3,2,'rare','camo','Fierce little flame. Attacks immediately.','#ed8e50'],
 ['Dewdrop',1,1,4,'common','camo','A patient guardian of the canopy.','#57bfc0'],
 ['Moonveil',3,3,5,'epic','camo','Arrives hidden. Reveal for free.','#ad8ce4'],
 ['Golden Panther',4,5,5,'legendary','camo','Summon: gain 2 mana.','#e3bf64'],
 ['Mossback',2,2,6,'rare','camo','Harvest: generate 2 mana.','#63a67a'],
 ['Orchid Stalker',3,4,3,'epic','camo','Summon: draw a card.','#dc89bd'],
 ['Azure Runner',2,3,3,'rare','camo','Born for the first strike.','#70a3db'],
 ['Sunlit Canopy',2,0,0,'rare','land','Your attacks deal +1 damage.','#b5ca6d'],
 ['Thorn Marsh',2,0,0,'rare','land','Enemy attacks deal 1 less damage (minimum 1).','#7c9d86'],
 ['Wild Growth',1,0,0,'common','spell','Gain 3 mana.','#94c761'],
 ['Tongue Lash',2,0,0,'rare','spell','Deal 3 damage to a visible enemy.','#e4a66d'],
 ['Morning Dew',1,0,0,'common','spell','Restore 3 health to all your camos.','#7ac9ce'],
 ['Shed Skin',1,0,0,'common','spell','Draw 2 cards.','#caadce'],
 ['Crimson King',5,6,7,'legendary','camo','The crown of the rainforest.','#df727b'],
 ['Fern Hatchling',1,2,2,'common','camo','Small scales. Big ambitions.','#b1cc6a'],
 ['Prism Scout',1,1,3,'hit','camo','Prismatic edition ? 1 in 100 hit. Harvest: 1 mana.','#71d6ce'],
 ['Eclipse Mossback',2,2,6,'superhit','camo','Eclipse edition ? 1 in 200 hit. Harvest: 2 mana.','#9e8bdb'],
 ['Aurora Sovereign',5,6,7,'chase','camo','Chase edition ? a living aurora.','#f6a3db']
].map((c,i)=>({id:i,name:c[0] as string,cost:c[1] as number,attack:c[2] as number,hp:c[3] as number,rarity:c[4] as string,type:c[5] as string,text:c[6] as string,color:c[7] as string}));

export const starterDeck=()=>cards.filter(c=>c.id<16).flatMap(c=>Array(c.id<8?3:2).fill(c.id));
export const starter=()=>({rulesVersion:2,coins:500,owned:Object.fromEntries(cards.filter(c=>c.id<16).map(c=>[c.id,3])),deck:starterDeck(),binder:[4,3,6,1,7,5],wins:0});
export function upgradeProfile(p:any){if(p.rulesVersion!==2){cards.filter(c=>c.id<16).forEach(c=>p.owned[c.id]=Math.max(3,p.owned[c.id]||0));const next:number[]=[];for(const id of p.deck||[])if(cards[id]&&next.filter(x=>x===id).length<3)next.push(id);for(const id of starterDeck())if(next.length<40&&next.filter(x=>x===id).length<3)next.push(id);p.deck=next;p.rulesVersion=2;}return p;}
export const shuffle=(a:any[])=>a.map(v=>({v,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.v);
export const canHarvest=(id:number)=>id===0||id===5||id===16||id===17;
export function battle(deck:number[],opponent:number[],bot=true){const side=(d:number[])=>({souls:0,mana:1,hand:[] as number[],pile:shuffle(d),board:Array(5).fill(null),land:-1});const s:any={rulesVersion:2,players:[side(deck),side(opponent)],turn:0,round:1,log:['First to 10 souls wins. Your turn!'],winner:null,bot,nextBotAt:0};s.players.forEach((p:any)=>p.hand=p.pile.splice(0,5));return s;}
export function act(s:any,who:number,a:any){
 if(s.rulesVersion!==2)throw Error('Rules updated. Start a new match.');
 if(s.winner!==null||s.turn!==who)throw Error('Wait for your turn.');
 const p=s.players[who],e=s.players[1-who];const slot=(i:any)=>Number.isInteger(i)&&i>=0&&i<5;
 const pay=(n:number)=>{if(p.mana<n)throw Error('Not enough mana.');p.mana-=n;};
 if(a.kind==='play'){
 const id=p.hand[a.index],c=cards[id];if(!c)throw Error('Choose a card.');const square=a.slot===undefined?p.board.findIndex((x:any)=>!x):a.slot;
 if(c.type==='camo'&&(!slot(square)||p.board[square]))throw Error('Choose an empty square.');
 if(id===11&&(!e.board[a.target]||e.board[a.target].hidden))throw Error('Choose a visible enemy first.');
 pay(c.cost);p.hand.splice(a.index,1);
 if(c.type==='camo'){p.board[square]={id,hp:c.hp,hidden:id===3,used:false};if(id===4)p.mana+=2;if(id===6&&p.pile.length)p.hand.push(p.pile.shift());}
 else if(c.type==='land')p.land=id;else if(id===10)p.mana+=3;else if(id===11)e.board[a.target].hp-=3;else if(id===12)p.board.forEach((x:any)=>{if(x)x.hp=Math.min(cards[x.id].hp,x.hp+3);});else if(id===13)p.hand.push(...p.pile.splice(0,2));s.log.unshift(c.name+' played.');
 }else if(a.kind==='move'){
 if(!slot(a.index)||!slot(a.slot)||!p.board[a.index]||p.board[a.slot])throw Error('Move to an empty square.');p.board[a.slot]=p.board[a.index];p.board[a.index]=null;
 }else if(a.kind==='hide'){
 const c=p.board[a.index];if(!c)throw Error('Choose a chameleon.');if(c.hidden)c.hidden=false;else{pay(1);c.hidden=true;c.used=true;}
 }else if(a.kind==='harvest'){
 const c=p.board[a.index];if(!c||!canHarvest(c.id))throw Error('Only camos with Harvest can generate mana.');if(c.used)throw Error('This camo already acted.');c.used=true;p.mana+=c.id===5||c.id===17?2:1;s.log.unshift(cards[c.id].name+' gathered mana.');
 }else if(a.kind==='attack'){
 const c=p.board[a.index],t=e.board[a.target];if(!c||c.used||c.hidden)throw Error('This camo cannot attack.');if(!slot(a.target)||!t||t.hidden)throw Error('Choose a visible enemy camo.');c.used=true;const damage=Math.max(1,cards[c.id].attack+(p.land===8?1:0)-(e.land===9?1:0));t.hp-=damage;s.log.unshift(cards[c.id].name+' attacks '+cards[t.id].name+' for '+damage+'.');
 }else if(a.kind==='end'){
 if(!e.board.some((c:any)=>c&&!c.hidden)){p.souls+=3;s.log.unshift('No visible enemy camos: +3 souls.');}s.turn=1-who;s.round++;e.mana=1;e.board.forEach((c:any)=>{if(c){c.used=false;c.hidden=false;}});if(e.pile.length)e.hand.push(e.pile.shift());
 }else throw Error('Unknown action.');
 s.players.forEach((side:any,i:number)=>side.board.forEach((c:any,j:number)=>{if(c&&c.hp<=0){const cost=cards[c.id].cost;s.players[1-i].souls+=cost;side.board[j]=null;s.log.unshift(cards[c.id].name+' defeated: +'+cost+' souls.');}}));
 if(s.players[0].souls>=10)s.winner=0;else if(s.players[1].souls>=10)s.winner=1;s.log=s.log.slice(0,15);return s;
}
export function botStep(s:any){
 if(s.turn!==1||s.winner!==null)return s;const p=s.players[1],e=s.players[0];
 for(let i=0;i<p.hand.length;i++){const id=p.hand[i],c=cards[id];if(c.cost>p.mana||c.type==='camo'&&!p.board.some((x:any)=>!x))continue;const target=e.board.findIndex((x:any)=>x&&!x.hidden);if(id===11&&target<0||id===12&&!p.board.some((x:any)=>x&&x.hp<cards[x.id].hp))continue;return act(s,1,{kind:'play',index:i,target});}
 for(let i=0;i<5;i++){const c=p.board[i];if(!c||c.used)continue;if(canHarvest(c.id)&&p.hand.some((id:number)=>cards[id].cost>p.mana))return act(s,1,{kind:'harvest',index:i});const targets=e.board.map((x:any,j:number)=>({x,j})).filter(({x}:any)=>x&&!x.hidden).sort((a:any,b:any)=>(a.x.hp<=cards[c.id].attack?-100:0)+a.x.hp-((b.x.hp<=cards[c.id].attack?-100:0)+b.x.hp));if(targets.length)return act(s,1,c.hidden?{kind:'hide',index:i}:{kind:'attack',index:i,target:targets[0].j});}
 return act(s,1,{kind:'end'});
}
