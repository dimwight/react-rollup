import React from 'react';
import {errorTest} from '../util/Util';
export class Welcome extends React.Component<{}, {}> {
  render() {
    errorTest();
    const top=document.title+' : : ';
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to react-rollup</h2>
        </div>
        <p className="app-intro">
          Edited <code>{
          (document.title=top+this.constructor.name).replace(top,'')
        }</code>, perhaps for the last time?
        </p>
      </div>
    );
  }
}

