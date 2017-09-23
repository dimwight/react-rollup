import React from 'react';
import Facets from 'facets-js';
import * as layouts from './Layouts';

function trace(text){
  console.info('App > '+text);
}
const facets:Facets.Facets=Facets.newInstance(true);

namespace Titles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
  INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
  INDEX='Index',INDEXED='Indexed',
  INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
  TOGGLING='Click to toggle live',TOGGLED='Toggle state',
  NUMERIC_FIELD='Number',NUMERIC_LABEL='Value'
}

function newTextualTree():Facets.Target{
  const first=facets.newTextualTarget(Titles.TEXTUAL_FIRST,{
      passText:'Some text for '+Titles.TEXTUAL_FIRST,
      targetStateUpdated:(title,state)=>{
        facets.updateTargetState(Titles.TEXTUAL_SECOND,
          Titles.TEXTUAL_FIRST+' has changed to: '+state);
      },
    }),
    second=facets.newTextualTarget(Titles.TEXTUAL_SECOND,{
      passText:'Some text for '+Titles.TEXTUAL_SECOND,
    });
  return facets.newTargetsGroup('Textuals',first,second);
}
function newTargetTree():Facets.Target{
  return newTextualTree();
}
function buildLayout(){
  trace('.buildLayout');
  layouts.buildTextual(facets,
    {title:Titles.TEXTUAL_FIRST},
    {title:Titles.TEXTUAL_SECOND,size:40},
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

