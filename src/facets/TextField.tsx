import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('TextField > ' +text);
}
export interface Textual {
  title?
  facets?:Facets.Facets
  text?
}
class TextFieldPair extends React.Component<Textual,Textual>{
  constructor(props){
    super(props);
    props.facets.attachFacet(props.title,this.facetUpdated)
    this.state={};
  }
  facetUpdated=(update)=>{
    window.alert(update);
    this.setState(then=>{
      return ({
        text:update,
      });
    })
  };
  onChange=(e)=>{
    window.alert(e.target.value);
    this.setState({
      text:e.target.value,
    })
  };
  onKeyPress=(e)=>{
    const value=e.target.value;
    if(e.key==='Enter'){
      e.preventDefault();
      document.getElementById('output').innerText=this.state.text;
    }
  };
  render() {
    return (<div>
      <form><input type="text"
         defaultValue={''}
         value={this.state.text}
         onKeyPress={this.onKeyPress}
         onChange={this.onChange}
      /></form>
      <p id="output">Output</p>
      </div>
    );
  }
}
export function render(props?){
  ReactDOM.render(
    <TextFieldPair title={props.title} facets={props.facets}/>,
    document.getElementById('root')
  );
}
