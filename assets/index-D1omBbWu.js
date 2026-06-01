(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`theme`;function t(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function n(){let t=localStorage.getItem(e);return t===`light`||t===`dark`?t:null}function r(t){document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(e,t)}function i(e){let i=n()??t();r(i);let a=()=>{e.textContent=i===`dark`?`☀️`:`🌙`,e.setAttribute(`aria-label`,`Switch to ${i===`dark`?`light`:`dark`} theme`)};a(),e.addEventListener(`click`,()=>{i=i===`dark`?`light`:`dark`,r(i),a()}),window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,e=>{n()||(i=e.matches?`dark`:`light`,r(i),a())})}var a=[{id:`group_preposisi`,file:`0.json`,title:`Preposisi`,description:`Kata depan yang menghubungkan kata benda dengan kata lain`,emoji:`📌`,cardCount:14},{id:`group_konjungsi`,file:`0.json`,title:`Konjungsi`,description:`Kata penghubung antar kalimat atau kata`,emoji:`🔗`,cardCount:7},{id:`group_kondisional`,file:`0.json`,title:`Kondisional`,description:`Kata yang menyatakan syarat atau kondisi`,emoji:`🔀`,cardCount:9},{id:`group_negatif`,file:`0.json`,title:`Negatif`,description:`Kata yang menyatakan penolakan atau pengingkaran`,emoji:`❌`,cardCount:7},{id:`group_kata_tanya`,file:`0.json`,title:`Kata Tanya`,description:`Kata yang digunakan untuk bertanya`,emoji:`❓`,cardCount:9},{id:`kosakata-al-quran---part-1`,file:`1.json`,title:`Kosakata Al-Quran - Part 1`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-2`,file:`2.json`,title:`Kosakata Al-Quran - Part 2`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-3`,file:`3.json`,title:`Kosakata Al-Quran - Part 3`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-4`,file:`4.json`,title:`Kosakata Al-Quran - Part 4`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-5`,file:`5.json`,title:`Kosakata Al-Quran - Part 5`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-6`,file:`6.json`,title:`Kosakata Al-Quran - Part 6`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-7`,file:`7.json`,title:`Kosakata Al-Quran - Part 7`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-8`,file:`8.json`,title:`Kosakata Al-Quran - Part 8`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-9`,file:`9.json`,title:`Kosakata Al-Quran - Part 9`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-10`,file:`10.json`,title:`Kosakata Al-Quran - Part 10`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-11`,file:`11.json`,title:`Kosakata Al-Quran - Part 11`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-12`,file:`12.json`,title:`Kosakata Al-Quran - Part 12`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-13`,file:`13.json`,title:`Kosakata Al-Quran - Part 13`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-14`,file:`14.json`,title:`Kosakata Al-Quran - Part 14`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-15`,file:`15.json`,title:`Kosakata Al-Quran - Part 15`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-16`,file:`16.json`,title:`Kosakata Al-Quran - Part 16`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10},{id:`kosakata-al-quran---part-17`,file:`17.json`,title:`Kosakata Al-Quran - Part 17`,description:`Kata-kata bermakna yang paling sering muncul di Al-Quran`,emoji:`📖`,cardCount:10}],o=`modulepreload`,s=function(e){return`/arabic-flashcard/`+e},c={},l=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=l(t.map(t=>{if(t=s(t,n),t in c)return;c[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let l=document.createElement(`link`);if(l.rel=r?`stylesheet`:o,r||(l.as=`script`),l.crossOrigin=``,l.href=t,a&&l.setAttribute(`nonce`,a),document.head.appendChild(l),r)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},u=a,d=Object.assign({"./0.json":()=>l(()=>import(`./0-BScTcBZa.js`).then(e=>e.default),[]),"./1.json":()=>l(()=>import(`./1-C2GF66to.js`).then(e=>e.default),[]),"./10.json":()=>l(()=>import(`./10-Dhs7UA3G.js`).then(e=>e.default),[]),"./11.json":()=>l(()=>import(`./11-Cyj9aVE1.js`).then(e=>e.default),[]),"./12.json":()=>l(()=>import(`./12-BlVnq3rk.js`).then(e=>e.default),[]),"./13.json":()=>l(()=>import(`./13-C1v3uKKI.js`).then(e=>e.default),[]),"./14.json":()=>l(()=>import(`./14-BzGxyXCN.js`).then(e=>e.default),[]),"./15.json":()=>l(()=>import(`./15-gw1Kw8xL.js`).then(e=>e.default),[]),"./16.json":()=>l(()=>import(`./16-C7MadeYA.js`).then(e=>e.default),[]),"./17.json":()=>l(()=>import(`./17-Xt_sqPyq.js`).then(e=>e.default),[]),"./2.json":()=>l(()=>import(`./2-DRBgMzsW.js`).then(e=>e.default),[]),"./3.json":()=>l(()=>import(`./3-BxdFKAhP.js`).then(e=>e.default),[]),"./4.json":()=>l(()=>import(`./4-COZmwl2k.js`).then(e=>e.default),[]),"./5.json":()=>l(()=>import(`./5-D9XQC-Pf.js`).then(e=>e.default),[]),"./6.json":()=>l(()=>import(`./6-DDIRnW6n.js`).then(e=>e.default),[]),"./7.json":()=>l(()=>import(`./7-gwW9AVP8.js`).then(e=>e.default),[]),"./8.json":()=>l(()=>import(`./8-C22Q7VMV.js`).then(e=>e.default),[]),"./9.json":()=>l(()=>import(`./9-C7vRr8sp.js`).then(e=>e.default),[])});function f(e,t){let n=e.groups.find(e=>e.id===t);return n?{id:n.id,title:n.group_title,description:n.group_description,emoji:u.find(e=>e.id===t)?.emoji??`📚`,cards:n.words.map((e,t)=>({id:`${n.id}_${t}`,arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:n.group_title,quranExample:e.quran_example}))}:null}function p(e){return{id:e.meta.title.toLowerCase().replace(/\s+/g,`-`),title:e.meta.title,description:e.meta.description,emoji:`📖`,cards:e.cards.map(e=>({id:String(e.id),arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:e.word_type,root:e.root,forms:e.forms,relatedWords:e.related_words,quranExample:e.quran_example}))}}function m(e){return typeof e==`object`&&!!e&&`groups`in e}function h(e){return typeof e==`object`&&!!e&&`cards`in e}async function g(){let e=[...new Set(u.map(e=>e.file))].filter(e=>e!==`0.json`);return(await Promise.all(e.map(async e=>{let t=d[`./${e}`];if(!t)return[];let n=await t();return h(n)?p(n).cards:[]}))).flat()}async function _(e){let t=u.find(t=>t.id===e);if(!t)return null;let n=d[`./${t.file}`];if(!n)return null;let r=await n();return m(r)?f(r,e):h(r)?p(r):null}function v(e){return localStorage.getItem(`quiz_score_${e}`)}function y(e){return Number(localStorage.getItem(`last_visited_${e}`)??0)}function b(){u.forEach(e=>{localStorage.removeItem(`quiz_score_${e.id}`),localStorage.removeItem(`last_visited_${e.id}`)})}function x(e,t,n){let r=document.createElement(`div`);r.className=`confirm-overlay`,r.innerHTML=`
    <div class="confirm-dialog">
      <p class="confirm-title">${e}</p>
      <p class="confirm-message">${t}</p>
      <div class="confirm-actions">
        <button class="confirm-cancel">Cancel</button>
        <button class="confirm-ok">Reset</button>
      </div>
    </div>
  `;let i=()=>document.body.removeChild(r);r.querySelector(`.confirm-cancel`).addEventListener(`click`,i),r.querySelector(`.confirm-ok`).addEventListener(`click`,()=>{i(),n()}),r.addEventListener(`click`,e=>{e.target===r&&i()}),document.body.appendChild(r),r.querySelector(`.confirm-cancel`).focus()}function S(){return u.some(e=>v(e.id)!==null||y(e.id)>0)}function C(e,t){let n=[...u].sort((e,t)=>y(t.id)-y(e.id)),r=t?n.filter(e=>v(e.id)===null):n,i=e.querySelector(`.deck-grid`);i.innerHTML=r.length===0?`<p class="nav-empty">All decks have been quizzed. Well done!</p>`:r.map(e=>{let t=v(e.id);return`
        <div class="deck-card">
          <button class="deck-card-study" data-deck-id="${e.id}" aria-label="Study ${e.title}">
            ${t===null?``:`<span class="deck-score-chip">${t}</span>`}
            <span class="deck-emoji">${e.emoji}</span>
            <h3 class="deck-title">${e.title}</h3>
            <p class="deck-desc">${e.description}</p>
          </button>
          <div class="deck-card-footer">
            <span class="deck-count">${e.cardCount} cards</span>
            <button class="btn-quiz" data-quiz-id="${e.id}" aria-label="Take quiz for ${e.title}">Quiz →</button>
          </div>
        </div>
      `}).join(``),i.querySelectorAll(`.deck-card-study`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})}),i.querySelectorAll(`.btn-quiz`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.quizId}/quiz`})})}function w(e){let t=e.querySelector(`.btn-reset-all`);t&&(t.disabled=!S())}function T(e){let t=!1;e.innerHTML=`
    <div class="nav-page">
      <div class="nav-hero">
        <h2>Choose a Deck</h2>
        <p class="nav-subtitle">Select a category to start studying</p>
      </div>
      <div class="nav-toolbar">
        <div class="nav-filters">
          <button class="nav-filter-chip" data-filter="unfinished">Unfinished</button>
        </div>
        <div class="nav-toolbar-right">
          <button class="btn-start-test">Take Exam</button>
          <button class="btn-reset-all" ${S()?``:`disabled`}>Reset all progress</button>
        </div>
      </div>
      <div class="deck-grid"></div>
    </div>
  `,C(e,t),e.querySelector(`.btn-start-test`).addEventListener(`click`,()=>{window.location.hash=`test`}),e.querySelector(`[data-filter="unfinished"]`).addEventListener(`click`,n=>{let r=n.currentTarget;t=!t,r.classList.toggle(`active`,t),C(e,t)}),e.querySelector(`.btn-reset-all`).addEventListener(`click`,()=>{x(`Reset all progress?`,`This will clear all quiz scores and visit history.`,()=>{b(),t=!1,e.querySelector(`[data-filter="unfinished"]`).classList.remove(`active`),w(e),C(e,t)})})}async function E(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await _(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Deck not found.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}localStorage.setItem(`last_visited_${t}`,Date.now().toString());let r=0,i=!1;function a(){let t=n.cards[r],a=n.cards.length;e.innerHTML=`
      <div class="fc-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${n.emoji} ${n.title}</span>
          <span class="fc-progress">${r+1} / ${a}</span>
        </div>

        <div class="fc-area">
          <div class="fc-card ${i?`flipped`:``}" id="fc-card" role="button" tabindex="0" aria-label="Flip card">
            <div class="fc-face fc-front">
              <span class="fc-arabic">${t.arabic}</span>
            </div>
            <div class="fc-face fc-back">
              ${t.wordType?`<span class="fc-badge">${t.wordType}</span>`:``}
              <span class="fc-transliteration">${t.transliteration}</span>
              <span class="fc-english">${t.indonesian}</span>
              ${t.root?`<span class="fc-root">Root: ${t.root}</span>`:``}
              ${t.forms?`
                <div class="fc-forms">
                  ${Object.entries(t.forms).filter(([,e])=>e).map(([e,t])=>`<span class="fc-form"><em>${e}</em> ${t}</span>`).join(``)}
                </div>`:``}
              ${t.relatedWords?.length?`
                <div class="fc-related">
                  <span class="fc-related-label">Related</span>
                  ${t.relatedWords.map(e=>`
                    <span class="fc-related-word"><span class="fc-related-arabic">${e.arabic}</span> — ${e.translation}</span>
                  `).join(``)}
                </div>`:``}
              ${t.quranExample?`
                <div class="fc-quran">
                  <span class="fc-quran-arabic">${t.quranExample.arabic}</span>
                  <span class="fc-quran-translation">${t.quranExample.translation}</span>
                  <span class="fc-quran-ref">${t.quranExample.surah} ${t.quranExample.ayah}</span>
                </div>`:``}
            </div>
          </div>
          <p class="fc-hint">${i?`Click card to flip back`:`Click card to reveal`}</p>
        </div>

        <div class="fc-controls">
          <button class="btn-nav" id="btn-prev" ${r===0?`disabled`:``}>← Prev</button>
          <button class="btn-nav" id="btn-next" ${r===a-1?`disabled`:``}>Next →</button>
        </div>

        <div class="fc-dots">
          ${n.cards.map((e,t)=>`
            <span class="fc-dot ${t===r?`active`:``}" data-index="${t}"></span>
          `).join(``)}
        </div>
      </div>
    `,o()}function o(){e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let t=e.querySelector(`#fc-card`),o=()=>{i=!i,a()};t.addEventListener(`click`,o),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())}),e.querySelector(`#btn-prev`)?.addEventListener(`click`,()=>{r>0&&(r--,i=!1,a())}),e.querySelector(`#btn-next`)?.addEventListener(`click`,()=>{r<n.cards.length-1&&(r++,i=!1,a())}),e.querySelectorAll(`.fc-dot`).forEach(e=>{e.addEventListener(`click`,()=>{r=Number(e.dataset.index),i=!1,a()})})}a()}function D(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function O(e,t){return D(e).slice(0,t)}function k(e,t){let n=O(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:D([e.indonesian,...n])}}function A(e,t){let n=O(t.filter(t=>t.id!==e.id),3).map(e=>e.quranExample.translation);return{prompt:`${e.quranExample.arabic}\n<span class="quiz-prompt-ref">${e.quranExample.surah} ${e.quranExample.ayah}</span>`,promptLabel:`What is the translation of this verse?`,correct:e.quranExample.translation,options:D([e.quranExample.translation,...n])}}function j(e){if(e.length<4)return[];let t=O(e,Math.min(10,e.length)).map(t=>k(t,e)),n=e.filter(e=>e.quranExample),r=n.length>=4?O(n,Math.min(5,n.length)).map(e=>A(e,n)):[];return D([...t,...r])}function M(e,t,n){localStorage.setItem(`quiz_score_${e}`,`${t}/${n}`)}async function N(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await _(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Deck not found.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let r=j(n.cards);if(r.length===0){e.innerHTML=`
      <div class="error-page">
        <p>Not enough cards to generate a quiz (minimum 4).</p>
        <button class="btn-back" onclick="window.location.hash='deck/${t}'">← Back to Deck</button>
      </div>
    `;return}let i=0,a=0,o=!1;function s(){let l=r[i],u=r.length,d=i===u-1;e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${n.emoji} ${n.title}</span>
          <span class="fc-progress">${i+1} / ${u}</span>
        </div>

        <div class="quiz-body">
          <p class="quiz-label">${l.promptLabel}</p>
          <div class="quiz-prompt">${l.prompt.replace(/\n/g,`<br>`)}</div>

          <div class="quiz-options">
            ${l.options.map(e=>`
              <button class="quiz-option" data-value="${encodeURIComponent(e)}">${e}</button>
            `).join(``)}
          </div>

          <button class="btn-quiz-next" id="btn-next" style="display:none">
            ${d?`Show Results`:`Next Question →`}
          </button>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelectorAll(`.quiz-option`).forEach(t=>{t.addEventListener(`click`,()=>{o||(o=!0,decodeURIComponent(t.dataset.value)===l.correct?(a++,t.classList.add(`correct`)):(t.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===l.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{i<r.length-1?(i++,o=!1,s()):(M(t,a,r.length),c())})}function c(){let i=r.length;e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${n.emoji} ${n.title}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${a} / ${i}</div>
          <p class="quiz-result-label">${a===i?`Perfect!`:a>=i*.7?`Well done!`:`Keep practicing!`}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Retry Quiz</button>
            <button class="btn-quiz-back">← Back</button>
          </div>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{N(e,t)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}s()}var P=50,F=`test_score`;function I(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function L(e,t){return I(e).slice(0,t)}function R(e,t){let n=L(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:I([e.indonesian,...n])}}function z(e,t){let n=L(t.filter(t=>t.id!==e.id),3).map(e=>e.quranExample.translation);return{prompt:`${e.quranExample.arabic}\n<span class="quiz-prompt-ref">${e.quranExample.surah} ${e.quranExample.ayah}</span>`,promptLabel:`What is the translation of this verse?`,correct:e.quranExample.translation,options:I([e.quranExample.translation,...n])}}function B(e){let t=e.filter(e=>e.quranExample),n=t.length>=4?Math.min(15,t.length):0,r=P-n,i=L(e,Math.min(r,e.length)).map(t=>R(t,e)),a=n>0?L(t,n).map(e=>z(e,t)):[];return I([...i,...a])}function V(e,t){localStorage.setItem(F,`${e}/${t}`)}async function H(e){e.innerHTML=`<div class="fc-loading">Loading test…</div>`;let t=await g();if(t.length<4){e.innerHTML=`
      <div class="error-page">
        <p>Not enough cards to generate a test.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let n=B(t),r=0,i=0,a=!1;function o(){let t=n[r],c=n.length,l=r===c-1;e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">Exam</span>
          <span class="fc-progress">${r+1} / ${c}</span>
        </div>

        <div class="quiz-body">
          <p class="quiz-label">${t.promptLabel}</p>
          <div class="quiz-prompt">${t.prompt.replace(/\n/g,`<br>`)}</div>

          <div class="quiz-options">
            ${t.options.map(e=>`
              <button class="quiz-option" data-value="${encodeURIComponent(e)}">${e}</button>
            `).join(``)}
          </div>

          <button class="btn-quiz-next" id="btn-next" style="display:none">
            ${l?`See Results`:`Next Question →`}
          </button>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelectorAll(`.quiz-option`).forEach(n=>{n.addEventListener(`click`,()=>{a||(a=!0,decodeURIComponent(n.dataset.value)===t.correct?(i++,n.classList.add(`correct`)):(n.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===t.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{r<n.length-1?(r++,a=!1,o()):(V(i,n.length),s())})}function s(){let t=n.length,r=Math.round(i/t*100);e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">Exam</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${i} / ${t}</div>
          <p class="quiz-result-label">${i===t?`Perfect!`:r>=70?`Great job!`:`Keep practicing!`}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Retry Test</button>
            <button class="btn-quiz-back">← Back</button>
          </div>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{H(e)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}o()}document.querySelector(`#app`).innerHTML=`
  <header class="app-header">
    <h1>Arabic Flashcards <span class="app-version">v1.2.0</span></h1>
    <button class="theme-toggle" aria-label="Toggle theme"></button>
  </header>
  <main class="app-main" id="main-content"></main>
`,i(document.querySelector(`.theme-toggle`));var U=document.getElementById(`main-content`),W=document.querySelector(`.app-header`);function G(){let e=window.location.hash.slice(1),t=e.match(/^deck\/(.+)$/),n=e.match(/^deck\/(.+)\/quiz$/);e===`test`?(W.hidden=!0,H(U).catch(console.error)):n?(W.hidden=!0,N(U,n[1]).catch(console.error)):t?(W.hidden=!0,E(U,t[1]).catch(console.error)):(W.hidden=!1,T(U))}window.addEventListener(`hashchange`,G),G();