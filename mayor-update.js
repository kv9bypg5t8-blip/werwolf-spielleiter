'use strict';
/* Visual mayor status for v16. Internal random selection and succession remain in app.js. */
(function(){
  const originalCards=cards;
  cards=function(){
    let html=originalCards();
    if(!G.mayor)return html;
    const marker='data-player="'+G.mayor+'"';
    const crown='<span class="badge mayor-badge" title="Bürgermeister">♛ Bürgermeister</span>';
    const pos=html.indexOf(marker);
    if(pos<0)return html;
    const tagsStart=html.indexOf('<div class="tags">',pos);
    if(tagsStart<0)return html;
    const insert=tagsStart+'<div class="tags">'.length;
    return html.slice(0,insert)+crown+html.slice(insert);
  };
  const originalModal=modal;
  modal=function(){
    const html=originalModal();
    if(!G.modal||G.modal.type!=='players'||!G.mayor)return html;
    return html.replace('data-status="'+G.mayor+'"','data-status="'+G.mayor+'" data-mayor="true"');
  };
})();
