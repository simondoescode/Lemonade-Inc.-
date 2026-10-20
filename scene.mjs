/* Original isometric pixel-art town. All geometry is generated locally, no third-party assets. */
const rect=(x,y,w,h,c,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${more}/>`;
const poly=(pts,c,more='')=>`<polygon points="${pts}" fill="${c}" ${more}/>`;
const line=(x1,y1,x2,y2,c,w=3)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
const iso=(x,y,w,d,h,front='#ffc875',side='#c9784c',top='#ffe6a2')=>{
 const dx=d,dy=-Math.round(d*.52);
 return `<g shape-rendering="crispEdges">${poly(`${x},${y-h} ${x+dx},${y-h+dy} ${x+w+dx},${y-h+dy} ${x+w},${y-h}`,top)}${poly(`${x+w},${y-h} ${x+w+dx},${y-h+dy} ${x+w+dx},${y+dy} ${x+w},${y}`,side)}${rect(x,y-h,w,h,front)}${line(x,y-h,x+w,y-h,'#654d53',3)}${line(x+w,y-h,x+w+dx,y-h+dy,'#654d53',3)}</g>`;
};
const tuft=(x,y,c='#469d55')=>`${rect(x,y,8,4,c)}${rect(x+4,y-5,7,5,c)}${rect(x+12,y+1,5,3,'#2d8053')}`;
const tree=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})" shape-rendering="crispEdges">
 <ellipse rx="43" ry="14" fill="#39754c" opacity=".23"/>
 ${rect(-7,-68,17,70,'#9e663f')}${rect(3,-58,7,58,'#71482f')}
 ${rect(-39,-123,67,65,'#247f4b')}${rect(-48,-111,76,42,'#268f53')}
 ${rect(-32,-143,57,39,'#45bd61')}${rect(-19,-155,34,28,'#69d977')}
 ${rect(-40,-117,18,17,'#77e378')}${rect(12,-134,19,21,'#70d875')}
 ${rect(19,-88,20,16,'#1b714c')}
 </g>`;
const cloud=(x,y)=>`<g shape-rendering="crispEdges">${rect(x+24,y,75,16,'#fff9d8')}${rect(x,y+17,135,20,'#fff9d8')}${rect(x+45,y-16,46,19,'#fff9d8')}${rect(x+18,y+36,92,7,'#d8eff0')}</g>`;
const person=(x,y,shirt='#f15b65',scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})" shape-rendering="crispEdges">${rect(-10,-49,20,17,'#f7bf8b')}${rect(-13,-34,26,21,shirt)}${rect(-11,-13,9,17,'#3e5b80')}${rect(3,-13,9,17,'#3e5b80')}${rect(-10,-51,20,6,'#5c3c36')}${rect(-6,-44,3,3,'#433837')}${rect(4,-44,3,3,'#433837')}</g>`;
const building=(x,y,w,d,h,color,roof='#de6960')=>`<g>${iso(x,y,w,d,h,color,'#bf8065','#ffe1ae')}
 ${rect(x+Math.round(w*.16),y-h+26,28,34,'#65c9dc', 'stroke="#fff2ba" stroke-width="5"')}
 ${rect(x+Math.round(w*.6),y-h+26,28,34,'#65c9dc','stroke="#fff2ba" stroke-width="5"')}
 ${rect(x+Math.round(w*.42),y-57,36,57,'#885747')}
 ${rect(x+Math.round(w*.42)+26,y-32,4,4,'#ffda64')}
 ${poly(`${x-9},${y-h} ${x+d-9},${y-h-Math.round(d*.52)-34} ${x+w+d+9},${y-h-Math.round(d*.52)-34} ${x+w+9},${y-h}`,roof)}
 ${line(x-9,y-h,x+w+9,y-h,'#773f51',5)}
 </g>`;
const shop=(x,y,label,color)=>`<g>${iso(x,y,162,51,126,color,'#bf7952','#f9e9bd')}
 ${rect(x+15,y-92,128,57,'#4d9daf','stroke="#ffe9b4" stroke-width="6"')}
 ${rect(x+9,y-126,145,23,'#e65d64')}${rect(x+26,y-126,18,23,'#fff2ba')}${rect(x+63,y-126,18,23,'#fff2ba')}${rect(x+99,y-126,18,23,'#fff2ba')}
 ${rect(x+21,y-170,117,30,'#ffe26c','stroke="#7d5262" stroke-width="4"')}
 <text x="${x+80}" y="${y-149}" font-family="monospace" text-anchor="middle" font-size="18" font-weight="900" fill="#674153">${label}</text></g>`;
