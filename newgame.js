'use strict';
(function(){
  function el(id){return document.getElementById(id)}
  function closeMenu(){const m=el('newGameMenu');if(m)m.classList.remove('open')}
  function resetForSamePlayers(){
    if(typeof S==='undefined'||!Array.isArray(S.players)||!S.players.length)return;
    const names=S.players.map(p=>p.name);
    const priv=!!S.privateMode;
    localStorage.removeItem(K);
    start(names,priv);
  }
  function resetCompletely(){
    localStorage.removeItem(K);
    S=fresh();
    draw();
  }
  function mount(){
    if(!document.body||el('newGameMenu'))return;
    const menu=document.createElement('div');menu.id='newGameMenu';menu.className='new-game-menu';
    const card=document.createElement('section');card.className='glass new-game-card';
    const h=document.createElement('h2');h.textContent='Neues Spiel';card.appendChild(h);
    const p=document.createElement('p');p.textContent='Möchtest du mit denselben Teilnehmern eine neue Partie starten oder eine komplett neue Teilnehmerliste eingeben?';card.appendChild(p);
    const row=document.createElement('div');row.className='row';
    const same=document.createElement('button');same.className='btn primary';same.id='newSame';same.textContent='Mit denselben Spielern';
    const freshBtn=document.createElement('button');freshBtn.className='btn danger';freshBtn.id='newFresh';freshBtn.textContent='Komplett neues Spiel';
    const cancel=document.createElement('button');cancel.className='btn';cancel.id='newCancel';cancel.textContent='Abbrechen';
    row.append(same,freshBtn,cancel);card.appendChild(row);menu.appendChild(card);document.body.appendChild(menu);
    same.addEventListener('click',()=>{closeMenu();resetForSamePlayers()});
    freshBtn.addEventListener('click',()=>{closeMenu();resetCompletely()});
    cancel.addEventListener('click',closeMenu);menu.addEventListener('click',e=>{if(e.target===menu)closeMenu()});
  }
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#newGameTrigger');if(t){e.preventDefault();mount();el('newGameMenu').classList.add('open')}});
  const obs=new MutationObserver(()=>{if(typeof S!=='undefined'&&S.screen==='game'&&!el('newGameTrigger')){const row=document.querySelector('.top .row');if(row){const b=document.createElement('button');b.id='newGameTrigger';b.className='btn new-game-trigger';b.textContent='↻ Neues Spiel';row.insertBefore(b,row.firstChild)}}});
  obs.observe(document.documentElement,{subtree:true,childList:true});
  addEventListener('load',()=>{mount();obs.takeRecords()});
})();
