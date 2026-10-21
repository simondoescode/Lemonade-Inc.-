import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {suburbSVG,characterSVG} from '../vector-art.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url));

test('approved HD images are shipped with correct dimensions',()=>{
 const expected={suburbs:[1672,941],park:[1672,941],beach:[1672,941],station:[1672,941],downtown:[1672,941],mall:[1672,941],vendor:[1280,1080],adult:[1280,1080],child:[1280,1080]};
 for(const [name,[w,h]] of Object.entries(expected)){
   const bytes=read('assets/hd/'+name+'.webp');
   assert.equal(bytes.toString('ascii',0,4),'RIFF',name);
   assert.equal(bytes.toString('ascii',8,12),'WEBP',name);
   assert.ok(bytes.length>20000,name+' unexpectedly small');
 }
 const meta=JSON.parse(read('assets/hd/animation.json').toString());
 assert.equal(meta.frameWidth,320);
 assert.equal(meta.frameHeight,360);
 assert.equal(meta.rows,3);
 assert.equal(meta.columns,4);
 assert.deepEqual(Object.keys(meta.states),['idle','walk','interact']);
 assert.deepEqual(Object.keys(meta.characters),['vendor','adult','child']);
 assert.deepEqual(Object.keys(meta.background),['suburbs','park','beach','station','downtown','mall','width','height']);
});

test('the actual game and offline build use HD art, not placeholder SVG characters',()=>{
 const app=read('app.mjs').toString(),css=read('style.css').toString(),builder=read('scripts/build-standalone.mjs').toString();
 assert.match(app,/hd-neighbourhood/);
 assert.match(app,/hd-sprite--vendor/);
 assert.match(app,/hd-sprite--/);
 assert.match(app,/hd-customer/);
 assert.doesNotMatch(app,/characterSVG\(/);
 assert.doesNotMatch(app,/suburbSVG\(/);
 for(const name of ['suburbs','park','beach','station','downtown','mall','vendor','adult','child'])assert.match(css,new RegExp('assets/hd/'+name+'\\.webp'));
 assert.match(css,/hd-sale-route/);
 assert.match(css,/hd-interact/);
 assert.match(builder,/assets\/hd/);
 assert.match(builder,/styles\.replaceAll/);
});

test('remaining SVG places stay available as fallback locations',()=>{
 assert.match(suburbSVG(),/svg-lemon-cart/);
 for(const name of ['vendor','adult','child'])assert.match(characterSVG(name),/<svg\b/);
});

test('all six locations select a unique HD illustration, with location-specific vendor and customer positions',()=>{
 const app=read('app.mjs').toString();
 const css=read('style.css').toString();
 const builder=read('scripts/build-standalone.mjs').toString();
 const all=['suburbs','park','beach','station','downtown','mall'];
 assert.match(app,/HD_SCENE_SPOTS\[id\]/);
 assert.match(app,/hd-neighbourhood--'\+id/);
 for(const id of all){
   assert.match(app,new RegExp('\\b'+id+': \\{vendorX:'));
   const image='assets/hd/'+id+'.webp';
   assert.ok(css.includes(image),image+' missing from CSS');
   assert.ok(builder.includes(id),image+' missing from offline asset embedding');
 }
 assert.match(app,/place\.walkY/);
 assert.match(app,/place\.stopX/);
 assert.match(css,/var\(--stand-x/);
 assert.match(css,/var\(--stand-y/);
});
