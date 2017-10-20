import React from 'react';
import {
  Facets,
  newInstance,
  Target
} from 'facets-js';
import {Layout} from './Layout';
import {traceThing,swapArrayElement} from '../util/_exports';
function trace(text){
  if(facets.doTrace)console.info('App > '+text);
}
export namespace SimpleTitles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
    INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
    INDEX='Index',INDEXED='Indexed',INDEX_START=0,
    INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
    TOGGLING='Click to toggle',TOGGLED='TogglingLive state',
    TRIGGER='Click Me!',TRIGGEREDS='Button presses',
    TOGGLE_START=false,
    NUMERIC_FIELD='Number',NUMERIC_LABEL='Value',NUMERIC_START=123;
}
export namespace SelectingTitles {
  export const FRAME='Selecting',
    SELECT='Select Content',
    ACTIONS='Actions',
    LIVE='Live',
    NEW='Duplicate',
    UP='Move Up',
    DOWN='Move Down',
    DELETE='Delete',
    EDIT='Edit Selection',
    CHARS='Characters';
}
export enum Test{
  Textual,
  TogglingLive,
  Indexing,
  Trigger,
  AllSimples,
  SelectingBasic,
  SelectingPlus,
  Next
}
export const testTitles=[
  'Textual',
  'TogglingLive',
  'Indexing',
  'Trigger',
  'AllSimples',
  'SelectingBasic',
  'SelectingPlus',
  'None'
];
const facets:Facets=newInstance(true);
function newTextualTest():Target{
  const first=facets.newTextualTarget(SimpleTitles.TEXTUAL_FIRST,{
      passText:'Some text for '+SimpleTitles.TEXTUAL_FIRST,
      targetStateUpdated:(title,state)=>{
        facets.updateTargetState(SimpleTitles.TEXTUAL_SECOND,
          SimpleTitles.TEXTUAL_FIRST+' has changed to: '+state);
      },
    }),
    second=facets.newTextualTarget(SimpleTitles.TEXTUAL_SECOND,{
      passText:'Some text for '+SimpleTitles.TEXTUAL_SECOND,
    });
  return facets.newTargetGroup('TextualTest',first,second);
}
function newTogglingTest(){
  const toggling=facets.newTogglingTarget(SimpleTitles.TOGGLING,{
    passSet:SimpleTitles.TOGGLE_START,
  }),
  toggled=facets.newTextualTarget(SimpleTitles.TOGGLED,{
    getText:(title)=>{
      return facets.getTargetState(SimpleTitles.TOGGLING)as boolean?'Set':'Not set'
    }
  });
  facets.attachOnRetargeted(()=>{
    facets.setTargetLive(SimpleTitles.TOGGLED,
      facets.getTargetState(SimpleTitles.TOGGLING)as boolean);
  });
  return facets.newTargetGroup('TogglingTest',toggling,toggled);
}
function newIndexingTest(){
  const indexing=facets.newIndexingTarget(SimpleTitles.INDEXING,{
      passIndex:0,
      getUiSelectables:(title)=> SimpleTitles.INDEXABLES,
      getIndexables: (title)=> SimpleTitles.INDEXABLES,
    }),
    index=facets.newTextualTarget(SimpleTitles.INDEX,{
      getText:(title)=>''+facets.getTargetState(SimpleTitles.INDEXING),
    }),
    indexed=facets.newTextualTarget(SimpleTitles.INDEXED,{
      getText:(title)=>SimpleTitles.INDEXABLES[facets.getTargetState(SimpleTitles.INDEXING)as number],
    });
  return facets.newTargetGroup('IndexingTest',indexing,index,indexed);
}
function newTriggerTest(){
  let triggers:number=0;
  const trigger=facets.newTriggerTarget(SimpleTitles.TRIGGER,{
    targetStateUpdated:(title)=>{
      if(++triggers>4)facets.setTargetLive(title,false);
    }
  }),
  triggered=facets.newTextualTarget(SimpleTitles.TRIGGEREDS,{
    getText:(title)=>{
      const count=triggers.toString();
      return !facets.isTargetLive(SimpleTitles.TRIGGER)?
        `No more than ${count}!`:count
    }
  });
  return facets.newTargetGroup('TriggerTest',trigger,triggered);
}
function newAllSimplesTest(){
  return facets.newTargetGroup('AllTest',
    newTextualTest(),newIndexingTest(),newTogglingTest(),newTriggerTest());
}
abstract class Surface{
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
interface TextContent {
  text? : string;
}
function newSelectingTest(test:Test):Target{
  function listAt():number{
    return facets.getTargetState(frame.indexingTitle) as number;
  }
  const list : TextContent[]=[
    {text: 'Hello world!'},
    {text: 'Hello Dolly!'},
    {text: 'Hello, good evening and welcome!'},
  ],
  frame={
    title: SelectingTitles.FRAME,
    indexingTitle: SelectingTitles.SELECT,
    content: list,
    getUiSelectables: () => list.map((item)=>item.text),
    newEditTargets: (indexed:TextContent) => [
      facets.newTextualTarget(SelectingTitles.EDIT, {
        passText: indexed.text,
        targetStateUpdated: (title, state) => indexed.text = state as string
      }),
      facets.newTextualTarget(SelectingTitles.CHARS, {
        getText: title => ''+(facets.getTargetState(SelectingTitles.EDIT)as string
        ).length
      }),
    ]
    ,
    newFrameTargets:()=>test===Test.SelectingBasic?[
      facets.newTextualTarget(SimpleTitles.INDEXED,{
        getText:titley=>{
          let index=facets.getTargetState(SelectingTitles.SELECT)as number;
          return false&&index===null?"No target yet":list[index].text;
          }
        }),
        facets.newTogglingTarget(SelectingTitles.LIVE,{
          passSet:true
        })
      ]
      :[facets.newTargetGroup(SelectingTitles.ACTIONS,
      facets.newTriggerTarget(SelectingTitles.UP,{
          targetStateUpdated:(title,state)=>{
            let at=listAt();
            swapArrayElement(list,at,true);
            facets.updateTargetState(frame.indexingTitle,at-1)
          }
        }),
        facets.newTriggerTarget(SelectingTitles.DOWN,{
          targetStateUpdated:(title,state)=>{
            let at=listAt();
            swapArrayElement(list,at,false );
            facets.updateTargetState(frame.indexingTitle,at+1)
          }
        }),
        facets.newTriggerTarget(SelectingTitles.DELETE,{
          targetStateUpdated:(title,state)=>{
            traceThing('Not implemented for '+title);
          }
        }),
        facets.newTriggerTarget(SelectingTitles.NEW,{
          targetStateUpdated:(title,state)=>{
            traceThing('Not implemented for '+title);
          }
        })
      )
     ]
    };
  facets.attachOnRetargeted(()=>{
    if(test===Test.SelectingPlus){
      var contentAt=listAt();
      facets.setTargetLive(SelectingTitles.UP,contentAt>0);
      facets.setTargetLive(SelectingTitles.DOWN,
        contentAt<frame.content.length-1);
      traceThing('^onRetargeted',list);
      // facets.updateTargetState(SelectingTitles.DOWN,'')
    }
    else{
      let live=facets.getTargetState(SelectingTitles.LIVE)as boolean;
      [SelectingTitles.SELECT,SimpleTitles.INDEXED,SelectingTitles.EDIT,
        SelectingTitles.CHARS].forEach(title_=>
        facets.setTargetLive(title_,live))
    }
  });
  return facets.buildSelectingFrame(frame);
}
class SurfaceWorks extends Surface{
  constructor(private test:Test){
    super();
  }
  newTargetTree(){
    const textual=newTextualTest,indexing=newIndexingTest,
      toggling=newTogglingTest,trigger=newTriggerTest,
      all=newAllSimplesTest;
    return this.test<Test.SelectingBasic?all():newSelectingTest(this.test);
  }
  buildLayout(){
  if(false&&this.test===Test.AllSimples)[
    SimpleTitles.TEXTUAL_FIRST,
    SimpleTitles.INDEXING,
    SimpleTitles.TOGGLING,
    SimpleTitles.TRIGGER,
    SimpleTitles.TRIGGEREDS]
    .forEach(title=>facets.setTargetLive(title,false));
    new Layout(this.test).build(facets);
  }
}
export function buildSurface(){
  new SurfaceWorks(Test.SelectingPlus).buildSurface();
}



