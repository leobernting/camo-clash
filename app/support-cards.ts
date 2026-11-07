export type SupportRule={spell?:string;targetEnemy?:boolean;landAttackGroup?:string;landAttack?:number;landArmorGroup?:string;landArmor?:number;landTurnManaGroup?:string;landHealGroup?:string;landHealMana?:boolean;landHarvestGroup?:string;landRevealMana?:boolean;landHideDiscount?:boolean;landSpellDrawGroup?:string};
export const supportCards=[
 ['Rooting for You',2,0,0,'uncommon','spell','','#88af72'],
 ['Rainforest Refill',2,0,0,'rare','spell','','#81b6a3'],
 ['Bolt from the Blue',3,0,0,'rare','spell','','#8da9c1'],
 ['Spare Parts Party',2,0,0,'uncommon','spell','','#b1ac81'],
 ['Now You See Soup',2,0,0,'uncommon','spell','','#aa96ba'],
 ['Curtain Call',2,0,0,'rare','spell','','#9587b7'],
 ['Encore, Encore!',2,0,0,'uncommon','spell','','#d1a1b8'],
 ['Spotlight Swipe',3,0,0,'rare','spell','','#c6b16e'],
 ['Soup-er Recovery',2,0,0,'uncommon','spell','','#b9bd82'],
 ['Full Belly Finale',3,0,0,'epic','spell','','#d4aa7e'],
 ['Dewdrop Orchard',2,0,0,'rare','land','','#86b17b'],
 ['Socket & Vine Station',3,0,0,'rare','land','','#89a6a9'],
 ['Peekaboo Pavilion',2,0,0,'rare','land','','#a493bc'],
 ['The Main Branch',3,0,0,'epic','land','','#c2a281'],
 ['Bottomless Brunch Grove',3,0,0,'rare','land','','#b6aa7c']
];
export const supportRules:Record<number,SupportRule&{set:string;tribe:string;text:string;tags?:string[]}>= {
 129:{set:'core',tribe:'Canopy',spell:'roots',text:'Your Canopy camos gain +1 maximum health and heal 1. Draw 1 if you control at least 2 Canopy camos.'},
 130:{set:'core',tribe:'Canopy',spell:'refill',text:'Draw 1 card. Gain 1 mana for each friendly Canopy camo, up to 2 mana.'},
 131:{set:'junction',tribe:'Clockwork',tags:['Junction'],spell:'bolt',targetEnemy:true,text:'Deal 3 damage to a visible enemy camo, or 5 if you control a Vehicle.'},
 132:{set:'junction',tribe:'Clockwork',tags:['Junction'],spell:'parts',text:'Heal your Clockwork camos by 3. Draw 1 if you control a Vehicle.'},
 133:{set:'masquerade',tribe:'Trickster',tags:['Masquerade'],spell:'vanish',text:'Hide your visible Tricksters, using their actions. Draw 1 if at least one hid. Triggers hide abilities.'},
 134:{set:'masquerade',tribe:'Trickster',tags:['Masquerade'],spell:'curtain',text:'Reveal your hidden Tricksters without refreshing their actions. They gain +1 attack this turn. Draw 1 if any revealed. Triggers reveal abilities.'},
 135:{set:'core',tribe:'Showtime',spell:'encore',text:'Your Showtime camos gain +2 attack this turn. Draw 1 if you control at least 2 Showtime camos.'},
 136:{set:'core',tribe:'Showtime',spell:'spotlight',targetEnemy:true,text:'Deal 2 damage to a visible enemy camo, plus 1 for each friendly Showtime camo (maximum 5 damage).'},
 137:{set:'snack',tribe:'Gourmet',tags:['Snack'],spell:'soup',text:'Heal your Gourmet camos by 3. Draw 1 if any health was actually restored. Triggers healing abilities.'},
 138:{set:'snack',tribe:'Gourmet',tags:['Snack'],spell:'finale',text:'Heal all your camos by 2. If any health was restored, your Gourmets gain +1 attack permanently.'},
 139:{set:'core',tribe:'Canopy',landHarvestGroup:'Canopy',text:'Land: your first Canopy Harvest each turn generates 1 extra mana. Replaces your previous land.'},
 140:{set:'junction',tribe:'Clockwork',tags:['Junction'],landTurnManaGroup:'Clockwork',landArmor:1,landArmorGroup:'Vehicle',text:'Land: your Vehicles have Armor 1. Start of your turn: gain 1 mana if you control a Clockwork camo. Replaces your previous land.'},
 141:{set:'masquerade',tribe:'Trickster',tags:['Masquerade'],landHideDiscount:true,landRevealMana:true,text:'Land: your first hide each turn costs 0 while you control a Trickster. Your first reveal each turn grants 1 mana. Replaces your previous land.'},
 142:{set:'core',tribe:'Showtime',landAttack:1,landAttackGroup:'Showtime',landSpellDrawGroup:'Showtime',text:'Land: your Showtime camos have +1 attack. Your first spell each turn draws 1 if you control a Showtime camo. Replaces your previous land.'},
 143:{set:'snack',tribe:'Gourmet',tags:['Snack'],landHealGroup:'Gourmet',landHealMana:true,text:'Land: start of your turn, heal your Gourmets by 1. The first time you actually restore health each turn, gain 1 mana. Replaces your previous land.'}
};
