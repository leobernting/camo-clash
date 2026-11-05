export const questDefinitions=[
 {id:'summons',title:'Populate the canopy',description:'Summon 5 chameleons in matches.',goal:5,coins:30,packs:0},
 {id:'attacks',title:'Make your move',description:'Attack enemy chameleons 5 times.',goal:5,coins:20,packs:1},
 {id:'kills',title:'Soul hunter',description:'Defeat 3 enemy chameleons.',goal:3,coins:50,packs:0},
 {id:'wins',title:'Crown of the canopy',description:'Win a match against a bot or player.',goal:1,coins:30,packs:1}
];
export function dailyQuests(p:any,now=Date.now()){const day=new Date(now).toISOString().slice(0,10);if(p.quests?.day!==day)p.quests={day,progress:{},claimed:[],sources:{}};return p.quests;}
export function syncQuests(p:any,room:string,state:any,who:number,now=Date.now()){
 const q=dailyQuests(p,now);if(state.statsDay&&state.statsDay!==q.day)return false;const stats=state.stats?.[who]||{};const prior=q.sources[room]||{};let changed=false;
 for(const quest of questDefinitions){const value=quest.id==='wins'?(state.winner===who?1:0):(stats[quest.id]||0);const old=prior[quest.id]||0;if(value>old){q.progress[quest.id]=Math.min(quest.goal,(q.progress[quest.id]||0)+value-old);changed=true;}prior[quest.id]=value;}
 q.sources[room]=prior;return changed;
}
export function claimQuest(p:any,id:string,now=Date.now()){const q=dailyQuests(p,now),quest=questDefinitions.find(x=>x.id===id);if(!quest||(q.progress[id]||0)<quest.goal)throw Error('Complete this quest in matches first.');if(q.claimed.includes(id))throw Error('Reward already claimed today.');q.claimed.push(id);p.coins+=quest.coins;p.packTokens=(p.packTokens||0)+quest.packs;return quest;}
