import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const port=Number(process.env.PORT)||4173;
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json','.json':'application/json'};
createServer(async(req,res)=>{
 try{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
  const url=new URL(req.url,'http://localhost');
  const dest=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(dest!==root&&!dest.startsWith(root+sep)){res.writeHead(403);return res.end();}
  if(!(await stat(dest)).isFile())throw Error('not a file');
  const content=await readFile(dest);
  res.writeHead(200,{'content-type':types[extname(dest)]||'application/octet-stream','cache-control':'no-cache','x-content-type-options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:content);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log('Squeeze Street: http://localhost:'+port));
