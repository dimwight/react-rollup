import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';
import * as field from './TextField';

function trace(text){
  console.info('App > ' +text);
}
const TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
const facets : Facets.Facets = Facets.newInstance(true);

function newTargetTree():Facets.Target{
  const text='Some text for '+TITLE_FIRST;
  trace('.newTargetTree: text='+text);
  const coupler:Facets.TextualCoupler={
    passText:text,
    targetStateUpdated : (title) => trace("coupler.stateUpdated: title=" + title),
    updateInterim:()=>false,
  };
  const first:Facets.Target=facets.newTextualTarget(TITLE_FIRST,coupler),
    second:Facets.Target=facets.newTextualTarget(TITLE_SECOND,coupler);
  return facets.newTargetsGroup('Textuals',first,second);
}
function buildLayout(){
  trace('.buildLayout');
  if(false)facets.attachFacet(TITLE_FIRST,update=>trace('Facet updating with '+update));
  else field.render({
    title:TITLE_FIRST,
    facets:facets
  });
}
export function buildSurface(){
  trace('Building surface');
  facets.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
}

