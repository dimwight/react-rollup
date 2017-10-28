import React from 'react';
import ReactDOM from 'react-dom';
import {
  Facets,
  newInstance,
  Target,
  IndexingFramePolicy,
} from 'facets-js';
import {
  RowPanel,
  PanelRow,
  IndexingDropdown,
  IndexingList,
  TextualLabel,
  TextualField,
  TogglingCheckbox,
  TriggerButton,
} from '../react/exports';
import {traceThing,swapElement,removeElement,duplicateElement} from '../util/_exports';
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
  'None',
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
    },
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
export abstract class Surface{
  buildSurface(){
    trace('Building surface '+facets.times.elapsed());
    facets.buildTargeterTree(this.newTargetTree());
    trace('Built targets, created targeters');
    this.buildLayout();
    trace('Attached and laid out facets');
    trace('Surface built '+facets.times.elapsed());
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
  ];
  const frame:IndexingFramePolicy={
    title: SelectingTitles.FRAME,
    indexingTitle: SelectingTitles.SELECT,
    newIndexedTitle:indexed=>SelectingTitles.FRAME,
    content: list,
    getUiSelectables: () => list.map((item)=>item.text),
    newIndexedTargets: (indexed:TextContent,title:string) => [
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
    newIndexingTargets:()=>test===Test.SelectingBasic?[
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
            swapElement(list,at,true);
            facets.updateTargetState(frame.indexingTitle,at-1)
          }
        }),
        facets.newTriggerTarget(SelectingTitles.DOWN,{
          targetStateUpdated:(title,state)=>{
            let at=listAt();
            swapElement(list,at,false );
            facets.updateTargetState(frame.indexingTitle,at+1)
          }
        }),
        facets.newTriggerTarget(SelectingTitles.DELETE,{
          targetStateUpdated:(title,state)=>{
            let at=listAt(),atEnd=removeElement(list,at);
            if(atEnd)
              facets.updateTargetState(frame.indexingTitle,at-1)
          }
        }),
        facets.newTriggerTarget(SelectingTitles.NEW,{
          targetStateUpdated:(title,state)=>{
            let at=listAt();
            duplicateElement(list,at,src=>({text: (src as TextContent).text}));
            facets.updateTargetState(frame.indexingTitle,at+1)
          }
        })
      )
     ]
    };
  facets.attachOnRetargeted(()=>{
    if(test===Test.SelectingPlus){
      // facets.updateTargetState(frame.indexingTitle,list.length-1);
      let at=listAt();
      facets.setTargetLive(SelectingTitles.DELETE,list.length>1);
      facets.setTargetLive(SelectingTitles.UP,at>0);
      facets.setTargetLive(SelectingTitles.DOWN,
        at<frame.content.length-1);
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
  new SurfaceWorks(Test.SelectingBasic).buildSurface();
}
class Layout{
  constructor(private test:Test){}
  build(facets:Facets){
    switch(this.test){
      case Test.Textual: buildTextual(facets);break;
      case Test.Indexing: buildIndexing(facets);break;
      case Test.TogglingLive: buildToggling(facets);break;
      case Test.Trigger: buildTrigger(facets);break;
      case Test.AllSimples:buildAllSimples(facets);break;
      case Test.SelectingBasic:buildSelectingBasic(facets);break;
      case Test.SelectingPlus:buildSelectingPlus(facets);break;
      default: throw new Error('Not implemented for '+testTitles[Test.Next]);
    }
  }
}
function buildIndexing(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={Test.Indexing}>
      <IndexingDropdown title={SimpleTitles.INDEXING} facets={facets}/>
      <TextualLabel title={SimpleTitles.INDEX} facets={facets}/>
      <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function buildAllSimples(facets:Facets){
  let textual1=SimpleTitles.TEXTUAL_FIRST,textual2=SimpleTitles.TEXTUAL_SECOND;
  ReactDOM.render(<div>
      <RowPanel rubric={testTitles[Test.Textual]}>
        <TextualField title={textual1} facets={facets}/>
        <TextualLabel title={textual1} facets={facets}/>
        <TextualField title={textual2} facets={facets} cols={40}/>
        <TextualLabel title={textual2} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={testTitles[Test.Indexing]}>
        <IndexingDropdown title={SimpleTitles.INDEXING} facets={facets}/>
        <TextualLabel title={SimpleTitles.INDEX} facets={facets}/>
        <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={testTitles[Test.TogglingLive]}>
        <TogglingCheckbox title={SimpleTitles.TOGGLING} facets={facets}/>
        <TextualLabel title={SimpleTitles.TOGGLED} facets={facets}/>
      </RowPanel>
      <RowPanel rubric={testTitles[Test.Trigger]}>
        <TriggerButton title={SimpleTitles.TRIGGER} facets={facets}/>
        <TextualLabel title={SimpleTitles.TRIGGEREDS} facets={facets}/>
      </RowPanel>
    </div>,
    document.getElementById('root'),
  );
}
function buildTextual(facets:Facets){
  let first=SimpleTitles.TEXTUAL_FIRST,second=SimpleTitles.TEXTUAL_SECOND;
  ReactDOM.render(
    <RowPanel rubric={Test.Textual}>
      <TextualField title={first} facets={facets}/>
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function buildToggling(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={testTitles[Test.TogglingLive]}>
      <TogglingCheckbox title={SimpleTitles.TOGGLING} facets={facets}/>
      <TextualLabel title={SimpleTitles.TOGGLED} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  );

}
function buildTrigger(facets:Facets){
  ReactDOM.render(
    <RowPanel rubric={Test.Trigger}>
      <TriggerButton title={SimpleTitles.TRIGGER} facets={facets}/>
      <TextualLabel title={SimpleTitles.TRIGGEREDS} facets={facets}/>
    </RowPanel>,
    document.getElementById('root'),
  )
}
function buildSelectingBasic(facets:Facets){
  ReactDOM.render(<RowPanel rubric={testTitles[Test.SelectingBasic]}>
      {false?<IndexingDropdown title={SelectingTitles.SELECT} facets={facets}/>
        :<IndexingList title={SelectingTitles.SELECT} facets={facets}/>}
      <PanelRow>
        <TextualField title={SelectingTitles.EDIT} facets={facets} cols={30}/>
      </PanelRow>
      <PanelRow>
        <TextualLabel title={SimpleTitles.INDEXED} facets={facets}/>
      </PanelRow>
      <PanelRow>
        <TextualLabel title={SelectingTitles.CHARS} facets={facets}/>
      </PanelRow>
      <PanelRow>
        <TogglingCheckbox title={SelectingTitles.LIVE} facets={facets}/>
      </PanelRow>
    </RowPanel>,
    document.getElementById('root'),
  );
}
function buildSelectingPlus(facets:Facets){
  ReactDOM.render(<RowPanel rubric={testTitles[Test.SelectingPlus]}>
      {false?<IndexingDropdown title={SelectingTitles.SELECT} facets={facets}/>:
        <IndexingList title={SelectingTitles.SELECT} facets={facets}/>}
      <PanelRow>
        <TextualField title={SelectingTitles.EDIT} facets={facets} cols={30}/>
      </PanelRow>
      <PanelRow>
        <TriggerButton title={SelectingTitles.UP} facets={facets}/>
        <TriggerButton title={SelectingTitles.DOWN} facets={facets}/>
        <TriggerButton title={SelectingTitles.DELETE} facets={facets}/>
        <TriggerButton title={SelectingTitles.NEW} facets={facets}/>
      </PanelRow>
    </RowPanel>,
    document.getElementById('root'),
  );
}
