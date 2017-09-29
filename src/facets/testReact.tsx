import React from 'react';
import Facets from 'facets-js';
import * as layout from './Layout';

function trace(text){
  console.info('App > '+text);
}
const facets:Facets.Facets=Facets.newInstance(true);

enum Test{Textual,Indexing,All}

namespace Titles{
  export const TEXTUAL_FIRST='First',TEXTUAL_SECOND='Second',
  INDEXING=TEXTUAL_FIRST+' or '+TEXTUAL_SECOND,
  INDEX='Index',INDEXED='Indexed',INDEX_START=0,
  INDEXABLES=[TEXTUAL_FIRST,TEXTUAL_SECOND],
  TOGGLING='Click to toggle live',TOGGLED='Toggle state',
  TOGGLE_START=false,
  NUMERIC_FIELD='Number',NUMERIC_LABEL='Value',NUMERIC_START=123;
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
  return facets.newTargetGroup('Textuals',first,second);
}
function newIndexingTree():Facets.Target{
  const indexing=facets.newIndexingTarget(Titles.INDEXING,{
    passIndex:0,
    getUiSelectables:(title)=> Titles.INDEXABLES,
    getIndexables: (title)=> Titles.INDEXABLES
  }),
  index=facets.newTextualTarget(Titles.INDEX,{
    getText:(title)=>''+facets.getTargetState(Titles.INDEXING)
  }),
  indexed=facets.newTextualTarget(Titles.INDEXED,{
    getText:(title)=>Titles.INDEXABLES[facets.getTargetState(Titles.INDEXING)as number]
  });
  return facets.newTargetGroup('Indexing',indexing,index,indexed);
}
const test:Test=true?null:Test.Indexing;
function newTargetTree():Facets.Target{
  return test===Test.Textual?newTextualTree()
    :test===Test.Indexing?newIndexingTree()
    :facets.newTargetGroup('Indexing',newTextualTree(),newIndexingTree());
}

function buildLayout(){
  trace('.buildLayout');
  if(test===Test.Textual)layout.buildTextual(facets,{
    first:{title:Titles.TEXTUAL_FIRST},
    second:{title:Titles.TEXTUAL_SECOND,cols:40}
  });
  else if(test===Test.Indexing)layout.buildIndexing(facets,{
    indexing:{title:Titles.INDEXING,indexables:Titles.INDEXABLES},
    index:{title:Titles.INDEX},
    indexed:{title:Titles.INDEXED}
  })
  else layout.buildAll(facets,{
      first:{title:Titles.TEXTUAL_FIRST},
      second:{title:Titles.TEXTUAL_SECOND,cols:40},
      indexing:{title:Titles.INDEXING,indexables:Titles.INDEXABLES},
      index:{title:Titles.INDEX},
      indexed:{title:Titles.INDEXED}
    })
}
export function buildSurface(){
  trace('Building surface');
  facets.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
}

