(async function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const text=(q,v)=>{const e=document.querySelector(q);if(e&&v!==undefined)e.textContent=v};
  const html=(q,v)=>{const e=document.querySelector(q);if(e&&v!==undefined)e.innerHTML=esc(v).replace(/\n/g,'<br>')};
  try{
    const res=await fetch('content/settings.json',{cache:'no-store'}); if(!res.ok)return;
    const s=await res.json(), root=document.documentElement;
    const vars={cream:'--cream',olive:'--olive',olive_dark:'--olive-dark',walnut:'--walnut',gold:'--gold',ink:'--ink'};
    Object.entries(vars).forEach(([k,v])=>s.colors?.[k]&&root.style.setProperty(v,s.colors[k]));
    const full=`${s.couple.first_name_1} & ${s.couple.first_name_2}`;
    document.querySelectorAll('.brand').forEach(el=>el.innerHTML=`${esc(s.couple.first_name_1?.[0]||'P')} <span>&</span> ${esc(s.couple.first_name_2?.[0]||'C')}`);
    document.querySelectorAll('[data-couple]').forEach(el=>el.textContent=full);
    document.querySelectorAll('[data-date]').forEach(el=>el.textContent=s.wedding.date_display);
    document.querySelectorAll('[data-venue]').forEach(el=>el.textContent=s.wedding.venue);
    document.querySelectorAll('[data-location]').forEach(el=>el.textContent=s.wedding.location);
    document.querySelectorAll('[data-rsvp-deadline]').forEach(el=>el.textContent=s.wedding.rsvp_deadline);
    document.querySelectorAll('.page-hero').forEach(el=>el.style.setProperty('--hero-image',`url("${s.images.hero}")`));
    const path=location.pathname.split('/').pop()||'index.html';
    if(path==='index.html'||path===''){
      text('.arrival-kicker',s.home.eyebrow); text('.name-one',s.couple.first_name_1); text('.name-two',s.couple.first_name_2);
      text('[data-home-welcome-kicker]',s.home.welcome_kicker); text('[data-home-welcome-heading]',s.home.welcome_heading); text('[data-home-welcome-text]',s.home.welcome_text); text('[data-home-welcome-details]',s.home.welcome_details);
      text('[data-home-venue-heading]',s.home.venue_heading); text('.venue-text',s.home.venue_text); text('[data-home-ceremony-heading]',s.home.ceremony_heading); text('[data-home-ceremony-text]',s.home.ceremony_text);
      text('[data-home-journey-heading]',s.home.journey_heading); text('[data-home-journey-intro]',s.home.journey_intro); text('[data-home-weekend-heading]',s.home.weekend_heading); text('[data-home-final-heading]',s.home.final_heading);
      const imgs=[['.arrival-media',s.images.hero],['.farm-photo img',s.images.farmhouse],['.woods-media',s.images.ceremony],['.portal-media',s.images.cocktail],['.final-media',s.images.reception]];
      imgs.forEach(([q,src])=>{const e=document.querySelector(q);if(!e||!src)return;e.tagName==='IMG'?e.src=src:e.style.backgroundImage=`url("${src}")`});
      const list=document.querySelector('[data-journey-list]'); if(list&&s.journey){list.innerHTML=s.journey.map((x,i)=>`<article class="journey-row ${i%2?'reverse':''}"><div class="journey-copy reveal in-view"><span>${String(i+1).padStart(2,'0')}</span><p class="eyebrow">${esc(x.label)}</p><h3>${esc(x.heading)}</h3><p class="muted">${esc(x.text)}</p></div><figure class="journey-image reveal in-view"><img src="${esc(x.image)}" alt="${esc(x.heading)}"><figcaption>${esc(x.caption)}</figcaption></figure></article>`).join('')}
    }
    if(path==='weekend.html'){
      text('[data-weekend-heading]',s.weekend.intro_heading); text('[data-dress-heading]',s.weekend.dress_heading); text('[data-dress-text]',s.weekend.dress_text);
      const box=document.querySelector('[data-weekend-days]'); if(box)box.innerHTML=s.weekend.days.map(d=>`<article class="day-block"><p class="eyebrow">${esc(d.date)}</p><h2>${esc(d.title)}</h2>${d.events.map(e=>`<div class="schedule-row"><div class="schedule-time">${esc(e.time)}</div><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></div>`).join('')}</article>`).join('');
    }
    if(path==='travel.html'){
      text('[data-travel-heading]',s.travel.heading); text('[data-travel-intro]',s.travel.intro); text('[data-transport-heading]',s.travel.transport_heading); text('[data-transport-text]',s.travel.transport_text);
      const hotels=document.querySelector('[data-hotel-list]'); if(hotels)hotels.innerHTML=s.travel.hotels.map(x=>`<article class="card"><h3>${esc(x.name)}</h3><p>${esc(x.details).replace(/\n/g,'<br>')}</p><a class="button button-outline" href="${esc(x.url)}">${esc(x.button)}</a></article>`).join('');
      const guide=document.querySelector('[data-guide-list]'); if(guide)guide.innerHTML=s.travel.guide.map(x=>`<article class="card guide-card"><p class="eyebrow">${esc(x.category)}</p><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p>${x.url&&x.url!=='#'?`<a class="arrow-link" href="${esc(x.url)}" target="_blank" rel="noopener">View recommendation <span>↗</span></a>`:''}</article>`).join('');
    }
    if(path==='faq.html'){
      text('[data-faq-heading]',s.faq.heading); text('[data-faq-intro]',s.faq.intro); const list=document.querySelector('[data-faq-list]'); if(list)list.innerHTML=s.faq.items.map(x=>`<article class="faq-item"><button class="faq-question"><span>${esc(x.question)}</span><span class="faq-symbol">+</span></button><div class="faq-answer"><p>${esc(x.answer)}</p></div></article>`).join('');
    }
    if(path==='registry.html'){
      text('[data-registry-heading]',s.registry.heading); text('[data-registry-message]',s.registry.message); const list=document.querySelector('[data-registry-list]'); if(list)list.innerHTML=s.registry.cards.map((x,i)=>`<article class="card registry-card"><div><div class="icon">${i===1?'✦':esc(x.title[0])}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><a class="button button-outline" href="${esc(x.url)}">${esc(x.button)}</a></div></article>`).join('');
    }
    if(path==='rsvp.html'){text('[data-rsvp-heading]',s.rsvp.heading);text('[data-rsvp-intro]',s.rsvp.intro)}
    if(path==='our-story.html'){
      text('[data-story-heading]',s.story.heading); const box=document.querySelector('[data-story-timeline]'); if(box)box.innerHTML=s.story.timeline.map(x=>`<article class="timeline-item"><p class="timeline-year">${esc(x.year)}</p><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('');
    }
    window.WEDDING_DATE=s.wedding.date_iso;
    document.dispatchEvent(new CustomEvent('wedding-content-ready'));
  }catch(e){console.warn('CMS content could not load',e)}
})();
