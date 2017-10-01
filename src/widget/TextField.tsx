import React from 'react';
import {traceThing} from '../Util/Bits';

export type BooleanFn=(boolean)=>void
export type StringFn=(string)=>void
interface TextFieldProps{
  hint:string
  startText:string
  onEnter:StringFn
  cols?:number
}
interface TextFieldState{
  text:string
}
export class TextField extends React.Component<TextFieldProps,TextFieldState> {
  private readonly hint:string;
  constructor(props){
    super(props);
    this.hint=props.hint;
    this.state={
      text:props.startText||this.hint||''
    }
  }
  setText=(set:string)=>{
    this.setState({
      text:set,
    })
  };
  onClick=()=>{
    if(this.hint&&this.state.text===this.hint)
      this.setText('');
  };
  onChange=(e)=>{
    this.setText(e.target.value)
  };
  onKeyPress=(e)=>{
    const value=e.target.value;
    if(e.key==='Enter'){
      e.preventDefault();
      this.props.onEnter(this.state.text);
    }
  };
  render() {
    return (
      <div>
        <input type="text"
               size={this.props.cols||20}
               value={this.state.text}
               onKeyPress={this.onKeyPress}
               onChange={this.onChange}
               onMouseDown={this.onClick}
        />
      </div>
    );
  }
}

