import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {newGame,simulateDay,isValidSave} from '../engine.mjs';

function busyStand(seed=6421){
 const state=newGame('career',seed);
 state.location='mall';
 state.cash=5000;
 state.reputation.mall=90;
 state.price=.5;
 state.advertising=20;
 state.inventory={lemons:10000,sugar:10000,ice:10000,cups:10000};
 return state;
}

test('living city timeline is deterministic and matches the business ledger',()=>{
 const initial=busyStand(),snapshot=structuredClone(initial);
 const first=simulateDay(initial),second=simulateDay(initial);
 assert.deepEqual(first,second);
 assert.deepEqual(initial,snapshot);
 assert.ok(isValidSave(first.next),'existing save format stays valid');
 const {timeline,report}=first;
 assert.equal(timeline.length,report.visitors);
 assert.equal(timeline.filter(x=>x.type==='sold').length,report.sold);
 assert.equal(timeline.filter(x=>x.type==='pass').length,report.notInterested);
 assert.equal(timeline.filter(x=>x.type==='queue').length,report.queueWalks);
 assert.equal(timeline.filter(x=>x.type==='stockout').length,report.stockouts);
 assert.equal(report.walked,report.queueWalks+report.stockouts);
 assert.equal(report.sold+report.walked+report.notInterested,report.visitors);
 assert.equal(first.next.totalSold,report.sold);
 assert.equal(report.revenue,Math.round(report.sold*initial.price*100)/100);
});

test('customer arrivals follow chronological order and service happens before closing',()=>{
 const result=simulateDay(busyStand(9));
 assert.equal(result.error,undefined);
 const {timeline,report}=result;
 assert.ok(timeline.length>40,'test setup must generate a bustling location');
 for(let i=0;i<timeline.length;i++){
  const customer=timeline[i];
  assert.ok(customer.at>=0&&customer.at<=480);
  if(i>0)assert.ok(timeline[i-1].at<=customer.at);
  assert.ok(['sold','pass','queue','stockout'].includes(customer.type));
  if(customer.type==='sold'){
   assert.ok(customer.servedAt>=customer.at,'no purchase before arrival');
   assert.ok(customer.servedAt<=480,'no sale after closing');
   assert.ok(customer.wait>=0);
   assert.ok(customer.queueAhead>=0);
   assert.ok(['happy','okay'].includes(customer.reaction));
  }else{
   assert.equal(customer.servedAt,undefined,'unsold visitors cannot trigger purchase');
  }
 }
 assert.ok(report.peakQueue>=0);
 assert.ok(report.averageWait>=0);
 assert.ok(report.queuedCustomers>=0&&report.queuedCustomers<=report.sold);
});

test('long queues result in real lost opportunities and never unlimited sales',()=>{
 const {timeline,report}=simulateDay(busyStand(44));
 assert.ok(report.queueWalks>0,'this high traffic scenario should create abandonment');
 assert.ok(report.sold>0);
 assert.ok(timeline.some(x=>x.type==='queue'&&x.reaction==='impatient'));
 assert.ok(report.sold*7.6<=480+7.6,'without service upgrades the stand is constrained by opening hours');
});

test('PWA screen couples actual sales, queue pressure and daily upgrade actions',()=>{
 const app=readFileSync(new URL('../app.mjs',import.meta.url),'utf8');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const css=readFileSync(new URL('../style.css',import.meta.url),'utf8');
 assert.match(app,/servedAt/);
 assert.match(app,/kind:'sale'/);
 assert.match(app,/queue-count/);
 assert.match(app,/spawnVisitor\(ev,step\.index\)/);
 assert.match(app,/reportAdvice/);
 assert.match(app,/shop-upgrades/);
 assert.match(app,/playbackIndex/);
 assert.match(html,/id="scene-queue"/);
 assert.match(html,/id="scene-feedback"/);
 assert.match(css,/@keyframes hd-queue-route/);
 assert.match(css,/\.hd-customer\.turned-away/);
 assert.match(css,/prefers-reduced-motion/);
});
