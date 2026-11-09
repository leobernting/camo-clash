import {underworldCards} from './underworld-cards.ts';
import {supportCards} from './support-cards.ts';
import {camoOutline,drawingScore} from './drawing-rules.ts';
import {cardRules} from './card-rules.ts';
export const SOUL_TARGET=15,END_TURN_SOULS=2,BALANCE_VERSION=7;
export {cardSets,rarityLabel,rarityOrder} from './card-rules.ts';
export const cards = [
 ['Sprout Scout',1,1,3,'common','camo','Harvest: generate 1 mana.','#87c957'],
 ['Toast Malone',2,3,2,'rare','camo','Fierce little flame. Attacks immediately.','#ed8e50'],
 ['Sir Drips-a-Lot',1,1,4,'uncommon','camo','A patient guardian of the canopy.','#57bfc0'],
 ['Moonveil Sneak',3,3,5,'epic','camo','Arrives hidden. Reveal for free.','#ad8ce4'],
 ['King Bling',4,5,5,'legendary','camo','Summon: gain 2 mana.','#e3bf64'],
 ['Moss Boss',2,2,6,'rare','camo','Harvest: generate 2 mana.','#63a67a'],
 ['Petal Peeper',3,4,3,'epic','camo','Summon: draw a card.','#dc89bd'],
 ['Zoomie McScales',2,3,3,'rare','camo','Born for the first strike.','#70a3db'],
 ['Sunlit Canopy',2,0,0,'rare','land','Your attacks deal +1 damage.','#b5ca6d'],
 ['The Prickle Puddle',2,0,0,'rare','land','Enemy attacks deal 1 less damage (minimum 1).','#7c9d86'],
 ['Wild Growth',1,0,0,'common','spell','Gain 3 mana.','#94c761'],
 ['Tongue Lash',2,0,0,'rare','spell','Deal 3 damage to a visible enemy.','#e4a66d'],
 ['Morning Dew',1,0,0,'uncommon','spell','Restore 3 health to all your camos.','#7ac9ce'],
 ['New Skin, Who Dis?',1,0,0,'uncommon','spell','Draw 2 cards.','#caadce'],
 ['His Royal Redness',5,6,7,'legendary','camo','The crown of the rainforest.','#df727b'],
 ['Pocket Pickle',1,2,2,'uncommon','camo','Small scales. Big ambitions.','#b1cc6a'],
 ['Jellybean Juggler',1,1,3,'hit','camo','Harvest: generate 1 mana. A balanced diet of airborne candy.','#d2a1bf'],
 ['Clockwork Chomp',2,2,6,'superhit','camo','Harvest: generate 2 mana. Wind up the jaws of productivity.','#c69d67'],
 ['Aurora Sovereign',5,6,7,'hyper','camo','Chase edition - a living aurora.','#f6a3db'],
 ["Hat Camo",2,2,5,"uncommon","camo","All dressed up. Nowhere to hide.","#78ad7a"],
 ["Camo Car",3,5,2,"rare","camo","Zero to sticky in three seconds.","#8bb845"],
 ["Sir Licks-a-Lot",3,4,5,"rare","camo","A noble tongue with questionable table manners.","#c3b59a"],
 ["Camo-flage",2,2,3,"epic","camo","Arrives hidden. Definitely not a suspicious leaf.","#6b9c74"],
 ["Gandalf the Green",4,3,5,"epic","camo","Summon: draw 2 cards. You shall not pass this branch.","#a286d1"],
 ["Captain Camo",3,3,4,"rare","camo","Summon: gain 1 mana. A pirate of the pond.","#c4a067"],
 ["Chef Kiss",2,1,4,"uncommon","camo","Harvest: generate 1 mana. A five-star fly menu.","#d6b992"],
 ["Banana Bandit",1,1,3,"common","camo","Wanted for crimes against fruit bowls.","#e2cc5b"],
 ["Neil Armstrongue",5,5,7,"legendary","camo","Summon: draw a card. One giant lick for camokind.","#9eb7d6"],
 ["DJ Stickyfeet",3,2,5,"rare","camo","Summon: gain 2 mana. Dropping beats, not branches.","#b498d0"],
 ["Business Lizard",2,1,5,"uncommon","camo","Harvest: generate 2 mana. Let us circle back to flies.","#99aa83"]
,
 ["Nacho Average Camo",1,2,1,"common","camo","Crunch first. Ask questions later.","#ddae56"],
 ["Detective Sticky",2,2,4,"uncommon","camo","Summon: draw a card. The plot thickens like sap.","#b59d7a"],
 ["Camo-saurus Rex",4,5,5,"rare","camo","Tiny arms. Enormous tongue energy.","#7ba77b"],
 ["Disco Gecko",3,3,4,"epic","camo","Summon: gain 1 mana. The branch is a dance floor.","#c78eb8"],
 ["The Great Camo-dini",3,2,4,"epic","camo","Arrives hidden. Now you see a leaf.","#9479b4"],
 ["Camo-copter",3,4,2,"rare","camo","Please keep your tongues inside the vehicle.","#82b3b0"],
 ["Doughnut Disturb",1,1,4,"common","camo","Glazed, confused, and ready for battle.","#d7a0bd"],
 ["Sergeant Slurp",3,3,5,"rare","camo","Summon: draw a card. Reporting for sticky duty.","#7396a0"],
 ["Sushi Roll Model",2,2,3,"uncommon","camo","A very raw talent.","#87a888"],
 ["Camo-sauna",2,1,5,"uncommon","camo","Harvest: generate 1 mana. Sweating the small bugs.","#adc1ae"],
 ["Count Camo-cula",4,4,5,"epic","camo","Summon: draw a card. I vant to lick your flies.","#9b83b3"],
 ["Camo-mber",5,4,8,"legendary","camo","Summon: heal all your camos by 2. The big cheese.","#e2c780"],
 ["Postman Pat-a-Fly",1,1,2,"common","camo","Summon: draw a card. Special de-livery.","#8da4ba"],
 ["Camo-nado",4,5,3,"epic","camo","Summon: gain 2 mana. A whirlwind of questionable plans.","#95b7ba"],
 ["Grandpa Grip",3,2,7,"rare","camo","Harvest: generate 2 mana. Back in my branch...","#a3b28a"],
 ["Bubble Trouble",1,1,3,"common","camo","Professional bubble inspector. Pop at your own risk.","#83c5c3"],
 ["Professor Tonguestein",3,2,4,"rare","camo","Summon: draw 2 cards. A breakthrough in fly-ology.","#95ae9c"],
 ["Pickle Rickshaw",2,3,3,"uncommon","camo","Meter running. Tongue also running.","#a1b75b"],
 ["Camo of Duty",4,4,6,"rare","camo","Tactical branch secured.","#899b6a"],
 ["Cloud Nine Camo",3,2,6,"epic","camo","Arrives hidden. Head firmly in the clouds.","#a5bcd3"],
 ["Camo-mime",2,2,4,"uncommon","camo","Trapped in an invisible terrarium. Again.","#c4c9bc"],
 ["Shell Yeah",1,1,4,"common","camo","A mobile home with excellent camouflage.","#95aa70"],
 ["Lizard of Oz",5,4,7,"legendary","camo","Summon: draw 2 cards. Follow the yellow brick branch.","#82b79d"],
 ["Camo-zilla",6,7,8,"legendary","camo","The city was not zoned for this much tongue.","#7d9b8c"]
,
 ["Origami Overlord",3,3,5,"epic","camo","Summon: draw a card. Paperwork has never been this dangerous.","#b6afd0"],
 ["Espresso Patronum",3,2,4,"epic","camo","Summon: gain 2 mana. Fully caffeinated camouflage.","#b49b86"],
 ["Velvet Vanisher",4,4,4,"epic","camo","Arrives hidden. A dramatic exit before the entrance.","#9a78b4"],
 ["Sir Scales-a-Billion",5,4,7,"legendary","camo","Summon: gain 3 mana. Generational fly wealth.","#d7bf78"],
 ["The Last Airbrancher",5,5,6,"legendary","camo","Summon: draw 2 cards. Master of all four leaf piles.","#9ec8bb"],
 ["Professor Paradox",6,5,8,"legendary","camo","Summon: draw 2 cards. Early for tomorrow. Late for yesterday.","#9e9dc5"],
 ["Comet Courier",2,2,5,"hit","camo","The fastest delivery service this side of the moon.","#8eb6ca"],
 ["Mantis Maestro",3,5,2,"hit","camo","Every battle deserves a dramatic violin solo.","#8fb788"],
 ["Deep-Sea Sneaker",3,2,4,"superhit","camo","Arrives hidden. The ocean floor has a new secret.","#668caa"],
 ["Thunderbranch Titan",6,7,8,"superhit","camo","A walking thunderstorm with excellent branch manners.","#8d9fbc"],
 ["Disco Inferno",5,5,7,"hyper","camo","Summon: gain 2 mana. The dance floor is now a national park.","#dc9bbd"],
 ["The Unlickable",6,7,8,"hyper","camo","Summon: draw a card. A myth with impeccable tongue control.","#a6c5cb"]
,
 ["Fern Accountant",3,1,4,"rare","camo","","#a7be84"],
 ["Pesto Protector",3,2,5,"rare","camo","","#85ac79"],
 ["Pit-Stop Pickle",2,1,4,"rare","camo","","#a7b96d"],
 ["Encore Iguana",3,2,3,"rare","camo","","#b39ac5"],
 ["Lantern Lurker",3,1,4,"epic","camo","","#a1b7aa"],
 ["Marmalade Medic",3,1,5,"epic","camo","","#d5a36d"],
 ["Gearshift Guru",4,2,5,"epic","camo","","#8fabb8"],
 ["Standing Ovation",4,1,5,"epic","camo","","#bb8caa"],
 ["The Rootfather",5,2,7,"legendary","camo","","#849a72"],
 ["Duchess Dumpling",5,2,6,"legendary","camo","","#d0b18e"],
 ["Baron Backstage",5,4,5,"legendary","camo","","#a18aa5"],
 ["Chrono-Chameleon",6,2,8,"legendary","camo","","#9bb4b6"],
 ["Cocoa Corsair",3,3,4,"hit","camo","","#b1937c"],
 ["Neon Noodle",3,1,4,"hit","camo","","#b995ca"],
 ["Velcro Voyager",4,3,5,"hit","camo","","#93b7ba"],
 ["Turbo Terrarium",4,4,4,"hit","camo","","#89b4a4"],
 ["Celestial Salad",5,1,7,"superhit","camo","","#a8c8a5"],
 ["Marquis Macaron",4,2,5,"superhit","camo","","#c4a3b9"],
 ["Phantom Pianist",5,2,6,"superhit","camo","","#a29abd"],
 ["Obsidian Orchestra",6,3,7,"superhit","camo","","#898ba8"],
["Sapling Signalman",1,1,2,"common","camo","","#8ead75"],
["Trolley McLeaf",2,0,4,"uncommon","camo","","#8ead75"],
["Ticket Taker",3,1,4,"rare","camo","","#8ead75"],
["Railway Rootguard",3,2,5,"rare","camo","","#8ead75"],
["Platform Professor",4,1,5,"epic","camo","","#8ead75"],
["Conductor Croak",5,3,5,"legendary","camo","","#8ead75"],
["Locomoss",4,2,6,"hit","camo","","#8ead75"],
["The Orient Ex-Hiss",6,4,6,"superhit","camo","","#8ead75"],
["Masked Munchkin",1,2,2,"common","camo","","#ab96c0"],
["Coin-Cloak Camo",2,1,3,"uncommon","camo","","#ab96c0"],
["Velvet Usher",3,1,4,"rare","camo","","#ab96c0"],
["Bouncer in Disguise",3,2,5,"rare","camo","","#ab96c0"],
["Madame Peekaboo",4,2,4,"epic","camo","","#ab96c0"],
["Count Confetti",5,3,5,"legendary","camo","","#ab96c0"],
["Pocket Dimension Pete",4,2,5,"hit","camo","","#ab96c0"],
["The Great Hiss-dini",5,3,5,"superhit","camo","","#ab96c0"],
["Biscuit Bandage",1,0,3,"common","camo","","#d0a47b"],
["Juice Box Jockey",2,1,4,"uncommon","camo","","#d0a47b"],
["Soup-er Visor",3,1,4,"rare","camo","","#d0a47b"],
["Crouton Crusader",3,2,5,"rare","camo","","#d0a47b"],
["Doctor Broccoli",4,1,6,"epic","camo","","#d0a47b"],
["Sir Lunch-a-Lot",5,3,6,"legendary","camo","","#d0a47b"],
["Waffle Warden",4,3,5,"hit","camo","","#d0a47b"],
["Queen of Tarts",5,2,7,"superhit","camo","","#d0a47b"],
["Branch Switcheroo",3,0,0,"rare","spell","","#bca3ca"],
["Pablo Picamasso",4,1,5,"epic","camo","","#d0b38c"],
["The First Chameleon",5,3,6,"chase","camo","","#a7c8b6"],
["Infinity Express",5,3,6,"chase","camo","","#a7b9cf"],
["The Final Curtain",5,4,5,"chase","camo","","#ba9ec8"],
["The Cosmic Croissant",5,3,7,"chase","camo","","#d5b595"],
["Solar Panel Camo",1,0,2,"common","camo","","#bad18d"],
["Dynamo-saur",3,0,5,"rare","camo","","#b9bc7d"],
["Raincheck Rex",3,1,4,"uncommon","camo","","#8dbbb1"],
["Boiler Buddy",2,0,4,"common","camo","","#b5a583"],
["Junction Juicer",3,1,4,"uncommon","camo","","#a8ba8a"],
["Freight Interest",4,1,6,"rare","camo","","#8fa8ab"],
["Moon Mint",2,0,3,"common","camo","","#a6a8c9"],
["Cloak & Coin",3,1,4,"uncommon","camo","","#b9a285"],
["Night Shift Camo",3,1,4,"rare","camo","","#8e98b5"],
["Smoothie Operator",2,0,4,"common","camo","","#d3b39b"],
["Sourdough Starter",3,1,5,"uncommon","camo","","#ceb98f"],
["Piggy Pudding",4,0,6,"rare","camo","","#c6a2a0"],
["Midas McScales",5,3,6,"gold","camo","","#dfc06c"],
...supportCards,...underworldCards
].map((c,i)=>({id:i,name:c[0] as string,cost:c[1] as number,attack:c[2] as number,hp:c[3] as number,rarity:c[4] as string,type:c[5] as string,color:c[7] as string,...cardRules[i],set:cardRules[i]?.set||'core',tags:[...(cardRules[i]?.tags||[]),...(cardRules[i]?.harvest||cardRules[i]?.startMana?['Generator']:[])]}));

