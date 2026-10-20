import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {suburbSVG,characterSVG} from '../vector-art.mjs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('suburban SVG contains detailed vector neighbourhood and cart',()=>{
 const svg=suburbSVG('Sunny');
 assert.match(svg,/<svg\b/);
 assert.match(svg,/viewBox="0 0 900 490"/);
 assert.match(svg,/id="house"/);
 assert.match(svg,/id="hedge"/);
 assert.match(svg,/svg-lemon-cart/);
 assert.match(svg,/LEMONADE/);
 assert.doesNotMatch(svg,/<image\b/);
 assert.match(suburbSVG('Rainy'),/stroke="#e9f6fa"/);
});

test('characters are SVG drawings for vendor, adult and child',()=>{
 for(const kind of ['vendor','adult','child']){
   const svg=characterSVG(kind);
   assert.match(svg,/<svg\b/);
   assert.match(svg,new RegExp('svg-character--'+kind));
   assert.match(svg,/vector-leg--front/);
   assert.match(svg,/vector-arm--back/);
   assert.match(svg,/vector-cup/);
   assert.doesNotMatch(svg,/<image\b/);
 }
 assert.match(characterSVG('unknown'),/svg-character--adult/);
});

test('game and standalone builder use SVG instead of raster sprite sheets',()=>{
 const app=read('app.mjs');
 const css=read('style.css');
 const builder=read('scripts/build-standalone.mjs');
 assert.match(app,/suburbSVG\(weather\)/);
 assert.match(app,/characterSVG\('vendor'\)/);
 assert.match(app,/characterSVG\(character\)/);
 assert.match(css,/vector-customer/);
 assert.match(css,/vector-sale-route/);
 assert.doesNotMatch(css,/characters-atlas\.png/);
 assert.doesNotMatch(css,/assets\/scenes\/suburbs\.webp/);
 assert.match(builder,/read\('vector-art\.mjs'\)/);
 assert.doesNotMatch(builder,/spriteImage|sceneImage/);
});
