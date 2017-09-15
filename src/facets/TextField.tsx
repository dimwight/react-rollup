import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  text
  live?:boolean
  onTextInput?
}
class TextField extends React.Component<Props>{
  onChange=(e)=>{
    this.props.onTextInput(e.target.value);
  };
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.props.text}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
export function render(){
  const props={
    text:'Hi'
  }
  ReactDOM.render(
    <TextField text={props.text}/>,
    document.getElementById('root')
  );
}
