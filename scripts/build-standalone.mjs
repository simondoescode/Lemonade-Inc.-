import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
let index=read('index.html');
let styles=read('style.css');
// Embed the generated scene and sprite atlas so play.html stays fully offline.
const sceneImage='data:image/webp;base64,'+readFileSync(new URL('../assets/scenes/suburbs.webp',import.meta.url)).toString('base64');
const spriteImage='data:image/png;base64,'+readFileSync(new URL('../assets/sprites/characters-atlas.png',import.meta.url)).toString('base64');
styles=styles.replaceAll('./assets/scenes/suburbs.webp',sceneImage)
             .replaceAll('./assets/sprites/characters-atlas.png',spriteImage);

const logoData='data:image/webp;base64,'+readFileSync(new URL('../assets/lemonade-inc-logo.webp',import.meta.url)).toString('base64');
const iconData='data:image/webp;base64,'+readFileSync(new URL('../assets/lemonade-inc-icon.webp',import.meta.url)).toString('base64');
const engine=read('engine.mjs').replace(/\bexport (const|function)\b/g,'$1');
const scene=read('scene.mjs').replace(/\bexport (const|function)\b/g,'$1');
const app=read('app.mjs').replace(/^import .+?;\s*$/gm,'');
const js=[engine,scene,app].join('\n\n');
index=index.replace('<link rel="stylesheet" href="./style.css">',()=>'<style>\n'+styles+'\n</style>');
index=index.replace('<script type="module" src="./app.mjs"></script>',()=>'<script>\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>');
index=index.replace(/\.\/assets\/lemonade-inc-logo\.webp/g,logoData);
index=index.replace(/\.\/assets\/lemonade-inc-icon\.webp/g,iconData);
index=index.replace(/<link rel="icon"[^>]*>/g,'');
index=index.replace(/<link rel="manifest"[^>]*>/g,'');
index=index.replace('<!-- standalone marker -->','');
writeFileSync(new URL('../play.html',import.meta.url),index);
console.log('Created single-file play.html ('+Math.round(Buffer.byteLength(index)/1024)+' kB)');
