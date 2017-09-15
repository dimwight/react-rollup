import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('App > ' +text);
}
const TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
const core : Facets.Facets = Facets.newInstance(true);

function newTargetTree():Facets.Target{
  const text='Some text';
  trace('.newTargetTree: text='+text);
  const coupler:Facets.TextualCoupler={
    passText:text,
    targetStateUpdated : (title) => trace("coupler.stateUpdated: title=" + title),
    updateInterim:()=>false,
  };
  const first:Facets.Target=core.newTextualTarget(TITLE_FIRST,coupler),
    second:Facets.Target=core.newTextualTarget(TITLE_SECOND,coupler);
  return core.newTargetsGroup('Textuals',first,second);
}
function buildLayout(){
  trace('.buildLayout');
  core.attachFacet(TITLE_FIRST,update=>trace('Facet updating with '+update));
}
export function buildSurface(){
  trace('Building surface');
  core.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
}

