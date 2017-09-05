import React from 'react';
import ReactDOM from 'react-dom';

function ActionLink(){
  function handleClick(e){
    e.preventDefault();
    window.alert('Hi')
  }
  return (
    <a href="#" onClick={handleClick}>
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
    this.onClick=this.onClick.bind(this);
  }
  onClick(){
    this.setState(then=>({
      isSet:!then.isSet,
    }));
  }
  render(){
    return (
      <button onClick={this.onClick}>
        {this.state.isSet?'On':'Off'}
      </button>
    );
  }
}
export function events(){
  ReactDOM.render(
    false?<ActionLink/>
      :<ToggleButton isSet={false}/>,
    document.getElementById('root'));
}