const stand=()=>`<g shape-rendering="crispEdges">
 <ellipse cx="490" cy="407" rx="155" ry="22" fill="#477752" opacity=".25"/>
 ${iso(360,398,212,53,120,'#f2c46d','#d78e47','#ffe39a')}
 ${rect(371,308,190,80,'#ffe09a')}${rect(371,367,190,24,'#e9a746')}
 ${rect(381,350,167,29,'#258c69')}${rect(385,352,159,22,'#267e61')}
 <text x="465" y="369" text-anchor="middle" font-family="monospace" font-weight="900" font-size="16" fill="#fff7ca">LEMONADE!</text>
 ${rect(367,257,10,57,'#76504a')}${rect(563,244,11,74,'#76504a')}
 ${poly('340,277 408,220 602,220 576,277','#f76d56')}
 ${poly('357,277 420,220 447,220 390,277','#fff0a9')}
 ${poly('424,277 481,220 512,220 459,277','#fff0a9')}
 ${poly('492,277 540,220 570,220 525,277','#fff0a9')}
 ${poly('340,277 576,277 576,303 554,303 554,294 529,294 529,303 504,303 504,294 479,294 479,303 454,303 454,294 429,294 429,303 404,303 404,294 379,294 379,303 354,303 354,294 340,294','#e65452')}
 ${rect(355,277,28,17,'#fff1a1')}${rect(407,277,27,17,'#fff1a1')}${rect(458,277,28,17,'#fff1a1')}${rect(509,277,28,17,'#fff1a1')}
 ${rect(391,319,35,26,'#7ac0c5')}${rect(396,311,25,8,'#eef9e0')}
 ${rect(519,326,20,23,'#f7d04a')}${rect(522,320,12,7,'#fff6be')}
 ${rect(445,388,38,12,'#f3e9ac')}${rect(452,394,22,10,'#ba8648')}
 ${rect(590,343,30,30,'#e4a651')}${rect(595,348,20,10,'#f5dd7a')}
 ${person(341,390,'#f15d69',.88)}
 </g>`;
/* Elevated neighbourhood tiles: lawns, diagonal asphalt roads, kerbs and pavements. */
const hedge=(x,y,w=65)=>`${iso(x,y,w,12,17,'#218b4d','#155c39','#39b95b')}${Array.from({length:Math.floor(w/16)},(_,i)=>rect(x+5+i*16,y-18,8,3,'#66d475')).join('')}`;
const flowers=(x,y)=>[0,13,26,38].map((v,i)=>`${rect(x+v,y-5-(i%2)*4,7,7,i%2?'#ffe8a2':'#ff91ac')}${rect(x+v+2,y-3-(i%2)*4,3,3,'#fff8d3')}`).join('');
const sidewalk=(shift=0)=>`${poly('0,110 900,388 900,463 0,187','#c9cbd0')}${poly('0,109 900,387 900,404 0,126','#f1f0e8')}${Array.from({length:13},(_,i)=>line(i*93-280+shift,12,i*93+55+shift,237,'#b9b8b6',1.5)).join('')}`;
const roads=()=>`
 ${poly('0,128 900,403 900,490 0,226','#484750')}
 ${poly('0,112 900,389 900,407 0,130','#f0eeea')}
 ${poly('0,128 900,405 900,415 0,140','#9fa0a3')}
 ${poly('0,225 900,490 900,465 0,203','#f0eeea')}
 ${poly('0,209 900,470 900,480 0,220','#a8a8aa')}
 ${Array.from({length:9},(_,i)=>{const x=i*126-150;return line(x,211+x*.298,x+55,227+(x+55)*.298,'#99979b',3)}).join('')}
 ${poly('0,357 470,202 552,230 0,415','#ece9e5')}
 ${poly('0,367 470,211 544,235 0,429','#a7a6a6')}
 ${Array.from({length:8},(_,i)=>line(i*88-165,414-i*25,i*88-155,423-i*25,'#b8b8ba',1.2)).join('')}
 `;
