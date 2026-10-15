'use strict';
/* Angepasste Siegbedingungen v25. Wird nach role-art.js geladen. */
(function(){
  win=function(){
    if(G.over)return null;

    const living=alive();
    const livingWolves=living.filter(p=>p.role==='Werwolf');
    const livingVillage=living.filter(p=>p.role!=='Werwolf');
    const livingLovers=(G.lovers||[]).filter(id=>by(id)?.alive);

    /* Liebespaar gewinnt bei zwei allein Ueberlebenden oder zusammen mit genau einer weiteren Person. */
    if(G.lovers?.length===2&&livingLovers.length===2&&living.length<=3){
      return end('Das Liebespaar gewinnt.');
    }

    /* Dorf gewinnt regulaer, sobald kein Werwolf mehr lebt. */
    if(livingWolves.length===0){
      return end('Das Dorf gewinnt.');
    }

    /* Sonderfall: genau ein Wolf und ein Dorfbewohner; der Dorfbewohner ist Buergermeister. */
    if(livingWolves.length===1&&livingVillage.length===1&&G.mayor===livingVillage[0].id){
      return end('Das Dorf gewinnt. Der Bürgermeister entscheidet den Gleichstand.');
    }

    /* Werwoelfe gewinnen, sobald nur noch genau ein Nicht-Werwolf lebt. */
    if(livingVillage.length<=1){
      return end('Die Werwölfe gewinnen.');
    }

    return null;
  };
})();
