import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1));
}
interface Clocky{
  time?:Date
  seconds?
  increment
}
function TimeWithSeconds(props:Clocky){
  trace('TimeWithSeconds',props);
  return (<h2>Time is {props.time.toLocaleTimeString()},
    counted {props.seconds} seconds</h2>);
}
class Clock extends React.Component<Clocky,Clocky>{
  private timerID:number;
  constructor(props){
    super(props);
    const time=new Date();
    this.state={
      time:time,
      seconds:true?0:time.getSeconds(),
      increment:props.increment
    };
  }
  render(){
    return TimeWithSeconds(this.state);
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
  if(true)ReactDOM.render(<Clock increment={1}/>,
    document.getElementById('root'));
  else {
    ReactDOM.render(
      (<div>
          <Clock increment={1}/>
          <Clock increment={2}/>
          <Clock increment={3}/>
        </div>),
      document.getElementById('root')
    );
  }
}
