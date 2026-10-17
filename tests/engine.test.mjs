import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,buyStock,changeRecipe,setPrice,setAdvertising,chooseLocation,buyUpgrade,toggleStaff,simulateDay,forecast,recipeScore,STOCK_ITEMS,costEstimate,dailyCosts,isValidSave,VERSION} from '../engine.mjs';
function stocked(seed=123){let s=newGame('career',seed);for(const [item,index] of [['lemons',2],['sugar',1],['ice',0],['cups',0]])s=buyStock(s,item,index).next;return s;}
test('new game starts with forty dollars and safe defaults',()=>{const g=newGame();assert.equal(g.cash,40);assert.equal(g.day,1);assert.equal(g.location,'suburbs');assert.equal(dailyCosts(g),0);assert.ok(isValidSave(g));});
test('weather and news are stable for same seed and day',()=>{assert.deepEqual(forecast(987,2),forecast(987,2));assert.notDeepEqual(forecast(987,2),forecast(987,3));});
test('bulk buying updates pantry, cash and purchase expenses',()=>{const g=newGame(),r=buyStock(g,'lemons',2);assert.equal(r.next.inventory.lemons,48);assert.equal(r.next.cash,30.4);assert.equal(r.next.pendingPurchases,9.6);assert.equal(g.inventory.lemons,0);});
test('insufficient cash and invalid purchases are rejected',()=>{const g=newGame();assert.match(buyStock(g,'lemons',100).error,/available/);assert.match(buyUpgrade(g,'cooler').error,/cash/);assert.match(changeRecipe(g,'lemons',99).error,/range/);});
test('recipe balance influences quality',()=>{assert.ok(recipeScore({lemons:6,sugar:3,ice:5},31)>recipeScore({lemons:0,sugar:0,ice:0},31));});
test('simulation is deterministic and does not mutate input',()=>{const before=stocked(128),snapshot=structuredClone(before),a=simulateDay(before),b=simulateDay(before);assert.equal(a.error,undefined);assert.deepEqual(a,b);assert.deepEqual(before,snapshot);assert.ok(a.report.visitors>=a.report.sold);assert.ok(a.report.revenue>=0);assert.equal(a.next.day,2);});
test('each successful sale uses one cup, ingredients by 12-cup pitcher',()=>{const before=stocked(),a=simulateDay(before);assert.equal(before.inventory.cups-a.next.inventory.cups,a.report.sold);assert.equal(before.inventory.sugar-a.next.inventory.sugar,a.report.pitchers*before.recipe.sugar);assert.equal(a.report.paidForStock,before.pendingPurchases);assert.equal(a.next.pendingPurchases,0);});
test('all inventories remain non-negative after simulation',()=>{for(let seed=1;seed<35;seed++){const g=stocked(seed),r=simulateDay(g);for(const i of STOCK_ITEMS)assert.ok(r.next.inventory[i]>=0,`Negative ${i} for seed ${seed}`);}});
test('no cups means day cannot start',()=>{const r=simulateDay(newGame());assert.match(r.error,/Buy cups/);});
test('pricing and advertising are bounded and selectable',()=>{const g=newGame();assert.match(setPrice(g,50).error,/between/);assert.equal(setPrice(g,1.55).next.price,1.55);assert.equal(setAdvertising(g,10).next.advertising,10);assert.match(setAdvertising(g,3).error,/campaign/);});
test('location, upgrades and staff change daily fixed costs',()=>{let s=newGame();s=chooseLocation(s,'park').next;s=setAdvertising(s,2).next;s=toggleStaff(s,'mascot').next;assert.equal(dailyCosts(s),14);assert.equal(s.location,'park');});
test('challenges finish on day 30',()=>{let s=newGame('challenge',778);for(let day=1;day<=30;day++){// Add a fresh starter stockpile through normal purchase flows when affordable.
 if(s.inventory.lemons<5&&s.cash>=4.8)s=buyStock(s,'lemons',0).next;
 if(s.inventory.sugar<3&&s.cash>=4.8)s=buyStock(s,'sugar',0).next;
 if(s.inventory.ice<3&&s.cash>=1)s=buyStock(s,'ice',0).next;
 if(s.inventory.cups<1&&s.cash>=1)s=buyStock(s,'cups',0).next;
 const r=simulateDay(s);assert.equal(r.error,undefined,`Could not open on day ${day}: ${r.error}`);s=r.next;
 }assert.equal(s.day,31);assert.equal(s.finished,true);assert.equal(s.history.length,30);assert.match(simulateDay(s).error,/challenge is complete/);
});
test('save validator rejects malformed and old states',()=>{const g=newGame();assert.equal(isValidSave({...g,version:VERSION+1}),false);assert.equal(isValidSave({...g,inventory:{...g.inventory,cups:-2}}),false);assert.equal(isValidSave({...g,history:Array(366).fill({})}),false);});
test('cost estimates are finite and positive',()=>{const g=newGame();assert.ok(Number.isFinite(costEstimate(g)));assert.ok(costEstimate(g)>0);});
