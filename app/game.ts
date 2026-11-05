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
 ['Morning Dew',1,0,0,'common','spell','Restore 5 health to your leader.','#7ac9ce'],
 ['Shed Skin',1,0,0,'common','spell','Draw 2 cards.','#caadce'],
 ['Crimson King',5,6,7,'legendary','camo','The crown of the rainforest.','#df727b'],
 ['Fern Hatchling',1,2,2,'common','camo','Small scales. Big ambitions.','#b1cc6a']
].map((c,i)=>({id:i,name:c[0] as string,cost:c[1] as number,attack:c[2] as number,hp:c[3] as number,rarity:c[4] as string,type:c[5] as string,text:c[6] as string,color:c[7] as string}));
export const starter=()=>({coins:500,owned:Object.fromEntries(cards.map(c=>[c.id,c.id<4||c.id>=8?2:1])),deck:[0,0,1,1,2,2,3,5,6,7,8,9,10,10,11,12,13,15,15,4],binder:[4,3,6,1,7,5],wins:0});
export const shuffle=(a:any[])=>a.map(v=>({v,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.v);
export function battle(deck:number[],opponent:number[],bot=true){const side=(d:number[])=>({hp:20,mana:1,hand:[] as number[],pile:shuffle(d),board:[] as any[],land:-1});const s:any={players:[side(deck),side(opponent)],turn:0,round:1,log:['The canopy awaits. Your turn!'],winner:null,bot};s.players.forEach((p:any)=>p.hand=p.pile.splice(0,5));return s;}
export function act(s:any,who:number,a:any){if(s.winner!==null||s.turn!==who)throw Error('Wait for your turn.');const p=s.players[who],e=s.players[1-who];const pay=(n:number)=>{if(p.mana<n)throw Error('Not enough mana.');p.mana-=n;};
 if(a.kind==='play'){const id=p.hand[a.index],c=cards[id];if(!c)throw Error('Choose a card.');if(c.type==='camo'&&p.board.length>=5)throw Error('All five slots are full.');if(id===11&&(!e.board[a.target]||e.board[a.target].hidden))throw Error('Choose a visible enemy first.');pay(c.cost);p.hand.splice(a.index,1);if(c.type==='camo'){p.board.push({id,hp:c.hp,hidden:id===3,used:false});if(id===4)p.mana+=2;if(id===6&&p.pile.length)p.hand.push(p.pile.shift());}else if(c.type==='land')p.land=id;else if(id===10)p.mana+=3;else if(id===11)e.board[a.target].hp-=3;else if(id===12)p.hp=Math.min(20,p.hp+5);else if(id===13)p.hand.push(...p.pile.splice(0,2));s.log.unshift(c.name+' played.');}
 else if(a.kind==='hide'){const c=p.board[a.index];if(!c)throw Error('Choose a chameleon.');if(c.hidden)c.hidden=false;else{pay(1);c.hidden=true;c.used=true;}}
 else if(a.kind==='harvest'){const c=p.board[a.index];if(!c||c.used)throw Error('This camo already acted.');c.used=true;p.mana+=c.id===5?2:1;s.log.unshift(cards[c.id].name+' gathered mana.');}
 else if(a.kind==='attack'){const c=p.board[a.index];if(!c||c.used||c.hidden)throw Error('This camo cannot attack.');const t=a.target===-1?e:e.board[a.target];if(!t||t.hidden)throw Error('Hidden camos cannot be targeted.');c.used=true;const damage=Math.max(1,cards[c.id].attack+(p.land===8?1:0)-(e.land===9?1:0));t.hp-=damage;s.log.unshift(cards[c.id].name+' attacks for '+damage+'.');}
 else if(a.kind==='end'){s.turn=1-who;s.round++;const n=e;n.mana=1;n.board.forEach((c:any)=>c.used=false);if(n.pile.length)n.hand.push(n.pile.shift());else{n.hp-=2;s.log.unshift('Empty deck: 2 fatigue damage.');}}
 else throw Error('Unknown action.');s.players.forEach((x:any)=>x.board=x.board.filter((c:any)=>c.hp>0));if(p.hp<=0||e.hp<=0)s.winner=p.hp<=0?1-who:who;s.log=s.log.slice(0,12);return s;}
export function botTurn(s:any){let safety=0;while(s.turn===1&&s.winner===null&&safety++<30){const p=s.players[1];let played=false;for(let i=0;i<p.hand.length;i++){const c=cards[p.hand[i]];if(c.cost<=p.mana&&(c.type!=='camo'||p.board.length<5)){try{act(s,1,{kind:'play',index:i,target:s.players[0].board.findIndex((x:any)=>!x.hidden)});played=true;break;}catch{}}}if(played)continue;const i=p.board.findIndex((c:any)=>!c.used);if(i<0)break;const c=p.board[i];if(c.hidden)act(s,1,{kind:'hide',index:i});if((c.id===0||c.id===5)&&p.hand.some((id:number)=>cards[id].cost>p.mana))act(s,1,{kind:'harvest',index:i});else{const target=s.players[0].board.findIndex((x:any)=>!x.hidden&&x.hp<=cards[c.id].attack);act(s,1,{kind:'attack',index:i,target});}}if(s.turn===1&&s.winner===null)act(s,1,{kind:'end'});return s;}
