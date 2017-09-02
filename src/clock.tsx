import React from 'react';
import ReactDOM from 'react-dom';

function tick(){
  const element=(
    <div>
      <h2>Time now is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root'),
  );
}

export function start(){
  setInterval(tick,2000)
}
