import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('TextField > '+text);
}
export interface Faceted{
  title?
  facets?:Facets.Facets
  text?
  size?
}
class TextField extends React.Component<Faceted,Faceted>{
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
        <form>
          <input type="text" size={this.props.size||20}
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
  extends React.Component<Faceted,Faceted>{
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
    return <span>{this.state.text}</span>
  }
}
export function buildTextualPage(facets:Facets.Facets,first:Faceted,second:Faceted){
  ReactDOM.render(
    <div>
      <TextField title={first.title} facets={facets} size={first.size}/>
      <TextLabel title={first.title} facets={facets}/>
      <TextField title={second.title} facets={facets} size={second.size}/>
      <TextLabel title={second.title} facets={facets}/>
    </div>,
    document.getElementById('root'),
  );
}
