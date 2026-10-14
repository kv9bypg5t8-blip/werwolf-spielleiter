'use strict';
/* Robust single-tap player selection for iPhone/Safari, with explicit Amor stages. */
(function(){
  let lastId='',lastAt=0;
  clickP=function(id){
    const p=by(id),m=mode(p),time=Date.now();
    if(!p||m==='locked')return;
    if(lastId===id&&time-lastAt<350)return;
    lastId=id;lastAt=time;snap();
    if(m==='assign'){
      if(S.current==='Werwolf')p.role=p.role==='Werwolf'?null:'Werwolf';
      else{
        S.players.forEach(x=>{if(x.role===S.current)x.role=null});
        p.role=S.current;
        if(S.current==='Amor'){
          S.act.amorId=p.id;S.lovers=[];S.step='lovers';
          log(p.name+' wurde als Amor erkannt.');
        }else S.step=S.current==='Dorfmatratze'||S.current==='Seher'?'target':S.current==='Hexe'?'potion':'done';
      }
    }else if(m==='lover'){
      if(p.role==='Amor'||p.id===S.act.amorId){save();draw();return}
      if(S.lovers.includes(id))S.lovers=S.lovers.filter(x=>x!==id);
      else if(S.lovers.length<2)S.lovers.push(id);
    }else if(m==='mat')S.act.mat=id;
    else if(m==='wolf')S.act.wolf=id;
    else if(m==='seer')S.act.seer=id;
    else if(m==='poison'){S.act.poison=id;S.act.poisonPicking=false;S.pot.poison=false}
    else if(m==='day'){S.act.dayVote=id;S.act.dayPicking=false}
    save();draw();
  };
})();
