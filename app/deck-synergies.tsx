import {cards,canHarvest} from './game';
import {tribes} from './card-rules';
const recipes=[
 {tribe:'Gourmet',ids:[26,25,45],text:'Banana Bandit hits for 4 beside another Gourmet. Chef Kiss draws on Gourmet summons; Bubble Trouble draws when healing restores health.'},
 {tribe:'Trickster',ids:[34,19,24],text:'Hide Camo-dini to draw next turn. Hat Camo draws when you hide; Captain Camo turns a reveal into mana.'},
 {tribe:'Clockwork',ids:[46,17,63],text:'Professor Tonguestein draws every turn. Clockwork Chomp supplies Harvest mana, which triggers Thunderbranch Titan’s damage.'},
 {tribe:'Showtime',ids:[28,61,64],text:'DJ Stickyfeet draws and Mantis Maestro gives mana when another Showtime joins. Cast a spell with Disco Inferno for a team attack burst.'},
 {tribe:'Canopy',ids:[6,0,32],text:'Sprout Scout supplies Harvest, enabling Petal Peeper’s turn-start draw. Camo-saurus Rex boosts your other Canopy attackers.'}
];
export default function DeckSynergies({deck}:any){const counts=Object.fromEntries(tribes.map(t=>[t,deck.filter((id:number)=>cards[id].tribe===t).length]));const engines=Array.from(new Set<number>(deck)).filter(id=>cards[id].startDraw);const draws=engines.reduce((n,id)=>n+deck.filter((x:number)=>x===id).length,0);const harvesters=deck.filter((id:number)=>canHarvest(id)).length;
 return <div className="decksynergies"><div className="tribecounts">{tribes.filter(t=>counts[t]>0).map(t=><span key={t} className={'tribe-'+t.toLowerCase()}>{t} <b>{counts[t]}</b></span>)}</div><div className="enginecounts"><b>{draws} turn-start draw engines</b><span>{harvesters} Harvest cards</span></div><details><summary>See synergies and draw engines</summary>{engines.length>0&&<div className="enginenames">{engines.map(id=><span key={id}>{cards[id].name} ×{deck.filter((x:number)=>x===id).length}</span>)}</div>}{[...recipes].sort((a,b)=>counts[b.tribe]-counts[a.tribe]).map(recipe=><div className="deckrecipe" key={recipe.tribe}><b>{recipe.tribe} combo</b><p>{recipe.text}</p><div>{recipe.ids.map(id=><span key={id} className={deck.includes(id)?'recipepresent':''}>{deck.includes(id)?'✓ ':''}{cards[id].name}</span>)}</div></div>)}</details></div>;
}
