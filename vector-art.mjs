/* Original scalable vector scenery and character artwork, drawn entirely in SVG. */
const SUBURB_SVG = `<svg viewBox="0 0 900 490" preserveAspectRatio="xMidYMid slice"
 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="crispEdges">
 <defs>
  <!-- Isometric facade with pixel-stair roof edges and hard 4px highlight blocks. -->
  <g id="house" stroke="#373f49" stroke-width="3" stroke-linejoin="miter">
   <path d="M-14-1h233v11H-14Z" fill="#156e4b" opacity=".19" stroke="none"/>
   <path d="M150-124 204-151V-33L150 0Z" fill="#916d6b"/>
   <path d="M160-107 199-127V-43L160-19Z" fill="#b38c77" stroke="none"/>
   <path d="M0-125H150V0H0Z" fill="var(--wall,#dca98f)"/>
   <path d="M0-125 74-197 150-125Z" fill="var(--wall,#dca98f)"/>
   <!-- This silhouette is deliberately stepped, not an anti-aliased triangle. -->
   <path class="pixel-roof" d="M-15-125v-11h11v-11H7v-11h11v-11h11v-11h11v-11h11v-11h11v-10h13v-10h15v10h11v10h11v11h11v11h11v11h11v11h11v11h11v11h12v11h-27l-75-71-67 71Z" fill="var(--roof,#b5b3c7)" stroke-width="4"/>
   <path d="M75-222 127-245 220-152 164-125Z" fill="var(--roof,#b5b3c7)" stroke-width="4"/>
   <path d="M166-126 220-152v12l-56 27z" fill="#595363"/>
   <path d="M20-140h20v5H20zm33-35h20v5H53zm58 27h21v5h-21zM87-211h18v5H87z" fill="#f2e8de" opacity=".4" stroke="none"/>
   <path d="M19-111h38v50H19zM95-111h38v50H95z" fill="#f7f2e4" stroke="none"/>
   <path d="M23-107h30v42H23zM99-107h30v42H99z" fill="#3b99c5" stroke="none"/>
   <path d="M27-103h17v10H27zM103-103h18v10h-18z" fill="#91eaf6" stroke="none"/>
   <path d="M36-107v42m78-42v42M22-85h33m43 0h33" fill="none" stroke="#f2faff" stroke-width="3"/>
   <path d="M16-62h43v6H16zM92-62h43v6H92z" fill="#715b52" stroke="none"/>
   <rect x="61" y="-61" width="32" height="61" fill="#925950" stroke="#f6e8cd" stroke-width="4"/>
   <rect x="85" y="-27" width="4" height="4" fill="#ffe591" stroke="none"/>
   <path d="M59 0h37l11 8H47Z" fill="#d9d9cd"/>
   <path d="M15-58h7v-8h7v8h8v-7h7v7h9" fill="#ff93ba" stroke="#277d52" stroke-width="3"/>
   <path d="M95-58h7v-7h7v7h8v-8h7v8h8" fill="#ffa4c9" stroke="#277d52" stroke-width="3"/>
  </g>
  <!-- Pixel canopy assembled from stepped vector outlines, not smooth ellipses. -->
  <g id="tree" shape-rendering="crispEdges" stroke-linejoin="miter">
   <path d="M-31-4h64v8h-64z" fill="#176e48" opacity=".23"/>
   <path d="M-10-98h20v97h-20z" fill="#825735" stroke="#4a5038" stroke-width="3"/>
   <path d="M-4-80h6v68h-6z" fill="#bf8551"/>
   <path class="pixel-canopy" d="M-46-98h-8v-25h9v-16h14v-15h22v-12h37v10h20v15h15v16h12v33h-10v13h-19v11h-55v-8h-24v-12h-13z" fill="#187b48" stroke="#326e45" stroke-width="3"/>
   <path d="M-40-123h10v-17h19v-12h36v11h19v14h14v17h-11v13h-55v-8h-32z" fill="#37aa5a"/>
   <path d="M-28-143h21v-12h31v12h18v14h-9v8h-48v-9h-13z" fill="#66d36b"/>
   <path d="M-27-133h19v5h-19zM1-150h20v5H1zM24-132h18v5H24z" fill="#9aed79"/>
   <path d="M-46-90h18v9h-18zM42-96h18v9H42z" fill="#125f40"/>
  </g>
  <g id="hedge">
   <path d="M0-22 14-33H92L106-22V0H0Z" fill="#23884a" stroke="#356946" stroke-width="2"/>
   <path d="M0-22 14-33H92L106-22Z" fill="#56ca67"/>
   <path d="M12-24h15m9-2h20m9 2h26" fill="none" stroke="#90ed7a" stroke-width="4"/>
  </g>
  <g id="flower" shape-rendering="crispEdges">
   <rect x="-1" y="-3" width="3" height="10" fill="#27774c"/>
   <rect x="-6" y="-10" width="13" height="13" fill="#ed88ae"/>
   <rect x="-3" y="-13" width="7" height="19" fill="#ffb0c9"/>
   <rect x="-2" y="-8" width="5" height="5" fill="#ffe280"/>
  </g>
 </defs>
 <path d="M0 0H900V490H0Z" fill="#35c36a"/>
 <path d="M0 0H900V126L0 66Z" fill="#3dcd78"/>
 <use href="#house" transform="translate(26 188) scale(.94)" style="--wall:#be82a2;--roof:#d6c1c5"/>
 <use href="#house" transform="translate(651 204) scale(.94)" style="--wall:#e0aa74;--roof:#8dcbd0"/>
 <use href="#hedge" transform="translate(290 173) scale(1.15 .85)"/>
 <use href="#hedge" transform="translate(799 225) scale(.9 .8)"/>
 <use href="#tree" transform="translate(438 171) scale(.76)"/>
 <use href="#tree" transform="translate(874 209) scale(.9)"/>
 <path d="M0 111 900 371V490L0 225Z" fill="#47474e" stroke="#3a3a44" stroke-width="3"/>
 <path d="M0 100 900 362V400L0 137Z" fill="#f4f2ec" stroke="#b9b7b5" stroke-width="3"/>
 <path d="M0 217 900 479V490L0 247Z" fill="#ebeae5" stroke="#aeaeae" stroke-width="3"/>
 <g stroke="#cac8c3" stroke-width="1.7">
  <path d="M53 116 65 157M146 143 159 185M239 170 253 211M332 198 346 238M425 225 439 265M518 252 532 292M611 279 625 320M704 306 718 347M797 333 811 374"/>
  <path d="M38 230 47 255M131 257 140 282M224 284 233 308M317 311 326 335M410 338 419 362M503 365 512 389M596 392 605 416M689 419 698 443M782 446 791 470"/>
 </g>
 <path d="M0 344 463 189 562 217 0 427Z" fill="#47474e" stroke="#393a40" stroke-width="3"/>
 <path d="M0 341 462 185 517 202 0 385Z" fill="#f4f2ee" stroke="#bcbbb8" stroke-width="3"/>
 <path d="M0 427 561 218 587 229 0 459Z" fill="#eceae4" stroke="#b0afad" stroke-width="3"/>
 <g fill="none" stroke="#bbb9b6" stroke-width="1.7">
  <path d="M74 316 80 360M163 286 169 331M251 257 257 299M340 228 348 268M432 198 442 235"/>
  <path d="M72 429 85 447M160 396 173 416M249 363 262 384M340 330 353 351M428 298 440 318"/>
 </g>
 <path d="M0 428 477 267 616 307 79 490H0Z" fill="#39c66a"/>
 <path d="M0 421 471 258 509 270 0 455Z" fill="#f4f2ec" stroke="#aaa9a6" stroke-width="2"/>
 <path d="M0 432 472 267 496 276 0 462Z" fill="#d1d0cb"/>
 <use href="#house" transform="translate(26 484) scale(1.05)" style="--wall:#ba79a5;--roof:#d3bac1"/>
 <use href="#house" transform="translate(728 540) scale(1.12)" style="--wall:#e2cb7e;--roof:#8fd8dd"/>
 <use href="#hedge" transform="translate(231 430) scale(1.12)"/>
 <use href="#hedge" transform="translate(647 449) scale(1.05)"/>
 <use href="#tree" transform="translate(211 471) scale(.66)"/>
 <use href="#tree" transform="translate(702 483) scale(.8)"/>
 <use href="#flower" transform="translate(160 444)"/>
 <use href="#flower" transform="translate(174 441)"/>
 <use href="#flower" transform="translate(188 437)"/>
 <use href="#flower" transform="translate(764 430)"/>
 <use href="#flower" transform="translate(777 437)"/>
 <path d="M627 277v-42" stroke="#725947" stroke-width="6"/>
 <path d="M614 232h31v-14h-31z" fill="#fff8e8" stroke="#61616b" stroke-width="3"/>
 <path d="M642 223v-12h6v12" fill="#ee5e69"/>
 <path d="M351 349h18v-6h55v6h18v14h-20v5h-53v-5h-18z" fill="#21784d" opacity=".27"/>
 <g class="svg-lemon-cart" transform="translate(358 312)" stroke-linejoin="round">
  <path d="M1 7h107v50H1z" fill="#ffca39" stroke="#73543f" stroke-width="4"/>
  <path d="M108 7l16-16v53l-16 13z" fill="#cc9934" stroke="#73543f" stroke-width="4"/>
  <path d="M1 7l16-16h107L108 7Z" fill="#fff087" stroke="#73543f" stroke-width="4"/>
  <path d="M14 57v16m70-16v16" stroke="#805e45" stroke-width="7"/>
  <path d="M104 44h19v6h6v19h-6v5h-19v-5h-6V50h6z" fill="#353d47" stroke="#283139" stroke-width="3"/>
  <rect x="109" y="55" width="9" height="9" fill="#adb6b2" stroke="none"/>
  <path d="M53-13v-92" stroke="#755b46" stroke-width="5"/>
  <path class="pixel-awning" d="M-27-101v-12h8v-12h11v-12H7v-10h20v-8h49v8h20v10h15v12h12v12h10v12Z" fill="#347ac3" stroke="#304960" stroke-width="4"/>
  <path d="M-27-101v-12h8v-12h11v-12H7v-10h20l15 46Z" fill="#ffe56c"/>
  <path d="M27-155h49l23 54H54Z" fill="#fff1b7"/>
  <path d="M98-137h13v12h12v12h10v12h-28z" fill="#ffe56c"/>
  <path d="M-27-101h160" stroke="#304960" stroke-width="3"/>
  <path d="M53-158v-7" stroke="#66534d" stroke-width="4"/>
  <path d="M20-19h23v16H20z" fill="#a3e5e8" stroke="#568e96" stroke-width="3"/>
  <path d="M23-12h16v9H23z" fill="#ffdd64"/>
  <path d="M19-23h7" stroke="#eefeff" stroke-width="3"/>
  <path d="M64-15h10v14H64zM79-15h10v14H79z" fill="#fdf4d8" stroke="#64999e" stroke-width="2"/>
  <path d="M13 34h81v18H13z" fill="#ffe472" stroke="#c4923d" stroke-width="2"/>
  <text x="54" y="46" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="900" fill="#74553a">LEMONADE</text>
 </g>
 <path d="M565 469h9v-6h7m-16 3-7-4" fill="none" stroke="#2d9859" stroke-width="4"/>
</svg>`;

