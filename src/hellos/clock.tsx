import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1));
}
interface ClockState{
  time:Date
  seconds?
}
interface ClockProps{
  increment?
}
class Clock extends React.Component<ClockProps,ClockState>{
  private timerID:number;
  constructor(props){
    super(props);
    props.increment=2;
    const time=new Date();
    this.state={
      time:time,
      seconds:true?0:time.getSeconds(),
    };
  }
  render(){
    trace('Clock',this.state);
    return (<div>
      <h2>Time is {this.state.time.toLocaleTimeString()},
        counted {this.state.seconds} seconds</h2>
    </div>);
  }
  componentDidMount(){
    this.timerID=setInterval(
      ()=>this.tick(),
      this.props.increment*1000,
    );
  }
  update(then,props){
    return {
      seconds:then.seconds+props.increment,
      time:new Date(),
    };
  }
  tick(){
    this.setState(false?this.update
    :(then,props)=>({
        seconds:then.seconds+props.increment,
        time:new Date(),
      }));
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
}
export function clock(){
  ReactDOM.render(<Clock/>,
    document.getElementById('root'));
}
