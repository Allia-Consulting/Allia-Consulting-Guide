/* ==================================================================
   ALLIA CONSULTING — _site.js
   Nav scroll state · scrollspy · smooth anchors · mobile menu ·
   mailto form · interactive expertises index · ecosystem hover ·
   theme toggle · scroll progress · count-up · canvas background ·
   animated brand mark.
   ================================================================== */

const hdr=document.getElementById('hdr');
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>30));
  // ===== scrollspy =====
  (function(){
    const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
    const secs=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if(!secs.length)return;
    function spy(){
      const y=scrollY+140;let cur=null;
      secs.forEach(s=>{if(s.offsetTop<=y)cur=s;});
      if(cur&&scrollY+innerHeight<cur.offsetTop+80)cur=null;
      links.forEach(a=>a.classList.toggle('active',!!cur&&a.getAttribute('href')==='#'+cur.id));
    }
    addEventListener('scroll',spy,{passive:true});spy();
  })();
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // ===== ancres : défilement fiable (menu mobile inclus) =====
  (function(){
    document.addEventListener('click',function(e){
      const a=e.target.closest('a[href^="#"]');
      if(!a)return;
      const id=a.getAttribute('href').slice(1);
      if(!id){e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});return;}
      const el=document.getElementById(id);
      if(!el)return;
      e.preventDefault();
      const y=el.getBoundingClientRect().top+window.scrollY-68;
      window.scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
      try{history.replaceState(null,'','#'+id);}catch(err){}
    });
  })();
  // ===== menu mobile =====
  (function(){
    const b=document.getElementById('menuBtn'),m=document.getElementById('mobileMenu');
    if(!b||!m)return;
    b.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',o);b.textContent=o?'FERMER':'MENU';});
    m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');b.setAttribute('aria-expanded','false');b.textContent='MENU';}));
  })();
  // ===== formulaire contact → mailto =====
  (function(){
    const b=document.getElementById('cfSend');if(!b)return;
    b.addEventListener('click',()=>{
      const v=id=>document.getElementById(id).value.trim();
      const body='Nom : '+v('cfName')+'\nEmail : '+v('cfMail')+'\nOrganisation : '+v('cfOrg')+'\n\nEnjeu :\n'+v('cfMsg');
      location.href='mailto:contact@allia-consulting.com?subject='+encodeURIComponent('Contact — '+(v('cfOrg')||v('cfName')||'site allia-consulting'))+'&body='+encodeURIComponent(body);
      b.textContent='Votre messagerie s\u2019ouvre\u2026';
      setTimeout(()=>b.textContent='Envoyer \u2192',4000);
    });
  })();
  // ===== expertises : index interactif =====
  (function(){
    const panel=document.getElementById('idxPanel');if(!panel)return;
    const idxWrap=panel.parentElement;
    const data=[
      {k:'01 · Stratégie & feuille de route',d:'Par où commencer, et pour quel retour ?',items:['Bâtir votre feuille de route digitale, IA et agents IA','Prioriser vos cas d\'usage à plus fort retour','Définir le schéma directeur de votre SI','Concevoir votre organisation cible (Target Operating Model)','Préparer une acquisition ou une cession — volet IT (M&A)','Piloter la valeur de votre IT (indicateurs, ROI)']},
      {k:'02 · Transformation & IA',d:'Comment passer du pilote à la production, sans perdre vos équipes ?',items:['Bâtir une architecture d\'entreprise, des données et de l\'IA','Fiabiliser et gouverner vos données','Moderniser votre SI et passer au cloud','Industrialiser l\'IA jusqu\'à la production','Digitaliser vos processus métiers et services IT (ITSM)','Embarquer et former vos équipes à l\'IA']},
      {k:'03 · Performance & Sécurité',d:'Vos coûts sont-ils justifiés, vos risques couverts ?',items:['Viser l\'excellence opérationnelle','Réduire vos coûts IT et licences','Maîtriser vos coûts cloud (FinOps)','Piloter vos fournisseurs et contrats','Sécuriser votre SI et renforcer sa résilience','Couvrir votre conformité et vos risques IT']}
    ];
    function show(i){
      const d=data[i];
      panel.innerHTML='<span class="pk">'+d.k+'</span><p class="pd">'+d.d+'</p><ul>'+d.items.map(x=>'<li>'+x+'</li>').join('')+'</ul><div class="sig-line"><svg width="20" height="12" viewBox="0 0 24 14"><path d="M12 1.8A6 6 0 0 1 12 12.2A6 6 0 0 1 12 1.8Z" fill="#0fd6c4"></path><circle cx="9" cy="7" r="6" fill="none" stroke="#808690" stroke-width="1.2"></circle><circle cx="15" cy="7" r="6" fill="none" stroke="#0fd6c4" stroke-width="1.2"></circle></svg>Mission menée avec nos agents IA</div>';
      if(!matchMedia('(prefers-reduced-motion:reduce)').matches){panel.classList.remove('swap');void panel.offsetWidth;panel.classList.add('swap');}
      const items=document.querySelectorAll('.idx-item');
      items.forEach((el,j)=>el.classList.toggle('active',j===i));
      if(matchMedia('(max-width:880px)').matches){
        items[i].insertAdjacentElement('afterend',panel);
      }else if(panel.parentElement!==idxWrap){
        idxWrap.appendChild(panel);
      }
    }
    document.querySelectorAll('.idx-item').forEach(el=>{
      el.addEventListener('mouseenter',()=>show(+el.dataset.k));
      el.addEventListener('click',()=>show(+el.dataset.k));
    });
    show(0);
  })();
  // ===== interactions tactiles (mobile / hover indisponible) =====
  (function(){
    if(!matchMedia('(hover: none)').matches)return;
    const sec=document.getElementById('cabinet');
    document.addEventListener('click',e=>{
      // écosystème : schéma ↔ cartes
      const eco=e.target.closest('[data-eco]');
      if(eco&&sec){
        const v=eco.dataset.eco;
        if(sec.getAttribute('data-hot')===v)sec.removeAttribute('data-hot');
        else sec.setAttribute('data-hot',v);
        return;
      }
      if(sec&&!e.target.closest('#cabinet'))sec.removeAttribute('data-hot');
      // cartes + lignes expertises : premier tap = surbrillance, second tap = lien
      const t=e.target.closest('.case,.icard,.cell,.xrow');
      document.querySelectorAll('.hot').forEach(x=>{if(x!==t)x.classList.remove('hot');});
      if(!t)return;
      const isLink=t.matches('a[href]');
      if(!t.classList.contains('hot')){
        t.classList.add('hot');
        if(isLink)e.preventDefault();
      }
    });
  })();
  // ===== survol lié écosystème (schéma ↔ cartes) =====
  (function(){
    const sec=document.getElementById('cabinet');if(!sec)return;
    sec.querySelectorAll('[data-eco]').forEach(el=>{
      el.addEventListener('mouseenter',()=>sec.setAttribute('data-hot',el.dataset.eco));
      el.addEventListener('mouseleave',()=>sec.removeAttribute('data-hot'));
    });
  })();
  document.getElementById('themeBtn').addEventListener('click',()=>{
    const h=document.documentElement;
    h.setAttribute('data-theme', h.getAttribute('data-theme')==='dark'?'light':'dark');
  });
  // ===== scroll progress (drives dynamic events) =====
  const docEl=document.documentElement;
  const reduced2=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const progEl=document.getElementById('progress');
  let progress=0,ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const max=document.body.scrollHeight-innerHeight;
      progress=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
      if(progEl)progEl.style.width=(progress*100)+'%';
      ticking=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // ===== count-up stats =====
  function countUp(el){
    const target=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
    const fmt=n=>n.toLocaleString('fr-FR').replace(/\u202f|\u00a0| /g,'\u202f');
    if(reduced2){el.textContent=pre+fmt(target)+suf;return;}
    const dur=1100,t0=performance.now();
    (function step(now){
      const k=Math.min(1,(now-t0)/dur);
      el.textContent=pre+fmt(Math.round(target*(1-Math.pow(1-k,3))))+suf;
      if(k<1)requestAnimationFrame(step);
    })(performance.now());
  }
  const countIO=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){countUp(e.target);countIO.unobserve(e.target);}});},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>countIO.observe(el));

  // ===== signature parallax =====
  (function(){
    var sig=document.getElementById('sig');
    if(sig&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
      var t=false;
      addEventListener('scroll',function(){if(t)return;t=true;requestAnimationFrame(function(){var y=scrollY;sig.style.transform='translateY('+(y*0.12)+'px) rotate('+(y*0.006)+'deg)';t=false;});},{passive:true});
    }
  })();

  // ===== dynamic background engine (multiple styles) =====
  (function(){
    const cv=document.getElementById('bg'); if(!cv) return;
    const ctx=cv.getContext('2d');
    const probeA=document.getElementById('probeAccent'),probeI=document.getElementById('probeInk');
    let W,H,DPR,acc=[31,43,232],ink=[14,14,16],dark=false,raf,mode='flux',frameCount=0,isMobile=false,lastW=-1,last=0;
    function parse(s){const m=(s||'').match(/[\d.]+/g);return m?[+m[0],+m[1],+m[2]]:[31,43,232];}
    function readColors(){acc=parse(getComputedStyle(probeA).color);ink=parse(getComputedStyle(probeI).color);dark=docEl.getAttribute('data-theme')==='dark';}
    new MutationObserver(readColors).observe(docEl,{attributes:true,attributeFilter:['data-theme','data-accent']});

    let words=[],ringC=[],pulses=[],lastPulse=0,blobs=[],noiseCv,noiseCtx,nodes=[];
    const WL=['Alliance','Stratégie','Agentique','Adoption','Démultiplié','Intégration','Conseil','Allia','Impact','Transformation'];

    function wrap(o,m){m=m||200; if(o.x<-m)o.x=W+m;else if(o.x>W+m)o.x=-m; if(o.y<-m)o.y=H+m;else if(o.y>H+m)o.y=-m;}

    function initTypo(){words=[];const n=W<700?7:11;
      for(let i=0;i<n;i++)words.push({txt:WL[i%WL.length],x:Math.random()*W,y:Math.random()*H,s:42+Math.random()*92,
        vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.16,stroke:Math.random()<.5,accent:Math.random()<.26});}
    function initRings(){ringC=[{x:W*0.42,y:H*0.5},{x:W*0.58,y:H*0.5}];pulses=[];lastPulse=0;}
    function initFlux(){blobs=[];const n=isMobile?4:6;for(let i=0;i<n;i++)blobs.push({ox:Math.random()*W,oy:Math.random()*H,
      vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,ang:Math.random()*6.28,angSpd:(Math.random()*.0026+.0012)*(Math.random()<.5?-1:1),
      orbit:Math.min(W,H)*(0.05+Math.random()*0.14),baseR:Math.min(W,H)*(0.24+Math.random()*0.24),ph:Math.random()*6.28,accent:i%2===0});}
    function initGrain(){if(!noiseCv){noiseCv=document.createElement('canvas');noiseCv.width=160;noiseCv.height=160;noiseCtx=noiseCv.getContext('2d');}
      blobs=[{x:W*0.7,y:H*0.3,r:Math.max(W,H)*0.72,vx:.13,vy:.09,accent:true},{x:W*0.25,y:H*0.7,r:Math.max(W,H)*0.6,vx:-.1,vy:-.07,accent:false}];}
    function initAgents(){nodes=[];const N=Math.round(Math.min(58,(W*H)/28000));
      for(let i=0;i<N;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.5+.7});}
    function initMode(){
      if(mode==='typo')initTypo();else if(mode==='rings')initRings();else if(mode==='flux')initFlux();
      else if(mode==='grain')initGrain();else if(mode==='agents')initAgents();
    }

    function drawTypo(t){ctx.clearRect(0,0,W,H);const p=progress,a=(dark?0.085:0.05)+p*0.04;ctx.textBaseline='middle';
      for(const w of words){w.x+=w.vx*(0.6+p*1.0);w.y+=w.vy*(0.6+p*1.0);wrap(w);
        ctx.font='700 '+w.s+'px "Space Grotesk", sans-serif';const c=w.accent?acc:ink;
        if(w.stroke){ctx.strokeStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';ctx.lineWidth=1;ctx.strokeText(w.txt,w.x,w.y);}
        else{ctx.fillStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+a+')';ctx.fillText(w.txt,w.x,w.y);}}}

    function drawRings(t){ctx.clearRect(0,0,W,H);const p=progress,r=acc[0],g=acc[1],b=acc[2];
      const cy=H*0.5,sep=W*(0.11+0.05*Math.sin(t*0.0004)),wob=H*0.05*Math.sin(t*0.0006);
      const centers=[{x:W*0.5-sep,y:cy+wob},{x:W*0.5+sep,y:cy-wob}];
      const maxR=Math.hypot(W,H)*0.6,step=Math.max(24,Math.min(W,H)/15),a=0.04+p*0.05;
      ctx.lineWidth=1;
      for(const c of centers)for(let rr=step;rr<maxR;rr+=step){
        ctx.strokeStyle='rgba('+r+','+g+','+b+','+(a*(1-rr/maxR))+')';
        ctx.beginPath();ctx.arc(c.x,c.y,rr,0,6.28);ctx.stroke();}
      const interval=Math.max(380,1000-p*450);
      if(t-lastPulse>interval){lastPulse=t;for(const c of centers)pulses.push({x:c.x,y:c.y,r:0});}
      const pmax=Math.min(W,H)*0.55;
      for(let i=pulses.length-1;i>=0;i--){const pu=pulses[i];pu.r+=(0.7+p*1.5);
        const k=pu.r/pmax;if(k>=1){pulses.splice(i,1);continue;}
        ctx.strokeStyle='rgba('+r+','+g+','+b+','+((0.20+p*0.12)*(1-k))+')';ctx.lineWidth=1.4;
        ctx.beginPath();ctx.arc(pu.x,pu.y,pu.r,0,6.28);ctx.stroke();}}

    function drawFlux(t){ctx.clearRect(0,0,W,H);const p=progress;
      ctx.globalCompositeOperation=dark?'lighter':'source-over';
      for(const bl of blobs){
        bl.ox+=bl.vx*(0.6+p*0.7);bl.oy+=bl.vy*(0.6+p*0.7);bl.ang+=bl.angSpd*(1+p*0.9);
        const m=bl.baseR;if(bl.ox<-m)bl.ox=W+m;else if(bl.ox>W+m)bl.ox=-m;if(bl.oy<-m)bl.oy=H+m;else if(bl.oy>H+m)bl.oy=-m;
        const x=bl.ox+Math.cos(bl.ang)*bl.orbit,y=bl.oy+Math.sin(bl.ang)*bl.orbit;
        const rr=bl.baseR*(1+0.24*Math.sin(t*0.0009+bl.ph));
        const c=bl.accent?acc:ink,aM=dark?(0.11+p*0.07):(0.04+p*0.035);
        const grd=ctx.createRadialGradient(x,y,0,x,y,rr);
        grd.addColorStop(0,'rgba('+c[0]+','+c[1]+','+c[2]+','+aM+')');
        grd.addColorStop(0.55,'rgba('+c[0]+','+c[1]+','+c[2]+','+(aM*0.42)+')');
        grd.addColorStop(1,'rgba('+c[0]+','+c[1]+','+c[2]+',0)');
        ctx.fillStyle=grd;ctx.beginPath();ctx.arc(x,y,rr,0,6.28);ctx.fill();}
      ctx.globalCompositeOperation='source-over';}

    function drawGrain(t){ctx.clearRect(0,0,W,H);const p=progress;
      ctx.globalCompositeOperation=dark?'lighter':'source-over';
      for(const bl of blobs){bl.x+=bl.vx*(1+p*0.9);bl.y+=bl.vy*(1+p*0.9);
        if(bl.x<0||bl.x>W)bl.vx*=-1;if(bl.y<0||bl.y>H)bl.vy*=-1;
        const c=bl.accent?acc:(dark?[120,132,150]:ink),aM=((dark?0.13:0.05)+p*0.02)*(0.72+0.28*Math.sin(t*0.001+(bl.accent?0:2.1)));
        const grd=ctx.createRadialGradient(bl.x,bl.y,0,bl.x,bl.y,bl.r);
        grd.addColorStop(0,'rgba('+c[0]+','+c[1]+','+c[2]+','+aM+')');
        grd.addColorStop(1,'rgba('+c[0]+','+c[1]+','+c[2]+',0)');
        ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);}
      ctx.globalCompositeOperation='source-over';
      if(!isMobile||(frameCount&1)===0){const img=noiseCtx.createImageData(160,160),d=img.data;
        for(let i=0;i<d.length;i+=4){const v=Math.random()*255;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255;}
        noiseCtx.putImageData(img,0,0);}
      ctx.globalAlpha=(dark?0.075:0.055)+p*0.02;
      for(let x=0;x<W;x+=160)for(let y=0;y<H;y+=160)ctx.drawImage(noiseCv,x,y);
      ctx.globalAlpha=1;}

    function drawAgents(t){ctx.clearRect(0,0,W,H);
      const p=progress,spd=.4+p*1.4,thresh=108+p*72,lineA=(dark?.10:.06)+p*.17,nodeA=(dark?.5:.3)+p*.28,r=acc[0],g=acc[1],b=acc[2];
      for(const n of nodes){n.x+=n.vx*spd;n.y+=n.vy*spd;wrap(n,20);}
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],c=nodes[j],d=Math.hypot(a.x-c.x,a.y-c.y);
        if(d<thresh){ctx.strokeStyle='rgba('+r+','+g+','+b+','+(lineA*(1-d/thresh))+')';ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(c.x,c.y);ctx.stroke();}}
      for(const n of nodes){ctx.fillStyle='rgba('+r+','+g+','+b+','+nodeA+')';ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,6.28);ctx.fill();}}

    function render(t){
      if(mode==='typo')drawTypo(t);else if(mode==='rings')drawRings(t);else if(mode==='flux')drawFlux(t);
      else if(mode==='grain')drawGrain(t);else if(mode==='agents')drawAgents(t);else ctx.clearRect(0,0,W,H);
    }
    function loop(now){raf=requestAnimationFrame(loop);const iv=isMobile?32:0;if(now-last<iv)return;last=now;frameCount++;render(now);}
    function once(){frameCount++;render(performance.now());}

    function size(force){isMobile=innerWidth<=680;
      const w=cv.clientWidth||innerWidth,h=cv.clientHeight||innerHeight;
      DPR=Math.min(devicePixelRatio||1,isMobile?1.5:2);
      W=w;H=h;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);
      if(force||w!==lastW){initMode();lastW=w;}}
    function start(){readColors();size(true);cancelAnimationFrame(raf);if(reduced2)once();else raf=requestAnimationFrame(loop);}
    addEventListener('resize',()=>{size(false);if(reduced2)once();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else if(!reduced2){cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}});

    start();
  })();

(function(){var lg=document.getElementById('navLogo');if(!lg)return;var br=lg.closest('.brand');
function play(){lg.classList.remove('play');void lg.clientWidth;lg.classList.add('play');}
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
requestAnimationFrame(play);
if(br)br.addEventListener('mouseenter',play);})();