const mailbox=(x,y)=>`${rect(x,y-34,5,34,'#6c4b43')}${rect(x-8,y-43,27,12,'#fff6ea','stroke="#514b54" stroke-width="3"')}${rect(x+12,y-48,5,9,'#ed5f61')}`;
const neighbourhood=()=>`${rect(0,0,900,490,'#30b866')}
 ${[0,1,2,3,4].map(i=>tuft(i*155+20,65)).join('')}
 ${building(20,180,170,57,134,'#b77d9b','#e6c9bf')}
 ${building(625,182,178,57,136,'#d9a75d','#6bcdbd')}
 ${hedge(240,164,114)}${hedge(743,231,126)}
 ${tree(404,149,.66)}${tree(852,206,.74)}
 ${roads()}
 ${rect(10,342,345,148,'#31bd64')}
 ${poly('0,350 392,231 453,249 0,413','#f0efed')}
 ${poly('0,361 392,242 441,258 0,427','#b4b4b2')}
 ${building(-49,413,186,70,184,'#c28aa6','#ddcbc2')}
 ${building(739,477,198,74,178,'#e4ce7a','#99d9de')}
 ${hedge(183,364,95)}${hedge(734,443,111)}
 ${tree(187,391,.62)}${tree(651,474,.72)}
 ${flowers(75,391)}${flowers(782,442)}
 ${mailbox(361,277)}
 `;
const plaza=()=>`${rect(0,0,900,490,'#8acb85')}${poly('0,247 900,180 900,490 0,490','#b5b6b2')}${poly('0,290 900,223 900,288 0,351','#ededdf')}${[70,260,460,690].map(x=>line(x,294,x+20,349,'#c3c2b7',2)).join('')}${shop(35,272,'MARKET','#ffcf92')}${shop(695,268,'STORES','#d3a7c2')}${tree(303,272,.77)}${tree(614,298,.75)}${hedge(300,325,105)}`;
const environment=(id)=>{
 if(id==='suburbs')return neighbourhood();
 if(id==='park')return `${rect(0,0,900,490,'#5dbf6f')}${poly('0,260 900,135 900,490 0,490','#63be63')}${poly('0,370 900,212 900,276 0,438','#efdfba')}${[70,225,725,850].map((x,i)=>tree(x,260+(i%2)*90,.6+i*.08)).join('')}${hedge(350,330,160)}${flowers(235,360)}`;
 if(id==='beach')return `${rect(0,0,900,490,'#65cad8')}${poly('0,150 900,120 900,490 0,490','#f1d48e')}${poly('0,105 900,75 900,185 0,230','#40b8ca')}${poly('0,223 900,177 900,197 0,246','#fff3d9')}${shop(40,287,'ICE CREAM','#f6bd9e')}${tree(795,317,.64)}`;
 if(id==='station')return `${plaza()}${shop(342,217,'STATION','#a9ced0')}`;
 if(id==='downtown')return `${rect(0,0,900,490,'#a5bdaf')}${[0,1,2,3,4,5].map((i)=>iso(i*160-22,292,115,39,155+(i%3)*45,['#6facbc','#e5ae83','#8cc3a1'][i%3],'#678b9f','#d6d8bd')).join('')}${plaza()}`;
 return plaza();
};
const pavement=()=>`${poly('0,475 490,326 900,442 900,490','#57b964')}${poly('0,458 490,314 900,422 900,442 490,335 0,480','#f1ece1')}${[96,254,625,754].map(x=>tuft(x,470)).join('')}`;
export function sceneSVG(location='suburbs',weather='Sunny'){
 const id=['suburbs','park','beach','station','downtown','mall'].includes(location)?location:'suburbs';
 const rainy=weather==='Rainy';
 return `<svg viewBox="0 0 900 490" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="crispEdges">
 <rect width="900" height="490" fill="${rainy?'#a8ced4':'#91dbe7'}"/>
 ${rect(0,232,900,258,rainy?'#91bc9e':'#8fcb83')}
 ${rect(744,55,67,67,rainy?'#e2e4d5':'#ffde69')}
 ${rect(759,43,37,12,rainy?'#e2e4d5':'#ffed9a')}
 ${cloud(120,72)}${cloud(520,46)}
 ${environment(id)}
 ${pavement()}
 ${tree(26,433,.6)}${tree(873,425,.55)}
 ${stand()}
 ${tuft(262,429)}${tuft(645,451)}${tuft(737,469)}
 ${rainy?[130,290,470,640,790].map(x=>line(x,90,x-26,142,'#d7f4fb',3)).join(''):''}
 </svg>`;
}
