import React from 'react';
import Facets from 'facets-js';
import * as layout from './Layout';

function trace(text){
  console.info('App > '+text);
}
const facets:Facets.Facets=Facets.newInstance(true);


namespace Titles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
  INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
  INDEX='Index',INDEXED='Indexed',INDEX_START=0,
  INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
  TOGGLING='Click to toggle live',TOGGLED='Toggle state',
  TOGGLE_START=false,
  NUMERIC_FIELD='Number',NUMERIC_LABEL='Value',NUMERIC_START=123;
}

abstract class SurfaceCore{
  buildSurface(){
    trace('Building surface');
    facets.buildTargeterTree(this.newTargetTree());
    trace('Built targets, created targeters');
    this.buildLayout();
    trace('Attached and laid out facets');
    trace('Surface built');
  }
  abstract newTargetTree():Facets.Target;
  abstract buildLayout();
}

export interface Textual{
  first:layout.Textual,
  second:layout.Textual
}
export interface Indexing{
  indexing:layout.Indexing,
  index:layout.Textual,
  indexed:layout.Textual
}
enum Test{Textual,Indexing,All}
const textual:Textual={
  first:{title:Titles.TEXTUAL_FIRST},
  second:{title:Titles.TEXTUAL_SECOND,cols:40},
};
const indexing:Indexing={
  indexing:{title:Titles.INDEXING,indexables:Titles.INDEXABLES},
  index:{title:Titles.INDEX},
  indexed:{title:Titles.INDEXED},
};
const newTextualTree=function():Facets.Target{
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
  return facets.newTargetGroup('Textuals',first,second);
}
const newIndexingTree=function():Facets.Target{
  const indexing=facets.newIndexingTarget(Titles.INDEXING,{
      passIndex:0,
      getUiSelectables:(title)=> Titles.INDEXABLES,
      getIndexables: (title)=> Titles.INDEXABLES,
    }),
    index=facets.newTextualTarget(Titles.INDEX,{
      getText:(title)=>''+facets.getTargetState(Titles.INDEXING),
    }),
    indexed=facets.newTextualTarget(Titles.INDEXED,{
      getText:(title)=>Titles.INDEXABLES[facets.getTargetState(Titles.INDEXING)as number],
    });
  return facets.newTargetGroup('Indexing',indexing,index,indexed);
}

class SimpleSurface extends SurfaceCore{
  readonly test:Test=true?null:Test.Indexing;
  newTargetTree():Facets.Target{
    const textual=newTextualTree,indexing=newIndexingTree,
      all=facets.newTargetGroup('Indexing',
      textual(),indexing());
    return this.test===Test.Textual?textual()
      :this.test===Test.Indexing?indexing(): all;
  }
  buildLayout(){
    trace('.buildLayout');
    if(this.test===Test.Textual) layout.buildTextual(facets,textual);
    else if(this.test===Test.Indexing) layout.buildIndexing(facets,indexing)
    else layout.buildAll(facets,textual,indexing)
  }
}
export function buildSurface(){
 new SimpleSurface().buildSurface();
}



