import {copyFileSync,existsSync,statSync} from 'node:fs';

const source=new URL('../play.html',import.meta.url);
const destination=new URL('../dist/play.html',import.meta.url);
if(!existsSync(source))throw new Error('Standalone game not generated');
if(!existsSync(new URL('../dist/index.html',import.meta.url)))throw new Error('Vite output missing');
copyFileSync(source,destination);
if(statSync(destination).size<statSync(source).size)throw new Error('Standalone game copy truncated');
console.log('Published standalone offline edition:',statSync(destination).size,'bytes');
