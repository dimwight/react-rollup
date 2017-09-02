import React from 'react';
import ReactDOM from 'react-dom';

function tick(){
  const element=(
    <div>
      <h2>Time is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root'),
  );
}

export function clock(){
  setInterval(tick,2000)
}
