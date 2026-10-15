'use strict';
/* Rollenbilder, Amor->Liebespaar und verzögerter Jägerdialog in der Nacht. */
(function(){
  const roleImages={
    Amor:'amor.png',
    Dorfmatratze:'dorfmatratze.png',
    Werwolf:'werwolf_rolle.png',
    Seher:'seher.png',
    Hexe:'hexe.png',
    Jäger:'jaeger.png',
    Dorfbewohner:'dorfbewohner.png'
  };

  function rolePresentation(){
    if(G.phase!=='night'||!G.role)return null;
    if(G.role==='Amor'&&G.step===ST.L){
      return{title:'Liebespaar',image:'liebespaar.png'};
    }
    return{title:G.role,image:roleImages[G.role]||'dorfbewohner.png'};
  }

  function decorateRoleArea(){
    const card=document.querySelector('.rolecard');
    if(!card)return;
    const view=rolePresentation();
    if(!view)return;
    card.style.setProperty('--role-image','url("'+view.image+'")');
    card.classList.add('has-role-image');
    const title=card.querySelector('.title');
    if(title)title.textContent=view.title;
    const big=card.querySelector('.big');
    if(big)big.setAttribute('aria-hidden','true');
    const promptTitle=document.querySelector('.prompt h2');
    if(promptTitle)promptTitle.textContent=view.title;
  }

  const originalDraw=draw;
  draw=function(){
    originalDraw();
    decorateRoleArea();
  };

  const originalKill=kill;
  kill=function(playerId,cause=''){
    const player=by(playerId);
    const wasAlive=!!player?.alive;
    const wasNight=G.phase==='night';
    const wasHunter=player?.role==='Jäger';
    originalKill(playerId,cause);
    if(wasAlive&&wasNight&&wasHunter){
      G.queue=G.queue.filter(entry=>!(entry.type==='hunter'&&entry.source===playerId));
      G.pendingHunters=G.pendingHunters||[];
      if(!G.pendingHunters.includes(playerId))G.pendingHunters.push(playerId);
    }
  };

  const originalNextModal=nextModal;
  nextModal=function(){
    if(G.queue.length){
      originalNextModal();
      return;
    }
    G.pendingHunters=G.pendingHunters||[];
    while(G.pendingHunters.length){
      const hunterId=G.pendingHunters.shift();
      if(by(hunterId)&&!by(hunterId).alive){
        G.modal={type:'hunter',source:hunterId};
        save();
        draw();
        return;
      }
    }
    originalNextModal();
  };

  /* Bereits gespeicherte Spiele ohne Feld bleiben kompatibel. */
  G.pendingHunters=G.pendingHunters||[];
  decorateRoleArea();
})();
