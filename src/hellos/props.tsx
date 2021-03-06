import React from 'react';
import ReactDOM from 'react-dom';
import * as hello from './hello';

function Hello(bits) {
  let names=['Fred','Wilma'];/*hello.FredOrWilma*/
  let known=false;
  let first=bits.toggling;
  if(!bits.toggling)first='that';
  names.forEach((name)=>known=known||name===first);
  return known?<h1>Hello there {first}</h1>
    :<h1>Who&rsquo;s {first}? </h1>;
}
function Three() {
  return (
    <div>
      <Hello first="Fred" />
      {hello.getGreeting('Wilma')}
      <Hello first="Barney" />
      <Hello />
    </div>
  );
}
export function props(){
  ReactDOM.render(true?<Three/>:<Hello first="Fred" />,
    document.getElementById('root'));
}
