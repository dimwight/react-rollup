import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('TextField > '+text);
}
interface Target{
  title:string
  facets?:Facets.Facets
}
export interface Textual extends Target{
  text?:string
  cols?:number
}
export interface Indexing extends Target{
  indexables:string[]
  index?:number
}
class Dropdown extends React.Component<Indexing,Indexing>{
  private rendered:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const readUpdate={index:update};
    if(!this.rendered) 
      this.state=Object.assign({},this.props,readUpdate);
    else this.setState(readUpdate);
  };
  onChange=(e)=>{
    this.setState({
      index:e.target.value,
    })
  };
  render(){
    this.rendered=true;
    const options=this.props.indexables.map((item)=>{
      return (<option>item</option>)
    })
    return (<div>
        <form><span className={'caption'}>{this.props.title}</span>&nbsp;
          <input type="select"
            value={this.state.indexables[this.state.index]}
           {...options}
            onChange={this.onChange}
          /></form>
      </div>
    );
  }
}
class TextField extends React.Component<Textual,Textual>{
  private rendered:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const readUpdate={text:update};
    if(!this.rendered)
      this.state=Object.assign({},this.props,readUpdate);
    else this.setState(false?then=>readUpdate:readUpdate);
  };
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
class TextLabel
  extends React.Component<Textual,Textual>{
  private rendered:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const readUpdate={text:update};
    if(!this.rendered)
      this.state=Object.assign({},this.props,readUpdate);
    else this.setState(false?then=>readUpdate:readUpdate);
  };
  render(){
    this.rendered=true;
    return (<span>
      <span className={'caption'}>{this.props.title}</span>
      &nbsp;{this.state.text}</span>
    )
  }
}
export function buildTextual(
  facets:Facets.Facets,
  targets:{first:Textual,second:Textual}){
  const first=targets.first,second=targets.second;
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
export function buildIndexing(
  facets:Facets.Facets,
  targets:{indexing:Indexing;index:Textual;indexed:Textual}){
  ReactDOM.render(
    <div>
      <Dropdown
        title={targets.indexing.title}
        indexables={targets.indexing.indexables}
        facets={facets}/>
      <TextLabel title={targets.index.title} facets={facets}/><br/>
      <TextLabel title={targets.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
