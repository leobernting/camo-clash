import {cards} from './game.ts';
export function ensureDecks(p:any){
 if(!Array.isArray(p.decks)||!p.decks.length){p.decks=[{id:'original',name:'Canopy crew',cards:[...(p.deck||[])]}];p.activeDeckId='original';}
 let active=p.decks.find((d:any)=>d.id===p.activeDeckId);
 if(!active){active=p.decks[0];p.activeDeckId=active.id;p.deck=[...active.cards];}
 active.cards=[...p.deck];return active;
}
export function deckAction(p:any,a:any){
 const active=ensureDecks(p),find=()=>{const d=p.decks.find((d:any)=>d.id===a.id);if(!d)throw Error('Deck not found.');return d;};
 const name=()=>{if(typeof a.name!=='string'||!a.name.trim()||a.name.trim().length>32)throw Error('Use a deck name between 1 and 32 characters.');return a.name.trim();};
 if(a.kind==='deckCreate'||a.kind==='deckDuplicate'){
  if(p.decks.length>=20)throw Error('You can save up to 20 decks.');
  const d={id:crypto.randomUUID(),name:name(),cards:a.kind==='deckDuplicate'?[...find().cards]:[]};p.decks.push(d);p.activeDeckId=d.id;p.deck=[...d.cards];
 }else if(a.kind==='deckSelect'){const d=find();p.activeDeckId=d.id;p.deck=[...d.cards];}
 else if(a.kind==='deckRename')find().name=name();
 else if(a.kind==='deckDelete'){
  if(p.decks.length===1)throw Error('Keep at least one deck.');const d=find();p.decks=p.decks.filter((n:any)=>n.id!==d.id);
  if(d.id===active.id){p.activeDeckId=p.decks[0].id;p.deck=[...p.decks[0].cards];}
 }else throw Error('Unknown deck action.');
}
export function saveDeck(p:any,list:any){
 if(!Array.isArray(list)||list.length!==40)throw Error('A deck needs exactly 40 cards.');
 if(list.some((id:any)=>!Number.isInteger(id)||!cards[id]||cards[id].tokenOnly||list.filter((n:number)=>n===id).length>Math.min(3,p.owned?.[id]||0)))throw Error('Maximum three copies per card, limited to copies you own.');
 const active=ensureDecks(p);p.deck=[...list];active.cards=[...list];
}
