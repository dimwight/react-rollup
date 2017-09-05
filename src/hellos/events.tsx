import React from 'react';
import ReactDOM from 'react-dom';

function TriggerLink(){
  function onClick(e){
    e.preventDefault();
    window.alert('Hi')
  }
  return (
    <a href="#" onClick={onClick}>
      Click me
    </a>
  );
}
interface Toggling{
  isSet
}
class ToggleButton extends React.Component<Toggling,Toggling>{
  constructor(props){
    super(props);
    this.state={isSet:props.isSet};
  }
  onClick=()=>this.setState(then=>{
    return ({
      isSet:!then.isSet,
    });
  });
  render(){
    return (
      <button onClick={this.onClick}>
        {this.state.isSet?'On':'Off'}
      </button>
    );
  }
}
interface Trigger{

}
class TriggerButton extends React.Component{
  onClick=()=>{
    window.alert('Gone!');
  };
  render(){
    return (
      <button onClick={this.onClick} title="Click to go...">
        Go
      </button>
    );
  }
}
export function events(){
  ReactDOM.render(
    <div>
      <p>TriggerLink <TriggerLink/></p>
      <p>ToggleButton <ToggleButton isSet={false}/></p>
      <p>TriggerButton <TriggerButton/></p>
    </div>,
    document.getElementById('root'));
}
