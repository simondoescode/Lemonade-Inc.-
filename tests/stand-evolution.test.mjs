import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {STAND_FEATURES,STAFF_ROLES,standTier,standFeatures,renderStandEvolution,renderStaffCostume} from '../stand-art.mjs';
import {newGame,buyUpgrade,toggleStaff,isValidSave,simulateDay,VERSION,STORAGE_KEY} from '../engine.mjs';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('each existing paid upgrade adds a unique, original physical feature',()=>{
 assert.deepEqual(STAND_FEATURES,['sign','blender','cooler','awning','kiosk','fridge']);
 assert.equal(renderStandEvolution([]),'','unupgraded background remains untouched');
 const all=renderStandEvolution(STAND_FEATURES);
 assert.match(all,/viewBox="0 0 240 164"/);
 for(const id of STAND_FEATURES){
  const one=renderStandEvolution([id]);
  assert.match(one,new RegExp('data-feature="'+id+'"'));
  for(const other of STAND_FEATURES.filter(x=>x!==id))assert.doesNotMatch(one,new RegExp('data-feature="'+other+'"'));
  assert.match(all,new RegExp('data-feature="'+id+'"'));
 }
 assert.equal(standTier([]),'Classic Stand');
 assert.equal(standTier(['cooler']),'Upgraded Stand');
 assert.equal(standTier(['kiosk']),'Deluxe Kiosk');
 assert.deepEqual(standFeatures(['blender','blender','unknown','cooler']),['blender','cooler']);
});

test('every hired role has an independently recognisable costume',()=>{
 assert.deepEqual(STAFF_ROLES,['cashier','helper','mascot']);
 const actors=STAFF_ROLES.map(role=>renderStaffCostume(role));
 for(const markup of actors){
  assert.match(markup,/class="staff-outfit/);
  assert.match(markup,/viewBox="0 0 64 72"/);
  assert.match(markup,/<svg/);
 }
 assert.equal(renderStaffCostume('untrusted'),'', 'do not render unknown saved role');
 assert.notEqual(actors[0],actors[1]);
 assert.notEqual(actors[1],actors[2]);
 assert.match(actors[2],/mascot-art/);
});

test('purchasing changes rendered art without changing the save schema',()=>{
 let game=newGame('career',852);
 const oldVersion=VERSION,oldKey=STORAGE_KEY;
 game.cash=10000;
 const initial=structuredClone(game);
 for(const id of STAND_FEATURES){
  const result=buyUpgrade(game,id);
  assert.equal(result.error,undefined,id);
  game=result.next;
  assert.match(renderStandEvolution(game.upgrades),new RegExp('data-feature="'+id+'"'));
 }
 for(const role of STAFF_ROLES){
  const result=toggleStaff(game,role);
  assert.equal(result.error,undefined,role);
  game=result.next;
 }
 assert.ok(isValidSave(game));
 assert.equal(game.version,oldVersion);
 assert.equal(STORAGE_KEY,oldKey);
 assert.deepEqual(initial.upgrades,[]);
 assert.deepEqual(initial.staff,[]);
 assert.equal(game.upgrades.length,STAND_FEATURES.length);
 assert.equal(game.staff.length,STAFF_ROLES.length);
 assert.equal(standTier(game.upgrades),'Deluxe Kiosk');
});

test('upgraded and staffed stands preserve deterministic original economics',()=>{
 let game=newGame('career',454);
 game.cash=5000;
 game.inventory={lemons:400,sugar:400,ice:500,cups:400};
 for(const id of STAND_FEATURES)game=buyUpgrade(game,id).next;
 for(const id of STAFF_ROLES)game=toggleStaff(game,id).next;
 const snapshot=structuredClone(game);
 const day=simulateDay(game);
 assert.equal(day.error,undefined);
 assert.deepEqual(simulateDay(game),day);
 assert.deepEqual(game,snapshot);
 assert.ok(isValidSave(day.next));
 assert.ok(day.report.sold>0);
});

test('visual upgrades, live crew actions and mobile preview ship in both builds',()=>{
 const app=read('app.mjs'),css=read('style.css'),builder=read('scripts/build-standalone.mjs'),manifest=read('vite.config.js');
 assert.match(app,/from '\.\/stand-art\.mjs'/);
 assert.match(app,/renderStandEvolution\(game\.upgrades\)/);
 assert.match(app,/renderStaffCostume\(role\.id\)/);
 assert.match(app,/celebrateCrewSale\(\)/);
 assert.match(app,/data-action="view-stand"/);
 assert.match(app,/crewOffsets/);
 assert.match(css,/\.stand-evolution/);
 assert.match(css,/\.crew-actor--mascot/);
 assert.match(css,/\.upgrade-showcase-art/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(builder,/standArt=read\('stand-art\.mjs'\)/);
 assert.match(builder,/vectorArt,standArt,app/);
 assert.match(manifest,/VitePWA/);
});
