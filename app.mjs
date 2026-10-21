import {VERSION,STORAGE_KEY,STOCK_ITEMS,BUNDLES,LOCATIONS,UPGRADES,STAFF,clamp,money,round,forecast,newGame,dailyCosts,changeRecipe,buyStock,chooseLocation,setAdvertising,setPrice,buyUpgrade,toggleStaff,recipeScore,costEstimate,startValidation,simulateDay,isValidSave,locationById} from './engine.mjs';
import {sceneSVG} from './scene.mjs';
import {STAND_FEATURES,standTier,standFeatures,renderStandEvolution,renderStaffCostume} from './stand-art.mjs';


const $=id=>document.getElementById(id);
const htmlEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e=htmlEscape;
const ICON={lemons:'🍋',sugar:'🍬',ice:'🧊',cups:'🥤'};
const LOCATION_ICONS={suburbs:'🏡',park:'🌳',beach:'🏖️',station:'🚉',downtown:'🏙️',mall:'🛍️'};
const WEATHER_ICONS={'Sunny':'☀️','Partly cloudy':'🌤️','Cloudy':'☁️','Rainy':'🌧️','Heatwave':'🥵'};
const TIPS=['Higher prices make each sale worth more, but fewer people may buy.','On hotter days customers crave extra ice. On cool days, use less!','Leftover ice melts overnight. Buy it just before opening.','Your reputation is different in each location. Build a loyal crowd!','Busy locations are great, but fast service matters just as much.','A good recipe is about balance. More ingredients do not always mean better lemonade.'];
function load(){try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const obj=JSON.parse(raw);if(isValidSave(obj))return obj;}}catch{}return newGame('career',20261017);}
let game=load(),phase='planning',activeTab='recipe',mobileView='home',sim=null,simFrame=0,runStart=0,runCount=0,liveSold=0,liveWalked=0,liveVisitors=0,playback=[],playbackIndex=0,lastVisualAt=-1000,lastFeedbackAt=-1000,feedbackTimer=0,sound=false,toastTimer=0,notificationTimer=0,firstRun=(()=>{try{return !localStorage.getItem(STORAGE_KEY);}catch{return true;}})();
let audioContext=null;
const store=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(game));}catch{notify('Saving is disabled by this browser. Use Export save.');}};
const activeLocation=()=>locationById(game.location);
function beep(type='click'){
  if(!sound)return;
  try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();const o=audioContext.createOscillator(),g=audioContext.createGain(),now=audioContext.currentTime;o.type=type==='sale'?'sine':'triangle';o.frequency.setValueAtTime(type==='sale'?610:460,now);o.frequency.exponentialRampToValueAtTime(type==='sale'?840:350,now+.09);g.gain.setValueAtTime(.001,now);g.gain.exponentialRampToValueAtTime(type==='sale'?.045:.025,now+.015);g.gain.exponentialRampToValueAtTime(.001,now+.15);o.connect(g);g.connect(audioContext.destination);o.start(now);o.stop(now+.16);}catch{}
}
function notify(message){const n=$('notification');n.textContent=message;n.classList.add('visible');clearTimeout(notificationTimer);notificationTimer=setTimeout(()=>n.classList.remove('visible'),2900);}
function tipBox(icon,title,body,tone=''){return `<div class="hint-box ${tone}"><span>${icon}</span><div><b>${e(title)}</b><p>${e(body)}</p></div></div>`;}
function panelHeading(title,subtitle,icon){return `<div class="panel-title"><div><h2>${e(title)}</h2><p>${e(subtitle)}</p></div><span class="panel-icon">${icon}</span></div>`;}
function stepper(name,value,minus,plus){return `<div class="stepper"><button type="button" data-action="${minus}" data-item="${name}" aria-label="Decrease ${name}" ${phase!=='planning'?'disabled':''}>−</button><output>${e(value)}</output><button type="button" data-action="${plus}" data-item="${name}" aria-label="Increase ${name}" ${phase!=='planning'?'disabled':''}>+</button></div>`;}
function recipePanel(){const wx=forecast(game.seed,game.day),q=recipeScore(game.recipe,wx.temp);
  const ing=[{name:'lemons',unit:'Sour & fresh'},{name:'sugar',unit:'Sweetness'},{name:'ice',unit:'Nice and chilly'}];
  return `${panelHeading('The secret recipe','Tune every pitcher. One pitcher makes 12 cups.','🍹')}
    ${ing.map(i=>`<div class="recipe-row"><div class="item-emoji">${ICON[i.name]}</div><div><strong>${i.name[0].toUpperCase()+i.name.slice(1)}</strong><span class="subtext">${i.unit} · per pitcher</span></div>${stepper(i.name,game.recipe[i.name],'recipe-down','recipe-up')}</div>`).join('')}
    <div style="margin-top:18px"><div class="quality-line"><span>🌟 Predicted recipe quality</span><span>${q}%</span></div><div class="quality-meter"><i style="width:${q}%"></i></div><div class="quality-line"><span class="muted">Est. cost per cup</span><span>${money(costEstimate(game))}</span></div></div>
    ${tipBox('💡',wx.temp>27?'Hot-weather tip':'Mixing tip',wx.temp>27?'A few extra ice cubes could make a big difference today.':'Try around 6 lemons, 3 sugar and a little ice for a crowd-pleasing blend.')}`;
}
function supplyPanel(){return `${panelHeading('Stock the shelves','Buy in bulk for cheaper supplies. Ice melts overnight!','📦')}
   ${STOCK_ITEMS.map(item=>`<div class="stock-row"><div class="stock-head"><div><span class="item-emoji">${ICON[item]}</span><strong>${item[0].toUpperCase()+item.slice(1)}</strong></div><b class="stock-count">${game.inventory[item]} in stock</b></div><div class="bundle-options">${BUNDLES[item].map((b,j)=>`<button type="button" class="bundle" data-action="buy-stock" data-item="${item}" data-index="${j}" ${phase!=='planning'||game.cash<b.price?'disabled':''}>+${b.qty}<span>${money(b.price)}</span></button>`).join('')}</div></div>`).join('')}
   ${tipBox('🧊','Keep it fresh','Ice disappears at the end of each day. Some lemons spoil too, unless you buy the right upgrades.','warm')}`;}
