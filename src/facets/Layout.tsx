import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('TextField > '+text);
}
interface Target{
  title?
  facets?:Facets.Facets
}
export interface Textual extends Target{
  text?
  cols?
}
class TextField extends React.Component<Textual,Textual>{
  private rendered:boolean;
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated);
  }
  facetUpdated=(update)=>{
    const updated={text:update};
    if(!this.rendered) this.state=updated;
    else this.setState(false?then=>updated:updated);
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
                 defaultValue={''}
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
    const updated={text:update};
    if(!this.rendered) this.state=updated;
    else this.setState(false?then=>updated:updated);
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
  ReactDOM.render(
    <div>
      <TextField title={targets.first.title} facets={facets} cols={targets.first.cols}/>
      <TextLabel title={targets.first.title} facets={facets}/>
      <TextField title={targets.second.title} facets={facets} cols={targets.second.cols}/>
      <TextLabel title={targets.second.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
export function buildIndexing(
  facets:Facets.Facets,
  targets:{indexing:Textual;index:Textual;indexed:Textual}){
  ReactDOM.render(
    <div>
      <TextField title={targets.indexing.title} facets={facets}/>
      <TextLabel title={targets.index.title} facets={facets}/>
      <TextLabel title={targets.indexed.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
  window.alert('Not implemented for '+targets.indexing.title);
}
