import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1));
}
function Clocky(props){
  trace('Clocky',props);
  return (<div>[Clocky]
      <h2>Time is {props.date.toLocaleTimeString()}</h2>
    </div>);
}
class Clock extends React.Component<Dated>{
  static propTypes={
    date: React.PropTypes.any
  };
  render() {
    trace('Clock',this.props);
    return (<div>[Clock]
        <h2>[this.props.<u>date</u>(TS2339)]
          {this.props.date.toLocaleTimeString()}</h2>
        <h2>[(this.props as Dated).date]
          {(this.props as Dated).date.toLocaleTimeString()}</h2>
      </div>);
  }
}


function tick() {
  const dated:Dated={
    date:new Date()
  },date:Date=dated.date;
  ReactDOM.render(true?<Clock date={date} />:<Clocky date={date} />,
    document.getElementById('root'));
}
/*
 Error:(16, 33) TS2339:Property 'date' does not exist
 on type 'Readonly<{ children?: ReactNode; }> & Readonly<{}>'.
 */
export function clock(){
  if(false)setInterval(tick,2000);
  else tick();
}
interface Dated{
  date:Date
}