function pricePanel(){const wx=forecast(game.seed,game.day);return `${panelHeading('Pricing & promotion','Find the sweet spot between demand and profit.','💸')}
   <div class="price-zone"><span class="eyebrow">SELLING PRICE / CUP</span><div class="big-price">${money(game.price)}</div>${stepper('price','5¢ steps','price-down','price-up')}<p>${wx.temp>=28?'🌡️ Hot weather may support a higher price.':'❤️ Keep prices friendly when it is cooler.'}</p></div>
   <label class="form-label">📢 Daily advertising budget</label><div class="ad-list">${[0,2,5,10,20].map(a=>`<button type="button" data-action="ad" data-value="${a}" ${phase!=='planning'?'disabled':''} class="ad-button ${a===game.advertising?'selected':''}">${money(a)}<small>${a===0?'None':a<=2?'Flyers':a<=5?'Posters':a<=10?'Radio':'Buzz'}</small></button>`).join('')}</div>
   ${tipBox('📣','More eyes, more orders',`The campaign costs ${money(game.advertising)} per day and brings in additional foot traffic. Overheads today: ${money(dailyCosts(game))}.`)}`;}
function placesPanel(){return `${panelHeading('Pick your pitch','Foot traffic increases with rent — and so does risk.','📍')}
  <div class="place-list">${LOCATIONS.map(l=>`<div class="place-option ${game.location===l.id?'chosen':''}"><span>${LOCATION_ICONS[l.id]}</span><div class="place-info"><strong>${e(l.name)}</strong><small>${e(l.tag)} · ${Math.round(game.reputation[l.id]||42)}% local reputation</small></div><button type="button" class="tiny-button ${game.location===l.id?'secondary':''}" data-action="location" data-id="${l.id}" ${phase!=='planning'||game.location===l.id?'disabled':''}>${game.location===l.id?'HERE':l.rent===0?'FREE':money(l.rent)+'/day'}</button></div>`).join('')}</div>
  ${tipBox('🗺️','Your neighbourhood matters',activeLocation().desc)}`;}
