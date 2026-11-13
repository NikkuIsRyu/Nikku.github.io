import{D as e,_ as t,a as n,c as r,d as i,f as a,g as o,i as s,l as c,m as l,n as u,p as d,r as f,s as p,t as m,v as h}from"./common.D707Iawx.js";import{n as g}from"./queue.DcgdA54Y.js";import{t as _}from"./progress.BK9qTant.js";import{r as v}from"./answer.MRicL-dw.js";import{i as y,n as b,t as x}from"./shuffle.CXlNVZ5I.js";var S=10,C=m(`#stage`),w=m(`#levels-note`);w&&(w.innerHTML=r()),h(document);function T(){let r=l(),h=r.getSettings(),w=Date.now(),E=i(),D=g(e,r.getCards(),h,r.getDaily(p(w)),w,S,b(E));if(D.length===0){C.innerHTML=`<div class="card"><p>この条件の例文がありません。<a href="${t()}#levels">対象レベル</a>を変えてみてください。</p></div>`;return}o(`mode_start`,`build`,h.levels.join(`+`));let O=D.length,k=0,A=0,j=()=>{let e=D.shift();if(!e){o(`session_done`,`build`,h.levels.join(`+`)),C.innerHTML=f(O,`<p class="muted">正解 ${A} / ${O}</p>`),m(`#again`)?.addEventListener(`click`,T);return}let t=n(e.id),r=y(t.tokens.map((e,t)=>t),b(x(t.id)^E)),i=[],p=()=>{let e=r.filter(e=>!i.includes(e));C.innerHTML=`${c(k,O)}
        <article class="card">
          <span class="badge">${t.cefr}</span>
          <p class="prompt-ja">${s(t.ja)}</p>
          <div class="chipline answer" id="answer" aria-label="あなたの答え">${i.map(e=>`<button type="button" class="token" data-i="${e}" data-from="answer">${s(t.tokens[e])}</button>`).join(``)}</div>
          <div class="chipline" id="bank" aria-label="単語">${e.map(e=>`<button type="button" class="token" data-i="${e}" data-from="bank" lang="de">${s(t.tokens[e])}</button>`).join(``)}</div>
          <div class="actions"><button type="button" class="btn primary" id="check" ${e.length?`disabled`:``}>確認</button></div>
        </article>`,C.querySelectorAll(`.token`).forEach(e=>e.addEventListener(`click`,()=>{let t=Number(e.dataset.i);e.dataset.from===`bank`?i.push(t):i.splice(i.indexOf(t),1),p()})),m(`#check`).addEventListener(`click`,g)},g=()=>{let n=i.map(e=>t.tokens[e]),r=v(t.tokens,n);r&&A++,e.srs&&_(l(),t.id,r?`GOOD`:`AGAIN`,Date.now(),d()),k++,C.innerHTML=`${c(k-1,O)}
        <article class="card">
          <span class="badge">${t.cefr}</span>
          <p class="prompt-ja">${s(t.ja)}</p>
          <div class="notice ${r?`good`:`bad`}"><strong>${r?`正解です！`:`おしい！ 正しい文はこちら`}</strong></div>
          <div style="display:flex;gap:10px;align-items:flex-start"><p class="de-large" style="flex:1">${u(t.de)}</p>${a(t.de)}</div>
          ${r?``:`<p class="muted small">あなたの答え：${u(n.join(` `))}</p>`}
          ${e.srs?``:`<p class="muted small">（復習の予定には入れていません）</p>`}
          <div class="actions"><button type="button" class="btn primary block" id="next">${D.length?`次へ`:`結果を見る`}</button></div>
        </article>`,m(`#next`).addEventListener(`click`,()=>{j(),window.scrollTo({top:0})})};p()};j()}T();