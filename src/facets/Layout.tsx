import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';
import * as test from './testReact';
import {SmartTextField} from '../widget/_exports';
import {traceThing} from '../Util/Bits';

function trace(text){
  console.info('TextualField > '+text);
}
interface TargetValues{
  title:string
  facets?:Facets.Facets
  state?:Facets.SimpleState
  live?:boolean
}
export interface TextualValues extends TargetValues{
  text?:string
  cols?:number
}
export interface TogglingValues extends TargetValues{
  set?:boolean
}
export interface IndexingValues extends TargetValues{
  indexables:string[]
  index?:number
}
class Facet<I extends TargetValues,K extends TargetValues> extends React.Component<I,K>{
  protected rendered:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const updated=this.readUpdate(update);
    if(!this.rendered)
      this.state=Object.assign({}as K,this.props as I,updated);
    else this.setState(updated);
  };
  protected readUpdate(update):{}{
    return {state:update}
  }
}
class IndexingDropdown extends Facet<IndexingValues,IndexingValues>{
  protected readUpdate(update){
    return {index:update};
  }
  onChange=(e)=>{
    const indexables=(this.props as IndexingValues).indexables;
    const value=e.target.value;
    for(let at=0; at<indexables.length; at++){
      if(indexables[at]===value){
        this.setState(then=>{
          this.props.facets.updateTargetState(this.props.title,at);
          return {index:at};
        });
        break;
      }
    }
  };
  render(){
    this.rendered=true;
    const indexables=(this.props as IndexingValues).indexables;
    const selected=indexables[(this.state as IndexingValues).index];
    const options=indexables.map((item)=>{
      return item===selected?<option selected>{item}</option>
        :<option>{item}</option>
    });
    return (<span><span className={'caption'}>{this.props.title}</span>&nbsp;
      <select
        onChange={this.onChange}
      >
        {options}
        </select></span>);
  }
}
class TextualField extends Facet<TextualValues,TextualValues>{
  onFieldEnter=(text)=>{
     this.props.facets.updateTargetState(this.props.title,text);
  };
  protected readUpdate(update):{}{
    return {text:update}
  }
  render(){
    this.rendered=true;
    return (<div>
        <span className={'caption'}>{this.props.title}</span>&nbsp;
        <SmartTextField
          startText={this.state.text}
          onEnter={this.onFieldEnter}
          cols={this.props.cols}
        />
      </div>
    );
  }
}
class TextualLabel extends Facet<TextualValues,TextualValues>{
  render(){
    this.rendered=true;
    return (<span>
      <span className={'caption'}>{this.props.title}</span>
        &nbsp;{this.state.text}</span>
    )
  }
  protected readUpdate(update):{}{
    return {text:update}
  }
}

export function buildTextual(facets:Facets.Facets,test:test.TextualTest){
  const first=test.first,second=test.second;
  ReactDOM.render(
    <div>
      <TextualField title={first.title} facets={facets} cols={first.cols}/>
      <TextualLabel title={first.title} facets={facets}/>
      <TextualField title={second.title} facets={facets} cols={second.cols}/>
      <TextualLabel title={second.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildToggling(facets:Facets.Facets,test:test.TogglingTest){
  traceThing('buildToggling',test);
  const toggling=test.toggling;
  ReactDOM.render(
    <div>
      <p>{toggling.title}
      <input
        type="checkbox"
        checked={toggling.set}
        onChange={window.alert}
      />
      </p>
    </div>,
    document.getElementById('root'),
  );

}
export function buildIndexing(facets:Facets.Facets,test:test.IndexingTest){
  ReactDOM.render(
    <div>
      <IndexingDropdown
        title={test.indexing.title}
        indexables={test.indexing.indexables}
        facets={facets}/><br/>
      <TextualLabel title={test.index.title} facets={facets}/><br/>
      <TextualLabel title={test.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildAll(facets:Facets.Facets,textuals:test.TextualTest,
                         indexing:test.IndexingTest){
  const first=textuals.first,second=textuals.second;
  ReactDOM.render(
    <div>
      <TextualField title={first.title} facets={facets} cols={first.cols}/>
      <TextualLabel title={first.title} facets={facets}/>
      <TextualField title={second.title} facets={facets} cols={second.cols}/>
      <TextualLabel title={second.title} facets={facets}/>
      <IndexingDropdown
        title={indexing.indexing.title}
        indexables={indexing.indexing.indexables}
        facets={facets}/>
      <TextualLabel title={indexing.index.title} facets={facets}/><br/>
      <TextualLabel title={indexing.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
