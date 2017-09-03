import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1));
}
interface Timed{
  time:Date
}
class Clock extends React.Component<null,Timed>{
  private timerID:number;
  constructor(props) {
    super(props);
    this.state = {time: new Date()};
  }
  render(){
    trace('Clock',this.state);
    return (<div>
      <h2>Classy time is {this.state.time.toLocaleTimeString()}!</h2>
    </div>);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000,
    );
  }
  tick() {
    this.setState({
      time: new Date()
    });
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}
export function clock(){
  ReactDOM.render(<Clock />,
    document.getElementById('root'));
}
