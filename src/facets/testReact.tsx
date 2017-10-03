import React from 'react';
import Facets from 'facets-js';
import * as layout from './Layout';
function trace(text){
  if(facets.doTrace)console.info('App > '+text);
}
namespace Titles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
  INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
  INDEX='Index',INDEXED='Indexed',INDEX_START=0,
  INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
  TOGGLING='Click to toggle live',TOGGLED='Toggle state',
  TOGGLE_START=false,
  NUMERIC_FIELD='Number',NUMERIC_LABEL='Value',NUMERIC_START=123;
}
const facets:Facets.Facets=Facets.newInstance(false);
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
export interface TextualTest{
  first:layout.TextualValues,
  second:layout.TextualValues
}
export interface TogglingTest{
  toggling:layout.TogglingValues,
  second:layout.TextualValues
}
export interface IndexingTest{
  indexing:layout.IndexingValues,
  index:layout.TextualValues,
  indexed:layout.TextualValues
}
const textual:TextualTest={
  first:{title:Titles.TEXTUAL_FIRST},
  second:{title:Titles.TEXTUAL_SECOND,cols:40},
};
const toggling:TogglingTest={
  toggling:{title:Titles.TEXTUAL_FIRST},
  second:{title:Titles.TOGGLED,cols:40},
};
const indexing:IndexingTest={
  indexing:{title:Titles.INDEXING,indexables:Titles.INDEXABLES},
  index:{title:Titles.INDEX},
  indexed:{title:Titles.INDEXED},
};
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
  return facets.newTargetGroup('TextualTest',first,second);
}
function newIndexingTree():Facets.Target{
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
  return facets.newTargetGroup('IndexingTest',indexing,index,indexed);
}
function newTogglingTree(){
  return facets.newTogglingTarget(Titles.TOGGLING,{
    passSet:Titles.TOGGLE_START
  });
}
function newAllTree():Facets.Target{
  return facets.newTargetGroup('AllTest',
    newTextualTree(),newIndexingTree());
}
export enum Test{Textual,Toggling,Indexing,All}
export class SimpleSurface extends SurfaceCore{
  readonly test:Test;
  constructor(test){
    super();
    this.test=test;
  }
  newTargetTree():Facets.Target{
    const textual=newTextualTree,indexing=newIndexingTree,
      toggling=newTogglingTree,all=newAllTree;
    return this.test===Test.Textual?textual()
      :this.test===Test.Toggling?toggling()
        :this.test===Test.Indexing?indexing(): all();
  }
  buildLayout(){
    trace('.buildLayout');
    if(this.test===Test.Textual) layout.buildTextual(facets,textual);
    else if(this.test===Test.Indexing) layout.buildIndexing(facets,indexing);
    else if(this.test===Test.Toggling) layout.buildToggling(facets,toggling);
    else layout.buildAll(facets,textual,indexing);
  }
}



