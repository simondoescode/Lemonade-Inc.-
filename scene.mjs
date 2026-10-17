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
const environment=(id)=>{
 if(id==='suburbs')return `${building(68,292,160,56,128,'#ffc78b')}${building(676,278,146,58,116,'#f8da9d','#e76d6d')}${tree(272,300,.65)}${tree(850,302,.7)}`;
 if(id==='park')return `${tree(115,314,1.12)}${tree(775,288,1.15)}${tree(280,255,.62)}${rect(635,299,120,20,'#80cfb6')}${rect(650,306,85,10,'#b3eddd')}`;
 if(id==='beach')return `${poly('0,230 900,180 900,490 0,490','#f3d782')}${poly('0,188 900,145 900,211 0,260','#5cc9d0')}${poly('0,248 900,199 900,214 0,262','#fff2ce')}${tree(130,320,.83)}${tree(800,296,.68)}`;
 if(id==='station')return `${shop(55,304,'STATION','#e5cb92')}${iso(676,300,158,48,140,'#c3bec2','#8d9ca2','#f2d59c')}${rect(708,180,96,29,'#f7e4a4')}<text x="756" y="200" font-family="monospace" font-size="17" font-weight="900" text-anchor="middle" fill="#65545d">TRAIN</text>`;
 if(id==='downtown')return `${[0,1,2,3,4,5].map((i)=>iso(i*160-22,306,115,39,155+(i%3)*45,['#6facbc','#e5ae83','#8cc3a1'][i%3],'#678b9f','#d6d8bd')).join('')}${shop(690,322,'CAFE','#f6b87c')}`;
 return `${shop(52,300,'PLAZA','#ffc09a')}${shop(684,310,'SHOPS','#f1d397')}${tree(280,291,.65)}`;
};
const pavement=()=>`${poly('0,317 472,219 900,315 900,490 0,490','#aed18e')}
 ${poly('0,365 470,262 900,350 900,456 480,361 0,474','#e3cba4')}
 ${poly('0,393 475,293 900,379 900,403 480,318 0,421','#c79e79')}
 ${poly('0,414 478,315 900,399 900,428 480,343 0,443','#f7e6bf')}
 ${poly('0,448 480,353 900,443 900,490 0,490','#8ec17f')}
 ${[80,190,680,790].map(x=>tuft(x,455)).join('')}`;
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
