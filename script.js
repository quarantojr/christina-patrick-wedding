const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>25),{passive:true});
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(Boolean(open)))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

document.querySelectorAll('.faq-question').forEach(button=>button.addEventListener('click',()=>{const item=button.parentElement;const answer=item.querySelector('.faq-answer');const wasOpen=item.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(openItem=>{openItem.classList.remove('open');openItem.querySelector('.faq-answer').style.maxHeight=null});if(!wasOpen){item.classList.add('open');answer.style.maxHeight=answer.scrollHeight+'px'}}));

function weddingDate(){return new Date(window.WEDDING_DATE||'2027-07-18T16:00:00-04:00')}
function tick(){const distance=Math.max(0,weddingDate()-new Date());const values={days:Math.floor(distance/86400000),hours:Math.floor(distance/3600000)%24,minutes:Math.floor(distance/60000)%60,seconds:Math.floor(distance/1000)%60};Object.entries(values).forEach(([key,value])=>document.querySelectorAll(`[data-${key}]`).forEach(el=>el.textContent=String(value).padStart(2,'0')))}
tick();setInterval(tick,1000);

const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.14,rootMargin:'0px 0px -30px'});reveals.forEach(el=>observer.observe(el))}else{reveals.forEach(el=>el.classList.add('in-view'))}

document.querySelector('#rsvp-form')?.addEventListener('submit',event=>{event.preventDefault();const status=document.querySelector('.form-status');const name=event.currentTarget.name.value.trim();status.textContent=name?`Thank you, ${name}. This preview form still needs to be connected before launch.`:'Please enter your full name.'});
