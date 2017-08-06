import * as React from 'react';
import './Welcome.css';
// const logo = require('./logo.svg');

export default class Welcome extends React.Component<{}, {}> {
  render() {
    const top=document.title+' : : ';
    return (
      <div className="app">
        <div className="app-header">
          {/*<img src={logo} className="app-logo" alt="logo" />*/}
          <h2>Welcome to React-TS</h2>
        </div>
        <p className="app-intro">
          Edited <code>{
          (document.title=top+this.constructor.name).replace(top,'')
        }</code> for the last time?
        </p>
      </div>
    );
  }
}

