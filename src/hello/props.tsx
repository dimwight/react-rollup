import React from 'react';
import ReactDOM from 'react-dom';

function Hello(props) {
  return <h1>Hello {props.name}</h1>;
}
export function props(){
  ReactDOM.render(
    <Hello name="Fred" />,
    document.getElementById('root')
  );

}