const CHARACTER = `<svg class="svg-character svg-character--KIND" viewBox="0 0 48 68"
 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="crispEdges">
 <path d="M10 63h27v3H10z" fill="#253c39" opacity=".27"/>
 <g class="vector-bounce" stroke="#343b4a" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <g class="vector-leg vector-leg--back">
   <path d="M24 45h10v4h3v10h-4v4H24z" fill="var(--pants)"/>
   <path d="M24 58h12v4h4v4H24z" fill="var(--shoe)"/>
  </g>
  <g class="vector-leg vector-leg--front">
   <path d="M12 45h12v15H11v-4h1z" fill="var(--pants)"/>
   <path d="M11 58h13v4h3v4H8v-4h3z" fill="var(--shoe)"/>
  </g>
  <g class="vector-arm vector-arm--back">
   <path d="M30 29h8v5h4v13h-9v-8h-3z" fill="var(--skin)"/>
  </g>
  <path d="M14 28h19v4h4v18H10V33h4z" fill="var(--shirt)"/>
  <path d="M12 33h4v14h-4z" fill="#fff3e1" stroke="none" opacity=".32"/>
  <path class="vector-apron" d="M18 30h5v18h-5zM28 29h5v19h-5z" fill="#3679b4" stroke="none"/>
  <g class="vector-arm vector-arm--front">
   <path d="M9 30h8v6h3v12H8V34h1z" fill="var(--skin)"/>
  </g>
  <g class="vector-head">
   <path class="vector-ponytail" d="M9 12h9v18H7V16h2z" fill="var(--hair)"/>
   <path d="M15 10h18v3h4v15H15z" fill="var(--skin)"/>
   <path d="M12 9h4V4h17v3h5v10H13v-4h-1z" fill="var(--hair)"/>
   <path d="M13 12h3v7h-3z" fill="var(--hair)" stroke="none"/>
   <path class="vector-hat" d="M12 4h5V1h17v4h5v9H12z" fill="#ffdc52"/>
   <path class="vector-hat" d="M25 12h17v6H25z" fill="#3083cc"/>
   <path class="vector-bow" d="M8 5H3V0h7v4h6V0h5v9H8z" fill="#ee89bd"/>
   <rect x="29" y="19" width="4" height="4" fill="#333441" stroke="none"/>
   <path d="M28 26h5v2h-5z" fill="#a36662" stroke="none"/>
   <path d="M17 16h7v5h-7z" fill="#fff2c8" stroke="none" opacity=".3"/>
  </g>
  <g class="vector-cup">
   <path d="M35 30h10v4h-2v11h-7V34h-1z" fill="#ffe58c" stroke="#547c85"/>
   <path d="M34 29h12v4H34z" fill="#f5ffff" stroke="none"/>
   <path d="M41 27v-9h4v3h-2v6z" fill="#fff5ed" stroke="none"/>
  </g>
 </g>
</svg>`;

export function suburbSVG(weather='Sunny'){
 const rain = weather==='Rainy' ? '<path d="M45 10 24 58m155-37-21 48m162-57-21 48m159-33-21 48m165-58-21 48m170-39-21 48" fill="none" stroke="#e9f6fa" stroke-width="3" opacity=".75"/>' : '';
 return SUBURB_SVG.replace('</svg>',rain+'</svg>');
}
export function characterSVG(kind='adult'){
 const safe=['vendor','adult','child'].includes(kind)?kind:'adult';
 return CHARACTER.replace('svg-character--KIND','svg-character--'+safe);
}
