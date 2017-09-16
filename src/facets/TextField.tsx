import React from 'react';
import ReactDOM from 'react-dom';
import Facets from 'facets-js';

function trace(text){
  console.info('TextField > '+text);
}
export interface Textual{
  title?
  facets?:Facets.Facets
  text?
}
class TextFieldPair extends React.Component<Textual,Textual>{
  private rendered:boolean;
  constructor(props){
    super(props);
    this.state={text:'Hi'};
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
      document.getElementById('output').innerText=this.state.text;
      this.props.facets.updateTargetState(this.props.title,value+'!');
    }
  };
  render(){
    this.rendered=true;
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
    document.getElementById('root'),
  );
}