export const starterDeck=()=>cards.filter(c=>c.id<16).flatMap(c=>Array(c.id<8?3:2).fill(c.id));
export const botDeck=()=>{const d=starterDeck();[6,7,9,10,12,13,18,19,21,22,36].forEach((slot,i)=>d[slot]=[19,20,30,32,35,36,40,43,46,49,53][i]);return d;};
export const starter=()=>({rulesVersion:2,coins:500,owned:Object.fromEntries(cards.filter(c=>c.id<16).map(c=>[c.id,3])),deck:starterDeck(),binder:[4,3,6,1,7,5],wins:0});
export function upgradeProfile(p:any){if(p.rulesVersion!==2){cards.filter(c=>c.id<16).forEach(c=>p.owned[c.id]=Math.max(3,p.owned[c.id]||0));const next:number[]=[];for(const id of p.deck||[])if(cards[id]&&next.filter(x=>x===id).length<3)next.push(id);for(const id of starterDeck())if(next.length<40&&next.filter(x=>x===id).length<3)next.push(id);p.deck=next;p.rulesVersion=2;}return p;}
export function grantSupportCards(p:any){if(p.supportExpansion!==1){for(const c of cards.filter(c=>c.id>=129&&c.id<144))p.owned[c.id]=Math.max(1,p.owned[c.id]||0);p.supportExpansion=1;}return p;}
export const shuffle=(a:any[])=>a.map(v=>({v,r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.v);
export const canHarvest=(id:number)=>(cardRules[id]?.harvest||0)>0;
export function harvestAmount(id:number,s?:any,who=0,index=-1){const r=cardRules[id],p=s?.players[who];if(!r?.harvest)return 0;const self=index>=0?index:p?.board.findIndex((c:any)=>c?.id===id),condition=r.harvestCondition;const yes=p&&(condition==='land'?p.land>=0:p.board.some((c:any,i:number)=>c&&c.hp>0&&i!==self&&(cards[c.id].tribe===condition||cards[c.id].tags.includes(condition||''))));return r.harvest+(yes?(r.harvestBonus||0):0);}
export function grantWelcomeCards(p:any){if(!p.characterExpansion){for(const id of [19,20,26])p.owned[id]=Math.max(p.owned[id]||0,3);}if(p.characterExpansion!==2){for(const id of [30,36,45,51])p.owned[id]=Math.max(p.owned[id]||0,3);p.characterExpansion=2;}return p;}
const newTurn=()=>({reveals:0,heals:0,harvestTribes:{} as Record<string,number>,spells:0,harvests:0,hides:0,lands:0,tricksterAttacks:0,showtimeAttacks:0,gourmetAttacks:0,tribes:{} as Record<string,number>});
const living=(p:any)=>p.board.filter((c:any)=>c&&c.hp>0);
const tribe=(c:any,t:string)=>!!c&&cards[c.id]?.tribe===t;
const tagged=(c:any,t:string)=>!!c&&cards[c.id]?.tags.includes(t);
const member=(c:any,group:string)=>tribe(c,group)||tagged(c,group);
const once=(c:any,key:string)=>{c.flags ||= {};if(c.flags[key])return false;c.flags[key]=true;return true;};
const log=(s:any,message:string)=>{s.log.unshift(message);s.log=s.log.slice(0,25);};
export const maxHealth=(c:any)=>c.maxHp??cards[c.id].hp;
export function cardCost(s:any,who:number,id:number){const p=s.players[who];return Math.max(1,cards[id].cost-(cards[id].type==='camo'&&cards[id].tribe==='Gourmet'&&!p.turnState?.tribes?.Gourmet&&living(p).some((c:any)=>c.id===55)?1:0));}
export function hideCost(s:any,who:number){const p=s.players[who];return !p.turnState?.hides&&(living(p).some((c:any)=>c.id===62)||cardRules[p.land]?.landHideDiscount&&living(p).some((c:any)=>tribe(c,'Trickster')))?0:1;}
export const requiresEnemyTarget=(id:number)=>id===11||!!cardRules[id]?.targetEnemy;
export function unitAttack(s:any,who:number,index:number){const p=s.players[who],c=p.board[index];if(!c||c.hp<=0)return 0;let n=cards[c.id].attack+(c.bonusAttack||0)+(c.tempAttack||0)+(p.land===8?1:0);const land=cardRules[p.land];if(land?.landAttack&&member(c,land.landAttackGroup!))n+=land.landAttack;
 if(cardRules[c.id]?.soulAttack)n+=s.players[1-who].souls;
 if(c.id===26&&living(p).some((x:any)=>x!==c&&tribe(x,'Gourmet')))n+=2;
 if(c.id===27&&p.land>=0)n+=2;
 for(const source of living(p)){if(source===c)continue;if(source.id===32&&tribe(c,'Canopy')||source.id===41&&tribe(c,'Gourmet')||source.id===48&&tribe(c,'Clockwork')||source.id===50&&source.hidden&&tribe(c,'Trickster')||source.id===52&&tribe(c,'Trickster')||[14,18].includes(source.id)&&tribe(c,'Showtime'))n++;if(source.id===47&&tagged(c,'Vehicle'))n+=2;const aura=cardRules[source.id];if(aura?.auraAttack&&member(c,aura.auraAttackGroup!))n+=aura.auraAttack;}
 return Math.max(0,n);
}
export function unitArmor(s:any,who:number,index:number){const p=s.players[who],c=p.board[index];if(!c)return 0;return (cardRules[c.id]?.armor||0)+(p.land===9?1:0)+(cardRules[p.land]?.landArmor&&member(c,cardRules[p.land].landArmorGroup!)?cardRules[p.land].landArmor!:0)+living(p).filter((x:any)=>x!==c&&x.id===49&&tribe(c,'Trickster')).length+living(p).filter((x:any)=>x!==c).reduce((n:number,x:any)=>n+(cardRules[x.id]?.auraArmor&&member(c,cardRules[x.id].auraArmorGroup!)?cardRules[x.id].auraArmor!:0),0);}
export function canAttack(s:any,who:number,index:number){const c=s.players[who].board[index];return s.round>2&&!!c&&c.hp>0&&!c.hidden&&!c.used&&unitAttack(s,who,index)>0;}
export function hasReadyAttacker(s:any,who:number){return s.players[who].board.some((_:any,index:number)=>canAttack(s,who,index));}
export function endTurnSoulBonus(s:any,who:number){return hasReadyAttacker(s,who)&&!s.players[1-who].board.some((c:any)=>c&&c.hp>0&&!c.hidden)?END_TURN_SOULS:0;}
export function attackDamage(s:any,who:number,index:number,target:number,bonus=0){const c=s.players[who].board[index],t=s.players[1-who].board[target];if(!c||!t||t.hidden||unitAttack(s,who,index)<=0)return 0;return Math.max(1,unitAttack(s,who,index)+(c.id===21&&t.hp>=5?2:0)+bonus-unitArmor(s,1-who,target));}
function draw(s:any,who:number,n:number,source:string){const p=s.players[who],got=p.pile.splice(0,n);p.hand.push(...got);if(got.length)log(s,source+': drew '+got.length+' card'+(got.length===1?'':'s')+'.');return got.length;}
function finish(s:any){const defeated:{unit:any;owner:number}[]=[];
 s.players.forEach((p:any,owner:number)=>p.board.forEach((c:any,index:number)=>{if(c&&c.hp<=0){p.board[index]=null;const souls=cardRules[c.id]?.soulValue??cards[c.id].cost;s.players[1-owner].souls+=souls;s.stats[1-owner].kills++;p.graveyard ||= [];if(!cardRules[c.id]?.tokenOnly)p.graveyard.push(c.id);defeated.push({unit:c,owner});log(s,cards[c.id].name+' defeated: +'+souls+' souls.');}}));
 for(const {unit:c,owner} of defeated){const p=s.players[owner];p.turnState ||= newTurn();if(cardRules[c.id]?.deathDraw)draw(s,owner,cardRules[c.id].deathDraw!,cards[c.id].name);for(const source of living(p)){if(source.id===150&&once(source,'friendlyDeathMana')){p.mana++;log(s,'Grave Gravy: +1 mana.');}if(source.id===158&&tribe(c,'Necromancer')&&once(source,'necroDeathDraw'))draw(s,owner,1,'The Grave Rave');}if(p.land===164&&tribe(c,'Necromancer')&&!p.turnState.necroDeathMana){p.turnState.necroDeathMana=true;p.mana++;log(s,'The Moss-oleum: +1 mana.');}for(const source of living(s.players[1-owner]))if(source.id===159&&once(source,'enemyDeathMana')){s.players[1-owner].mana++;log(s,'Count Re-Scalula: +1 mana.');}}
 if(s.players[0].souls>=SOUL_TARGET)s.winner=0;else if(s.players[1].souls>=SOUL_TARGET)s.winner=1;return s;
}
function takeFallen(s:any,who:number,maxCost=Infinity,revive=false){const p=s.players[who];p.graveyard ||= [];const candidates=p.graveyard.map((id:number,index:number)=>({id,index})).filter((c:any)=>!cards[c.id].tokenOnly&&cards[c.id].cost<=maxCost).sort((a:any,b:any)=>cards[a.id].cost-cards[b.id].cost);const c=candidates[0],slot=p.board.findIndex((x:any)=>!x);if(!c||revive&&slot<0)return false;p.graveyard.splice(c.index,1);if(revive){p.board[slot]={id:c.id,hp:cards[c.id].hp,maxHp:cards[c.id].hp,hidden:!!cards[c.id].startsHidden,used:true,bonusAttack:0,tempAttack:0,flags:{}};s.stats[who].summons++;}else p.hand.push(c.id);log(s,cards[c.id].name+(revive?' revived without summon abilities.':' returned from the graveyard.'));return true;
}
function heal(s:any,who:number,targets:any[],n:number,source:string){let total=0;for(const c of targets){if(!c||c.hp<=0)continue;const healed=Math.min(n,Math.max(0,maxHealth(c)-c.hp));c.hp+=healed;total+=healed;}if(total){const p=s.players[who];p.turnState ||= newTurn();p.turnState.heals=(p.turnState.heals||0)+1;if(cardRules[p.land]?.landHealMana&&p.turnState.heals===1){p.mana++;log(s,cards[p.land].name+': +1 healing mana.');}log(s,source+': restored '+total+' health.');for(const c of living(s.players[who])){if([45,75,83].includes(c.id)&&once(c,'healDraw'))draw(s,who,1,cards[c.id].name);if(cardRules[c.id]?.healDraw&&once(c,'setHealDraw'))draw(s,who,cardRules[c.id].healDraw!,cards[c.id].name);if(cardRules[c.id]?.healAttackGroup&&once(c,'setHealPower'))for(const ally of living(s.players[who]))if(member(ally,cardRules[c.id].healAttackGroup!))ally.bonusAttack=(ally.bonusAttack||0)+1;if(c.id===71&&once(c,'healPower')){for(const ally of living(s.players[who]))if(tribe(ally,'Gourmet'))ally.bonusAttack=(ally.bonusAttack||0)+1;log(s,'Marmalade Medic: Gourmet team gained +1 attack.');}}}return total;}
function grow(s:any,who:number,targets:any[],n:number,source:string){for(const c of targets)c.maxHp=maxHealth(c)+n;heal(s,who,targets,n,source);}
function ping(s:any,who:number,n:number,source:string){const targets=living(s.players[1-who]).filter((c:any)=>!c.hidden);for(const c of targets)c.hp-=n;if(targets.length)log(s,source+': '+n+' damage to each visible enemy.');finish(s);}
function reveal(s:any,who:number,c:any){if(!c?.hidden)return;c.hidden=false;const p=s.players[who];p.turnState ||= newTurn();p.turnState.reveals=(p.turnState.reveals||0)+1;if(cardRules[p.land]?.landRevealMana&&p.turnState.reveals===1){p.mana++;log(s,cards[p.land].name+': +1 reveal mana.');}log(s,cards[c.id].name+' revealed.');if(!once(c,'reveal'))return;
 if(cardRules[c.id]?.revealMana){s.players[who].mana+=cardRules[c.id].revealMana!;log(s,cards[c.id].name+': +'+cardRules[c.id].revealMana+' reveal mana.');}if(tagged(c,'Masquerade'))for(const source of living(s.players[who])){const rule=cardRules[source.id];if(rule?.revealDraw&&once(source,'setRevealDraw'))draw(s,who,rule.revealDraw,cards[source.id].name);if(rule?.revealAttackGroup&&once(source,'setRevealAttack'))for(const ally of living(s.players[who]))if(member(ally,rule.revealAttackGroup))ally.tempAttack=(ally.tempAttack||0)+2;}
 if([3,62].includes(c.id))draw(s,who,1,cards[c.id].name);
 if(c.id===22)c.tempAttack=(c.tempAttack||0)+2;
 if(c.id===56)ping(s,who,1,'Velvet Vanisher');if(c.id===80){s.players[who].mana++;log(s,'Velcro Voyager: +1 reveal mana.');}
 if(tribe(c,'Trickster'))for(const source of living(s.players[who])){if(source.id===24&&once(source,'revealMana')){s.players[who].mana++;log(s,'Captain Camo: +1 mana from a reveal.');}if(source.id===70&&once(source,'revealDraw'))draw(s,who,1,'Lantern Lurker');if(source.id===84&&once(source,'revealPower'))for(const ally of living(s.players[who]))if(tribe(ally,'Trickster'))ally.tempAttack=(ally.tempAttack||0)+1;}
}
function conceal(s:any,who:number,c:any){const p=s.players[who];p.turnState.hides++;c.hidden=true;c.used=true;log(s,cards[c.id].name+' hid.');for(const source of living(p))if(source.id===19&&once(source,'hideDraw'))draw(s,who,1,'Hat Camo');}
function startTurn(s:any,who:number){const p=s.players[who],wasHidden=new Set(living(p).filter((c:any)=>c.hidden));p.turnState=newTurn();p.mana+=1;log(s,'Turn mana: +1. Unspent mana carries over.');for(const c of living(p)){c.used=false;c.flags={};c.tempAttack=0;}draw(s,who,1,'Turn draw');const baselineHand=p.hand.length;
 for(const c of [...wasHidden]){if(s.winner!==null)return;reveal(s,who,c);}
 if(s.winner!==null)return;
 const land=cardRules[p.land];if(land?.landTurnManaGroup&&living(p).some((c:any)=>member(c,land.landTurnManaGroup!))){p.mana++;log(s,cards[p.land].name+': +1 turn mana.');}if(land?.landHealGroup)heal(s,who,living(p).filter((c:any)=>member(c,land.landHealGroup!)),1,cards[p.land].name);
 for(const c of living(p)){const r=cardRules[c.id];if(r?.startHeal)heal(s,who,r.startHeal==='self'?[c]:living(p).filter((x:any)=>member(x,r.startHeal!)),r.startHealAmount||1,cards[c.id].name);if(r?.startMana&&(r.startManaCondition==='always'||r.startManaCondition==='graveyard'&&p.graveyard?.length>0||r.startManaCondition==='hidden'&&wasHidden.has(c)||r.startManaCondition==='land'&&p.land>=0||['Vehicle','Gourmet'].includes(r.startManaCondition||'')&&living(p).some((x:any)=>x!==c&&member(x,r.startManaCondition!))||!r.startManaCondition&&living(p).filter((x:any)=>x!==c&&tribe(x,'Clockwork')).length>=2)){p.mana+=r.startMana;log(s,cards[c.id].name+': +'+r.startMana+' mana.');}}
 for(const c of living(p)){const r=cardRules[c.id];if(!r?.startDraw)continue;const condition=r.drawCondition;const yes=!condition||condition==='graveyard'&&p.graveyard?.length>0||condition==='harvester'&&living(p).some((x:any)=>x!==c&&canHarvest(x.id))||condition==='spell'&&(p.lastTurnSpells||0)>0||condition==='hidden'&&wasHidden.has(c)||condition==='land'&&p.land>=0||condition==='hand3'&&baselineHand<=3||condition==='hand4'&&baselineHand<=4||['Clockwork','Trickster'].includes(condition||'')&&living(p).some((x:any)=>x!==c&&tribe(x,condition!));if(yes)draw(s,who,r.startDraw,cards[c.id].name);}
}
export function battle(deck:number[],opponent:number[],bot=true){const side=(d:number[])=>({souls:0,mana:1,hand:[] as number[],pile:shuffle(d),board:Array(5).fill(null),graveyard:[] as number[],land:-1,turnState:newTurn(),lastTurnSpells:0});const s:any={rulesVersion:2,balanceVersion:BALANCE_VERSION,players:[side(deck),side(opponent)],turn:0,round:1,log:['First to '+SOUL_TARGET+' souls wins. Build a combo!'],winner:null,bot,nextBotAt:0,statsDay:new Date().toISOString().slice(0,10),stats:[{summons:0,attacks:0,kills:0},{summons:0,attacks:0,kills:0}]};s.players[1].mana=0;s.players.forEach((p:any)=>p.hand=p.pile.splice(0,5));return s;}
function resolveAttack(s:any,who:number,index:number,targetIndex:number,bonus=0){const p=s.players[who],e=s.players[1-who],c=p.board[index],target=e.board[targetIndex];if(!c||!target||target.hidden)return;const damage=Math.max(1,unitAttack(s,who,index)+(c.id===21&&target.hp>=5?2:0)+bonus-unitArmor(s,1-who,targetIndex));c.used=true;s.stats[who].attacks++;target.hp-=damage;log(s,cards[c.id].name+' attacks '+cards[target.id].name+' for '+damage+'.');finish(s);
  if(s.winner===null){if(c.id===40)heal(s,who,[c],2,'Count Camo-cula');if(tribe(c,'Trickster')&&++p.turnState.tricksterAttacks===1)for(const source of living(p)){if(source.id===65&&once(source,'attackDraw'))draw(s,who,2,'The Unlickable');if(source.id===80&&once(source,'attackHeal'))heal(s,who,living(p).filter((x:any)=>tribe(x,'Trickster')),1,'Velcro Voyager');}if(tribe(c,'Showtime')&&++p.turnState.showtimeAttacks===1)for(const source of living(p)){if(source.id===69&&once(source,'attackMana')){p.mana++;log(s,'Encore Iguana: +1 attack mana.');}if(source.id===76&&once(source,'attackDraw'))draw(s,who,1,'Baron Backstage');}if(tribe(c,'Gourmet')&&++p.turnState.gourmetAttacks===1)for(const source of living(p))if(source.id===78&&once(source,'attackHeal'))heal(s,who,[c],2,'Cocoa Corsair');}

}
export function expireDrawing(s:any,now=Date.now()){if(!s.drawing||now<s.drawing.deadline)return false;const d=s.drawing;delete s.drawing;log(s,'Drawing time expired: no bonus damage.');resolveAttack(s,d.who,d.index,d.target,0);return true;}
export function act(s:any,who:number,a:any,now=Date.now()){
 if(s.balanceVersion!==BALANCE_VERSION)throw Error('Cards were rebalanced. Start a new match.');
 if(s.winner!==null||s.turn!==who)throw Error('Wait for your turn.');
 if(s.statsDay!==new Date().toISOString().slice(0,10)){s.statsDay=new Date().toISOString().slice(0,10);s.stats=null;}s.stats ||= [{summons:0,attacks:0,kills:0},{summons:0,attacks:0,kills:0}];
 const p=s.players[who],e=s.players[1-who];p.turnState ||= newTurn();p.turnState.showtimeAttacks ??= 0;p.turnState.gourmetAttacks ??= 0;const slot=(i:any)=>Number.isInteger(i)&&i>=0&&i<5;const pay=(n:number)=>{if(p.mana<n)throw Error('Not enough mana.');p.mana-=n;};
 if(s.drawing){if(a.kind!=='drawSubmit'||s.drawing.who!==who)throw Error('Finish your drawing attack first.');const d=s.drawing;const score=now<=d.deadline?drawingScore(a.strokes):0;delete s.drawing;const bonus=Math.round(score*6);log(s,'Pablo Picamasso: '+Math.round(score*100)+'% outline accuracy, +'+bonus+' damage.');resolveAttack(s,who,d.index,d.target,bonus);return finish(s);}
 if(a.kind==='play'){
  const id=p.hand[a.index],card=cards[id],r=cardRules[id];if(!card)throw Error('Choose a card.');const square=a.slot===undefined?p.board.findIndex((x:any)=>!x):a.slot;
  if(card.type==='camo'&&(!slot(square)||p.board[square]))throw Error('Choose an empty square.');if(requiresEnemyTarget(id)&&(!slot(a.target)||!e.board[a.target]||e.board[a.target].hidden))throw Error('Choose a visible enemy first.');
  if(id===110&&(!slot(a.target)||!slot(a.otherTarget)||a.target===a.otherTarget||!e.board[a.target]||!e.board[a.otherTarget]||e.board[a.target].hidden||e.board[a.otherTarget].hidden))throw Error('Choose two different visible enemy camos to swap.');
  const extra=r?.ray?(a.extraMana??0):0;if(r?.ray&&(!Number.isSafeInteger(extra)||extra<0||extra>p.mana-cardCost(s,who,id)))throw Error('Choose an affordable amount of extra mana.');pay(cardCost(s,who,id)+extra);p.hand.splice(a.index,1);log(s,card.name+' played.');
  if(card.type==='camo'){
   const previous=living(p);const c:any={id,hp:card.hp,maxHp:card.hp,hidden:!!r?.startsHidden,used:false,bonusAttack:extra,tempAttack:0,flags:{}};p.board[square]=c;s.stats[who].summons++;if(card.tribe)p.turnState.tribes[card.tribe]=(p.turnState.tribes[card.tribe]||0)+1;
   if(r?.summonMana){p.mana+=r.summonMana;log(s,card.name+': +'+r.summonMana+' mana.');}if(r?.summonDraw)draw(s,who,r.summonDraw,card.name);
   if(r?.returnFallen)takeFallen(s,who);if(r?.reviveCost!==undefined)takeFallen(s,who,r.reviveCost,true);if(r?.summonBreads){for(let n=0;n<2;n++){const empty=p.board.findIndex((x:any)=>!x);if(empty<0)break;p.board[empty]={id:148,hp:1,maxHp:1,hidden:false,used:false,bonusAttack:0,tempAttack:0,flags:{}};s.stats[who].summons++;log(s,'Nino spawned Bread.');}}
   if(id===7)for(const x of previous)if(tagged(x,'Vehicle'))x.tempAttack=(x.tempAttack||0)+1;
   if(id===20&&previous.some((x:any)=>tagged(x,'Vehicle')))c.tempAttack++;
   if(id===30)grow(s,who,previous.filter((x:any)=>tribe(x,'Gourmet')),1,card.name);
   if(id===35)grow(s,who,previous.filter((x:any)=>tagged(x,'Vehicle')),2,card.name);
   if(id===41)heal(s,who,living(p).filter((x:any)=>tribe(x,'Gourmet')),2,card.name);
   if(id===53)ping(s,who,1,card.name);
   for(const source of previous){if(s.winner!==null)break;if(tribe(c,'Gourmet')){if(source.id===1&&once(source,'gourmetAttack'))source.bonusAttack=(source.bonusAttack||0)+1;if(source.id===83&&once(source,'gourmetBuff')){c.bonusAttack++;log(s,'Marquis Macaron: summoned Gourmet gained +1 attack.');}if(source.id===25&&once(source,'gourmetDraw')){heal(s,who,living(p).filter((x:any)=>tribe(x,'Gourmet')),1,'Chef Kiss');draw(s,who,1,'Chef Kiss');}}if(tribe(c,'Clockwork')&&source.id===81&&once(source,'clockworkDraw'))draw(s,who,1,'Turbo Terrarium');if(tribe(c,'Clockwork')&&source.id===17&&once(source,'clockworkMana')){p.mana++;log(s,'Clockwork Chomp: +1 mana.');}if(tribe(c,'Showtime')){if(source.id===73&&once(source,'showGrowth'))grow(s,who,[c],1,'Standing Ovation');if(source.id===28&&once(source,'showDraw'))draw(s,who,1,'DJ Stickyfeet');if(source.id===61&&once(source,'showMana')){p.mana++;log(s,'Mantis Maestro: +1 mana.');}}}
  }else if(card.type==='land'){
   p.land=id;p.turnState.lands++;if(p.turnState.lands===1)for(const c of living(p)){if(c.id===15)grow(s,who,[c],1,'Pocket Pickle');if(c.id===66)draw(s,who,1,'Fern Accountant');if(c.id===58){p.mana++;log(s,'The Last Airbrancher: +1 mana from a land.');}}
  }else{
   p.turnState.spells++;if(id===110){[e.board[a.target],e.board[a.otherTarget]]=[e.board[a.otherTarget],e.board[a.target]];log(s,'Branch Switcheroo: enemy camos swapped squares.');}else if(id===10)p.mana+=2;else if(id===11)e.board[a.target].hp-=3;else if(id===12)heal(s,who,living(p),3,'Morning Dew');else if(id===13)draw(s,who,2,'New Skin, Who Dis?');
   const allies=(group:string)=>living(p).filter((c:any)=>member(c,group));
   if(r?.necroSpell==='return')takeFallen(s,who);if(r?.necroSpell==='rattle'){for(const c of allies('Necromancer'))c.tempAttack=(c.tempAttack||0)+2;if(p.graveyard?.length)draw(s,who,1,card.name);}
   switch(r?.spell){
    case 'roots':grow(s,who,allies('Canopy'),1,card.name);if(allies('Canopy').length>=2)draw(s,who,1,card.name);break;
    case 'refill':draw(s,who,1,card.name);p.mana+=Math.min(2,allies('Canopy').length);break;
    case 'bolt':e.board[a.target].hp-=allies('Vehicle').length?5:3;break;
    case 'parts':heal(s,who,allies('Clockwork'),3,card.name);if(allies('Vehicle').length)draw(s,who,1,card.name);break;
    case 'vanish':{const targets=allies('Trickster').filter((c:any)=>!c.hidden);for(const c of targets)conceal(s,who,c);if(targets.length)draw(s,who,1,card.name);break;}
    case 'curtain':{const targets=allies('Trickster').filter((c:any)=>c.hidden);for(const c of targets){reveal(s,who,c);c.tempAttack=(c.tempAttack||0)+1;if(s.winner!==null)break;}if(targets.length&&s.winner===null)draw(s,who,1,card.name);break;}
    case 'encore':for(const c of allies('Showtime'))c.tempAttack=(c.tempAttack||0)+2;if(allies('Showtime').length>=2)draw(s,who,1,card.name);break;
    case 'spotlight':e.board[a.target].hp-=2+Math.min(3,allies('Showtime').length);break;
    case 'soup':if(heal(s,who,allies('Gourmet'),3,card.name))draw(s,who,1,card.name);break;
    case 'finale':if(heal(s,who,living(p),2,card.name))for(const c of allies('Gourmet'))c.bonusAttack=(c.bonusAttack||0)+1;break;
   }finish(s);
   if(s.winner===null&&p.turnState.spells===1&&cardRules[p.land]?.landSpellDrawGroup&&allies(cardRules[p.land].landSpellDrawGroup!).length)draw(s,who,1,cards[p.land].name);
   if(p.turnState.spells===1)for(const c of living(p)){if(s.winner!==null)break;if(c.id===38)heal(s,who,living(p).filter((x:any)=>tribe(x,'Gourmet')),2,'Sushi Roll Model');if(c.id===52)draw(s,who,1,'Lizard of Oz');if(c.id===54)grow(s,who,living(p).filter((x:any)=>tribe(x,'Trickster')),1,'Origami Overlord');if([33,64].includes(c.id))for(const x of living(p))if(tribe(x,'Showtime'))x.tempAttack=(x.tempAttack||0)+(c.id===64?2:1);if(c.id===43)ping(s,who,1,'Camo-nado');if(c.id===79){for(const ally of living(p))if(tribe(ally,'Showtime'))ally.tempAttack=(ally.tempAttack||0)+1;heal(s,who,living(p).filter((x:any)=>tribe(x,'Showtime')),1,'Neon Noodle');}if(c.id===85)heal(s,who,living(p).filter((x:any)=>tribe(x,'Showtime')),2,'Obsidian Orchestra');}
  }
 }else if(a.kind==='awakenCheese'){
  const c=p.board[a.index];if(!slot(a.index)||c?.id!==145)throw Error('Choose your Cheeseball.');c.id=146;c.hp=5;c.maxHp=5;c.bonusAttack=0;c.tempAttack=0;s.cheeseTransforms ||= [false,false];s.cheeseTransforms[who]=true;p.hand=p.hand.map((id:number)=>id===145?146:id);p.pile=p.pile.map((id:number)=>id===145?146:id);p.graveyard=(p.graveyard||[]).map((id:number)=>id===145?146:id);log(s,'Cheeseball awakened permanently into Cheezy!');
 }else if(a.kind==='move'){
  if(!slot(a.index)||!slot(a.slot)||!p.board[a.index]||p.board[a.slot])throw Error('Move to an empty square.');p.board[a.slot]=p.board[a.index];p.board[a.index]=null;
 }else if(a.kind==='hide'){
  const c=p.board[a.index];if(!slot(a.index)||!c)throw Error('Choose a chameleon.');if(c.hidden)reveal(s,who,c);else{pay(hideCost(s,who));conceal(s,who,c);}
 }else if(a.kind==='harvest'){
  const c=p.board[a.index];if(!slot(a.index)||!c||!canHarvest(c.id))throw Error('Only camos with Harvest can generate mana.');if(c.used)throw Error('This camo already acted.');c.used=true;p.turnState.harvests++;const gain=harvestAmount(c.id,s,who,a.index);p.mana+=gain;p.turnState.harvestTribes ||= {};const harvestTribe=cards[c.id].tribe;if(harvestTribe)p.turnState.harvestTribes[harvestTribe]=(p.turnState.harvestTribes[harvestTribe]||0)+1;const land=cardRules[p.land];if(land?.landHarvestGroup&&member(c,land.landHarvestGroup)&&p.turnState.harvestTribes[land.landHarvestGroup]===1){p.mana++;log(s,cards[p.land].name+': +1 Harvest mana.');}log(s,cards[c.id].name+': harvested '+gain+' mana.');if(cardRules[c.id]?.harvestHealSelf)heal(s,who,[c],cardRules[c.id].harvestHealSelf!,cards[c.id].name);
  if(p.turnState.harvests===1)for(const source of living(p)){if(s.winner!==null)break;const rule=cardRules[source.id];if(rule?.harvestDraw&&once(source,'setHarvestDraw'))draw(s,who,rule.harvestDraw,cards[source.id].name);if(rule?.harvestGrowGroup&&once(source,'setHarvestGrow'))grow(s,who,living(p).filter((x:any)=>x!==source&&member(x,rule.harvestGrowGroup!)),1,cards[source.id].name);if(source.id===16&&once(source,'harvestDraw')&&living(p).some((x:any)=>x!==source&&tribe(x,'Gourmet')))draw(s,who,1,'Jellybean Juggler');if(source.id===44&&once(source,'harvestHeal'))heal(s,who,living(p).filter((x:any)=>tribe(x,'Canopy')),1,'Grandpa Grip');if(source.id===57&&once(source,'harvestMana')){p.mana++;log(s,'Sir Scales-a-Billion: +1 Harvest mana.');}if(source.id===63&&once(source,'harvestPing'))ping(s,who,1,'Thunderbranch Titan');if(source.id===77&&once(source,'harvestDraw'))draw(s,who,1,'Chrono-Chameleon');if(source.id===82&&once(source,'harvestGrow'))grow(s,who,living(p).filter((x:any)=>x!==source&&tribe(x,'Canopy')),1,'Celestial Salad');}
 }else if(a.kind==='attack'){
  const c=p.board[a.index],target=e.board[a.target];if(s.round<=2)throw Error('Camos cannot attack on either player\'s first turn.');if(!canAttack(s,who,a.index))throw Error('This camo cannot attack: it needs positive attack and an unused visible action.');if(!slot(a.target)||!target||target.hidden)throw Error('Choose a visible enemy camo.');
  if(c.id===111){c.used=true;s.drawing={who,index:a.index,target:a.target,startedAt:now,deadline:now+10_000};log(s,'Pablo Picamasso: 10 seconds to trace a camo!');}else resolveAttack(s,who,a.index,a.target);
 }else if(a.kind==='end'){
  const bonus=endTurnSoulBonus(s,who);if(bonus){p.souls+=bonus;log(s,'Ready attacker with no visible enemies: +'+bonus+' souls.');}finish(s);if(s.winner!==null)return s;
  p.lastTurnSpells=p.turnState.spells;for(const c of living(p))c.tempAttack=0;s.turn=1-who;s.round++;startTurn(s,1-who);
 }else throw Error('Unknown action.');
 return finish(s);
}
export function botStep(s:any){if(s.turn!==1||s.winner!==null)return s;const p=s.players[1],e=s.players[0];if(s.drawing)return act(s,1,{kind:'drawSubmit',strokes:camoOutline.map(stroke=>stroke.map(([x,y])=>[Math.min(100,x+2),y]))});
 for(let i=0;i<p.hand.length;i++){const id=p.hand[i],c=cards[id];if(cardCost(s,1,id)>p.mana||c.type==='camo'&&!p.board.some((x:any)=>!x))continue;const visible=e.board.map((x:any,j:number)=>x&&!x.hidden?j:-1).filter((j:number)=>j>=0),target=visible[0]??-1;if(id===110&&visible.length<2)continue;if(requiresEnemyTarget(id)&&target<0||id===12&&!living(p).some((x:any)=>x.hp<maxHealth(x)))continue;return act(s,1,{kind:'play',index:i,target,otherTarget:visible[1]});}
 for(let i=0;i<5;i++){const c=p.board[i];if(!c||c.used)continue;if(canHarvest(c.id)&&(unitAttack(s,1,i)===0||p.hand.some((id:number)=>cardCost(s,1,id)>p.mana)))return act(s,1,{kind:'harvest',index:i});const targets=e.board.map((x:any,j:number)=>({x,j})).filter(({x}:any)=>x&&!x.hidden).sort((a:any,b:any)=>(a.x.hp<=attackDamage(s,1,i,a.j)?-100:0)+a.x.hp-((b.x.hp<=attackDamage(s,1,i,b.j)?-100:0)+b.x.hp));if(targets.length){if(c.hidden&&s.round>2&&unitAttack(s,1,i)>0)return act(s,1,{kind:'hide',index:i});if(canAttack(s,1,i))return act(s,1,{kind:'attack',index:i,target:targets[0].j});}}
 return act(s,1,{kind:'end'});
}

