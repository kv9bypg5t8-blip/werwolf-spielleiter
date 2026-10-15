'use strict';
(function(){
 const roleImages={Amor:'amor.png',Dorfmatratze:'dorfmatratze.png',Werwolf:'werwolf_rolle.png',Seher:'seher.png',Hexe:'hexe.png',Jäger:'jaeger.png',Dorfbewohner:'dorfbewohner.png'};
 function rolePresentation(){if(G.phase!=='night'||!G.role)return null;if(G.role==='Amor'&&G.step===ST.L)return{title:'Liebespaar',image:'liebespaar.png'};return{title:G.role,image:roleImages[G.role]||'dorfbewohner.png'}}
 function decorateRoleArea(){const card=document.querySelector('.rolecard'),view=rolePresentation();if(!card||!view)return;card.style.setProperty('--role-image','url("'+view.image+'")');card.classList.add('has-role-image');const title=card.querySelector('.title');if(title)title.textContent=view.title;const big=card.querySelector('.big');if(big)big.setAttribute('aria-hidden','true')}
 const originalDraw=draw;draw=function(){originalDraw();decorateRoleArea()};
 function protectedByHealing(playerId){if(G.phase!=='night'||!G.act?.healed||!G.act?.wolf)return false;if(playerId===G.act.wolf)return true;const player=by(playerId);if(player?.role==='Dorfmatratze'&&G.act.mat===G.act.wolf)return true;if(G.lovers?.includes(G.act.wolf)&&G.lovers.includes(playerId))return true;return false}
 const originalKill=kill;kill=function(playerId,cause=''){if(protectedByHealing(playerId)){const saved=by(playerId);if(saved?.alive)log(saved.name+' wurde durch den Heiltrank mitgerettet.');return}const player=by(playerId),wasAlive=!!player?.alive,wasNight=G.phase==='night',wasHunter=player?.role==='Jäger';originalKill(playerId,cause);if(wasAlive&&wasNight&&wasHunter){G.queue=G.queue.filter(entry=>!(entry.type==='hunter'&&entry.source===playerId));G.pendingHunters=G.pendingHunters||[];if(!G.pendingHunters.includes(playerId))G.pendingHunters.push(playerId)}};
 const originalNextModal=nextModal;nextModal=function(){if(G.queue.length){originalNextModal();return}G.pendingHunters=G.pendingHunters||[];while(G.pendingHunters.length){const hunterId=G.pendingHunters.shift();if(by(hunterId)&&!by(hunterId).alive){G.modal={type:'hunter',source:hunterId};save();draw();return}}originalNextModal()};
 G.pendingHunters=G.pendingHunters||[];decorateRoleArea();
})();
