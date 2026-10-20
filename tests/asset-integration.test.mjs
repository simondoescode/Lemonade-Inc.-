import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url));
test('new suburban backdrop and sprite atlas are bundled as assets',()=>{
 const scene=read('assets/scenes/suburbs.webp');
 assert.equal(scene.toString('ascii',0,4),'RIFF');
 assert.equal(scene.toString('ascii',8,12),'WEBP');
 const atlas=read('assets/sprites/characters-atlas.png');
 assert.equal(atlas.toString('hex',0,8),'89504e470d0a1a0a');
 assert.equal(atlas.readUInt32BE(16),480);
 assert.equal(atlas.readUInt32BE(20),180);
 const meta=JSON.parse(read('assets/sprites/characters-atlas.json').toString());
 assert.equal(meta.frameWidth*meta.columns,480);
 assert.equal(meta.frameHeight*meta.rows,180);
 assert.deepEqual(Object.keys(meta.characters),['vendor','adult','child']);
});
test('live scene and characters actually reference art assets',()=>{
 const app=read('app.mjs').toString();
 const css=read('style.css').toString();
 const builder=read('scripts/build-standalone.mjs').toString();
 assert.match(app,/scene-background--suburbs/);
 assert.match(app,/sprite-customer/);
 assert.match(app,/stand-vendor/);
 assert.match(css,/assets\/scenes\/suburbs\.webp/);
 assert.match(css,/assets\/sprites\/characters-atlas\.png/);
 assert.match(builder,/sceneImage/);
 assert.match(builder,/spriteImage/);
});
