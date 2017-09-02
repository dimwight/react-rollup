import React from 'react';
import ReactDOM from 'react-dom';
import {getGreeting} from './hello';

function Hello(bits) {
  return <h1>Hello to {bits.first}</h1>;
}
function Three() {
  return (
    <div>
      <Hello first="Fred" />
      {getGreeting('Wilma')}
      <Hello first="Barney" />
    </div>
  );
}

export function props(){
  ReactDOM.render(true?<Three/>:<Hello first="Fred" />,
    document.getElementById('root'));
}
