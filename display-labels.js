'use strict';
/* Nur sichtbare Bezeichnungen aendern. Interne Rollenschluessel und G.mayor bleiben unveraendert. */
(function(){
  const exactLabels={
    'Hexe':'Hexe/r',
    'Seher':'Seher/in',
    'Jäger':'Jäger/in',
    'Bürgermeister':'Bürgermeister/in'
  };

  function replaceVisibleLabels(root=document.getElementById('app')){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      const raw=node.nodeValue;
      if(!raw||!raw.trim())continue;
      const trimmed=raw.trim();
      if(exactLabels[trimmed]){
        node.nodeValue=raw.replace(trimmed,exactLabels[trimmed]);
        continue;
      }
      let updated=raw;
      updated=updated.replace(/\bHexe\b/g,'Hexe/r');
      updated=updated.replace(/\bSeher\b/g,'Seher/in');
      updated=updated.replace(/\bJäger\b/g,'Jäger/in');
      updated=updated.replace(/\bBürgermeister\b/g,'Bürgermeister/in');
      if(updated!==raw)node.nodeValue=updated;
    }
    root.querySelectorAll('[title]').forEach(el=>{
      if(el.title==='Bürgermeister')el.title='Bürgermeister/in';
    });
  }

  const originalDraw=draw;
  draw=function(){originalDraw();replaceVisibleLabels()};
  replaceVisibleLabels();
})();
