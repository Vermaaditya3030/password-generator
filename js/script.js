"use strict";
const $=id=>document.getElementById(id);
const SET={lowercase:"abcdefghijklmnopqrstuvwxyz",uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",numbers:"0123456789",symbols:"!@#$%^&*()-_=+[]{};:,.?/|"};
function rand(max){if(max<=0)throw Error("Invalid random range");if(window.crypto&&crypto.getRandomValues){const a=new Uint32Array(1),lim=Math.floor(4294967296/max)*max;do{crypto.getRandomValues(a)}while(a[0]>=lim);return a[0]%max}return Math.floor(Math.random()*max)}
function shuffle(s){let a=[...s];for(let i=a.length-1;i;i--){let j=rand(i+1);[a[i],a[j]]=[a[j],a[i]]}return a.join("")}
function groups(){let g=[];["lowercase","uppercase","numbers","symbols"].forEach(k=>{if($(k).checked)g.push(SET[k])});if(!g.length)throw Error("Select at least one character type.");if($("excludeSimilar").checked)g=g.map(x=>x.replace(/[iIlL1oO0]/g,""));if($("noAmbiguous").checked)g=g.map(x=>x.replace(/[{}\[\]()\/\\'"`,;:<>.]/g,""));g=g.filter(Boolean);if(!g.length)throw Error("Your exclusions removed all available characters.");return g}
function generate(){try{$("error").textContent="";let n=+$("length").value,g=groups(),pool=[...new Set(g.join(""))].join(""),a=g.map(x=>x[rand(x.length)]);while(a.length<n)a.push(pool[rand(pool.length)]);let p=shuffle(a.join(""));$("passwordOutput").value=p;let e=Math.round(n*Math.log2(pool.length));$("strengthText").textContent=e>=80?"Strong":e>=60?"Good":e>=40?"Fair":"Weak";$("entropyText").textContent=`Estimated entropy: ${e} bits • Pool: ${pool.length}`;$("strengthBar").style.width=Math.min(100,e/1.28)+"%";save(p)}catch(e){$("passwordOutput").value="";$("error").textContent=e.message}}
function save(p){let h=[];try{h=JSON.parse(localStorage.getItem("vk_history")||"[]")}catch{};h=[p,...h.filter(x=>x!==p)].slice(0,5);try{localStorage.setItem("vk_history",JSON.stringify(h))}catch{};render()}
function render(){let h=[];try{h=JSON.parse(localStorage.getItem("vk_history")||"[]")}catch{};$("history").innerHTML=h.length?h.map((p,i)=>`<div class="item"><code>${p.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}</code> <button data-i="${i}">Copy</button></div>`).join(""):"No generated passwords yet.";document.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>navigator.clipboard?navigator.clipboard.writeText(h[+b.dataset.i]):alert("Select and copy the password manually"))}
$("length").oninput=()=>$("lengthValue").textContent=$("length").value;
$("generateBtn").onclick=generate;
$("copyBtn").onclick=()=>{let p=$("passwordOutput").value;if(!p)return;try{navigator.clipboard.writeText(p)}catch{}};
$("clearHistory").onclick=()=>{try{localStorage.removeItem("vk_history")}catch{};render()};
render();generate();
