import React from 'react';

import './Welcome.css';
import logo from './logo.svg';

export class Welcome extends React.Component<{}, {}> {
  render() {
    const top=document.title+' : : ';
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to react-rollup</h2>
        </div>
        <p className="app-intro">
          Editing <code>{
          (document.title=top+this.constructor.name).replace(top,'')
        }</code> with CSS!
        </p>
      </div>
    );
  }
}