function upgradePanel(){
 const owned=standFeatures(game.upgrades);
 return `${panelHeading('Level up your stand','Every purchase transforms your stand in the living city.','⚡')}
 <div class="upgrade-showcase"><div class="upgrade-showcase-info"><strong>🏪 ${e(standTier(game.upgrades))}</strong><small>${owned.length} of ${STAND_FEATURES.length} visual upgrades installed</small><button type="button" class="tiny-button" data-action="view-stand">VIEW STAND ➜</button></div><div class="upgrade-showcase-art" aria-hidden="true"><div class="upgrade-showcase-scene"></div><div class="upgrade-showcase-overlay">${renderStandEvolution(game.upgrades)}</div></div></div>
 <div class="upgrade-list">${UPGRADES.map(u=>`<div class="upgrade-option ${game.upgrades.includes(u.id)?'owned':''}"><span>${u.icon}</span><div class="upgrade-info"><strong>${e(u.name)}</strong><small>${e(u.detail)}</small></div><button type="button" class="tiny-button ${game.upgrades.includes(u.id)?'secondary':''}" data-action="upgrade" data-id="${u.id}" ${phase!=='planning'||game.upgrades.includes(u.id)||game.cash<u.price?'disabled':''}>${game.upgrades.includes(u.id)?'INSTALLED':money(u.price)}</button></div>`).join('')}</div>`;
}
function staffPanel(){const wage=STAFF.filter(s=>game.staff.includes(s.id)).reduce((a,s)=>a+s.wage,0);return `${panelHeading('Meet your crew','Your team appears in the street and works alongside you.','🧑‍🍳')}
  <div class="upgrade-list">${STAFF.map(s=>`<div class="upgrade-option ${game.staff.includes(s.id)?'owned':''}"><span>${s.icon}</span><div class="upgrade-info"><strong>${e(s.name)}</strong><small>${e(s.detail)} · ${money(s.wage)}/day</small></div><button type="button" class="tiny-button ${game.staff.includes(s.id)?'secondary':''}" data-action="staff" data-id="${s.id}" ${phase!=='planning'?'disabled':''}>${game.staff.includes(s.id)?'FIRE':'HIRE'}</button></div>`).join('')}</div>
  ${tipBox('💵','Daily wage bill',`Your team costs ${money(wage)} per day. Wages are paid when you open, so budget before hiring!`,'warm')}`;}
function resultsPanel(){const h=game.history.slice(-12),highest=Math.max(15,...h.map(x=>Math.abs(Number(x.profit)||0)));const best=game.history.length?Math.max(...game.history.map(x=>Number(x.profit)||0)):0;
  return `${panelHeading('Your business diary','Every sale counts. Watch your little empire grow.','📈')}
  <div class="result-top"><div><small>ALL-TIME REVENUE</small><b>${money(game.totalRevenue)}</b></div><div><small>BEST DAY PROFIT</small><b>${money(best)}</b></div></div>
  <h3 style="margin-top:24px;font-size:14px">Daily profit · last 12 days</h3>
  ${h.length?`<div class="stat-bar" aria-label="Recent day profits">${h.map(d=>{const p=Number(d.profit)||0;return `<div class="stat-column" title="Day ${Number(d.day)}: ${money(p)} profit"><i style="height:${Math.max(3,Math.round(Math.abs(p)/highest*93))}%;background:${p>=0?'#2ea77b':'#e97961'}"></i><span>${Number(d.day)}</span></div>`;}).join('')}</div><div class="stat-caption"><span>🟢 Profitable day</span><span>🟠 Loss-making day</span></div>`:'<p class="result-empty">Your business journey starts after your first day! 🍋</p>'}
  ${game.lastReport?tipBox('🏆','Last day recap',`${game.lastReport.sold} cups sold · ${money(game.lastReport.revenue)} revenue · ${game.lastReport.satisfaction}% satisfaction.`):tipBox('🌱','Every empire starts small','Buy a few supplies, choose a recipe and open your stand to begin.')}`;}
