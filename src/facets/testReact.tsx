import React from 'react';
import Facets from 'facets-js';
import * as fields from './TextField';

function trace(text){
  console.info('App > '+text);
}
const TITLE_FIRST='First',TITLE_SECOND='Second';
const facets:Facets.Facets=Facets.newInstance(true);

function newTargetTree():Facets.Target{
  const first=facets.newTextualTarget(TITLE_FIRST,{
      passText:'Some text for '+TITLE_FIRST,
      targetStateUpdated:(title,state)=>{
        facets.updateTargetState(TITLE_SECOND,
          TITLE_FIRST+' has changed to: '+state);
      },
    }),
    second=facets.newTextualTarget(TITLE_SECOND,{
      passText:'Some text for '+TITLE_SECOND,
    });
  return facets.newTargetsGroup('Textuals',first,second);
}
function buildLayout(){
  trace('.buildLayout');
  fields.buildTextualPage(facets,
    {title:TITLE_FIRST},
    {title:TITLE_SECOND,size:40},
  );
}
export function buildSurface(){
  trace('Building surface');
  facets.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
}

