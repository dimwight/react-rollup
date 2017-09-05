import React from 'react';
import ReactDOM from 'react-dom';

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    window.alert('Hi')
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
export function events(){
  ReactDOM.render(<ActionLink />,
    document.getElementById('root'));
}
