/* Original pixel overlays for the HD isometric town. No new image downloads. */
export const STAND_FEATURES=Object.freeze(['sign','blender','cooler','awning','kiosk','fridge']);
export const STAFF_ROLES=Object.freeze(['cashier','helper','mascot']);
const stRect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const stPoly=(points,c)=>`<polygon points="${points}" fill="${c}"/>`;
export function standTier(upgrades=[]){
 return upgrades.includes('kiosk')?'Deluxe Kiosk':upgrades.some(x=>STAND_FEATURES.includes(x))?'Upgraded Stand':'Classic Stand';
}
export function standFeatures(upgrades=[]){
 const owned=new Set(upgrades);
 return STAND_FEATURES.filter(id=>owned.has(id));
}
/** Additive drawn fittings, anchored above the original HD stand in each location. */
export function renderStandEvolution(upgrades=[]){
 const features=standFeatures(upgrades);
 if(!features.length)return '';
 const has=id=>features.includes(id);
 const kiosk=has('kiosk');
 const shape=[
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 164" shape-rendering="crispEdges" preserveAspectRatio="xMidYMax meet" aria-hidden="true" class="pixel-stand-art">`,
  '<g class="stand-canvas">',
  kiosk?`<g data-feature="kiosk">${stPoly('35,81 69,65 217,65 198,81','#ffe9a8')}${stPoly('35,81 198,81 198,144 35,144','#f5bd61')}${stPoly('198,81 217,65 217,126 198,144','#d88b48')}${stRect(43,91,147,45,'#fff0ad')}${stRect(47,95,139,35,'#337e79')}${stRect(53,99,127,29,'#5eb0a9')}${stRect(35,133,163,12,'#ca8247')}${stPoly('198,133 217,118 217,132 198,145','#ab6b43')}${stRect(43,137,147,7,'#ffe3a0')}${stRect(47,86,143,6,'#e98058')}${stRect(43,144,10,12,'#80524f')}${stRect(181,144,10,12,'#80524f')}${stRect(65,143,108,7,'#9d5d40')}</g>`: '',
  has('awning')?`<g data-feature="awning">${stRect(45,53,5,80,'#815456')}${stRect(198,53,5,79,'#815456')}${stPoly('24,61 64,36 213,36 197,61','#fff0ab')}${stPoly('24,61 197,61 203,80 25,80','#f36f61')}${stRect(45,61,22,17,'#fff5b7')}${stRect(91,61,22,17,'#fff5b7')}${stRect(138,61,22,17,'#fff5b7')}${stRect(184,61,16,17,'#fff5b7')}${stPoly('64,36 213,36 205,42 59,42','#ffcf69')}</g>`: '',
  has('sign')?`<g data-feature="sign" class="stand-neon">${stRect(90,10,4,39,'#77504b')}${stRect(175,10,4,39,'#77504b')}${stRect(80,4,110,31,'#754360')}${stRect(84,8,102,23,'#ffe36b')}${stRect(89,12,92,15,'#2c8666')}<text x="135" y="24" font-family="monospace" font-size="12" font-weight="900" letter-spacing="1" text-anchor="middle" fill="#fff4b0">LEMONADE</text>${stRect(74,14,4,7,'#ffec7a')}${stRect(192,11,4,8,'#ffec7a')}</g>`: '',
  has('blender')?`<g data-feature="blender" class="stand-juicer">${stRect(78,99,25,4,'#6c5861')}${stRect(82,103,19,17,'#a8e5df')}${stRect(85,106,13,12,'#ffdd60')}${stRect(83,120,17,7,'#d8e6dc')}${stRect(80,127,24,8,'#467c86')}${stRect(83,130,5,3,'#fff2b0')}${stRect(88,93,12,5,'#edf6d7')}</g>`: '',
  has('cooler')?`<g data-feature="cooler">${stPoly('11,131 23,122 69,122 57,131','#d4f7f5')}${stRect(11,131,46,25,'#66c5df')}${stPoly('57,131 69,122 69,145 57,156','#408ab2')}${stRect(15,135,38,6,'#eaf8e9')}${stRect(27,142,12,10,'#f6f8ef')}${stRect(31,144,4,6,'#62c5de')}</g>`: '',
  has('fridge')?`<g data-feature="fridge">${stPoly('199,87 209,80 231,80 221,87','#e0fff1')}${stRect(199,87,22,66,'#fff5d9')}${stPoly('221,87 231,80 231,145 221,153','#72b4b5')}${stRect(202,93,16,26,'#75cfbd')}${stRect(205,96,10,20,'#d8f9e0')}${stRect(206,124,3,17,'#f7bf59')}${stRect(208,154,15,4,'#6e696b')}</g>`: '',
  '</g></svg>'
 ];
 return shape.join('');
}
const costume={
 cashier:`<svg viewBox="0 0 64 72" class="staff-outfit" aria-hidden="true" shape-rendering="crispEdges">${stRect(16,7,29,8,'#295e87')}${stRect(10,13,35,6,'#ffd862')}${stRect(18,42,27,18,'#2e84a3')}${stRect(24,46,15,6,'#ffe7a2')}${stRect(36,50,23,14,'#514657')}${stRect(39,48,17,4,'#f0d66d')}${stRect(40,56,15,3,'#7cf0bb')}</svg>`,
 helper:`<svg viewBox="0 0 64 72" class="staff-outfit" aria-hidden="true" shape-rendering="crispEdges">${stRect(15,3,8,13,'#fff5dd')}${stRect(23,1,19,16,'#fff5dd')}${stRect(42,5,7,12,'#fff5dd')}${stRect(14,16,35,6,'#d2f0e3')}${stRect(18,41,26,22,'#fff5db')}${stRect(28,42,6,20,'#f6ad64')}${stRect(45,45,13,16,'#e9eff3')}${stRect(48,47,8,10,'#ffe065')}${stRect(47,61,13,4,'#b2f0df')}</svg>`,
 mascot:`<svg viewBox="0 0 64 72" class="staff-outfit mascot-art" aria-hidden="true" shape-rendering="crispEdges">${stRect(13,62,13,8,'#595067')}${stRect(38,62,13,8,'#595067')}${stRect(8,41,10,13,'#ffe979')}${stRect(46,38,10,13,'#ffe979')}${stRect(4,35,8,12,'#3f9562')}${stRect(53,32,8,12,'#3f9562')}${stPoly('29,3 39,3 43,12 21,12','#3ca269')}${stRect(22,9,21,6,'#246d50')}${stPoly('27,11 40,11 52,24 52,53 39,66 22,66 10,53 10,26','#ffce3f')}${stRect(14,25,34,28,'#ffe77c')}${stRect(21,31,6,7,'#56475a')}${stRect(38,31,6,7,'#56475a')}${stRect(23,45,20,5,'#b36e49')}${stRect(26,49,14,4,'#fff3c1')}${stRect(17,54,31,5,'#f7ba36')}</svg>`
};
export function renderStaffCostume(role){
 return STAFF_ROLES.includes(role)?costume[role]:'';
}
