(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`arabic_kasra`,t=`'Scheherazade New', serif`,n=`low`;function r(){let t=localStorage.getItem(e);return t===`low`||t===`high`?t:n}function i(e){return e===`low`?`"cv62" 1`:`normal`}var a=r();function o(){let e=document.documentElement.style;e.setProperty(`--font-arabic`,t),e.setProperty(`--font-feature`,i(a))}o();function s(){return a}function c(t){a=t,localStorage.setItem(e,t),o()}var l=`theme`,u=[`light`,`dark`,`sand`,`tundra`],d={light:{icon:`☀️`,label:`Light`},dark:{icon:`🌙`,label:`Dark`},sand:{icon:`🏜️`,label:`Melancholy Sand`},tundra:{icon:`🌲`,label:`Greeny Tundra`}};function f(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function p(){let e=localStorage.getItem(l);return u.includes(e)?e:null}var m=p()??f(),h=new Set;function g(){document.documentElement.setAttribute(`data-theme`,m)}g();function ee(){return m}function _(e){m=e,localStorage.setItem(l,e),g(),h.forEach(e=>e(m))}function v(){window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,e=>{p()||_(e.matches?`dark`:`light`)})}var te=JSON.parse(`[{"id":"kosakata-al-quran---part-1","file":"1.json","title":"Kosakata Al-Quran - Part 1","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["رَبّ","رَحْمَة","عِلْم"]},{"id":"kosakata-al-quran---part-2","file":"2.json","title":"Kosakata Al-Quran - Part 2","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَالَ","كَانَ","آيَة"]},{"id":"kosakata-al-quran---part-3","file":"3.json","title":"Kosakata Al-Quran - Part 3","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["كُلّ","شَيْء","عَبْد"]},{"id":"kosakata-al-quran---part-4","file":"4.json","title":"Kosakata Al-Quran - Part 4","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["جَعَلَ","ذَٰلِك","جَاءَ"]},{"id":"kosakata-al-quran---part-5","file":"5.json","title":"Kosakata Al-Quran - Part 5","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَمَل","شَاءَ","آتَى"]},{"id":"kosakata-al-quran---part-6","file":"6.json","title":"Kosakata Al-Quran - Part 6","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["دِين","رَحِيم","دَعَا"]},{"id":"kosakata-al-quran---part-7","file":"7.json","title":"Kosakata Al-Quran - Part 7","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَرَادَ","عَظِيم","مُسْلِم"]},{"id":"kosakata-al-quran---part-8","file":"8.json","title":"Kosakata Al-Quran - Part 8","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["رَأَى","وَعَدَ","أَجْر"]},{"id":"kosakata-al-quran---part-9","file":"9.json","title":"Kosakata Al-Quran - Part 9","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَعْد","قَبْل","سَأَلَ"]},{"id":"kosakata-al-quran---part-10","file":"10.json","title":"Kosakata Al-Quran - Part 10","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَلِيم","حَكِيم","عَزِيز"]},{"id":"kosakata-al-quran---part-11","file":"11.json","title":"Kosakata Al-Quran - Part 11","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قُلْ","عَلِمَ","كَذَّبَ"]},{"id":"kosakata-al-quran---part-12","file":"12.json","title":"Kosakata Al-Quran - Part 12","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِلَٰه","رَحْمَٰن","سَلَام"]},{"id":"kosakata-al-quran---part-13","file":"13.json","title":"Kosakata Al-Quran - Part 13","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَدَرَ","وَلِيّ","اسْم"]},{"id":"kosakata-al-quran---part-14","file":"14.json","title":"Kosakata Al-Quran - Part 14","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["سَمِعَ","يَد","مُسْتَقِيم"]},{"id":"kosakata-al-quran---part-15","file":"15.json","title":"Kosakata Al-Quran - Part 15","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["ضَلَّ","سَجَدَ","قَرَأَ"]},{"id":"kosakata-al-quran---part-16","file":"16.json","title":"Kosakata Al-Quran - Part 16","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["هَذَا","كَتَبَ","عَدُوّ"]},{"id":"kosakata-al-quran---part-17","file":"17.json","title":"Kosakata Al-Quran - Part 17","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قُرْآن","إِسْلَام","صَدَقَة"]},{"id":"kosakata-al-quran---part-18","file":"18.json","title":"Kosakata Al-Quran - Part 18","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَضَى","نَزَلَ","خَرَجَ"]},{"id":"kosakata-al-quran---part-19","file":"19.json","title":"Kosakata Al-Quran - Part 19","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عِبَادَة","غَفَرَ","إِخْلَاص"]},{"id":"kosakata-al-quran---part-20","file":"20.json","title":"Kosakata Al-Quran - Part 20","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["قَوْل","جَزَاء","تَرَكَ"]},{"id":"kosakata-al-quran---part-21","file":"21.json","title":"Kosakata Al-Quran - Part 21","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["سَيِّئَة","مَصِير","أَكْثَر"]},{"id":"kosakata-al-quran---part-22","file":"22.json","title":"Kosakata Al-Quran - Part 22","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِلَّا","أَرْسَلَ","شَدِيدٌ"]},{"id":"kosakata-al-quran---part-23","file":"23.json","title":"Kosakata Al-Quran - Part 23","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["إِذْ","قَدْ","أَمَّا"]},{"id":"kosakata-al-quran---part-24","file":"24.json","title":"Kosakata Al-Quran - Part 24","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنَّ","هُوَ","هُمْ"]},{"id":"kosakata-al-quran---part-25","file":"25.json","title":"Kosakata Al-Quran - Part 25","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنَا","نَحْنُ","هِيَ"]},{"id":"kosakata-al-quran---part-26","file":"26.json","title":"Kosakata Al-Quran - Part 26","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَنْتَ","تَبِعَ","نَفَعَ"]},{"id":"kosakata-al-quran---part-27","file":"27.json","title":"Kosakata Al-Quran - Part 27","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُولَٰئِكَ","أَعَدَّ","وَرِثَ"]},{"id":"kosakata-al-quran---part-28","file":"28.json","title":"Kosakata Al-Quran - Part 28","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["تَابَ","عَصَى","أَطَاعَ"]},{"id":"kosakata-al-quran---part-29","file":"29.json","title":"Kosakata Al-Quran - Part 29","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["مَال","قَتَلَ","شَمْس"]},{"id":"kosakata-al-quran---part-30","file":"30.json","title":"Kosakata Al-Quran - Part 30","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُمّ","اِبْن","نَجْم"]},{"id":"kosakata-al-quran---part-31","file":"31.json","title":"Kosakata Al-Quran - Part 31","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["خَبِير","لَطِيف","قَوِيّ"]},{"id":"kosakata-al-quran---part-32","file":"32.json","title":"Kosakata Al-Quran - Part 32","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["نَعِيم","جَحِيم","حَمِيد"]},{"id":"kosakata-al-quran---part-33","file":"33.json","title":"Kosakata Al-Quran - Part 33","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أَحْسَن","سَنَة","عَام"]},{"id":"kosakata-al-quran---part-34","file":"34.json","title":"Kosakata Al-Quran - Part 34","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["عَسَل","خَمْر","لَحْم"]},{"id":"kosakata-al-quran---part-35","file":"35.json","title":"Kosakata Al-Quran - Part 35","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حُزْن","غَضَب","رَضِيَ"]},{"id":"kosakata-al-quran---part-36","file":"36.json","title":"Kosakata Al-Quran - Part 36","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["وَصَلَ","قَطَعَ","بَنَى"]},{"id":"kosakata-al-quran---part-37","file":"37.json","title":"Kosakata Al-Quran - Part 37","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["نَقَضَ","وَعَظَ","نَوْم"]},{"id":"kosakata-al-quran---part-38","file":"38.json","title":"Kosakata Al-Quran - Part 38","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["تِين","رُمَّان","فَاكِهَة"]},{"id":"kosakata-al-quran---part-39","file":"39.json","title":"Kosakata Al-Quran - Part 39","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["لُؤْلُؤ","حَرِير","سَحَاب"]},{"id":"kosakata-al-quran---part-40","file":"40.json","title":"Kosakata Al-Quran - Part 40","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَقَرَة","غَنَم","نَحْل"]},{"id":"kosakata-al-quran---part-41","file":"41.json","title":"Kosakata Al-Quran - Part 41","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["أُخْت","بِنْت","جَدّ"]},{"id":"kosakata-al-quran---part-42","file":"42.json","title":"Kosakata Al-Quran - Part 42","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["جِنّ","حُور","وِلْدَان"]},{"id":"kosakata-al-quran---part-43","file":"43.json","title":"Kosakata Al-Quran - Part 43","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["ضُحَى","عَصْر","عَشِيّ"]},{"id":"kosakata-al-quran---part-44","file":"44.json","title":"Kosakata Al-Quran - Part 44","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["بَلَد","طَرِيق","سُور"]},{"id":"kosakata-al-quran---part-45","file":"45.json","title":"Kosakata Al-Quran - Part 45","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["فَم","شَفَة","جِلْد"]},{"id":"kosakata-al-quran---part-46","file":"46.json","title":"Kosakata Al-Quran - Part 46","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["طِين","تُرَاب","دُخَان"]},{"id":"kosakata-al-quran---part-47","file":"47.json","title":"Kosakata Al-Quran - Part 47","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["وَرَق","زَهْرَة","سُنْبُلَة"]},{"id":"kosakata-al-quran---part-48","file":"48.json","title":"Kosakata Al-Quran - Part 48","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حِجَاب","بُرْهَان","سُلْطَان"]},{"id":"kosakata-al-quran---part-49","file":"49.json","title":"Kosakata Al-Quran - Part 49","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["حَسَد","عَفْو","رَأْفَة"]},{"id":"kosakata-al-quran---part-50","file":"50.json","title":"Kosakata Al-Quran - Part 50","description":"Kata-kata bermakna yang paling sering muncul di Al-Quran","emoji":"📖","cardCount":10,"preview":["زَعَمَ","وَدَّ","يَئِسَ"]}]`),ne=`modulepreload`,re=function(e){return`/arabic-flashcard/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=re(t,n),t in y)return;y[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:ne,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=te,S=Object.assign({"./1.json":()=>b(()=>import(`./1-BY9HUKhi.js`).then(e=>e.default),[]),"./10.json":()=>b(()=>import(`./10-BVxsw477.js`).then(e=>e.default),[]),"./11.json":()=>b(()=>import(`./11-aRlhkRex.js`).then(e=>e.default),[]),"./12.json":()=>b(()=>import(`./12-BXooq2Tp.js`).then(e=>e.default),[]),"./13.json":()=>b(()=>import(`./13-5I3k22Ac.js`).then(e=>e.default),[]),"./14.json":()=>b(()=>import(`./14-DSnG5Ggx.js`).then(e=>e.default),[]),"./15.json":()=>b(()=>import(`./15-Qgn3AVqc.js`).then(e=>e.default),[]),"./16.json":()=>b(()=>import(`./16-BTmKUV5A.js`).then(e=>e.default),[]),"./17.json":()=>b(()=>import(`./17-D1Q-W4gB.js`).then(e=>e.default),[]),"./18.json":()=>b(()=>import(`./18-d0Wv3yi0.js`).then(e=>e.default),[]),"./19.json":()=>b(()=>import(`./19-BMo-89Dz.js`).then(e=>e.default),[]),"./2.json":()=>b(()=>import(`./2-BB7pJ9EJ.js`).then(e=>e.default),[]),"./20.json":()=>b(()=>import(`./20-Dk8q1UA3.js`).then(e=>e.default),[]),"./21.json":()=>b(()=>import(`./21-y2c9Yrnr.js`).then(e=>e.default),[]),"./22.json":()=>b(()=>import(`./22-2ZEdYDm5.js`).then(e=>e.default),[]),"./23.json":()=>b(()=>import(`./23-AOGgKRbF.js`).then(e=>e.default),[]),"./24.json":()=>b(()=>import(`./24-p63hXVya.js`).then(e=>e.default),[]),"./25.json":()=>b(()=>import(`./25-B8RS5vue.js`).then(e=>e.default),[]),"./26.json":()=>b(()=>import(`./26-9LZU3XYi.js`).then(e=>e.default),[]),"./27.json":()=>b(()=>import(`./27-D7WajPD-.js`).then(e=>e.default),[]),"./28.json":()=>b(()=>import(`./28-eEPdzPcg.js`).then(e=>e.default),[]),"./29.json":()=>b(()=>import(`./29-BYqHr2WO.js`).then(e=>e.default),[]),"./3.json":()=>b(()=>import(`./3-BOBGzlLZ.js`).then(e=>e.default),[]),"./30.json":()=>b(()=>import(`./30-fKLApsjM.js`).then(e=>e.default),[]),"./31.json":()=>b(()=>import(`./31-mywjK1Zi.js`).then(e=>e.default),[]),"./32.json":()=>b(()=>import(`./32-Bgx95sj7.js`).then(e=>e.default),[]),"./33.json":()=>b(()=>import(`./33-BVsv0zU0.js`).then(e=>e.default),[]),"./34.json":()=>b(()=>import(`./34-CqaHJ3OG.js`).then(e=>e.default),[]),"./35.json":()=>b(()=>import(`./35-DwNYqH42.js`).then(e=>e.default),[]),"./36.json":()=>b(()=>import(`./36-XqDlRaCb.js`).then(e=>e.default),[]),"./37.json":()=>b(()=>import(`./37-95vN8BOT.js`).then(e=>e.default),[]),"./38.json":()=>b(()=>import(`./38-BodKD7k1.js`).then(e=>e.default),[]),"./39.json":()=>b(()=>import(`./39-DNvnBNIk.js`).then(e=>e.default),[]),"./4.json":()=>b(()=>import(`./4-BvrfaMae.js`).then(e=>e.default),[]),"./40.json":()=>b(()=>import(`./40-BbNZsw1G.js`).then(e=>e.default),[]),"./41.json":()=>b(()=>import(`./41-Bs2SMp3T.js`).then(e=>e.default),[]),"./42.json":()=>b(()=>import(`./42-CUBYJzpk.js`).then(e=>e.default),[]),"./43.json":()=>b(()=>import(`./43-CKpjSu0i.js`).then(e=>e.default),[]),"./44.json":()=>b(()=>import(`./44-BJ-LAy7h.js`).then(e=>e.default),[]),"./45.json":()=>b(()=>import(`./45-cH1LR6Os.js`).then(e=>e.default),[]),"./46.json":()=>b(()=>import(`./46-DrIuQu2G.js`).then(e=>e.default),[]),"./47.json":()=>b(()=>import(`./47-CHUqlT68.js`).then(e=>e.default),[]),"./48.json":()=>b(()=>import(`./48-BzQkLfKV.js`).then(e=>e.default),[]),"./49.json":()=>b(()=>import(`./49-DS3lhSW8.js`).then(e=>e.default),[]),"./5.json":()=>b(()=>import(`./5-DWALfBMH.js`).then(e=>e.default),[]),"./50.json":()=>b(()=>import(`./50-8WfGB42I.js`).then(e=>e.default),[]),"./6.json":()=>b(()=>import(`./6-De_42IXr.js`).then(e=>e.default),[]),"./7.json":()=>b(()=>import(`./7-C6FjekWi.js`).then(e=>e.default),[]),"./8.json":()=>b(()=>import(`./8-B7girZFL.js`).then(e=>e.default),[]),"./9.json":()=>b(()=>import(`./9-CvZgr27y.js`).then(e=>e.default),[])});function ie(e,t){let n=e.groups.find(e=>e.id===t);return n?{id:n.id,title:n.group_title,description:n.group_description,emoji:x.find(e=>e.id===t)?.emoji??`📚`,cards:n.words.map((e,t)=>({id:`${n.id}_${t}`,arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:n.group_title,quranExample:e.quran_example}))}:null}function C(e){return{id:e.meta.title.toLowerCase().replace(/\s+/g,`-`),title:e.meta.title,description:e.meta.description,emoji:`📖`,cards:e.cards.map(e=>({id:String(e.id),arabic:e.arabic,transliteration:e.transliteration,indonesian:e.translation,wordType:e.word_type,root:e.root,forms:e.forms,relatedWords:e.related_words,quranExample:e.quran_example}))}}function w(e){return typeof e==`object`&&!!e&&`groups`in e}function T(e){return typeof e==`object`&&!!e&&`cards`in e}function ae(e){let t=e.match(/Part\s+(\d+)/i);return t?Number(t[1]):null}async function oe(e){let t=e?x.filter(t=>{let n=ae(t.title);return n!==null&&n>=e[0]&&n<=e[1]}):x,n=[...new Set(t.map(e=>e.file))].filter(e=>e!==`0.json`);return(await Promise.all(n.map(async e=>{let t=S[`./${e}`];if(!t)return[];let n=await t();return T(n)?C(n).cards:[]}))).flat()}async function E(e){let t=x.find(t=>t.id===e);if(!t)return null;let n=S[`./${t.file}`];if(!n)return null;let r=await n();return w(r)?ie(r,e):T(r)?C(r):null}var D=[{id:`6_76-79`,surah:6,surahName:`Al-An'aam`,from:76,to:79,title:`Al-An'aam 76–79`,description:`Kisah Nabi Ibrahim mencari Tuhan: ia mengamati bintang, bulan, dan matahari, lalu menyadari semuanya tenggelam, hingga ia berserah hanya kepada Pencipta langit dan bumi.`,verseCount:4},{id:`24_35-38`,surah:24,surahName:`An-Nur`,from:35,to:38,title:`An-Nur 35–38`,description:`Ayat Cahaya (Ayatun Nur): perumpamaan agung tentang cahaya Allah, lalu gambaran orang-orang beriman yang berdzikir di masjid dan tidak dilalaikan dunia.`,verseCount:4}],O=Object.assign({"./24_35-38.json":()=>b(()=>import(`./24_35-38-BmVHzYzi.js`).then(e=>e.default),[]),"./6_76-79.json":()=>b(()=>import(`./6_76-79-BjBq2RLj.js`).then(e=>e.default),[])});function se(e){return`./${e}.json`}async function ce(e){let t=O[se(e)];if(!t)return null;let n=await t();return{id:e,surah:n.meta.surah,surahName:n.meta.surahName,from:n.meta.from,to:n.meta.to,title:n.meta.title,description:n.meta.description,verses:n.verses}}function k(e){return localStorage.getItem(`quiz_score_${e}`)}function A(e){return Number(localStorage.getItem(`last_visited_${e}`)??0)}function le(){x.forEach(e=>{localStorage.removeItem(`quiz_score_${e.id}`),localStorage.removeItem(`last_visited_${e.id}`)})}function ue(e,t,n){let r=document.createElement(`div`);r.className=`confirm-overlay`,r.innerHTML=`
    <div class="confirm-dialog">
      <p class="confirm-title">${e}</p>
      <p class="confirm-message">${t}</p>
      <div class="confirm-actions">
        <button class="confirm-cancel">Cancel</button>
        <button class="confirm-ok">Reset</button>
      </div>
    </div>
  `;let i=()=>document.body.removeChild(r);r.querySelector(`.confirm-cancel`).addEventListener(`click`,i),r.querySelector(`.confirm-ok`).addEventListener(`click`,()=>{i(),n()}),r.addEventListener(`click`,e=>{e.target===r&&i()}),document.body.appendChild(r),r.querySelector(`.confirm-cancel`).focus()}function j(){return x.some(e=>k(e.id)!==null||A(e.id)>0)}function de(e){return e.title.replace(/^Kosakata Al-Quran - /,``)}function M(e,t){let n=[...x].sort((e,t)=>A(t.id)-A(e.id)),r=t?n.filter(e=>k(e.id)===null):n,i=e.querySelector(`.deck-grid`);i.innerHTML=r.length===0?`<p class="nav-empty">All decks have been quizzed. Well done!</p>`:r.map(e=>{let t=k(e.id);return`
        <div class="deck-card">
          <button class="deck-card-study" data-deck-id="${e.id}" aria-label="Study ${e.title}">
            ${t===null?``:`<span class="deck-score-chip">${t}</span>`}
            <h3 class="deck-title">${de(e)}</h3>
            <p class="deck-preview">${e.preview.join(` · `)}</p>
          </button>
          <div class="deck-card-footer">
            <span class="deck-count">${e.cardCount} cards</span>
            <button class="btn-quiz" data-quiz-id="${e.id}" aria-label="Take quiz for ${e.title}">Quiz →</button>
          </div>
        </div>
      `}).join(``),i.querySelectorAll(`.deck-card-study`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})}),i.querySelectorAll(`.btn-quiz`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.quizId}/quiz`})})}function N(e){let t=e.querySelector(`.qs-index-grid`);t.innerHTML=D.length===0?`<p class="nav-empty">No breakdowns yet. Generate one with the qs-breakdown command.</p>`:D.map(e=>`
        <button class="qs-index-card" data-id="${e.id}">
          <span class="qs-index-surah">QS ${e.surah} · ${e.surahName}</span>
          <h3 class="qs-index-title">${e.title}</h3>
          <p class="qs-index-desc">${e.description}</p>
          <span class="qs-index-count">Ayat ${e.from}–${e.to} · ${e.verseCount} ayat</span>
        </button>
      `).join(``),t.querySelectorAll(`.qs-index-card`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`qs/${e.dataset.id}`})})}function P(e){let t=e.querySelector(`.btn-reset-all`);t&&(t.disabled=!j())}function F(e,t=`flashcard`){let n=!1,r=`
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
          <button class="nav-menu-item btn-reset-all" ${j()?``:`disabled`}>Reset all progress</button>
        </div>
      </div>
    </div>
    <div class="deck-grid"></div>
  `;if(e.innerHTML=`
    <div class="nav-page">
      ${t===`flashcard`?r:`
    <div class="nav-hero">
      <h2>Surah Breakdown</h2>
      <p class="nav-subtitle">Read verses word by word</p>
    </div>
    <div class="qs-index-grid"></div>
  `}
    </div>
  `,t===`breakdown`){N(e);return}M(e,n);let i=e.querySelector(`.nav-menu`),a=i.querySelector(`.nav-menu-trigger`),o=i.querySelector(`.nav-menu-dropdown`),s=()=>{o.hidden=!0,a.setAttribute(`aria-expanded`,`false`),document.removeEventListener(`click`,c)},c=e=>{i.contains(e.target)||s()};a.addEventListener(`click`,()=>{let e=o.hidden;o.hidden=!e,a.setAttribute(`aria-expanded`,String(e)),e?document.addEventListener(`click`,c):document.removeEventListener(`click`,c)}),i.querySelectorAll(`[data-exam]`).forEach(e=>{e.addEventListener(`click`,()=>{s();let t=e.dataset.exam;window.location.hash=t===`all`?`test`:`test/${t}`})}),e.querySelector(`[data-filter="unfinished"]`).addEventListener(`click`,t=>{let r=t.currentTarget;n=!n,r.classList.toggle(`active`,n),M(e,n)}),e.querySelector(`.btn-reset-all`).addEventListener(`click`,()=>{s(),ue(`Reset all progress?`,`This will clear all quiz scores and visit history.`,()=>{le(),n=!1,e.querySelector(`[data-filter="unfinished"]`).classList.remove(`active`),P(e),M(e,n)})})}async function I(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await E(t);if(!n){e.innerHTML=`
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
    `,o()}function o(){e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let t=e.querySelector(`#fc-card`),o=()=>{i=!i,a()};t.addEventListener(`click`,o),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())}),e.querySelector(`#btn-prev`)?.addEventListener(`click`,()=>{r>0&&(r--,i=!1,a())}),e.querySelector(`#btn-next`)?.addEventListener(`click`,()=>{r<n.cards.length-1&&(r++,i=!1,a())}),e.querySelectorAll(`.fc-dot`).forEach(e=>{e.addEventListener(`click`,()=>{r=Number(e.dataset.index),i=!1,a()})})}a()}function L(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function R(e,t){return L(e).slice(0,t)}function z(e,t){let n=R(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:L([e.indonesian,...n]),ayatArabic:e.quranExample?.arabic,ayatRef:e.quranExample?`${e.quranExample.surah} ${e.quranExample.ayah}`:void 0,ayatTranslation:e.quranExample?.translation}}function B(e){return e.length<4?[]:R(e,Math.min(10,e.length)).map(t=>z(t,e))}function V(e,t,n){localStorage.setItem(`quiz_score_${e}`,`${t}/${n}`)}async function H(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await E(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Deck not found.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let r=B(n.cards);if(r.length===0){e.innerHTML=`
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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let f=()=>{let t=e.querySelector(`#ayat-translation`);t&&(t.style.display=`block`);let n=e.querySelector(`#btn-hint`);n&&(n.style.display=`none`)};e.querySelector(`#btn-hint`)?.addEventListener(`click`,f),e.querySelectorAll(`.quiz-option`).forEach(t=>{t.addEventListener(`click`,()=>{o||(o=!0,f(),decodeURIComponent(t.dataset.value)===l.correct?(a++,t.classList.add(`correct`)):(t.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===l.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{i<r.length-1?(i++,o=!1,s()):(V(t,a,r.length),c())})}function c(){let i=r.length;e.innerHTML=`
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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{H(e,t)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}s()}var fe=50,U={"1-10":{key:`test_score_1_10`,title:`Exam 1`,range:[1,10]},"11-20":{key:`test_score_11_20`,title:`Exam 2`,range:[11,20]},"21-30":{key:`test_score_21_30`,title:`Exam 3`,range:[21,30]},"31-40":{key:`test_score_31_40`,title:`Exam 4`,range:[31,40]},"41-50":{key:`test_score_41_50`,title:`Exam 5`,range:[41,50]},all:{key:`test_score`,title:`Final Exam`,size:100}};function pe(e){return e&&U[e]||U.all}function W(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function G(e,t){return W(e).slice(0,t)}function me(e,t){let n=G(t.filter(t=>t.id!==e.id),3).map(e=>e.indonesian);return{prompt:e.arabic,promptLabel:`What does this word mean?`,correct:e.indonesian,options:W([e.indonesian,...n]),ayatArabic:e.quranExample?.arabic,ayatRef:e.quranExample?`${e.quranExample.surah} ${e.quranExample.ayah}`:void 0,ayatTranslation:e.quranExample?.translation}}function he(e,t){return G(e,Math.min(t,e.length)).map(t=>me(t,e))}function ge(e,t,n){localStorage.setItem(e,`${t}/${n}`)}async function K(e,t){let n=pe(t);e.innerHTML=`<div class="fc-loading">Loading test…</div>`;let r=await oe(n.range);if(r.length<4){e.innerHTML=`
      <div class="error-page">
        <p>Not enough cards to generate a test.</p>
        <button class="btn-back" onclick="window.location.hash=''">← Back</button>
      </div>
    `;return}let i=he(r,n.size??fe),a=0,o=0,s=!1;function c(){let t=i[a],r=i.length,u=a===r-1;e.innerHTML=`
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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``});let d=()=>{let t=e.querySelector(`#ayat-translation`);t&&(t.style.display=`block`);let n=e.querySelector(`#btn-hint`);n&&(n.style.display=`none`)};e.querySelector(`#btn-hint`)?.addEventListener(`click`,d),e.querySelectorAll(`.quiz-option`).forEach(n=>{n.addEventListener(`click`,()=>{s||(s=!0,d(),decodeURIComponent(n.dataset.value)===t.correct?(o++,n.classList.add(`correct`)):(n.classList.add(`wrong`),e.querySelectorAll(`.quiz-option`).forEach(e=>{decodeURIComponent(e.dataset.value)===t.correct&&e.classList.add(`correct`)})),e.querySelectorAll(`.quiz-option`).forEach(e=>e.disabled=!0),e.querySelector(`#btn-next`).style.display=`block`)})}),e.querySelector(`#btn-next`).addEventListener(`click`,()=>{a<i.length-1?(a++,s=!1,c()):(ge(n.key,o,i.length),l())})}function l(){let r=i.length,a=Math.round(o/r*100),s=o===r?`Perfect!`:a>=70?`Great job!`:`Keep practicing!`;e.innerHTML=`
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
    `,e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=``}),e.querySelector(`.btn-quiz-retry`).addEventListener(`click`,()=>{K(e,t)}),e.querySelector(`.btn-quiz-back`).addEventListener(`click`,()=>{window.location.hash=``})}c()}var _e={ism:`kata benda (ism)`,"fi'l":`kata kerja (fi'l)`,harf:`kata tugas (harf)`},q={past:`Lampau`,present:`Sekarang`,future:`Akan datang`,command:`Perintah`};function ve(e){let t=Object.keys(q).filter(t=>e[t]).map(t=>`
      <span class="qs-form">
        <span class="qs-form-label">${q[t]}</span>
        <span class="qs-form-arabic">${e[t]}</span>
      </span>
    `);return t.length===0?``:`<div class="qs-forms" dir="rtl">${t.join(``)}</div>`}function ye(e){return`
    <div class="qs-detail">
      <div class="qs-detail-head">
        <span class="qs-detail-arabic">${e.arabic}</span>
        <span class="qs-detail-translit">${e.transliteration}</span>
      </div>
      <span class="qs-detail-meaning">${e.meaning}</span>
      <div class="qs-detail-tags">
        <span class="qs-type-badge qs-type-${e.type===`fi'l`?`fil`:e.type}">${_e[e.type]}</span>
        ${e.root?`<span class="qs-detail-root">Akar: ${e.root}</span>`:``}
      </div>
      ${e.forms?ve(e.forms):``}
      ${e.notes?`<p class="qs-detail-notes">${e.notes}</p>`:``}
    </div>
  `}async function be(e,t){e.innerHTML=`<div class="fc-loading">Loading…</div>`;let n=await ce(t);if(!n){e.innerHTML=`
      <div class="error-page">
        <p>Breakdown not found.</p>
        <button class="btn-back" onclick="window.location.hash='qs'">← Back</button>
      </div>
    `;return}e.innerHTML=`
    <div class="qs-page">
      <div class="qs-header">
        <button class="btn-back">← Back</button>
        <span class="qs-deck-title">QS ${n.surah} · ${n.surahName}</span>
        <span class="qs-range">${n.from}–${n.to}</span>
      </div>

      <p class="qs-tip">👆 Tap any word to see its meaning and grammar</p>

      <div class="qs-verses">
        ${n.verses.map((e,t)=>`
          <div class="qs-verse">
            <span class="qs-ayah-num">${e.ayah}</span>
            <div class="qs-arabic" dir="rtl">
              ${e.words.map((e,n)=>`
                <button class="qs-word" data-vi="${t}" data-wi="${n}">${e.arabic}</button>
              `).join(` `)}
            </div>
            <p class="qs-translation">${e.translation}</p>
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
  `;let r=e.querySelector(`.qs-sheet`),i=e.querySelector(`.qs-sheet-body`),a=e.querySelector(`.qs-tip`),o=null;function s(){r.hidden=!0,r.classList.remove(`open`),o?.classList.remove(`active`),o=null}function c(e,t){o?.classList.remove(`active`),o=e,e.classList.add(`active`),i.innerHTML=ye(t),r.hidden=!1,r.offsetWidth,r.classList.add(`open`)}e.querySelector(`.btn-back`).addEventListener(`click`,()=>{window.location.hash=`qs`}),e.querySelectorAll(`.qs-word`).forEach(e=>{e.addEventListener(`click`,()=>{if(a?.remove(),o===e){s();return}let t=Number(e.dataset.vi),r=Number(e.dataset.wi);c(e,n.verses[t].words[r])})}),e.querySelector(`.qs-sheet-backdrop`).addEventListener(`click`,s),e.querySelector(`.qs-sheet-close`).addEventListener(`click`,s),document.addEventListener(`keydown`,function e(t){t.key===`Escape`&&!r.hidden&&s(),document.contains(r)||document.removeEventListener(`keydown`,e)})}var xe=`رَبِّ`,Se=[{id:`low`,label:`Low (under letter)`,feature:`"cv62" 1`},{id:`high`,label:`High (under shadda)`,feature:`normal`}];function Ce(e){return e.replace(/^Kosakata Al-Quran - /,``)}function J(e){let t=Date.now()-e,n=6e4,r=60*n,i=24*r;return t<n?`just now`:t<r?`${Math.floor(t/n)}m ago`:t<i?`${Math.floor(t/r)}h ago`:t<7*i?`${Math.floor(t/i)}d ago`:new Date(e).toLocaleDateString()}function we(){return x.map(e=>({deck:e,visited:Number(localStorage.getItem(`last_visited_${e.id}`)??0)})).filter(e=>e.visited>0).sort((e,t)=>t.visited-e.visited)}function Te(e){let t=we();e.innerHTML=`
    <div class="nav-page settings-page">
      <div class="nav-hero">
        <h2>Settings</h2>
        <p class="nav-subtitle">Personalize your appearance and review your history</p>
      </div>

      <section class="settings-section">
        <h3 class="settings-heading">Theme</h3>
        <div class="settings-options">${u.map(e=>`
    <button class="settings-option theme-option ${ee()===e?`active`:``}" data-theme="${e}">
      <span class="settings-option-icon">${d[e].icon}</span>
      <span class="settings-option-label">${d[e].label}</span>
    </button>
  `).join(``)}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Kasra Position</h3>
        <div class="settings-options">${Se.map(e=>`
    <button class="settings-option kasra-option ${s()===e.id?`active`:``}" data-kasra="${e.id}">
      <span class="settings-option-sample" style="font-family: 'Scheherazade New', serif; font-feature-settings: ${e.feature}">${xe}</span>
      <span class="settings-option-label">${e.label}</span>
    </button>
  `).join(``)}</div>
      </section>

      <section class="settings-section">
        <h3 class="settings-heading">Recently Visited</h3>
        <div class="settings-history">${t.length===0?`<p class="nav-empty">No decks visited yet.</p>`:t.map(({deck:e,visited:t})=>`
        <button class="settings-history-item" data-deck-id="${e.id}">
          <span class="settings-history-title">${Ce(e.title)}</span>
          <span class="settings-history-time">${J(t)}</span>
        </button>
      `).join(``)}</div>
      </section>
    </div>
  `;let n=e.querySelectorAll(`.theme-option`);n.forEach(e=>{e.addEventListener(`click`,()=>{_(e.dataset.theme),n.forEach(t=>t.classList.toggle(`active`,t===e))})});let r=e.querySelectorAll(`.kasra-option`);r.forEach(e=>{e.addEventListener(`click`,()=>{c(e.dataset.kasra),r.forEach(t=>t.classList.toggle(`active`,t===e))})}),e.querySelectorAll(`.settings-history-item`).forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=`deck/${e.dataset.deckId}`})})}document.querySelector(`#app`).innerHTML=`
  <header class="app-header">
    <nav class="header-tabs" role="tablist">
      <button class="header-tab" data-tab="flashcard" role="tab">Flashcard</button>
      <button class="header-tab" data-tab="breakdown" role="tab">Surah Breakdown</button>
    </nav>
    <div class="header-actions">
      <button class="settings-toggle" aria-label="Settings">⚙️</button>
    </div>
  </header>
  <main class="app-main" id="main-content"></main>
  <footer class="app-footer">
    <a class="github-link" href="https://github.com/ikhwanh/arabic-flashcard" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <span>Source on GitHub</span>
    </a>
    <span class="app-version">v2.3.0</span>
  </footer>
`,v();var Y=document.getElementById(`main-content`),X=document.querySelector(`.app-header`),Z=X.querySelectorAll(`.header-tab`);Z.forEach(e=>{e.addEventListener(`click`,()=>{window.location.hash=e.dataset.tab===`breakdown`?`qs`:``})}),X.querySelector(`.settings-toggle`).addEventListener(`click`,()=>{window.location.hash=`settings`});function Q(e){Z.forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e))}function $(){let e=window.location.hash.slice(1),t=e.match(/^deck\/(.+)$/),n=e.match(/^deck\/(.+)\/quiz$/),r=e.match(/^test(?:\/(.+))?$/),i=e.match(/^qs\/(.+)$/);e===`settings`?(X.hidden=!1,Q(null),Te(Y)):i?(X.hidden=!0,be(Y,i[1]).catch(console.error)):e===`qs`?(X.hidden=!1,Q(`breakdown`),F(Y,`breakdown`)):r?(X.hidden=!0,K(Y,r[1]).catch(console.error)):n?(X.hidden=!0,H(Y,n[1]).catch(console.error)):t?(X.hidden=!0,I(Y,t[1]).catch(console.error)):(X.hidden=!1,Q(`flashcard`),F(Y,`flashcard`))}window.addEventListener(`hashchange`,$),$();