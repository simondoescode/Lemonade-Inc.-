/** Squeeze Street — original, deterministic tycoon simulation. MIT licensed. */
export const VERSION = 1;
export const STORAGE_KEY = 'squeeze-street-save-v1';
export const STOCK_ITEMS = ['lemons','sugar','ice','cups'];
export const BUNDLES = {
  lemons: [{qty:12,price:4.8},{qty:24,price:7.2},{qty:48,price:9.6}],
  sugar:  [{qty:12,price:4.8},{qty:20,price:7},{qty:50,price:15}],
  ice:    [{qty:50,price:1},{qty:200,price:3},{qty:500,price:5}],
  cups:   [{qty:75,price:1},{qty:225,price:2.35},{qty:400,price:3.75}]
};
export const LOCATIONS = [
  {id:'suburbs',name:'The Suburbs',rent:0,traffic:35,tag:'Your first customers',desc:'Friendly neighbours, low foot traffic and absolutely no rent.',tone:'neighbourhood'},
  {id:'park',name:'Sunny Park',rent:3,traffic:55,tag:'Easy weekend crowds',desc:'Families, joggers and picnics make for cheerful business.',tone:'park'},
  {id:'beach',name:'The Beach',rent:8,traffic:78,tag:'Big on hot days',desc:'Sun-seekers will pay for a cold drink, if the weather holds.',tone:'beach'},
  {id:'station',name:'Train Station',rent:15,traffic:110,tag:'Fast-paced commuters',desc:'Plenty of customers, but nobody likes a long queue.',tone:'station'},
  {id:'downtown',name:'Downtown',rent:30,traffic:145,tag:'Higher prices, higher stakes',desc:'Office workers and shoppers make every minute count.',tone:'city'},
  {id:'mall',name:'Shopping Plaza',rent:50,traffic:192,tag:'The big leagues',desc:'Expensive rent, enormous crowds and fierce competition.',tone:'mall'},
];
export const UPGRADES = [
  {id:'sign',name:'Neon Sign',price:65,detail:'+18% foot traffic',effect:'traffic',value:.18,icon:'✨'},
  {id:'blender',name:'Turbo Juicer',price:115,detail:'Serve 25% faster',effect:'speed',value:.25,icon:'⚡'},
  {id:'cooler',name:'Chill Cabinet',price:150,detail:'Save 65% of overnight ice',effect:'preserve',value:.65,icon:'🧊'},
  {id:'awning',name:'Big Umbrella',price:105,detail:'Customers wait 35% longer',effect:'patience',value:.35,icon:'⛱️'},
  {id:'kiosk',name:'Deluxe Kiosk',price:350,detail:'Serve 40% faster, +12% traffic',effect:'kiosk',value:.4,icon:'🏪'},
  {id:'fridge',name:'Fresh Keeper',price:185,detail:'Keep lemons fresh overnight',effect:'fresh',value:1,icon:'🍋'},
];
export const STAFF = [
  {id:'cashier',name:'Quick Cashier',wage:12,detail:'Serve 25% faster',icon:'💳'},
  {id:'helper',name:'Mix Master',wage:19,detail:'Serve 35% faster',icon:'👩‍🍳'},
  {id:'mascot',name:'Sunny Mascot',wage:9,detail:'Customers wait 45% longer',icon:'🌞'},
];
export const NEWS = [
  {text:'A perfect day to get outside!',effect:'Park footfall surges',traffic:1.18,location:'park'},
  {text:'Street food is trending across town.',effect:'More lemonade lovers',traffic:1.13},
  {text:'Local roadworks cause minor delays.',effect:'Fewer customers today',traffic:.88},
  {text:'Neighbourhood summer fair opens!',effect:'Suburbs are buzzing',traffic:1.30,location:'suburbs'},
  {text:'Station commuters are in a hurry.',effect:'Busy train platform',traffic:1.30,location:'station'},
  {text:'A beach festival is in full swing.',effect:'Beach crowds grow',traffic:1.40,location:'beach'},
  {text:'A rival stand has opened nearby.',effect:'Customers are comparing prices',price:.90},
  {text:'Fresh lemonade wins local praise!',effect:'Customers are keen to try it',traffic:1.17},
  {text:'The city centre hosts a street market.',effect:'Downtown footfall rises',traffic:1.25,location:'downtown'},
  {text:'A quiet day around town.',effect:'Business as usual',traffic:1},
];
const SKY = ['Sunny','Partly cloudy','Cloudy','Rainy','Heatwave'];
export const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
export const money=n=>'$'+Number(n||0).toFixed(2);
export const round=n=>Math.round(n*100)/100;
export const copy=o=>JSON.parse(JSON.stringify(o));
export const locationById=id=>LOCATIONS.find(l=>l.id===id)||LOCATIONS[0];
export const upgradeById=id=>UPGRADES.find(u=>u.id===id);
export const staffById=id=>STAFF.find(s=>s.id===id);
export function rng(seed){let n=seed>>>0||1;return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return (n>>>0)/4294967296;};}
export function forecast(seed,day){
  const r=rng((seed*2654435761+day*34183)>>>0);
  const temp=Math.round(13+r()*23);
  const pick=r();
  const kind=temp>=32&&pick>.48?'Heatwave':pick<.17?'Rainy':pick<.39?'Cloudy':pick<.66?'Partly cloudy':'Sunny';
  const weatherFactor=kind==='Rainy'?.62:kind==='Cloudy'?.84:kind==='Heatwave'?1.43:kind==='Sunny'?1.16:1;
  const news=NEWS[Math.floor(r()*NEWS.length)];
  return {temp,kind,weatherFactor,news};
}
export function newGame(mode='career',seed=2026){
  const reputation=Object.fromEntries(LOCATIONS.map(l=>[l.id,42]));
  return {version:VERSION,mode:mode==='challenge'?'challenge':'career',seed,day:1,cash:40,bankAtLastClose:40,
    inventory:{lemons:0,sugar:0,ice:0,cups:0},recipe:{lemons:5,sugar:3,ice:3},price:1.5,
    advertising:0,location:'suburbs',reputation,upgrades:[],staff:[],
    history:[],lastReport:null,totalSold:0,totalRevenue:0,pendingPurchases:0,pendingCapital:0,
    finished:false};
}
export function dailyCosts(s){return round(locationById(s.location).rent+s.advertising+STAFF.filter(x=>s.staff.includes(x.id)).reduce((a,x)=>a+x.wage,0));}
export function changeRecipe(s,item,qty){
  if(!['lemons','sugar','ice'].includes(item))return {error:'Unknown ingredient'};
  const max=item==='ice'?10:12;
  if(!Number.isInteger(qty)||qty<0||qty>max)return {error:'Outside recipe range'};
  const next=copy(s);next.recipe[item]=qty;return {next};
}
export function buyStock(s,item,index){
  const b=BUNDLES[item]?.[index];if(!b)return {error:'Choose an available bundle.'};
  if(s.cash+1e-9<b.price)return {error:'Not enough cash for this bundle.'};
  const next=copy(s);next.inventory[item]+=b.qty;next.cash=round(next.cash-b.price);next.pendingPurchases=round(next.pendingPurchases+b.price);
  return {next};
}
export function chooseLocation(s,id){
  const l=LOCATIONS.find(x=>x.id===id);if(!l)return {error:'Unknown location.'};
  const next=copy(s);next.location=l.id;return {next};
}
export function setAdvertising(s,price){
  if(![0,2,5,10,20].includes(price))return {error:'Unknown campaign.'};
  const next=copy(s);next.advertising=price;return {next};
}
export function setPrice(s,price){
  if(!Number.isFinite(price)||price<.25||price>5)return {error:'Price must be between $0.25 and $5.'};
  const next=copy(s);next.price=round(Math.round(price*20)/20);return {next};
}
export function buyUpgrade(s,id){
  const u=upgradeById(id);if(!u)return {error:'Unknown upgrade.'};
  if(s.upgrades.includes(id))return {error:'You already own this upgrade.'};
  if(s.cash+1e-9<u.price)return {error:'Not enough cash for that upgrade.'};
  const next=copy(s);next.cash=round(s.cash-u.price);next.upgrades.push(id);next.pendingCapital=round(s.pendingCapital+u.price);return {next};
}
export function toggleStaff(s,id){
  if(!staffById(id))return {error:'Unknown employee.'};
  const next=copy(s);next.staff=s.staff.includes(id)?s.staff.filter(x=>x!==id):[...s.staff,id];return {next};
}
export function recipeScore(recipe,temp){
  const idealIce=temp>=29?5:temp>=23?4:temp>=17?3:2;
  const deviation=Math.abs(recipe.lemons-6)*9+Math.abs(recipe.sugar-3)*11+Math.abs(recipe.ice-idealIce)*5;
  return clamp(Math.round(98-deviation),6,98);
}
export function costEstimate(s){
  const unit={lemons:9.6/48,sugar:15/50,ice:5/500,cups:3.75/400};
  return round((s.recipe.lemons*unit.lemons+s.recipe.sugar*unit.sugar+s.recipe.ice*unit.ice)/12+unit.cups);
}
export function startValidation(s){
  if(s.finished)return 'The challenge is complete. Start a new game to play again.';
  if(dailyCosts(s)>s.cash+1e-9)return 'You need enough cash to cover rent, marketing and wages.';
  if(s.inventory.cups<=0)return 'Buy cups before opening your stand.';
  for(const i of ['lemons','sugar','ice'])if(s.recipe[i]>0&&s.inventory[i]<s.recipe[i])return `Not enough ${i} for one pitcher. Buy supplies or change your recipe.`;
  return null;
}
/** Simulate one complete day without mutation. A timeline drives the visual animation. */
export function simulateDay(state){
  const error=startValidation(state);if(error)return {error};
  const s=copy(state),day=state.day,loc=locationById(state.location),wx=forecast(s.seed,day);
  const r=rng(((s.seed+23)*783217+day*961748941)>>>0);
  const newsFactor=wx.news.location&&wx.news.location!==loc.id?1:(wx.news.traffic||1);
  const adFactor=1+Math.sqrt(s.advertising)*.17;
  const traffic=loc.traffic*wx.weatherFactor*newsFactor*adFactor*(.74+s.reputation[loc.id]/190)*(s.upgrades.includes('sign')?1.18:1)*(s.upgrades.includes('kiosk')?1.12:1);
  const visitors=clamp(Math.round(traffic*(.86+r()*.28)),8,340);
  const quality=recipeScore(s.recipe,wx.temp);
  const fairPrice=clamp((.9+(wx.temp-16)*.028)*(1+(s.reputation[loc.id]-42)/350)*(wx.news.price||1),.6,1.85);
  const priceAppeal=clamp(1.03-Math.max(0,s.price-fairPrice)*.35, .10, 1);
  const qualityAppeal=clamp(.12+quality/112,.16,.98);
  const willingness=clamp(qualityAppeal*priceAppeal*(.76+s.reputation[loc.id]/200),.06,.96);
  let service=7.6;
  if(s.upgrades.includes('blender'))service*=.75;
  if(s.upgrades.includes('kiosk'))service*=.60;
  if(s.staff.includes('cashier'))service*=.75;
  if(s.staff.includes('helper'))service*=.65;
  let patience=17;
  if(s.upgrades.includes('awning'))patience*=1.35;
  if(s.staff.includes('mascot'))patience*=1.45;
  const timeline=[];
  let sold=0,walked=0,notInterested=0,stockouts=0,queueWalks=0,remaining=0,nextAvailable=0,pitchers=0;
  for(let k=0;k<visitors;k++){
    const at=(k+r()*.7)/visitors*480;
    if(r()>willingness){notInterested++;timeline.push({type:'pass',at});continue;}
    const servedAt=Math.max(at,nextAvailable);
    if(servedAt-at>patience){walked++;queueWalks++;timeline.push({type:'queue',at});continue;}
    if(s.inventory.cups<=0){walked++;stockouts++;timeline.push({type:'stockout',at});continue;}
    if(remaining===0){
      if(['lemons','sugar','ice'].some(i=>s.inventory[i]<s.recipe[i])){
        walked++;stockouts++;timeline.push({type:'stockout',at});continue;
      }
      for(const i of ['lemons','sugar','ice'])s.inventory[i]-=s.recipe[i];
      pitchers++;remaining=12;
    }
    remaining--;s.inventory.cups--;sold++;nextAvailable=servedAt+service;
    timeline.push({type:'sold',at});
  }
  const revenue=round(sold*s.price);
  const overhead=dailyCosts(s);
  const spentSupplies=round(pitchers*12*costEstimate(s));
  const profit=round(revenue-overhead-spentSupplies);
  s.cash=round(s.cash+revenue-overhead);
  const satisfaction=clamp(Math.round(quality*.53+priceAppeal*31+Math.max(0,1-queueWalks/Math.max(visitors,1)) * 17-(stockouts>0?14:0)),5,99);
  const reputationChange=clamp((satisfaction-65)*.09+(sold>0?1.7:-2)-(walked>sold?1.5:0),-6,6);
  s.reputation[loc.id]=clamp(Math.round((s.reputation[loc.id]+reputationChange)*10)/10,10,100);
  const expiredIce=s.upgrades.includes('cooler')?Math.floor(s.inventory.ice*.35):s.inventory.ice;
  s.inventory.ice-=expiredIce;
  const expiredLemons=s.upgrades.includes('fridge')?0:Math.floor(s.inventory.lemons*.08);
  s.inventory.lemons-=expiredLemons;
  const currentBank=round(s.cash);
  const cashFlow=round(s.cash-state.bankAtLastClose);
  const report={day,location:loc.id,locationName:loc.name,weather:wx.kind,temp:wx.temp,news:wx.news.text,
    visitors,sold,walked,notInterested,stockouts,queueWalks,pitchers,quality,satisfaction,
    revenue,overhead,ingredients:spentSupplies,profit,cashFlow,paidForStock:s.pendingPurchases,paidForUpgrades:s.pendingCapital,
    expiredIce,expiredLemons,bank:currentBank,rep:Math.round(s.reputation[loc.id]),fairPrice:round(fairPrice)};
  s.totalSold+=sold;s.totalRevenue=round(s.totalRevenue+revenue);
  s.history.push(report);if(s.history.length>365)s.history.shift();
  s.lastReport=report;s.day++;
  s.pendingPurchases=0;s.pendingCapital=0;s.bankAtLastClose=currentBank;
  s.finished=s.mode==='challenge'&&day>=30;
  return {next:s,report,timeline};
}
export function isValidSave(s){
  return !!s&&typeof s==='object'&&s.version===VERSION&&Number.isInteger(s.day)&&s.day>=1&&s.day<100000&&
    Number.isFinite(s.cash)&&s.cash>=-1000000&&Array.isArray(s.upgrades)&&Array.isArray(s.staff)&&
    Array.isArray(s.history)&&s.history.length<=365&&LOCATIONS.some(l=>l.id===s.location)&&
    ['lemons','sugar','ice','cups'].every(i=>Number.isSafeInteger(s.inventory?.[i])&&s.inventory[i]>=0)&&
    ['lemons','sugar','ice'].every(i=>Number.isInteger(s.recipe?.[i])&&s.recipe[i]>=0&&s.recipe[i]<=12)&&
    Number.isFinite(s.price)&&s.price>=.25&&s.price<=5&&
    Number.isFinite(s.seed)&&s.reputation&&typeof s.reputation==='object';
}
