'use strict';
/* Synchronisiert Tageshintergrund und Phasensymbol nach jedem Rendern. */
(function(){
  function syncPhaseAppearance(){
    if(typeof G==='undefined'||!G)return;
    const isDay=G.phase==='day';
    document.body.classList.toggle('day-mode',isDay);
    document.body.toggleAttribute('data-day-phase',isDay);

    const shell=document.querySelector('.shell');
    if(shell){
      shell.classList.toggle('day',isDay);
      shell.classList.toggle('night',G.phase==='night');
    }

    const phaseIcon=document.querySelector('.moon');
    if(phaseIcon){
      phaseIcon.textContent=isDay?'☀':'☾';
      phaseIcon.setAttribute('aria-label',isDay?'Tagrunde':'Nachtrunde');
      phaseIcon.title=isDay?'Tagrunde':'Nachtrunde';
    }
  }

  const originalDraw=draw;
  draw=function(){
    originalDraw();
    syncPhaseAppearance();
  };

  syncPhaseAppearance();
})();
