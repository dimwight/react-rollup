import React from 'react';
import {
  Facets,
  newInstance,
  Target,
  TogglingCoupler
} from 'facets-js';
import {Layout} from './Layout';
function trace(text){
  if(facets.doTrace)console.info('App > '+text);
}
export namespace Titles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
  INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
  INDEX='Index',INDEXED='Indexed',INDEX_START=0,
  INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
  TOGGLING='Click to toggle',TOGGLED='Toggling state',
  TRIGGER='Click Me!',TRIGGEREDS='Button presses',
  TOGGLE_START=false,
  NUMERIC_FIELD='Number',NUMERIC_LABEL='Value',NUMERIC_START=123;
}
export enum Test{Textual,Toggling,Indexing,Trigger,All}
const facets:Facets=newInstance(false);
function newTextualTree():Target{
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
function newTogglingTest(){
  const toggling=facets.newTogglingTarget(Titles.TOGGLING,{
    passSet:Titles.TOGGLE_START,
    targetStateUpdated:(title)=>{
      facets.setTargetLive(Titles.TOGGLED,facets.getTargetState(title)as boolean)
    }
  }as TogglingCoupler),
  toggled=facets.newTextualTarget(Titles.TOGGLED,{
    getText:(title)=>{
      return facets.getTargetState(Titles.TOGGLING)as boolean?'Set':'Not set'
    }
  });
  return facets.newTargetGroup('TogglingTest',toggling,toggled);
}
function newIndexingTest(){
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
function newTriggerTest(){
  let triggers:number=0;
  const trigger=facets.newTriggerTarget(Titles.TRIGGER,{
    targetStateUpdated:(title)=>{
      triggers++
    }
  }),
  triggered=facets.newTextualTarget(Titles.TRIGGEREDS,{
    getText:(title)=>{
      if(triggers>4)
        facets.setTargetLive(Titles.TRIGGER,false);
      return triggers.toString()
    }
  });
  return facets.newTargetGroup('TriggerTest',trigger,triggered);
}
function newAllTest(){
  return facets.newTargetGroup('AllTest',
    newTextualTree(),newIndexingTest(),newTogglingTest(),newTriggerTest());
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
  abstract newTargetTree():Target;
  abstract buildLayout();
}
class SimpleSurface extends SurfaceCore{
  constructor(private test:Test){
    super();
  }
  newTargetTree(){
    const textual=newTextualTree,indexing=newIndexingTest,
      toggling=newTogglingTest,trigger=newTriggerTest(),all=newAllTest;
    return this.test===Test.Textual?textual()
      :this.test===Test.Toggling?toggling()
        :this.test===Test.Indexing?indexing(): all();
  }
  buildLayout(){
    if(false)[Titles.TEXTUAL_FIRST,Titles.INDEXING,Titles.TOGGLING,Titles.TRIGGER,Titles.TRIGGEREDS]
      .forEach((title)=>{
        facets.setTargetLive(title,false)
      });
    if(this.test===Test.Toggling||this.test===Test.All)
      facets.setTargetLive(Titles.TOGGLED,
      facets.getTargetState(Titles.TOGGLING)as boolean);
    new Layout(this.test).build(facets);
  }
}
export function buildSurface(){
  new SimpleSurface(Test.Trigger).buildSurface();
}



