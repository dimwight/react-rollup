import React from 'react';
import ReactDOM from 'react-dom';
import {Facets,SimpleState} from 'facets-js';
import {SmartTextField} from '../widget/_exports';
import {Titles,Test} from './testReact';
import {traceThing} from '../Util/Bits';
import './Layout.css';

export class Layout{
  constructor(private test:Test){}
  build(facets:Facets){
    if(this.test===Test.Textual) buildTextual(facets);
    else if(this.test===Test.Indexing) buildIndexing(facets);
    else if(this.test===Test.Toggling) buildToggling(facets);
    else buildAll(facets);
  }
}

function trace(text){
  console.info('TextualField > '+text);
}
interface TargetValues{
  title:string
  facets?:Facets
  state?:SimpleState
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
  selectables:string[]
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
    const indexables=(this.props as IndexingValues).selectables;
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
    const indexables=(this.props as IndexingValues).selectables;
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
class TogglingCheckbox extends Facet<TogglingValues,TogglingValues>{
  render(){
    return (<span>
      <p>{this.props.title}
        <input
          type="checkbox"
          checked={this.state.set}
          onChange={window.alert}
        />
      </p>
    </span>)
  }
  protected readUpdate(update):{}{
    return {set:update}
  }
}
export function buildToggling(facets:Facets){
  const toggling=Titles.TOGGLING;
  ReactDOM.render(
    <div>
      <TogglingCheckbox title={toggling} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );

}
class TextualLabel extends Facet<TextualValues,TextualValues>{
  render(){
    this.rendered=true;
    return (<span>
      <span className={'caption'}>{this.props.title}</span>
        &nbsp;{this.state.text}
        </span>)
  }
  protected readUpdate(update):{}{
    return {text:update}
  }
}

export function buildTextual(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND;
  ReactDOM.render(
    <div>
      <TextualField title={first} facets={facets}/>
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildIndexing(facets:Facets){
  const indexing=Titles.INDEXING;
  ReactDOM.render(
    <div>
      <IndexingDropdown
        title={indexing}
        selectables={facets.getIndexingState(indexing).uiSelectables}
        facets={facets}/><br/>
      <TextualLabel title={Titles.INDEX} facets={facets}/><br/>
      <TextualLabel title={Titles.INDEXED} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildAll(facets:Facets){
  const first=Titles.TEXTUAL_FIRST,second=Titles.TEXTUAL_SECOND,
    indexing=Titles.INDEXING;
  ReactDOM.render(<div>
    <div className={'spaced'}>
      <TextualField title={first} facets={facets} />
      <TextualLabel title={first} facets={facets}/>
      <TextualField title={second} facets={facets} cols={40}/>
      <TextualLabel title={second} facets={facets}/>
    </div>
      <div className={'spaced'}>
        <div><IndexingDropdown
          title={indexing}
          selectables={facets.getIndexingState(indexing).uiSelectables}
          facets={facets}/>
      </div>
      <div>
        <TextualLabel title={Titles.INDEX} facets={facets}/>
        <TextualLabel title={Titles.INDEXED} facets={facets}/>
      </div></div>
    </div>,
    document.getElementById('root'),
  );
}
