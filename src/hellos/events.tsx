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
class LoggingButton extends React.Component {
  onClick = () => {
    console.log(': this is:', this);
    window.alert('this is:'+ this);
  };
  render() {
    return (
      <button onClick={this.onClick}>
        Click me!
      </button>
    );
  }
}

ReactDOM.render(
  <div>
    <p>ActionLink <ActionLink/></p>
    <p>ToggleButton <ToggleButton isSet={false}/></p>
    <p>LoggingButton <LoggingButton/></p>
  </div>,
  document.getElementById('root'));
export function events(){
}
