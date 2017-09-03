import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1));
}
interface Timed{
  time:Date
}
class Clock extends React.Component<Timed>{
  render(){
    trace('Clock',this.props);
    return (<div>
      <h2>Typed time is {this.props.time.toLocaleTimeString()}!</h2>
    </div>);
  }
}
function tick(){
  ReactDOM.render(<Clock time={new Date()}/>,
    document.getElementById('root'));
}
export function clock(){
  if(false) setInterval(tick,2000);
  else tick();
}
