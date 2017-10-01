import React from 'react';
import {StringFn} from './_exports'
// import {traceThing} from '../Util/Bits';

interface TextFieldProps{
  startText:string
  onEnter:StringFn
  hint?:string
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
    if(e.key==='Enter'){
      e.preventDefault();
      const text=this.state.text;
      this.props.onEnter(text);
    }
  };
  onKeyDown=(e)=>{
    if(e.keyCode===27)this.setText(this.props.startText)
  };
  render() {
    return (
      <div>
        <input type="text"
         size={this.props.cols||20}
         value={this.state.text}
         onKeyPress={this.onKeyPress}
         onKeyDown={this.onKeyDown}
         onChange={this.onChange}
         onMouseDown={this.onClick}
        />
      </div>
    );
  }
}

