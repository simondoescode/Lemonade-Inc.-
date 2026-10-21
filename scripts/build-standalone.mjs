import {readFileSync,writeFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
let index=read('index.html');
let styles=read('style.css');
// Embed the new HD scenery and animation frames so play.html stays self-contained.
for(const name of ['suburbs','park','beach','station','downtown','mall','vendor','adult','child']){
 const img='data:image/webp;base64,'+readFileSync(new URL('../assets/hd/'+name+'.webp',import.meta.url)).toString('base64');
 styles=styles.replaceAll('./assets/hd/'+name+'.webp',img);
}

const logoData='data:image/webp;base64,'+readFileSync(new URL('../assets/lemonade-inc-logo.webp',import.meta.url)).toString('base64');
const iconData='data:image/webp;base64,'+readFileSync(new URL('../assets/lemonade-inc-icon.webp',import.meta.url)).toString('base64');
const engine=read('engine.mjs').replace(/\bexport (const|function)\b/g,'$1');
const scene=read('scene.mjs').replace(/\bexport (const|function)\b/g,'$1');
const vectorArt=read('vector-art.mjs').replace(/\bexport (const|function)\b/g,'$1');
const standArt=read('stand-art.mjs').replace(/\bexport (const|function)\b/g,'$1');
const app=read('app.mjs').replace(/^import .+?;\s*$/gm,'');
const js=[engine,scene,vectorArt,standArt,app].join('\n\n');
index=index.replace('<link rel="stylesheet" href="./style.css">',()=>'<style>\n'+styles+'\n</style>');
index=index.replace('<script type="module" src="./app.mjs"></script>',()=>'<script>\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>');
index=index.replace(/\.\/assets\/lemonade-inc-logo\.webp/g,logoData);
index=index.replace(/\.\/assets\/lemonade-inc-icon\.webp/g,iconData);
index=index.replace(/<link rel="icon"[^>]*>/g,'');
index=index.replace(/<link rel="manifest"[^>]*>/g,'');
index=index.replace('<!-- standalone marker -->','');
writeFileSync(new URL('../play.html',import.meta.url),index);
console.log('Created single-file play.html ('+Math.round(Buffer.byteLength(index)/1024)+' kB)');
