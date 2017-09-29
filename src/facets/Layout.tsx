import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';
import * as test from './testReact';


function trace(text){
  console.info('TextField > '+text);
}
interface Target{
  title:string
  facets?:Facets.Facets
  state?:Facets.SimpleState
}
export interface Textual extends Target{
  text?:string
  cols?:number
}
export interface Indexing extends Target{
  indexables:string[]
  index?:number
}
class Facet<I extends Target,K extends Target> extends React.Component<I,K>{
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
class Dropdown extends Facet<Indexing,Indexing>{
  protected readUpdate(update){
    return {index:update};
  }
  onChange=(e)=>{
    const indexables=(this.props as Indexing).indexables;
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
    const indexables=(this.props as Indexing).indexables;
    const selected=indexables[(this.state as Indexing).index];
    const options=indexables.map((item)=>{
      return item===selected?<option selected>{item}</option>
        :<option>{item}</option>
    });
    return (<div><span className={'caption'}>{this.props.title}</span>&nbsp;
      <select onChange={this.onChange}>{options}</select></div>);
  }
}
class TextField extends Facet<Textual,Textual>{
  onChange=(e)=>{
    this.setState({
      text:e.target.value,
    })
  };
  onKeyPress=(e)=>{
    const value=e.target.value;
    if(e.key==='Enter'){
      e.preventDefault();
      this.props.facets.updateTargetState(this.props.title,value);
    }
  };
  protected readUpdate(update):{}{
    return {text:update}
  }
  render(){
    this.rendered=true;
    return (<div>
        <form><span className={'caption'}>{this.props.title}</span>&nbsp;
          <input type="text" size={this.props.cols||20}
                 value={this.state.text}
                 onKeyPress={this.onKeyPress}
                 onChange={this.onChange}
          /></form>
      </div>
    );
  }
}
class TextLabel extends Facet<Textual,Textual>{
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

export function buildTextual(facets:Facets.Facets,test:test.Textual){
  const first=test.first,second=test.second;
  ReactDOM.render(
    <div>
      <TextField title={first.title} facets={facets} cols={first.cols}/>
      <TextLabel title={first.title} facets={facets}/>
      <TextField title={second.title} facets={facets} cols={second.cols}/>
      <TextLabel title={second.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildIndexing(facets:Facets.Facets,test:test.Indexing){
  ReactDOM.render(
    <div>
      <Dropdown
        title={test.indexing.title}
        indexables={test.indexing.indexables}
        facets={facets}/>
      <TextLabel title={test.index.title} facets={facets}/><br/>
      <TextLabel title={test.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildAll(facets:Facets.Facets,textuals:test.Textual,
                         indexing:test.Indexing){
  const first=textuals.first,second=textuals.second;
  ReactDOM.render(
    <div>
      <TextField title={first.title} facets={facets} cols={first.cols}/>
      <TextLabel title={first.title} facets={facets}/>
      <TextField title={second.title} facets={facets} cols={second.cols}/>
      <TextLabel title={second.title} facets={facets}/>
      <Dropdown
        title={indexing.indexing.title}
        indexables={indexing.indexing.indexables}
        facets={facets}/>
      <TextLabel title={indexing.index.title} facets={facets}/><br/>
      <TextLabel title={indexing.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
