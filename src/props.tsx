import React from 'react';
import ReactDOM from 'react-dom';

export function render(){
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );

}
