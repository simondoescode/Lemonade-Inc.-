/* Original scalable vector scenery and character artwork, drawn entirely in SVG. */
const SUBURB_SVG = `<svg viewBox="0 0 900 490" preserveAspectRatio="xMidYMid slice"
 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="geometricPrecision">
 <defs>
  <g id="house" stroke="#4a4852" stroke-width="3" stroke-linejoin="round">
   <ellipse cx="107" cy="0" rx="121" ry="19" fill="#18754d" opacity=".18" stroke="none"/>
   <path d="M150-121 204-149V-33L150 0Z" fill="#b18475"/>
   <path d="M0-126H150V0H0Z" fill="var(--wall,#e5ac8c)"/>
   <path d="M0-126 75-196 150-126" fill="var(--wall,#e5ac8c)"/>
   <path d="M-13-127 72-213 164-125 150-120 75-192 1-117Z" fill="var(--roof,#c9b3bc)" stroke-width="4"/>
   <path d="M72-213 125-239 219-152 164-125Z" fill="var(--roof,#c9b3bc)" stroke-width="4"/>
   <path d="M164-125 219-152 204-140 150-113Z" fill="#5a5867"/>
   <path d="M17-106h35v42H17zm82 0h35v42H99z" fill="#6fcef0" stroke="#f2f1e6" stroke-width="5"/>
   <path d="M34-107v44m82-44v44M15-86h39m43 0h39" stroke="#f8ffff" stroke-width="2.6"/>
   <rect x="60" y="-61" width="31" height="62" fill="#94645b" stroke="#ffecd3" stroke-width="4"/>
   <rect x="83" y="-31" width="4" height="4" fill="#ffe893" stroke="none"/>
   <path d="M55 0h40l12 8H43Z" fill="#d4d0c8"/>
   <path d="M14-60h43v6H14Z" fill="#7d6958"/>
   <path d="M18-61h7v-9h7v10h7v-8h6v8h7" fill="#ffafbe" stroke="#327d55" stroke-width="2"/>
  </g>
  <g id="tree">
   <ellipse cy="-1" rx="39" ry="12" fill="#196f45" opacity=".24"/>
   <path d="M-8-13V-91H8v78" fill="#895a35" stroke="#645038" stroke-width="3"/>
   <path d="M-34-94q-25-15-8-40 8-17 30-19 14-26 46-9 25 3 29 27 27 9 16 39-17 21-49 17-28 14-64-15" fill="#238b4e" stroke="#336b42" stroke-width="3"/>
   <path d="M-34-116q-8-26 24-27 9-24 34-18 25 4 26 29 23 16 2 24" fill="#50c765"/>
   <path d="M-24-129q11-18 35-17" fill="none" stroke="#86e77e" stroke-width="7"/>
  </g>
  <g id="hedge">
   <path d="M0-22 14-33H92L106-22V0H0Z" fill="#23884a" stroke="#356946" stroke-width="2"/>
   <path d="M0-22 14-33H92L106-22Z" fill="#56ca67"/>
   <path d="M12-24h15m9-2h20m9 2h26" fill="none" stroke="#90ed7a" stroke-width="4"/>
  </g>
  <g id="flower">
   <path d="M0 5v-8" fill="none" stroke="#337c4b" stroke-width="3"/>
   <circle cx="0" cy="-4" r="6" fill="#ff93ba"/>
   <circle cx="0" cy="-4" r="2.3" fill="#ffed85"/>
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
 <path d="M349 345q-7 17 21 22 32 7 65-5 13-15-21-26Z" fill="#21784d" opacity=".27"/>
 <g class="svg-lemon-cart" transform="translate(358 312)" stroke-linejoin="round">
  <path d="M1 7h107v50H1z" fill="#ffca39" stroke="#73543f" stroke-width="4"/>
  <path d="M108 7l16-16v53l-16 13z" fill="#cc9934" stroke="#73543f" stroke-width="4"/>
  <path d="M1 7l16-16h107L108 7Z" fill="#fff087" stroke="#73543f" stroke-width="4"/>
  <path d="M14 57v16m70-16v16" stroke="#805e45" stroke-width="7"/>
  <circle cx="113" cy="59" r="13" fill="#404751" stroke="#2d3540" stroke-width="4"/>
  <circle cx="113" cy="59" r="4" fill="#b4b9b3"/>
  <path d="M53-13v-92" stroke="#755b46" stroke-width="5"/>
  <path d="M-27-102q42-66 82-50 41 2 78 49l-74 3Z" fill="#3f89c8" stroke="#38536a" stroke-width="4"/>
  <path d="M-27-102q26-40 47-46l22 46ZM54-150q26 11 41 48H67Z" fill="#ffe374"/>
  <path d="M20-148q16-8 34-2L67-102H42Z" fill="#fff4cb"/>
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
 xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="geometricPrecision">
 <ellipse cx="24" cy="64" rx="18" ry="3.5" fill="#243c39" opacity=".25"/>
 <g class="vector-bounce" stroke="#443e48" stroke-width="1.7" stroke-linejoin="round">
  <g class="vector-leg vector-leg--back">
   <path d="M24 47h10l2 12-11 2-3-6z" fill="var(--pants)"/>
   <path d="M25 57h11l2 7H23z" fill="var(--shoe)"/>
  </g>
  <g class="vector-leg vector-leg--front">
   <path d="M14 47h11l-1 12-12 2z" fill="var(--pants)"/>
   <path d="M11 57h14l1 7H9z" fill="var(--shoe)"/>
  </g>
  <g class="vector-arm vector-arm--back"><path d="M30 29h9l2 18-9 2-4-13z" fill="var(--skin)"/></g>
  <path d="M13 29l20-2 4 23H11z" fill="var(--shirt)"/>
  <path class="vector-apron" d="M17 29h6v19h-6zM27 28h6v20h-6z" fill="#3478b1" stroke="none"/>
  <g class="vector-arm vector-arm--front"><path d="M9 30l8-1 1 17-9 1z" fill="var(--skin)"/></g>
  <g class="vector-head">
   <path class="vector-ponytail" d="M8 10h11v18H8z" fill="var(--hair)"/>
   <path d="M15 10h20v19H15z" fill="var(--skin)"/>
   <path d="M13 9l4-5h19v13l-5-3-16 2z" fill="var(--hair)"/>
   <path class="vector-hat" d="M13 5h23v9H12z" fill="#ffdb52"/>
   <path class="vector-hat" d="M25 12h18v5H25z" fill="#3382c7"/>
   <path class="vector-bow" d="M7 9 3 3l8 2 3-5 4 7-3 5z" fill="#f5a0c5"/>
   <path d="M29 19h3v4h-3z" fill="#34323a" stroke="none"/>
   <path d="M29 26h5" fill="none" stroke="#a76c61" stroke-width="1.6"/>
  </g>
  <g class="vector-cup">
   <path d="M33 29h11l-2 14h-7z" fill="#ffec89" stroke="#476d77"/>
   <path d="M33 30h11" stroke="#efffff" stroke-width="3"/>
   <path d="M39 29l2-8" stroke="#f5efff" stroke-width="2.3"/>
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
