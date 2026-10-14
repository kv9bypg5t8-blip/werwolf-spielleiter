'use strict';
/* iPhone-safe state machine for all first-night role assignments. */
(function(){
  const originalMode=mode;
  let lastKey='',lastTime=0;

  mode=function(player){
    if(S.phase==='night'&&S.night===1&&S.current==='Amor'){
      if(S.step==='assign') return player.alive&&(!player.role||player.role==='Amor')?'assign':'locked';
      if(S.step==='lovers') return player.alive&&player.role!=='Amor'&&player.id!==S.act.amorId?'lover':'locked';
    }
    return originalMode(player);
  };

  clickP=function(id){
    const player=by(id),selection=mode(player),stamp=Date.now(),key=selection+':'+id;
    if(!player||selection==='locked')return;
    if(key===lastKey&&stamp-lastTime<400)return;
    lastKey=key;lastTime=stamp;

    snap();
    if(selection==='assign'){
      if(S.current==='Werwolf'){
        player.role=player.role==='Werwolf'?null:'Werwolf';
      }else{
        S.players.forEach(p=>{if(p.role===S.current)p.role=null});
        player.role=S.current;
        if(S.current==='Amor'){
          S.act.amorId=player.id;
          S.lovers=[];
          S.step='lovers';
          log(player.name+' wurde als Amor erkannt. Jetzt genau zwei andere Spieler als Liebespaar wählen.');
        }else if(S.current==='Dorfmatratze'||S.current==='Seher')S.step='target';
        else if(S.current==='Hexe')S.step='potion';
        else S.step='done';
      }
    }else if(selection==='lover'){
      if(S.lovers.includes(id))S.lovers=S.lovers.filter(x=>x!==id);
      else if(S.lovers.length<2)S.lovers.push(id);
      else {
        S.toast='Das Liebespaar besteht aus genau zwei Personen.';
        save();draw();return;
      }
    }else if(selection==='mat')S.act.mat=id;
    else if(selection==='wolf')S.act.wolf=id;
    else if(selection==='seer')S.act.seer=id;
    else if(selection==='poison'){
      S.act.poison=id;S.act.poisonPicking=false;S.pot.poison=false;
    }else if(selection==='day'){
      S.act.dayVote=id;S.act.dayPicking=false;
    }
    save();draw();
  };
})();