const PANEL={recipe:recipePanel,supplies:supplyPanel,pricing:pricePanel,locations:placesPanel,upgrades:upgradePanel,staff:staffPanel,results:resultsPanel};
const BUSINESS_TABS=new Set(['pricing','locations','upgrades','staff']);
function syncMobileView(){
  document.body.dataset.mobileView=mobileView;
  document.querySelectorAll('[data-mobile-nav]').forEach(button=>{
    const current=button.dataset.mobileNav===mobileView;
    if(current)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
}
function selectMobileView(view){
  mobileView=view;
  if(view==='recipe'||view==='supplies'||view==='results')activeTab=view;
  else if(view==='business'&&!BUSINESS_TABS.has(activeTab))activeTab='pricing';
  renderPanel();
  window.scrollTo({top:0,behavior:'instant'});
}
function renderPanel(){syncMobileView();const p=$('control-panel');p.innerHTML=PANEL[activeTab]();document.querySelectorAll('[data-tab]').forEach(t=>{t.classList.toggle('active',t.dataset.tab===activeTab);t.setAttribute('aria-selected',String(t.dataset.tab===activeTab));});}
function renderInventory(){const d=$('inventory-card');d.innerHTML=`<h3>📦 YOUR PANTRY <span class="muted">LIVE STOCK</span></h3><div class="inventory-grid">${STOCK_ITEMS.map(i=>`<div>${ICON[i]} <span>${i[0].toUpperCase()+i.slice(1)}</span><b>${game.inventory[i]}</b></div>`).join('')}</div>`;}
function renderInsight(){const wx=forecast(game.seed,game.day);const low=STOCK_ITEMS.filter(i=>game.inventory[i]<(i==='cups'?12:i==='ice'?game.recipe.ice*2:game.recipe[i]*2));const tip=low.length?'Running low on '+low.map(x=>x).join(', ')+'. Restock before your next busy day!':wx.temp>28?'It’s a scorcher! A good recipe and a higher price may work well today.':TIPS[game.day%TIPS.length];$('insight-card').innerHTML=`<h3>💡 THE DAILY SQUEEZE</h3><p class="tip-copy">${e(tip)}</p>`;}
function renderForecast(){const report=phase==='report'?game.lastReport:null;const wx=forecast(game.seed,game.day);$('weather-icon').textContent=WEATHER_ICONS[report?.weather||wx.kind]||'🌤️';$('weather-temp').textContent=(report?.temp??wx.temp)+'°C';$('weather-name').textContent=report?.weather||wx.kind;$('news-title').textContent=report?.news||wx.news.text;$('news-effect').textContent=report?'Yesterday’s town buzz':wx.news.effect;}
// All selectable destinations share the same high-definition pixel-art pipeline.
const HD_SCENE_SPOTS=Object.freeze({
 suburbs: {vendorX:30,vendorY:37,stopX:32,walkY:37},
 park: {vendorX:34,vendorY:40,stopX:36,walkY:40},
 beach: {vendorX:66,vendorY:52,stopX:68,walkY:52},
 station: {vendorX:36,vendorY:48,stopX:39,walkY:48},
 downtown: {vendorX:27,vendorY:52,stopX:30,walkY:52},
 mall: {vendorX:30,vendorY:45,stopX:34,walkY:45}
});
function renderScene(){const report=phase==='report'?game.lastReport:null;const id=report?.location||game.location;const wx=forecast(game.seed,game.day);const weather=report?.weather||wx.kind;
 $('scene-location').textContent=locationById(id).name;
 $('scene-day').textContent='DAY '+String(report?.day||game.day).padStart(2,'0');
 const stage=$('scene-stage');
 stage.dataset.location=id;
 const place=HD_SCENE_SPOTS[id];
 stage.style.setProperty('--stand-x',(place?.vendorX??49)+'%');
 stage.style.setProperty('--stand-y',(place?.vendorY??18)+'%');
 $('scene-art').innerHTML=(place
    ? '<div class="hd-neighbourhood hd-neighbourhood--'+id+'" aria-hidden="true"></div>'
    : sceneSVG(id,weather))+'<div class="stand-evolution" aria-hidden="true">'+renderStandEvolution(game.upgrades)+'</div>';
 stage.dataset.standTier=game.upgrades.includes('kiosk')?'kiosk':game.upgrades.length?'upgraded':'classic';
 stage.setAttribute('aria-label',locationById(id).name+' lemonade stand, '+standTier(game.upgrades)+', '+game.staff.length+' crew members.');
  // HD character sprites animate above the scenic background.
 const people=$('scene-people');
 if(!people.querySelector('.stand-vendor')){
   const vendor=document.createElement('span');
   vendor.className='stand-vendor';
   vendor.setAttribute('aria-hidden','true');
   vendor.innerHTML='<span class="hd-sprite hd-sprite--vendor" aria-hidden="true"></span>';
   people.appendChild(vendor);
  }
  // Hired staff occupy the active stand, and react during every real sale.
  people.querySelectorAll('.crew-actor').forEach(actor=>actor.remove());
  const crewOffsets={cashier:10,helper:-10,mascot:place?.vendorX>58?-21:21};
  for(const role of STAFF.filter(member=>game.staff.includes(member.id))){
    const actor=document.createElement('span');
    actor.className='crew-actor crew-actor--'+role.id+(phase==='running'?' on-shift':'');
    actor.dataset.role=role.id;
    actor.setAttribute('aria-hidden','true');
    actor.style.left=clamp((place?.vendorX??49)+crewOffsets[role.id],6,92)+'%';
    actor.style.bottom=clamp((place?.vendorY??18)-2,5,82)+'%';
    actor.innerHTML=(role.id==='mascot'?'':'<span class="hd-sprite hd-sprite--'+(role.id==='cashier'?'adult':'vendor')+'"></span>')+renderStaffCostume(role.id);
    people.appendChild(actor);
  }
  $('scene-status').textContent=phase==='running'?'LIVE ON THE STREET':phase==='report'?'DAY COMPLETE':'READY TO OPEN';
 $('scene-queue').hidden=phase!=='running';
 if(phase!=='running')$('scene-feedback').classList.remove('visible');
 $('scene-status').parentElement.classList.toggle('running',phase==='running');
 const stats=report?{visitors:report.visitors,sold:report.sold,revenue:report.revenue,satisfaction:report.satisfaction}:null;
 $('live-visitors').textContent=stats?stats.visitors:'—';$('live-sold').textContent=stats?stats.sold:'—';$('live-revenue').textContent=stats?money(stats.revenue):'—';$('live-satisfaction').textContent=stats?stats.satisfaction+'%':'—';
 const action=$('scene-action');
 const activeStep=phase==='running'?1:phase==='report'?2:activeTab==='upgrades'?3:0;
 const daySteps='<div class="day-steps" aria-label="Business day progress">'+['Plan','Sell','Review','Upgrade'].map((label,i)=>'<span class="'+(i===activeStep?'current':i<activeStep?'complete':'')+'">'+label+'</span>'+(i<3?'<b>›</b>':'')).join('')+'</div>';
 if(phase==='planning'){
   const problem=startValidation(game);
   action.innerHTML=`${daySteps}<button type="button" class="primary-button" data-action="open-day" ${problem?'disabled':''}>OPEN FOR BUSINESS <span>➜</span></button><p>${e(problem||`Today's fixed costs: ${money(dailyCosts(game))} · Weather: ${wx.kind.toLowerCase()}`)}</p>`;
 }else if(phase==='running'){
   action.innerHTML=`${daySteps}<button type="button" class="primary-button" data-action="skip-day">SKIP TO DAY REPORT <span>⏩</span></button><p>Customers are tasting your lemonade. Every cup counts!</p>`;
 }else{
   action.innerHTML=`${daySteps}<button type="button" class="primary-button" data-action="continue-day">${game.finished?'CHALLENGE COMPLETE':'PLAN NEXT DAY'} <span>➜</span></button><p>View your report or get ready for another round.</p>`;
 }
}
function render(){ $('metric-day').textContent=String(game.day>1&&phase==='report'?game.day-1:game.day).padStart(2,'0');$('metric-sold').textContent=game.totalSold.toLocaleString();$('metric-cash').textContent=money(game.cash);renderForecast();renderPanel();renderInventory();renderInsight();renderScene();$('sound-toggle').textContent=sound?'🔊':'🔇';$('sound-toggle').setAttribute('aria-label',sound?'Disable sound':'Enable sound');}
function saveAndRender(next){game=next;store();render();}
function apply(result){if(result?.error){notify(result.error);return;}if(result?.next){saveAndRender(result.next);beep('click');}}
function showDialog(markup){$('dialog').innerHTML=markup;$('overlay').hidden=false;$('dialog').querySelector('button')?.focus();}
function hideDialog(){$('overlay').hidden=true;}
function chooseGameDialog(first=false){showDialog(`<div class="dialog-art">🍋</div><p class="eyebrow">WELCOME TO SQUEEZE STREET</p><h2>${first?'A little stand. A lot of potential.':'Start a fresh adventure?'}</h2><p>Build your own lemonade empire from just $40. Which adventure will you play?</p><button type="button" class="mode-card" data-action="select-mode" data-id="career"><b>🌴 Career mode</b><small>No time limit. Experiment with your perfect recipe and grow at your own pace.</small></button><button type="button" class="mode-card" data-action="select-mode" data-id="challenge"><b>⏰ 30-day challenge</b><small>How much can you earn in just 30 in-game days?</small></button>${first?'':`<div class="dialog-actions"><button class="secondary-button" data-action="close-dialog">Cancel</button></div>`}`);}
function reportAdvice(r){
 if(r.stockouts>0)return 'Out of supplies! You lost '+r.stockouts+' customers; restock before opening.';
 if(r.queueWalks>0)return r.queueWalks+' people abandoned the queue. Faster equipment or more patience could help.';
 if(r.satisfaction<60)return 'Try a better recipe or friendlier price tomorrow.';
 if(r.profit<0)return 'Your running costs exceeded sales. Consider cheaper rent, staffing or advertising.';
 return 'Excellent work! Consider reinvesting your earnings in faster equipment.';
}
function reportDialog(){const r=game.lastReport,positive=r.profit>=0;showDialog(`<div class="dialog-art">${positive?'🏆':'🧃'}</div><p class="eyebrow">DAY ${String(r.day).padStart(2,'0')} · ${e(r.locationName)}</p><h2>${positive?'Sweet success!':'A learning day!'}</h2><p>${r.sold} customers bought a glass today. ${r.walked?`${r.walked} visitors walked away.`:'No one was turned away.'}</p>
<div class="dialog-grid"><div class="dialog-stat"><small>🥤 CUPS SOLD</small><b>${r.sold}</b></div><div class="dialog-stat"><small>💵 REVENUE</small><b>${money(r.revenue)}</b></div><div class="dialog-stat"><small>🧾 DAILY PROFIT</small><b class="${positive?'positive':'negative'}">${money(r.profit)}</b></div><div class="dialog-stat"><small>❤️ SATISFACTION</small><b>${r.satisfaction}%</b></div></div>
<div class="hint-box" style="text-align:left;margin:10px 0"><span>📋</span><div><b>Today's accounting</b><p>Rent, marketing & wages: ${money(r.overhead)} · Ingredients used (est.): ${money(r.ingredients)} · Cash movement including purchases: ${money(r.cashFlow)}. ${r.expiredIce} ice cubes melted overnight.</p></div></div>
<div class="dialog-insight">💡 ${e(reportAdvice(r))}${r.queuedCustomers?" · "+r.queuedCustomers+" waited in line (average "+r.averageWait+" game-minutes).":""}</div><div class="dialog-actions"><button class="secondary-button" data-action="report-stats">View stats</button>${game.finished?"":'<button class="secondary-button" data-action="shop-upgrades">⚡ Upgrade stand</button>'}<button class="primary-button" data-action="continue-day">${game.finished?'VIEW CHALLENGE RESULTS' :'PLAN TOMORROW ➜'}</button></div>`);}
function challengeDialog(){const total=game.history.reduce((a,b)=>a+(Number(b.profit)||0),0);const last=game.history.at(-1);showDialog(`<div class="dialog-art">🏅</div><p class="eyebrow">30-DAY CHALLENGE COMPLETE</p><h2>What a squeeze!</h2><p>You've finished a whole month of running your own lemonade empire.</p><div class="dialog-grid"><div class="dialog-stat"><small>CUPS SOLD</small><b>${game.totalSold}</b></div><div class="dialog-stat"><small>TOTAL REVENUE</small><b>${money(game.totalRevenue)}</b></div><div class="dialog-stat"><small>TOTAL OPERATING PROFIT</small><b>${money(total)}</b></div><div class="dialog-stat"><small>FINAL CASH</small><b>${money(last?.bank||game.cash)}</b></div></div><div class="dialog-actions"><button class="secondary-button" data-action="report-stats">See charts</button><button class="primary-button" data-action="new-game">PLAY AGAIN ➜</button></div>`);}
function newRun(mode){firstRun=false;if(simFrame)cancelAnimationFrame(simFrame);simFrame=0;sim=null;game=newGame(mode,Math.floor(Date.now()%2147483647));phase='planning';activeTab='recipe';mobileView='home';$('scene-people').innerHTML='';hideDialog();store();render();notify('New '+mode+' game. Make something delicious!');}

function showStreetFeedback(message){
 const el=$('scene-feedback');el.textContent=message;el.classList.add('visible');
 clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>el.classList.remove('visible'),1150);
}
function spawnVisitor(ev,index){
 const parent=$('scene-people');
 if(parent.querySelectorAll('.hd-customer').length>=8)parent.querySelector('.hd-customer')?.remove();
 const person=document.createElement('span');
 const character=(index*7+game.day)%5===0?'child':'adult';
 const sold=ev.type==='sold',queued=sold&&ev.queueAhead>0&&ev.wait>1.2;
 const turnedAway=ev.type==='queue'||ev.type==='stockout';
 const place=HD_SCENE_SPOTS[$('scene-stage').dataset.location]||HD_SCENE_SPOTS.suburbs;
 const duration=4.1+(index%4)*.25;
 const reaction=sold?(ev.reaction==='happy'?'Yum! 🍋':'Thanks!'):ev.type==='queue'?'Too slow!':ev.type==='stockout'?'Sold out!':'';
 person.className='hd-customer'+(sold?' sale':'')+(queued?' queued':'')+(turnedAway?' turned-away unhappy':'')+(ev.reaction==='happy'?' happy':'');
 person.setAttribute('aria-hidden','true');
 person.style.setProperty('--visitor-y',(place.walkY+((index%5)-2)*1.1)+'%');
 person.style.setProperty('--stop-x',place.stopX+'%');
 person.style.setProperty('--queue-x',Math.min(86,place.stopX+9+Math.min(3,ev.queueAhead||0)*6)+'%');
 person.style.setProperty('--walk-duration',duration+'s');
 person.innerHTML='<span class="hd-sprite hd-sprite--'+character+'"></span>'+(reaction?'<span class="reaction-bubble">'+e(reaction)+'</span>':'');
 parent.appendChild(person);
 if(sold){
  const vendor=parent.querySelector('.stand-vendor');
  setTimeout(()=>{if(!person.isConnected||phase!=='running')return;person.classList.add('interacting');vendor?.classList.add('serving');},duration*(queued?.60:.43)*1000);
  setTimeout(()=>{person.classList.remove('interacting');vendor?.classList.remove('serving');},duration*.79*1000);
 }
 person.addEventListener('animationend',event=>{if(event.target===person)person.remove();},{once:true});
 setTimeout(()=>person.remove(),duration*1000+300);
}
function celebrateCrewSale(){
 const people=$('scene-people');
 for(const actor of people.querySelectorAll('.crew-actor,.stand-vendor')){
  actor.classList.add('serving');
  if(actor.crewTimer)clearTimeout(actor.crewTimer);
  actor.crewTimer=setTimeout(()=>actor.classList.remove('serving'),700);
 }
}
function flashSale(){
 const el=$('scene-toast');el.textContent='🥤 +'+money(game.price);
 el.classList.add('show');clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>el.classList.remove('show'),650);
}
function updateLive(){
 if(!sim)return;
 $('live-visitors').textContent=liveVisitors;
 $('live-sold').textContent=liveSold;
 $('live-revenue').textContent=money(round(liveSold*game.price));
 $('live-satisfaction').textContent='—';
}
function frame(t){
 if(phase!=='running'||!sim)return;
 const progress=clamp((t-runStart)/12500,0,1),minute=480*progress;
 while(playbackIndex<playback.length&&playback[playbackIndex].at<=minute){
  const step=playback[playbackIndex++],ev=step.event;
  if(step.kind==='arrival'){
   liveVisitors++;
   if(ev.type==='queue'||ev.type==='stockout')liveWalked++;
   if(t-lastVisualAt>490||liveVisitors<=2){spawnVisitor(ev,step.index);lastVisualAt=t;}
   if(ev.type==='stockout'&&t-lastFeedbackAt>1350){showStreetFeedback('😞 Out of stock — lost a customer');lastFeedbackAt=t;}
   else if(ev.type==='queue'&&t-lastFeedbackAt>1500){showStreetFeedback('⌛ Queue too long — customer left');lastFeedbackAt=t;}
  }else{
   liveSold++;
   celebrateCrewSale();
   if(t-lastFeedbackAt>560){flashSale();showStreetFeedback('🥤 Sold for '+money(game.price));beep('sale');lastFeedbackAt=t;}
  }
 }
 let queue=0;
 for(const ev of sim.timeline)if(ev.type==='sold'&&ev.at<=minute&&ev.servedAt>minute)queue++;
 $('queue-count').textContent=String(queue);
 updateLive();
 if(progress<1)simFrame=requestAnimationFrame(frame);else finishDay();
}
function openDay(){
 if(phase!=='planning')return;
 const result=simulateDay(game);
 if(result.error){notify(result.error);activeTab='supplies';mobileView='supplies';renderPanel();return;}
 sim=result;phase='running';mobileView='home';
 liveSold=0;liveVisitors=0;liveWalked=0;playbackIndex=0;lastVisualAt=-1000;lastFeedbackAt=-1000;
 playback=result.timeline.flatMap((event,index)=>[
  {kind:'arrival',at:event.at,event,index},
  ...(event.type==='sold'?[{kind:'sale',at:event.servedAt,event,index}]:[])
 ]).sort((a,b)=>a.at-b.at||(a.kind==='arrival'?-1:1));
 runStart=0;$('scene-people').innerHTML='';
 render();runStart=performance.now();simFrame=requestAnimationFrame(frame);beep();
}
function finishDay(){
 if(phase!=='running'||!sim)return;
 if(simFrame)cancelAnimationFrame(simFrame);
 simFrame=0;phase='report';mobileView='home';game=sim.next;sim=null;playback=[];
 clearTimeout(feedbackTimer);clearTimeout(toastTimer);
 $('scene-people').innerHTML='';render();store();reportDialog();
}
function continueDay(tab='recipe'){
 hideDialog();
 if(game.finished){activeTab='results';mobileView='results';render();challengeDialog();return;}
 phase='planning';activeTab=tab;mobileView=tab==='upgrades'?'business':'home';render();
}
function exportSave(){const a=document.createElement('a');const blob=new Blob([JSON.stringify(game,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);a.href=url;a.download=`squeeze-street-day-${game.day}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Your game save has been exported.');}
function onClick(ev){const mobileNav=ev.target.closest('[data-mobile-nav]');if(mobileNav){selectMobileView(mobileNav.dataset.mobileNav);beep();return;}const tab=ev.target.closest('[data-tab]');if(tab){activeTab=tab.dataset.tab;if(window.matchMedia('(max-width:830px)').matches)mobileView=BUSINESS_TABS.has(activeTab)?'business':activeTab;renderPanel();beep();return;}
 const btn=ev.target.closest('[data-action]');if(!btn||btn.disabled)return;const {action,item,index,id,value}=btn.dataset;
 if(action==='close-dialog'){hideDialog();return;}if(action==='new-game'){chooseGameDialog();return;}if(action==='select-mode'){newRun(id);return;}if(action==='report-stats'){hideDialog();activeTab='results';render();return;}if(action==='continue-day'){continueDay();return;}if(action==='shop-upgrades'){continueDay('upgrades');return;}if(action==='view-stand'){mobileView='home';renderPanel();return;}if(action==='skip-day'){finishDay();return;}if(action==='open-day'){openDay();return;}
 if(phase!=='planning')return;
 switch(action){
 case 'recipe-down':apply(changeRecipe(game,item,game.recipe[item]-1));break;
 case 'recipe-up':apply(changeRecipe(game,item,game.recipe[item]+1));break;
 case 'buy-stock':apply(buyStock(game,item,Number(index)));break;
 case 'price-down':apply(setPrice(game,round(game.price-.05)));break;
 case 'price-up':apply(setPrice(game,round(game.price+.05)));break;
 case 'ad':apply(setAdvertising(game,Number(value)));break;
 case 'location':apply(chooseLocation(game,id));break;
 case 'upgrade':apply(buyUpgrade(game,id));break;
 case 'staff':apply(toggleStaff(game,id));break;
 }
}
$('app').addEventListener('click',onClick);$('dialog').addEventListener('click',onClick);
$('sound-toggle').addEventListener('click',()=>{sound=!sound;render();if(sound)beep();});
$('new-game').addEventListener('click',()=>chooseGameDialog());$('export-save').addEventListener('click',exportSave);$('import-save').addEventListener('click',()=>$('import-file').click());
$('import-file').addEventListener('change',async ev=>{const file=ev.target.files?.[0];if(!file)return;try{if(file.size>1_000_000)throw new Error('Save is too large.');const obj=JSON.parse(await file.text());if(!isValidSave(obj))throw new Error('Not a valid Squeeze Street save file.');game=obj;phase='planning';sim=null;activeTab='recipe';store();render();notify('Save imported successfully!');}catch(err){notify(err.message||'Could not import save.');}finally{ev.target.value='';}});
$('overlay').addEventListener('click',event=>{if(event.target===$('overlay')&&!firstRun)hideDialog();});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&!firstRun)hideDialog();});
render();if(firstRun){chooseGameDialog(true);}else if(game.finished){phase='report';render();challengeDialog();}


// Surface the native browser install prompt only when the browser offers it.
let installEvent;
window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  installEvent=event;
  const button=document.getElementById('install-app');
  if(button)button.hidden=false;
});
document.getElementById('install-app')?.addEventListener('click',async()=>{
  if(!installEvent)return;
  const event=installEvent;
  installEvent=null;
  document.getElementById('install-app').hidden=true;
  await event.prompt();
});
window.addEventListener('appinstalled',()=>{
  installEvent=null;
  const button=document.getElementById('install-app');
  if(button)button.hidden=true;
});
