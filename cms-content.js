(async function(){
  try {
    const res = await fetch('/content/settings.json', {cache:'no-store'});
    if(!res.ok) return;
    const s = await res.json();
    const root=document.documentElement;
    const vars={cream:'--cream',olive:'--olive',olive_dark:'--olive-dark',walnut:'--walnut',gold:'--gold',ink:'--ink'};
    Object.entries(vars).forEach(([k,v])=>s.colors?.[k]&&root.style.setProperty(v,s.colors[k]));
    const full=`${s.couple.first_name_1} & ${s.couple.first_name_2}`;
    document.querySelectorAll('.brand').forEach((el,i)=>el.textContent=i===0?s.couple.monogram:full);
    document.querySelectorAll('[data-couple]').forEach(el=>el.textContent=full);
    document.querySelectorAll('[data-date]').forEach(el=>el.textContent=s.wedding.date_display);
    document.querySelectorAll('[data-venue]').forEach(el=>el.textContent=s.wedding.venue);
    document.querySelectorAll('[data-location]').forEach(el=>el.textContent=s.wedding.location);
    document.querySelectorAll('[data-rsvp-deadline]').forEach(el=>el.textContent=s.wedding.rsvp_deadline);
    const path=location.pathname.split('/').pop()||'index.html';
    if(path==='index.html'||path===''){
      const hero=document.querySelector('.hero'); if(hero) hero.style.backgroundImage=`linear-gradient(90deg,rgba(20,20,17,.68),rgba(20,20,17,.14) 58%,rgba(20,20,17,.18)),url("${s.images.hero}")`;
      const map=[['.hero .eyebrow',s.home.eyebrow],['.hero-sub',s.home.subtitle],['.welcome h2',s.home.welcome_heading],['.welcome .muted',s.home.welcome_text],['section .max h2',s.home.venue_heading],['section .max .muted',s.home.venue_text]];
      map.forEach(([q,t])=>{const e=document.querySelector(q);if(e&&t)e.textContent=t});
      const imgs=document.querySelectorAll('img'); imgs.forEach(img=>{if(img.src.includes('farmhouse'))img.src=s.images.farmhouse;if(img.src.includes('reception'))img.src=s.images.reception});
    }
    if(path==='registry.html'){
      const hs=document.querySelectorAll('h2'); if(hs[0])hs[0].textContent=s.registry.heading;
      const p=document.querySelector('.registry-grid .muted');if(p)p.textContent=s.registry.message;
      const a=document.querySelectorAll('.registry-buttons a');if(a[0])a[0].href=s.registry.zola_url||'#';if(a[1])a[1].href=s.registry.honeymoon_url||'#';if(a[2])a[2].href=s.registry.amazon_url||'#';
    }
    window.WEDDING_DATE=s.wedding.date_iso;
  } catch(e){ console.warn('CMS content could not load',e); }
})();
