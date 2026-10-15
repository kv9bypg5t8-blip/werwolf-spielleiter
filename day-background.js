'use strict';
/* Setzt die Tagesklasse nach jedem Rendern anhand der vorhandenen Spielphase. */
(function(){
  function syncDayBackground(){
    const isDay=typeof G!=='undefined'&&G&&G.phase==='day';
    document.body.classList.toggle('day-mode',isDay);
    if(isDay)document.body.setAttribute('data-phase','day');
    else document.body.removeAttribute('data-phase');
  }
  const originalDraw=draw;
  draw=function(){originalDraw();syncDayBackground()};
  syncDayBackground();
})();
