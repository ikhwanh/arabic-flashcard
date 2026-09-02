var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`arabic_kasra`,r=`'Scheherazade New', serif`,i=`low`;function a(){let e=localStorage.getItem(n);return e===`low`||e===`high`?e:i}function o(e){return e===`low`?`"cv62" 1`:`normal`}var s=a();function c(){let e=document.documentElement.style;e.setProperty(`--font-arabic`,r),e.setProperty(`--font-feature`,o(s))}c();function l(){return s}function u(e){s=e,localStorage.setItem(n,e),c()}var d=`theme`,f=[`light`,`dark`,`sand`,`tundra`],p={light:{icon:`☀️`,label:`Light`},dark:{icon:`🌙`,label:`Dark`},sand:{icon:`🏜️`,label:`Melancholy Sand`},tundra:{icon:`🌲`,label:`Greeny Tundra`}};function m(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function h(){let e=localStorage.getItem(d);return f.includes(e)?e:null}var g=h()??m(),_=new Set;function v(){document.documentElement.setAttribute(`data-theme`,g)}v();function ee(){return g}function y(e){g=e,localStorage.setItem(d,e),v(),_.forEach(e=>e(g))}function b(){window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,e=>{h()||y(e.matches?`dark`:`light`)})}var te=t({default:()=>x}),x=JSON.parse(`[{"id":"kosakata-al-quran---part-1","file":"1.json","title":"Kosakata Al-Quran - Part 1","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["رَبّ","رَحْمَة","عِلْم"]},{"id":"kosakata-al-quran---part-2","file":"2.json","title":"Kosakata Al-Quran - Part 2","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَالَ","كَانَ","آيَة"]},{"id":"kosakata-al-quran---part-3","file":"3.json","title":"Kosakata Al-Quran - Part 3","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["كُلّ","شَيْء","عَبْد"]},{"id":"kosakata-al-quran---part-4","file":"4.json","title":"Kosakata Al-Quran - Part 4","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["جَعَلَ","ذَٰلِك","جَاءَ"]},{"id":"kosakata-al-quran---part-5","file":"5.json","title":"Kosakata Al-Quran - Part 5","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَمَل","شَاءَ","آتَى"]},{"id":"kosakata-al-quran---part-6","file":"6.json","title":"Kosakata Al-Quran - Part 6","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["دِين","رَحِيم","دَعَا"]},{"id":"kosakata-al-quran---part-7","file":"7.json","title":"Kosakata Al-Quran - Part 7","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَرَادَ","عَظِيم","مُسْلِم"]},{"id":"kosakata-al-quran---part-8","file":"8.json","title":"Kosakata Al-Quran - Part 8","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["رَأَى","وَعَدَ","أَجْر"]},{"id":"kosakata-al-quran---part-9","file":"9.json","title":"Kosakata Al-Quran - Part 9","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَعْد","قَبْل","سَأَلَ"]},{"id":"kosakata-al-quran---part-10","file":"10.json","title":"Kosakata Al-Quran - Part 10","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَلِيم","حَكِيم","عَزِيز"]},{"id":"kosakata-al-quran---part-11","file":"11.json","title":"Kosakata Al-Quran - Part 11","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قُلْ","عَلِمَ","كَذَّبَ"]},{"id":"kosakata-al-quran---part-12","file":"12.json","title":"Kosakata Al-Quran - Part 12","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِلَٰه","رَحْمَٰن","سَلَام"]},{"id":"kosakata-al-quran---part-13","file":"13.json","title":"Kosakata Al-Quran - Part 13","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَدَرَ","وَلِيّ","اسْم"]},{"id":"kosakata-al-quran---part-14","file":"14.json","title":"Kosakata Al-Quran - Part 14","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["سَمِعَ","يَد","مُسْتَقِيم"]},{"id":"kosakata-al-quran---part-15","file":"15.json","title":"Kosakata Al-Quran - Part 15","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["ضَلَّ","سَجَدَ","قَرَأَ"]},{"id":"kosakata-al-quran---part-16","file":"16.json","title":"Kosakata Al-Quran - Part 16","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["هَذَا","كَتَبَ","عَدُوّ"]},{"id":"kosakata-al-quran---part-17","file":"17.json","title":"Kosakata Al-Quran - Part 17","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قُرْآن","إِسْلَام","صَدَقَة"]},{"id":"kosakata-al-quran---part-18","file":"18.json","title":"Kosakata Al-Quran - Part 18","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَضَى","نَزَلَ","خَرَجَ"]},{"id":"kosakata-al-quran---part-19","file":"19.json","title":"Kosakata Al-Quran - Part 19","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عِبَادَة","غَفَرَ","إِخْلَاص"]},{"id":"kosakata-al-quran---part-20","file":"20.json","title":"Kosakata Al-Quran - Part 20","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَوْل","جَزَاء","تَرَكَ"]},{"id":"kosakata-al-quran---part-21","file":"21.json","title":"Kosakata Al-Quran - Part 21","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["سَيِّئَة","مَصِير","أَكْثَر"]},{"id":"kosakata-al-quran---part-22","file":"22.json","title":"Kosakata Al-Quran - Part 22","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِلَّا","أَرْسَلَ","شَدِيدٌ"]},{"id":"kosakata-al-quran---part-23","file":"23.json","title":"Kosakata Al-Quran - Part 23","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِذْ","قَدْ","أَمَّا"]},{"id":"kosakata-al-quran---part-24","file":"24.json","title":"Kosakata Al-Quran - Part 24","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنَّ","هُوَ","هُمْ"]},{"id":"kosakata-al-quran---part-25","file":"25.json","title":"Kosakata Al-Quran - Part 25","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنَا","نَحْنُ","هِيَ"]},{"id":"kosakata-al-quran---part-26","file":"26.json","title":"Kosakata Al-Quran - Part 26","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنْتَ","تَبِعَ","نَفَعَ"]},{"id":"kosakata-al-quran---part-27","file":"27.json","title":"Kosakata Al-Quran - Part 27","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُولَٰئِكَ","أَعَدَّ","وَرِثَ"]},{"id":"kosakata-al-quran---part-28","file":"28.json","title":"Kosakata Al-Quran - Part 28","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["تَابَ","عَصَى","أَطَاعَ"]},{"id":"kosakata-al-quran---part-29","file":"29.json","title":"Kosakata Al-Quran - Part 29","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["مَال","قَتَلَ","شَمْس"]},{"id":"kosakata-al-quran---part-30","file":"30.json","title":"Kosakata Al-Quran - Part 30","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُمّ","اِبْن","نَجْم"]},{"id":"kosakata-al-quran---part-31","file":"31.json","title":"Kosakata Al-Quran - Part 31","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["خَبِير","لَطِيف","قَوِيّ"]},{"id":"kosakata-al-quran---part-32","file":"32.json","title":"Kosakata Al-Quran - Part 32","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["نَعِيم","جَحِيم","حَمِيد"]},{"id":"kosakata-al-quran---part-33","file":"33.json","title":"Kosakata Al-Quran - Part 33","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَحْسَن","سَنَة","عَام"]},{"id":"kosakata-al-quran---part-34","file":"34.json","title":"Kosakata Al-Quran - Part 34","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَسَل","خَمْر","لَحْم"]},{"id":"kosakata-al-quran---part-35","file":"35.json","title":"Kosakata Al-Quran - Part 35","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حُزْن","غَضَب","رَضِيَ"]},{"id":"kosakata-al-quran---part-36","file":"36.json","title":"Kosakata Al-Quran - Part 36","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["وَصَلَ","قَطَعَ","بَنَى"]},{"id":"kosakata-al-quran---part-37","file":"37.json","title":"Kosakata Al-Quran - Part 37","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["نَقَضَ","وَعَظَ","نَوْم"]},{"id":"kosakata-al-quran---part-38","file":"38.json","title":"Kosakata Al-Quran - Part 38","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["تِين","رُمَّان","فَاكِهَة"]},{"id":"kosakata-al-quran---part-39","file":"39.json","title":"Kosakata Al-Quran - Part 39","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["لُؤْلُؤ","حَرِير","سَحَاب"]},{"id":"kosakata-al-quran---part-40","file":"40.json","title":"Kosakata Al-Quran - Part 40","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَقَرَة","غَنَم","نَحْل"]},{"id":"kosakata-al-quran---part-41","file":"41.json","title":"Kosakata Al-Quran - Part 41","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُخْت","بِنْت","جَدّ"]},{"id":"kosakata-al-quran---part-42","file":"42.json","title":"Kosakata Al-Quran - Part 42","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["جِنّ","حُور","وِلْدَان"]},{"id":"kosakata-al-quran---part-43","file":"43.json","title":"Kosakata Al-Quran - Part 43","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["ضُحَى","عَصْر","عَشِيّ"]},{"id":"kosakata-al-quran---part-44","file":"44.json","title":"Kosakata Al-Quran - Part 44","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَلَد","طَرِيق","سُور"]},{"id":"kosakata-al-quran---part-45","file":"45.json","title":"Kosakata Al-Quran - Part 45","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["فَم","شَفَة","جِلْد"]},{"id":"kosakata-al-quran---part-46","file":"46.json","title":"Kosakata Al-Quran - Part 46","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["طِين","تُرَاب","دُخَان"]},{"id":"kosakata-al-quran---part-47","file":"47.json","title":"Kosakata Al-Quran - Part 47","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["وَرَق","زَهْرَة","سُنْبُلَة"]},{"id":"kosakata-al-quran---part-48","file":"48.json","title":"Kosakata Al-Quran - Part 48","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حِجَاب","بُرْهَان","سُلْطَان"]},{"id":"kosakata-al-quran---part-49","file":"49.json","title":"Kosakata Al-Quran - Part 49","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حَسَد","عَفْو","رَأْفَة"]},{"id":"kosakata-al-quran---part-50","file":"50.json","title":"Kosakata Al-Quran - Part 50","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["زَعَمَ","وَدَّ","يَئِسَ"]},{"id":"asmaul-husna","file":"asmaul-husna.json","title":"Asmaul Husna","description":"99 Nama Allah yang indah (al-Asmā' al-Ḥusnā) — lengkap dengan akar kata, kata terkait, dan contoh ayat Al-Quran","emoji":"📖","cardCount":99,"preview":["الرَّحْمَٰنُ","الرَّحِيمُ","الْمَلِكُ"]}]`),ne=`modulepreload`,re=function(e){return`/arabic-flashcard/`+e},ie={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=re(t,n),t=s(t),t in ie)return;ie[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:ne,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=x,w=Object.assign({"./1.json":()=>S(()=>import(`./1-DvZw5OpE.js`).then(e=>e.default),[]),"./10.json":()=>S(()=>import(`./10-2uJ8p8FB.js`).then(e=>e.default),[]),"./11.json":()=>S(()=>import(`./11-CEPmHTgO.js`).then(e=>e.default),[]),"./12.json":()=>S(()=>import(`./12-C03GUqIE.js`).then(e=>e.default),[]),"./13.json":()=>S(()=>import(`./13-CGs1EEtl.js`).then(e=>e.default),[]),"./14.json":()=>S(()=>import(`./14-RpVGmL8Q.js`).then(e=>e.default),[]),"./15.json":()=>S(()=>import(`./15-CPCb1Me-.js`).then(e=>e.default),[]),"./16.json":()=>S(()=>import(`./16-CZX0Ux_S.js`).then(e=>e.default),[]),"./17.json":()=>S(()=>import(`./17-D8ld7bEn.js`).then(e=>e.default),[]),"./18.json":()=>S(()=>import(`./18-CPsDkSgz.js`).then(e=>e.default),[]),"./19.json":()=>S(()=>import(`./19-C3qC4GU7.js`).then(e=>e.default),[]),"./2.json":()=>S(()=>import(`./2-DkDVuCk0.js`).then(e=>e.default),[]),"./20.json":()=>S(()=>import(`./20-KP6CVnC5.js`).then(e=>e.default),[]),"./21.json":()=>S(()=>import(`./21-C-VmAWUU.js`).then(e=>e.default),[]),"./22.json":()=>S(()=>import(`./22-Cv78QmIc.js`).then(e=>e.default),[]),"./23.json":()=>S(()=>import(`./23-Bn9IOMnm.js`).then(e=>e.default),[]),"./24.json":()=>S(()=>import(`./24-C3sAvDyT.js`).then(e=>e.default),[]),"./25.json":()=>S(()=>import(`./25-DhOBWJlw.js`).then(e=>e.default),[]),"./26.json":()=>S(()=>import(`./26-COTuVe5d.js`).then(e=>e.default),[]),"./27.json":()=>S(()=>import(`./27-DUeGRuV_.js`).then(e=>e.default),[]),"./28.json":()=>S(()=>import(`./28-WocfRbna.js`).then(e=>e.default),[]),"./29.json":()=>S(()=>import(`./29-72HkQqzu.js`).then(e=>e.default),[]),"./3.json":()=>S(()=>import(`./3-17zWpe5j.js`).then(e=>e.default),[]),"./30.json":()=>S(()=>import(`./30-ClJA_nRL.js`).then(e=>e.default),[]),"./31.json":()=>S(()=>import(`./31-BlfENiN_.js`).then(e=>e.default),[]),"./32.json":()=>S(()=>import(`./32-DFlEu5F6.js`).then(e=>e.default),[]),"./33.json":()=>S(()=>import(`./33-584gupE4.js`).then(e=>e.default),[]),"./34.json":()=>S(()=>import(`./34-BNORkC2S.js`).then(e=>e.default),[]),"./35.json":()=>S(()=>import(`./35-8E-zNxoy.js`).then(e=>e.default),[]),"./36.json":()=>S(()=>import(`./36-C5I6BAaG.js`).then(e=>e.default),[]),"./37.json":()=>S(()=>import(`./37-DBQhnIv-.js`).then(e=>e.default),[]),"./38.json":()=>S(()=>import(`./38-Bql4BtK7.js`).then(e=>e.default),[]),"./39.json":()=>S(()=>import(`./39-ChsRg-FM.js`).then(e=>e.default),[]),"./4.json":()=>S(()=>import(`./4-DmcBu05L.js`).then(e=>e.default),[]),"./40.json":()=>S(()=>import(`./40-CP24wvlU.js`).then(e=>e.default),[]),"./41.json":()=>S(()=>import(`./41-D7yeaoJL.js`).then(e=>e.default),[]),"./42.json":()=>S(()=>import(`./42-BAvz0NHK.js`).then(e=>e.default),[]),"./43.json":()=>S(()=>import(`./43-eGnIvHUX.js`).then(e=>e.default),[]),"./44.json":()=>S(()=>import(`./44-wVBp9CzB.js`).then(e=>e.default),[]),"./45.json":()=>S(()=>import(`./45-Sd9TYTf4.js`).then(e=>e.default),[]),"./46.json":()=>S(()=>import(`./46-5DfBAeS7.js`).then(e=>e.default),[]),"./47.json":()=>S(()=>import(`./47-0YN_pxbw.js`).then(e=>e.default),[]),"./48.json":()=>S(()=>import(`./48-CixFp162.js`).then(e=>e.default),[]),"./49.json":()=>S(()=>import(`./49-DsugNvNv.js`).then(e=>e.default),[]),"./5.json":()=>S(()=>import(`./5-BchB9ue-.js`).then(e=>e.default),[]),"./50.json":()=>S(()=>import(`./50-DZed5-CG.js`).then(e=>e.default),[]),"./6.json":()=>S(()=>import(`./6-wdcVte7x.js`).then(e=>e.default),[]),"./7.json":()=>S(()=>import(`./7-BSMOvJ2q.js`).then(e=>e.default),[]),"./8.json":()=>S(()=>import(`./8-BJWrjRGy.js`).then(e=>e.default),[]),"./9.json":()=>S(()=>import(`./9-CnfQRWNp.js`).then(e=>e.default),[]),"./asmaul-husna.json":()=>S(()=>import(`./asmaul-husna-DkJbTpzv.js`).then(e=>e.default),[]),"./manifest.json":()=>S(()=>Promise.resolve().then(()=>te).then(e=>e.default),void 0)});function ae(e,t){let n=e.groups.find(e=>e.id===t);return n?{id:n.id,title:n.group_title,description:n.group_description,emoji:C.find(e=>e.id===t)?.emoji??`📚`,cards:n.words.map((e,t)=>({id:`${n.id}_${t}`,arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:n.group_title,quranExample:e.quran_example}))}:null}function T(e){return{id:e.meta.title.toLowerCase().replace(/\s+/g,`-`),title:e.meta.title,description:e.meta.description,emoji:`📖`,cards:e.cards.map(e=>({id:String(e.id),arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:e.word_type,root:e.root,forms:e.forms,relatedWords:e.related_words,quranExample:e.quran_example}))}}function oe(e){return typeof e==`object`&&!!e&&`groups`in e}function E(e){return typeof e==`object`&&!!e&&`cards`in e}function se(e){let t=e.match(/Part\s+(\d+)/i);return t?Number(t[1]):null}async function ce(e){let t=e?C.filter(t=>{let n=se(t.title);return n!==null&&n>=e[0]&&n<=e[1]}):C,n=[...new Set(t.map(e=>e.file))].filter(e=>e!==`0.json`);return(await Promise.all(n.map(async e=>{let t=w[`./${e}`];if(!t)return[];let n=await t();return E(n)?T(n).cards:[]}))).flat()}async function D(e){let t=C.find(t=>t.id===e);if(!t)return null;let n=w[`./${t.file}`];if(!n)return null;let r=await n();return oe(r)?ae(r,e):E(r)?T(r):null}var O=[{id:`6_76-79`,surah:6,surahName:`Al-An'aam`,from:76,to:79,title:`Al-An'aam 76–79`,description:`Kisah Nabi Ibrahim mencari Tuhan: ia mengamati bintang, bulan, dan matahari, lalu menyadari semuanya tenggelam, hingga ia berserah hanya kepada Pencipta langit dan bumi.`,verseCount:4},{id:`24_35-38`,surah:24,surahName:`An-Nur`,from:35,to:38,title:`An-Nur 35–38`,description:`Ayat Cahaya (Ayatun Nur): perumpamaan agung tentang cahaya Allah, lalu gambaran orang-orang beriman yang berdzikir di masjid dan tidak dilalaikan dunia.`,verseCount:4},{id:`28_76-82`,surah:28,surahName:`Al-Qasas`,from:76,to:82,title:`Al-Qasas 76–82`,description:`Kisah Karun yang kaya raya namun sombong: ia membanggakan hartanya dan mengira semua itu berkat ilmunya sendiri, sampai akhirnya Allah membenamkan dia dan rumahnya ke dalam bumi sebagai pelajaran.`,verseCount:7}],le=Object.assign({"./24_35-38.json":()=>S(()=>import(`./24_35-38-uy0_f2ox.js`).then(e=>e.default),[]),"./28_76-82.json":()=>S(()=>import(`./28_76-82-BBWyhhiZ.js`).then(e=>e.default),[]),"./6_76-79.json":()=>S(()=>import(`./6_76-79-COyfoS6w.js`).then(e=>e.default),[])});function ue(e){return`./${e}.json`}async function k(e){let t=le[ue(e)];if(!t)return null;let n=await t();return{id:e,surah:n.meta.surah,surahName:n.meta.surahName,from:n.meta.from,to:n.meta.to,title:n.meta.title,description:n.meta.description,verses:n.verses}}var de=[{id:`36_1-83`,surah:36,surahName:`Yaseen`,from:1,to:83,title:`Ya-Sin 1–83`,description:`Surah Ya-Sin, dibuka dengan sumpah atas Al-Quran yang penuh hikmah dan penegasan kerasulan Nabi Muhammad.`,verseCount:83}],fe=Object.assign({"./36_1-83.json":()=>S(()=>import(`./36_1-83-BF9UQl9G.js`).then(e=>e.default),[])});function pe(e){return`./${e}.json`}async function me(e){let t=fe[pe(e)];if(!t)return null;let n=await t();return{id:e,surah:n.meta.surah,surahName:n.meta.surahName,from:n.meta.from,to:n.meta.to,title:n.meta.title,description:n.meta.description,verses:n.verses}}var he=[{id:`1`,time:`morning`,title:`Dzikir Pagi`,description:`Kumpulan dzikir pagi dari Hisnul Muslim, dibaca setelah Subuh hingga terbit matahari.`,itemCount:23},{id:`2`,time:`evening`,title:`Dzikir Petang`,description:`Kumpulan dzikir petang dari Hisnul Muslim, dibaca setelah Asar hingga terbenam matahari.`,itemCount:23}],ge=Object.assign({"./1.json":()=>S(()=>import(`./1-ddxv6QNg.js`).then(e=>e.default),[]),"./2.json":()=>S(()=>import(`./2-BLguEZ2F.js`).then(e=>e.default),[])});function _e(e){return`./${e}.json`}async function ve(e){let t=ge[_e(e)];if(!t)return null;let n=await t();return{id:e,time:n.meta.time,title:n.meta.title,description:n.meta.description,items:n.items}}function A(e){return localStorage.getItem(`quiz_score_${e}`)}function j(e){return Number(localStorage.getItem(`last_visited_${e}`)??0)}function ye(e){return localStorage.getItem(`qs_score_${e}`)}function be(e){let t=e.match(/part-(\d+)$/);return t?Number(t[1]):null}function xe(){let e=C.map(e=>({deck:e,t:j(e.id)})).filter(e=>e.t>0).sort((e,t)=>t.t-e.t)[0]?.deck??null,t=C.map(e=>({deck:e,n:be(e.id)})).filter(e=>e.n!==null).sort((e,t)=>e.n-t.n),n;if(!e)n=t[0]?.deck??null;else{let r=be(e.id);n=r===null?null:t.find(e=>e.n>r&&A(e.deck.id)===null)?.deck??null}return{resume:e,next:n}}function Se(){C.forEach(e=>{localStorage.removeItem(`quiz_score_${e.id}`),localStorage.removeItem(`last_visited_${e.id}`)}),O.forEach(e=>localStorage.removeItem(`qs_score_${e.id}`))}function Ce(e,t,n){let r=document.createElement(`div`);r.className=`confirm-overlay`,r.innerHTML=`
    <div class="confirm-dialog">
      <p class="confirm-title">${e}</p>
      <p class="confirm-message">${t}</p>
      <div class="confirm-actions">
        <button class="confirm-cancel">Cancel</button>
        <button class="confirm-ok">Reset</button>
      </div>
    </div>
  `;let i=()=>document.body.removeChild(r);r.querySelector(`.confirm-cancel`).addEventListener(`click`,i),r.querySelector(`.confirm-ok`).addEventListener(`click`,()=>{i(),n()}),r.addEventListener(`click`,e=>{e.target===r&&i()}),document.body.appendChild(r),r.querySelector(`.confirm-cancel`).focus()}function we(){return C.some(e=>A(e.id)!==null||j(e.id)>0)||O.some(e=>ye(e.id)!==null)}function M(e){return e.title.replace(/^Kosakata Al-Quran - /,``)}function N(e){let t=e.querySelector(`.nav-continue`);if(!t)return;let{resume:n,next:r}=xe(),i=[];if(n&&i.push(`
      <button class="nav-continue-card resume" data-deck-id="${n.id}">
        <span class="nav-continue-kicker">▶ Resume</span>
        <span class="nav-continue-title">${M(n)}</span>
      </button>
    `),r&&r.id!==n?.id&&i.push(`
      <button class="nav-continue-card next" data-deck-id="${r.id}">
        <span class="nav-continue-kicker">${n?`Next up`:`Start here`}</span>
        <span class="nav-continue-title">${M(r)}</span>
      </button>
    `),i.length===0){t.hidden=!0;return}t.hidden=!1,t.innerHTML=i.join(``),t.querySelectorAll(`.nav-continue-card`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})})}function P(e,t){let n=[...C].sort((e,t)=>j(t.id)-j(e.id)),r=t?n.filter(e=>A(e.id)===null):n,i=e.querySelector(`.deck-grid`);i.innerHTML=r.length===0?`<p class="nav-empty">All decks have been quizzed. Well done!</p>`:r.map(e=>{let t=A(e.id);return`
        <div class="deck-card">
          <button class="deck-card-study" data-deck-id="${e.id}" aria-label="Study ${e.title}">
            ${t===null?``:`<span class="deck-score-chip">${t}</span>`}
            <h3 class="deck-title">${M(e)}</h3>
            <p class="deck-preview">${e.preview.join(` · `)}</p>
          </button>
          <div class="deck-card-footer">
            <span class="deck-count">${e.cardCount} cards</span>
            <button class="btn-quiz" data-quiz-id="${e.id}" aria-label="Take quiz for ${e.title}">Quiz →</button>
          </div>
        </div>
      `}).join(``),i.querySelectorAll(`.deck-card-study`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})}),i.querySelectorAll(`.btn-quiz`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.quizId}/quiz`})})}function Te(e){let t=e.querySelector(`.qs-index-grid`);t.innerHTML=O.length===0?`<p class="nav-empty">No breakdowns yet. Generate one with the qs-breakdown command.</p>`:O.map(e=>{let t=ye(e.id);return`
        <div class="qs-index-card">
          ${t===null?``:`<span class="deck-score-chip">${t}</span>`}
          <button class="qs-index-open" data-id="${e.id}">
            <span class="qs-index-surah">QS ${e.surah} · ${e.surahName}</span>
            <span class="qs-index-title">${e.title}</span>
            <span class="qs-index-desc">${e.description}</span>
            <span class="qs-index-count">Ayat ${e.from}–${e.to} · ${e.verseCount} ayat</span>
          </button>
          <button class="btn-qs-play-card" data-play-id="${e.id}">Play ▶</button>
        </div>
      `}).join(``),t.querySelectorAll(`.qs-index-open`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`qs/${e.dataset.id}`})}),t.querySelectorAll(`.btn-qs-play-card`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`qs/${e.dataset.playId}/game`})})}function Ee(e){let t=e.querySelector(`.qs-index-grid`);t.innerHTML=de.length===0?`<p class="nav-empty">No surahs yet. Generate one with the quran-reading command.</p>`:de.map(e=>`
        <div class="qs-index-card">
          <button class="qs-index-open" data-id="${e.id}">
            <span class="qs-index-surah">QS ${e.surah} · ${e.surahName}</span>
            <span class="qs-index-title">${e.title}</span>
            <span class="qs-index-desc">${e.description}</span>
            <span class="qs-index-count">Ayat ${e.from}–${e.to} · ${e.verseCount} ayat</span>
          </button>
        </div>
      `).join(``),t.querySelectorAll(`.qs-index-open`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`read/${e.dataset.id}`})})}function De(e){let t=e.querySelector(`.qs-index-grid`);t.innerHTML=he.length===0?`<p class="nav-empty">No dzikir yet.</p>`:he.map(e=>`
        <div class="qs-index-card">
          <button class="qs-index-open" data-id="${e.id}">
            <span class="qs-index-surah">${e.time===`morning`?`🌅`:`🌇`} ${e.title}</span>
            <span class="qs-index-desc">${e.description}</span>
            <span class="qs-index-count">${e.itemCount} dzikir</span>
          </button>
        </div>
      `).join(``),t.querySelectorAll(`.qs-index-open`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`dzikir/${e.dataset.id}`})})}function Oe(e){let t=e.querySelector(`.btn-reset-all`);t&&(t.disabled=!we())}function F(e,t=`flashcard`){let n=!1,r=`
    <div class="nav-hero">
      <h2>Kosakata Al-Quran</h2>
      <p class="nav-subtitle">Kata-kata bermakna yang paling sering muncul di Al-Quran</p>
    </div>
    <div class="nav-toolbar">
      <div class="nav-filters">
        <button class="nav-filter-chip" data-filter="unfinished">Unfinished</button>
      </div>
      <div class="nav-menu">
        <button class="nav-menu-trigger" aria-label="Options" aria-haspopup="true" aria-expanded="false">⋮</button>
        <div class="nav-menu-dropdown" hidden>
          <button class="nav-menu-item" data-exam="1-10">Exam 1 <span class="nav-menu-item-sub">Part 1–10</span></button>
          <button class="nav-menu-item" data-exam="11-20">Exam 2 <span class="nav-menu-item-sub">Part 11–20</span></button>
          <button class="nav-menu-item" data-exam="21-30">Exam 3 <span class="nav-menu-item-sub">Part 21–30</span></button>
          <button class="nav-menu-item" data-exam="31-40">Exam 4 <span class="nav-menu-item-sub">Part 31–40</span></button>
          <button class="nav-menu-item" data-exam="41-50">Exam 5 <span class="nav-menu-item-sub">Part 41–50</span></button>
          <button class="nav-menu-item" data-exam="all">Final Exam <span class="nav-menu-item-sub">Semua part</span></button>
          <div class="nav-menu-divider"></div>
          <button class="nav-menu-item btn-reset-all" ${we()?``:`disabled`}>Reset all progress</button>
        </div>
      </div>
    </div>
    <div class="nav-continue" hidden></div>
    <div class="deck-grid"></div>
  `;if(e.innerHTML=`
    <div class="nav-page">
      ${t===`breakdown`?`
    <div class="nav-hero">
      <h2>Surah Breakdown</h2>
      <p class="nav-subtitle">Read verses word by word</p>
    </div>
    <div class="qs-index-grid"></div>
  `:t===`reading`?`
    <div class="nav-hero">
      <h2>Read</h2>
      <p class="nav-subtitle">Read the Quran, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid"></div>
  `:t===`dzikir`?`
    <div class="nav-hero">
      <h2>Dzikir</h2>
      <p class="nav-subtitle">Morning & evening remembrance, tap a word for its meaning</p>
    </div>
    <div class="qs-index-grid"></div>
  `:r}
    </div>
  `,t===`breakdown`){Te(e);return}if(t===`reading`){Ee(e);return}if(t===`dzikir`){De(e);return}N(e),P(e,n);let i=e.querySelector(`.nav-menu`),a=i.querySelector(`.nav-menu-trigger`),o=i.querySelector(`.nav-menu-dropdown`),s=()=>{o.hidden=!0,a.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`click`,c)},c=e=>{i.contains(e.target)||s()};a.addEventListener(`click`,()=>{let e=o.hidden;o.hidden=!e,a.setAttribute(`aria-expanded`,String(e)),e?document.addEventListener(`click`,c):document.removeEventListener(`click`,c)}),i.querySelectorAll(`[data-exam]`).forEach(e=>{e.addEventListener(`click`,()=>{s();let t=e.dataset.exam;window.location.hash=t===`all`?`test`:`test/${t}`})}),e.querySelector(`[data-filter="unfinished"]`).addEventListener(`click`,t=>{let r=t.currentTarget;n=!n,r.classList.toggle(`active`,n),P(e,n)}),e.querySelector(`.btn-reset-all`).addEventListener(`click`,()=>{s(),Ce(`Reset all progress?`,`This will clear all quiz scores and visit history.`,()=>{Se(),n=!1,e.querySelector(`[data-filter="unfinished"]`).classList.remove(`active`),Oe(e),N(e),P(e,n)})})}async function ke(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await D(t);if(!n){e.innerHTML=`
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
    `,o()}function o(){e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let t=e.querySelector(`#fc-card`),o=()=>{i=!i,a()};t.addEventListener(`click`,o),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())}),e.querySelector(`#btn-prev`)?.addEventListener(`click`,()=>{r>0&&(r--,i=!1,a())}),e.querySelector(`#btn-next`)?.addEventListener(`click`,()=>{r<n.cards.length-1&&(r++,i=!1,a())}),e.querySelectorAll(`.fc-dot`).forEach(e=>{e.addEventListener(`click`,()=>{r=Number(e.dataset.index),i=!1,a()})})}a()}function I(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function Ae(e,t){return I(e).slice(0,t)}function je(e,t){let n=Ae(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:I([e.indonesian,...n]),ayatArabic:e.quranExample?.arabic,ayatRef:e.quranExample?`${e.quranExample.surah} ${e.quranExample.ayah}`:void 0,ayatTranslation:e.quranExample?.translation}}function Me(e){return e.length<4?[]:I(e).map(t=>je(t,e))}function Ne(e,t,n){localStorage.setItem(`quiz_score_${e}`,`${t}/${n}`)}async function L(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await D(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Deck not found.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let r=Me(n.cards);if(r.length===0){e.innerHTML=`
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
          <div class="quiz-prompt">
            ${l.ayatArabic?`<button class="btn-quiz-hint" id="btn-hint">💡 Hint</button>`:``}
            <span class="quiz-word">${l.prompt}</span>
            ${l.ayatArabic?`
              <div class="quiz-ayat">
                <span class="quiz-ayat-arabic">${l.ayatArabic}</span>
                <span class="quiz-ayat-ref">${l.ayatRef}</span>
                <span class="quiz-ayat-translation" id="ayat-translation" style="display:none">${l.ayatTranslation}</span>
              </div>`:``}
          </div>

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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let f=()=>{let t=e.querySelector(`#ayat-translation`);t&&(t.style.display=`block`);let n=e.querySelector(`#btn-hint`);n&&(n.style.display=`none`)};e.querySelector(`#btn-hint`)?.addEventListener(`click`,f),e.querySelectorAll(`.quiz-option`).forEach(t=>{t.addEventListener(`click`,()=>{o||(o=!0,f(),decodeURIComponent(t.dataset.value)===l.correct?(a++,t.classList.add(`correct`)):(t.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===l.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{i<r.length-1?(i++,o=!1,s()):(Ne(t,a,r.length),c())})}function c(){let i=r.length;e.innerHTML=`
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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{L(e,t)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}s()}var Pe=50,R={"1-10":{key:`test_score_1_10`,title:`Exam 1`,range:[1,10]},"11-20":{key:`test_score_11_20`,title:`Exam 2`,range:[11,20]},"21-30":{key:`test_score_21_30`,title:`Exam 3`,range:[21,30]},"31-40":{key:`test_score_31_40`,title:`Exam 4`,range:[31,40]},"41-50":{key:`test_score_41_50`,title:`Exam 5`,range:[41,50]},all:{key:`test_score`,title:`Final Exam`,size:100}};function Fe(e){return e&&R[e]||R.all}function z(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function B(e,t){return z(e).slice(0,t)}function Ie(e,t){let n=B(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:z([e.indonesian,...n]),ayatArabic:e.quranExample?.arabic,ayatRef:e.quranExample?`${e.quranExample.surah} ${e.quranExample.ayah}`:void 0,ayatTranslation:e.quranExample?.translation}}function Le(e,t){return B(e,Math.min(t,e.length)).map(t=>Ie(t,e))}function Re(e,t,n){localStorage.setItem(e,`${t}/${n}`)}async function V(e,t){let n=Fe(t);e.innerHTML=`<div class="fc-loading">Loading test…</div>`;let r=await ce(n.range);if(r.length<4){e.innerHTML=`
      <div class="error-page">
        <p>Not enough cards to generate a test.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let i=Le(r,n.size??Pe),a=0,o=0,s=!1;function c(){let t=i[a],r=i.length,u=a===r-1;e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${n.title}</span>
          <span class="fc-progress">${a+1} / ${r}</span>
        </div>

        <div class="quiz-body">
          <p class="quiz-label">${t.promptLabel}</p>
          <div class="quiz-prompt">
            ${t.ayatArabic?`<button class="btn-quiz-hint" id="btn-hint">💡 Hint</button>`:``}
            <span class="quiz-word">${t.prompt}</span>
            ${t.ayatArabic?`
              <div class="quiz-ayat">
                <span class="quiz-ayat-arabic">${t.ayatArabic}</span>
                <span class="quiz-ayat-ref">${t.ayatRef}</span>
                <span class="quiz-ayat-translation" id="ayat-translation" style="display:none">${t.ayatTranslation}</span>
              </div>`:``}
          </div>

          <div class="quiz-options">
            ${t.options.map(e=>`
              <button class="quiz-option" data-value="${encodeURIComponent(e)}">${e}</button>
            `).join(``)}
          </div>

          <button class="btn-quiz-next" id="btn-next" style="display:none">
            ${u?`See Results`:`Next Question →`}
          </button>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let d=()=>{let t=e.querySelector(`#ayat-translation`);t&&(t.style.display=`block`);let n=e.querySelector(`#btn-hint`);n&&(n.style.display=`none`)};e.querySelector(`#btn-hint`)?.addEventListener(`click`,d),e.querySelectorAll(`.quiz-option`).forEach(n=>{n.addEventListener(`click`,()=>{s||(s=!0,d(),decodeURIComponent(n.dataset.value)===t.correct?(o++,n.classList.add(`correct`)):(n.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===t.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{a<i.length-1?(a++,s=!1,c()):(Re(n.key,o,i.length),l())})}function l(){let r=i.length,a=Math.round(o/r*100),s=o===r?`Perfect!`:a>=70?`Great job!`:`Keep practicing!`;e.innerHTML=`
      <div class="quiz-page">
        <div class="fc-header">
          <button class="btn-back">← Back</button>
          <span class="fc-deck-title">${n.title}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${o} / ${r}</div>
          <p class="quiz-result-label">${s}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Retry Test</button>
            <button class="btn-quiz-back">← Back</button>
          </div>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{V(e,t)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}c()}var H=2;function ze(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function U(e,t,n,r=12){let i=e.getBoundingClientRect();return t>=i.left-r&&t<=i.right+r&&n>=i.top-r&&n<=i.bottom+r}function Be(e){return!e.segments||e.segments.length===0?!1:e.segments.reduce((e,t)=>e+t.wordCount,0)===e.words.length}function W(e){let t=[];for(let n of e)if(!(n.words.length<H)){if(Be(n)){let e=n.segments.length,r=0;n.segments.forEach((i,a)=>{let o=n.words.slice(r,r+i.wordCount);r+=i.wordCount,!(o.length<H)&&t.push({ayah:n.ayah,translation:i.translation,words:o.map(e=>e.arabic),meanings:o.map(e=>e.meaning),arabic:o.map(e=>e.arabic).join(` `),part:{index:a+1,count:e}})})}else t.push({ayah:n.ayah,translation:n.literalTranslation??n.translation,words:n.words.map(e=>e.arabic),meanings:n.words.map(e=>e.meaning),arabic:n.arabic})}return t}function Ve(e){return W([e]).length>0}function He(e,t,n){localStorage.setItem(`qs_score_${e}`,`${t}/${n}`)}async function G(e,t,n){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let r=await k(t);if(!r){e.innerHTML=`
      <div class="error-page">
        <p>Breakdown not found.</p>
        <button class="btn-back" onclick="window.location.hash='qs'">← Back</button>
      </div>
    `;return}let i=n===void 0?r.verses:r.verses.filter(e=>e.ayah===n);if(i.length===0){e.innerHTML=`
      <div class="error-page">
        <p>Ayat ${n} is not in this passage.</p>
        <button class="btn-back" onclick="window.location.hash='qs/${t}'">← Back to Reader</button>
      </div>
    `;return}let a=W(i);if(a.length===0){e.innerHTML=`
      <div class="error-page">
        <p>Not enough words ${n===void 0?`in this passage`:`in ayat ${n}`} to play.</p>
        <button class="btn-back" onclick="window.location.hash='qs/${t}'">← Back to Reader</button>
      </div>
    `;return}let o=0,s=0,c=[],l=[],u=!1,d=!1;function f(e,t){let n=c[t];return n!==null&&e.meanings[n]===e.meanings[t]}function p(){let e=a[o];c=Array(e.words.length).fill(null),l=ze(e.words.map((e,t)=>t)),u=!1,d=!1,h()}function m(e){l=l.filter(t=>t!==e);let t=c.indexOf(e);t!==-1&&(c[t]=null)}function h(){let i=a[o],v=a.length,ee=o===v-1,y=i.meanings.map((e,t)=>{let n=c[t],r=`qs-slot`;u&&!d&&n!==null&&(r+=f(i,t)?` correct`:` wrong`);let a=``;if(n!==null){let e=`qs-game-chip`;u&&!d&&(e+=f(i,t)?` chip-correct`:` chip-wrong`),a=`<button class="${e}" data-from="slot" data-idx="${n}">${i.words[n]}</button>`}return`
          <div class="${r}">
            <span class="qs-slot-label">${e}</span>
            <div class="qs-slot-drop" dir="rtl">${a}</div>
          </div>
        `}).join(``),b=l.map(e=>`<button class="qs-game-chip" data-from="pool" data-idx="${e}">${i.words[e]}</button>`).join(``);if(e.innerHTML=`
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${r.surahName} · Ayat ${i.ayah}${i.part?` · Part ${i.part.index}/${i.part.count}`:``}</span>
          <span class="qs-range">${o+1} / ${v}</span>
        </div>

        <p class="qs-game-label">Drop each Arabic word onto its meaning</p>

        <div class="qs-slots" dir="rtl">${y}</div>

        <div class="qs-game-pool" dir="rtl">
          ${b||`<span class="qs-game-placeholder">All words placed — tap Check</span>`}
        </div>

        ${u?`
          <div class="qs-game-feedback">
            ${d?`<p class="qs-game-result-bad">Skipped. Correct order:</p>
                 <p class="qs-game-correct" dir="rtl">${i.arabic}</p>`:g()?`<p class="qs-game-result-ok">✔ Correct!</p>`:`<p class="qs-game-result-bad">✗ Not quite. Correct order:</p>
                 <p class="qs-game-correct" dir="rtl">${i.arabic}</p>`}
          </div>
          <button class="btn-quiz-next" id="btn-next">${ee?`Show Results`:`Next Verse →`}</button>
        `:`
          <div class="qs-game-actions">
            <button class="btn-quiz-next" id="btn-check" ${l.length===0?``:`disabled`}>Check</button>
            <button class="btn-quiz-skip" id="btn-skip">Skip</button>
          </div>
        `}
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`qs/${t}`}),u)e.querySelector(`#btn-next`).addEventListener(`click`,()=>{o<a.length-1?(o++,p()):(n===void 0&&He(t,s,a.length),_())});else{let t=e.querySelector(`.qs-game-pool`),n=[...e.querySelectorAll(`.qs-slot`)],r=(e,r)=>{e.addEventListener(`pointerdown`,i=>{if(i.button!==0&&i.pointerType===`mouse`)return;i.preventDefault();let a=Number(e.dataset.idx),o=i.clientX,s=i.clientY,u=!1,d=null,f=0,p=0,g=t=>{if(!u){if(Math.hypot(t.clientX-o,t.clientY-s)<6)return;u=!0;let n=e.getBoundingClientRect();f=o-n.left,p=s-n.top,d=e.cloneNode(!0),d.className=`qs-game-chip chip-drag-clone`,d.style.width=`${n.width}px`,d.style.height=`${n.height}px`,document.body.appendChild(d),e.classList.add(`chip-drag-source`)}d.style.left=`${t.clientX-f}px`,d.style.top=`${t.clientY-p}px`},_=i=>{if(document.removeEventListener(`pointermove`,g),document.removeEventListener(`pointerup`,_),d?.remove(),e.classList.remove(`chip-drag-source`),!u){if(r===`pool`){let e=c.indexOf(null);e!==-1&&(m(a),c[e]=a)}else m(a),l.push(a);h();return}let o=n.findIndex(e=>U(e,i.clientX,i.clientY));if(o!==-1){let e=c[o];m(a),e!==null&&e!==a&&l.push(e),c[o]=a}else U(t,i.clientX,i.clientY)&&(m(a),l.push(a));h()};document.addEventListener(`pointermove`,g),document.addEventListener(`pointerup`,_)})};e.querySelectorAll(`.qs-game-chip`).forEach(e=>r(e,e.dataset.from===`slot`?`slot`:`pool`)),e.querySelector(`#btn-check`)?.addEventListener(`click`,()=>{u=!0,g()&&s++,h()}),e.querySelector(`#btn-skip`)?.addEventListener(`click`,()=>{d=!0,u=!0,h()})}}function g(){let e=a[o];return!c.some(e=>e===null)&&c.every((t,n)=>f(e,n))}function _(){let i=a.length;e.innerHTML=`
      <div class="qs-game-page">
        <div class="qs-header">
          <button class="btn-back">← Back</button>
          <span class="qs-deck-title">${r.surahName} · ${n===void 0?`Ayat ${r.from}–${r.to}`:`Ayat ${n}`}</span>
        </div>

        <div class="quiz-result">
          <div class="quiz-result-score">${s} / ${i}</div>
          <p class="quiz-result-label">${s===i?`Perfect!`:s>=i*.7?`Well done!`:`Keep practicing!`}</p>
          <div class="quiz-result-actions">
            <button class="btn-quiz-retry">Play Again</button>
            <button class="btn-quiz-back">← Back to Reader</button>
          </div>
        </div>
      </div>
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`qs/${t}`}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{G(e,t,n)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=`qs/${t}`})}p()}var Ue={ism:`kata benda (ism)`,"fi'l":`kata kerja (fi'l)`,harf:`kata tugas (harf)`},K={past:`Lampau`,present:`Sekarang`,future:`Akan datang`,command:`Perintah`};function We(e){let t=Object.keys(K).filter(t=>e[t]).map(t=>`
      <span class="qs-form">
        <span class="qs-form-label">${K[t]}</span>
        <span class="qs-form-arabic">${e[t]}</span>
      </span>
    `);return t.length===0?``:`<div class="qs-forms" dir="rtl">${t.join(``)}</div>`}function Ge(e){return e.length>0&&[...e].every(e=>{let t=e.codePointAt(0);return t>=1750&&t<=1773})}function Ke(e,t){let n=0;return e.arabic.split(` `).map(r=>{if(Ge(r)||n>=e.words.length)return`<span class="qs-waqaf">${r}</span>`;let i=`<button class="qs-word" data-vi="${t}" data-wi="${n}">${e.words[n].arabic}</button>`;return n++,i}).join(` `)}function qe(e){return`
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${e.arabic}</span>
        <span class="qs-detail-translit">${e.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${e.meaning}</span>
      <div class="qs-detail-tags">
        <span class="qs-type-badge qs-type-${e.type===`fi'l`?`fil`:e.type}">${Ue[e.type]}</span>
        ${e.root?`<span class="qs-detail-root">Akar: ${e.root}</span>`:``}
      </div>
      ${e.forms?We(e.forms):``}
      ${e.notes?`<p class="qs-detail-notes">${e.notes}</p>`:``}
    </div>
  `}async function Je(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await k(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Breakdown not found.</p>
        <button class="btn-back" onclick="window.location.hash='qs'">← Back</button>
      </div>
    `;return}e.innerHTML=`
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back">← Back</button>
        <span class="qs-deck-title">QS ${n.surah} · ${n.surahName}</span>
        <button class="btn-qs-play">Play ▶</button>
      </div>

      <p class="qs-tip">👆 Tap any word to see its meaning and grammar</p>

      <div class="qs-verses">
        ${n.verses.map((e,t)=>`
          <div class="qs-verse">
            <span class="qs-ayah-num">${e.ayah}</span>
            ${Ve(e)?`<button class="btn-qs-ayah-play" data-ayah="${e.ayah}" aria-label="Play ayah ${e.ayah}">▶</button>`:``}
            <div class="qs-arabic" dir="rtl">
              ${Ke(e,t)}
            </div>
            <p class="qs-translation">${e.literalTranslation??e.translation}</p>
          </div>
        `).join(``)}
      </div>
    </div>

    <div class="qs-sheet" hidden>
      <div class="qs-sheet-backdrop"></div>
      <div class="qs-sheet-panel" role="dialog" aria-modal="true">
        <div class="qs-sheet-handle"></div>
        <button class="qs-sheet-close" aria-label="Close">✕</button>
        <div class="qs-sheet-body"></div>
      </div>
    </div>
  `;let r=e.querySelector(`.qs-sheet`),i=e.querySelector(`.qs-sheet-body`),a=e.querySelector(`.qs-tip`),o=null;function s(){r.hidden=!0,r.classList.remove(`open`),o?.classList.remove(`active`),o=null}function c(e,t){o?.classList.remove(`active`),o=e,e.classList.add(`active`),i.innerHTML=qe(t),r.hidden=!1,r.offsetWidth,r.classList.add(`open`)}e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`qs`}),e.querySelector(`.btn-qs-play`).addEventListener(`click`,()=>{window.location.hash=`qs/${t}/game`}),e.querySelectorAll(`.btn-qs-ayah-play`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`qs/${t}/game/${e.dataset.ayah}`})}),e.querySelectorAll(`.qs-word`).forEach(e=>{e.addEventListener(`click`,()=>{if(a?.remove(),o===e){s();return}let t=Number(e.dataset.vi),r=Number(e.dataset.wi);c(e,n.verses[t].words[r])})}),e.querySelector(`.qs-sheet-backdrop`).addEventListener(`click`,s),e.querySelector(`.qs-sheet-close`).addEventListener(`click`,s),document.addEventListener(`keydown`,function e(t){t.key===`Escape`&&!r.hidden&&s(),document.contains(r)||document.removeEventListener(`keydown`,e)})}function Ye(e){return e.length>0&&[...e].every(e=>{let t=e.codePointAt(0);return t>=1750&&t<=1773})}function Xe(e,t){let n=0;return e.arabic.split(` `).map(r=>{if(Ye(r)||n>=e.words.length)return`<span class="qs-waqaf">${r}</span>`;let i=`<button class="qs-word" data-vi="${t}" data-wi="${n}">${e.words[n].arabic}</button>`;return n++,i}).join(` `)}function Ze(e){return`
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${e.arabic}</span>
        <span class="qs-detail-translit">${e.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${e.meaning}</span>
    </div>
  `}async function Qe(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await me(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Surah not found.</p>
        <button class="btn-back" onclick="window.location.hash='read'">← Back</button>
      </div>
    `;return}e.innerHTML=`
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back">← Back</button>
        <span class="qs-deck-title">QS ${n.surah} · ${n.surahName}</span>
      </div>

      <p class="qs-tip">👆 Tap any word to see its meaning</p>

      <div class="qs-verses">
        ${n.verses.map((e,t)=>`
          <div class="qs-verse">
            <span class="qs-ayah-num">${e.ayah}</span>
            <div class="qs-arabic" dir="rtl">
              ${Xe(e,t)}
            </div>
          </div>
        `).join(``)}
      </div>
    </div>

    <div class="qs-sheet" hidden>
      <div class="qs-sheet-backdrop"></div>
      <div class="qs-sheet-panel" role="dialog" aria-modal="true">
        <div class="qs-sheet-handle"></div>
        <button class="qs-sheet-close" aria-label="Close">✕</button>
        <div class="qs-sheet-body"></div>
      </div>
    </div>
  `;let r=e.querySelector(`.qs-sheet`),i=e.querySelector(`.qs-sheet-body`),a=e.querySelector(`.qs-tip`),o=null;function s(){r.hidden=!0,r.classList.remove(`open`),o?.classList.remove(`active`),o=null}function c(e,t){o?.classList.remove(`active`),o=e,e.classList.add(`active`),i.innerHTML=Ze(t),r.hidden=!1,r.offsetWidth,r.classList.add(`open`)}e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`read`}),e.querySelectorAll(`.qs-word`).forEach(e=>{e.addEventListener(`click`,()=>{if(a?.remove(),o===e){s();return}let t=Number(e.dataset.vi),r=Number(e.dataset.wi);c(e,n.verses[t].words[r])})}),e.querySelector(`.qs-sheet-backdrop`).addEventListener(`click`,s),e.querySelector(`.qs-sheet-close`).addEventListener(`click`,s),document.addEventListener(`keydown`,function e(t){t.key===`Escape`&&!r.hidden&&s(),document.contains(r)||document.removeEventListener(`keydown`,e)})}function $e(e){return e.length>0&&[...e].every(e=>{let t=e.codePointAt(0);return t>=1750&&t<=1773})}function et(e,t){let n=0;return e.arabic.split(` `).map(r=>{if(r.codePointAt(0)===1757)return`<span class="qs-ayah-sep">${r.slice(1)||`۝`}</span>`;if($e(r)||n>=e.words.length)return`<span class="qs-waqaf">${r}</span>`;let i=`<button class="qs-word" data-vi="${t}" data-wi="${n}">${e.words[n].arabic}</button>`;return n++,i}).join(` `)}function tt(e){return`
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${e.arabic}</span>
        <span class="qs-detail-translit">${e.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${e.meaning}</span>
    </div>
  `}function nt(e){return`
    <div class="dzikir-hadith">
      <span class="dzikir-hadith-ref">📖 ${e.reference}</span>
      ${e.arabic?`<p class="dzikir-hadith-arabic" dir="rtl">${e.arabic}</p>`:``}
      <p class="dzikir-hadith-content">${e.content}</p>
    </div>
  `}async function rt(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await ve(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Dzikir not found.</p>
        <button class="btn-back" onclick="window.location.hash='dzikir'">← Back</button>
      </div>
    `;return}e.innerHTML=`
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back">← Back</button>
        <span class="qs-deck-title">${n.title}</span>
      </div>

      <p class="qs-tip">👆 Tap the card to count · tap a word for its meaning</p>

      <div class="qs-verses">
        ${n.items.map((e,t)=>`
          <div class="qs-verse dzikir-item">
            <div class="dzikir-item-head">
              <span class="dzikir-counter" data-target="${e.repeat}" data-count="0">0 / ${e.repeat}</span>
              ${e.title?`<span class="dzikir-item-title">${e.title}</span>`:``}
              ${e.hadith?`<button class="dzikir-hadith-btn" data-ii="${t}" aria-label="View source hadith">📖</button>`:``}
            </div>
            <div class="qs-arabic" dir="rtl">
              ${et(e,t)}
            </div>
          </div>
        `).join(``)}
      </div>
    </div>

    <div class="qs-sheet" hidden>
      <div class="qs-sheet-backdrop"></div>
      <div class="qs-sheet-panel" role="dialog" aria-modal="true">
        <div class="qs-sheet-handle"></div>
        <button class="qs-sheet-close" aria-label="Close">✕</button>
        <div class="qs-sheet-body"></div>
      </div>
    </div>
  `;let r=e.querySelector(`.qs-sheet`),i=e.querySelector(`.qs-sheet-body`),a=e.querySelector(`.qs-tip`),o=null;function s(){r.hidden=!0,r.classList.remove(`open`),o?.classList.remove(`active`),o=null}function c(e){i.innerHTML=e,r.hidden=!1,r.offsetWidth,r.classList.add(`open`)}function l(e,t){o?.classList.remove(`active`),o=e,e.classList.add(`active`),c(tt(t))}e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`dzikir`}),e.querySelectorAll(`.dzikir-item`).forEach(e=>{let t=e.querySelector(`.dzikir-counter`),n=Number(t.dataset.target);e.addEventListener(`click`,()=>{a?.remove();let e=Number(t.dataset.count);e=e>=n?0:e+1,t.dataset.count=String(e);let r=e>=n;t.textContent=r?`✓ ${e} / ${n}`:`${e} / ${n}`,t.classList.toggle(`done`,r),t.classList.remove(`bump`),t.offsetWidth,t.classList.add(`bump`)})}),e.querySelectorAll(`.qs-word`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.stopPropagation(),a?.remove(),o===e){s();return}let r=Number(e.dataset.vi),i=Number(e.dataset.wi);l(e,n.items[r].words[i])})}),e.querySelectorAll(`.dzikir-hadith-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),a?.remove(),o?.classList.remove(`active`),o=null;let r=Number(e.dataset.ii);c(nt(n.items[r].hadith))})}),e.querySelector(`.qs-sheet-backdrop`).addEventListener(`click`,s),e.querySelector(`.qs-sheet-close`).addEventListener(`click`,s),document.addEventListener(`keydown`,function e(t){t.key===`Escape`&&!r.hidden&&s(),document.contains(r)||document.removeEventListener(`keydown`,e)})}var it=`رَبِّ`,at=[{id:`low`,label:`Low (under letter)`,feature:`"cv62" 1`},{id:`high`,label:`High (under shadda)`,feature:`normal`}];function ot(e){return e.replace(/^Kosakata Al-Quran - /,``)}function st(e){let t=Date.now()-e,n=6e4,r=60*n,i=24*r;return t<n?`just now`:t<r?`${Math.floor(t/n)}m ago`:t<i?`${Math.floor(t/r)}h ago`:t<7*i?`${Math.floor(t/i)}d ago`:new Date(e).toLocaleDateString()}function ct(){return C.map(e=>({deck:e,visited:Number(localStorage.getItem(`last_visited_${e.id}`)??0)})).filter(e=>e.visited>0).sort((e,t)=>t.visited-e.visited)}function lt(e){let t=ct();e.innerHTML=`
    <div class="nav-page settings-page">
      <div class="nav-hero">
        <h2>Settings</h2>
        <p class="nav-subtitle">Personalize your appearance and review your history</p>
      </div>

      <section class="settings-section">
        <h3 class="settings-heading">Theme</h3>
        <div class="settings-options">${f.map(e=>`
    <button class="settings-option theme-option ${ee()===e?`active`:``}" data-theme="${e}">
      <span class="settings-option-icon">${p[e].icon}</span>
      <span class="settings-option-label">${p[e].label}</span>
    </button>
  `).join(``)}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Kasra Position</h3>
        <div class="settings-options">${at.map(e=>`
    <button class="settings-option kasra-option ${l()===e.id?`active`:``}" data-kasra="${e.id}">
      <span class="settings-option-sample" style="font-family: 'Scheherazade New', serif; font-feature-settings: ${e.feature}">${it}</span>
      <span class="settings-option-label">${e.label}</span>
    </button>
  `).join(``)}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Recently Visited</h3>
        <div class="settings-history">${t.length===0?`<p class="nav-empty">No decks visited yet.</p>`:t.map(({deck:e,visited:t})=>`
        <button class="settings-history-item" data-deck-id="${e.id}">
          <span class="settings-history-title">${ot(e.title)}</span>
          <span class="settings-history-time">${st(t)}</span>
        </button>
      `).join(``)}</div>
      </section>
    </div>
  `;let n=e.querySelectorAll(`.theme-option`);n.forEach(e=>{e.addEventListener(`click`,()=>{y(e.dataset.theme),n.forEach(t=>t.classList.toggle(`active`,t===e))})});let r=e.querySelectorAll(`.kasra-option`);r.forEach(e=>{e.addEventListener(`click`,()=>{u(e.dataset.kasra),r.forEach(t=>t.classList.toggle(`active`,t===e))})}),e.querySelectorAll(`.settings-history-item`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})})}document.querySelector(`#app`).innerHTML=`
  <header class="app-header">
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-drawer">☰</button>
    <span class="app-title"></span>
    <nav class="header-tabs" id="nav-drawer" role="tablist" aria-label="Sections">
      <button class="header-tab" data-tab="flashcard" role="tab">Flashcard</button>
      <button class="header-tab" data-tab="breakdown" role="tab">Breakdown</button>
      <button class="header-tab" data-tab="reading" role="tab">Read</button>
      <button class="header-tab" data-tab="dzikir" role="tab">Dzikir</button>
    </nav>
    <div class="header-actions">
      <button class="settings-toggle" aria-label="Settings">⚙️</button>
    </div>
    <div class="nav-scrim" hidden></div>
  </header>
  <main class="app-main" id="main-content"></main>
  <footer class="app-footer">
    <a class="github-link" href="https://github.com/ikhwanh/arabic-flashcard" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>Source on GitHub</span>
    </a>
    <span class="app-version">v4.0.0</span>
  </footer>
`,b();var q=document.getElementById(`main-content`),J=document.querySelector(`.app-header`),Y=J.querySelector(`.nav-toggle`),X=J.querySelector(`.header-tabs`),ut=J.querySelector(`.app-title`),Z=document.querySelector(`.nav-scrim`),dt={flashcard:`Flashcard`,breakdown:`Breakdown`,reading:`Read`,dzikir:`Dzikir`},Q=()=>{X.classList.remove(`open`),Z.hidden=!0,Y.setAttribute(`aria-expanded`,`false`)},ft=()=>{X.classList.add(`open`),Z.hidden=!1,Y.setAttribute(`aria-expanded`,`true`)};Y.addEventListener(`click`,()=>{X.classList.contains(`open`)?Q():ft()}),Z.addEventListener(`click`,Q),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Q()});var pt=J.querySelectorAll(`.header-tab`);pt.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;window.location.hash=t===`breakdown`?`qs`:t===`reading`?`read`:t===`dzikir`?`dzikir`:``,Q()})}),J.querySelector(`.settings-toggle`).addEventListener(`click`,()=>{window.location.hash=`settings`});function $(e){pt.forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),ut.textContent=e?dt[e]:`Settings`}function mt(){let e=window.location.hash.slice(1),t=e.match(/^deck\/(.+)$/),n=e.match(/^deck\/(.+)\/quiz$/),r=e.match(/^test(?:\/(.+))?$/),i=e.match(/^qs\/(.+)\/game\/(\d+)$/),a=e.match(/^qs\/(.+)\/game$/),o=e.match(/^qs\/(.+)$/),s=e===`qs`,c=e.match(/^read\/(.+)$/),l=e===`read`,u=e.match(/^dzikir\/(.+)$/);e===`settings`?(J.hidden=!1,$(null),lt(q)):i?(J.hidden=!0,G(q,i[1],Number(i[2])).catch(console.error)):a?(J.hidden=!0,G(q,a[1]).catch(console.error)):o?(J.hidden=!0,Je(q,o[1]).catch(console.error)):s?(J.hidden=!1,$(`breakdown`),F(q,`breakdown`)):c?(J.hidden=!0,Qe(q,c[1]).catch(console.error)):l?(J.hidden=!1,$(`reading`),F(q,`reading`)):u?(J.hidden=!0,rt(q,u[1]).catch(console.error)):e===`dzikir`?(J.hidden=!1,$(`dzikir`),F(q,`dzikir`)):r?(J.hidden=!0,V(q,r[1]).catch(console.error)):n?(J.hidden=!0,L(q,n[1]).catch(console.error)):t?(J.hidden=!0,ke(q,t[1]).catch(console.error)):(J.hidden=!1,$(`flashcard`),F(q,`flashcard`))}window.addEventListener(`hashchange`,mt),mt();