import React from 'react';

import './Welcome.css';

export class Welcome extends React.Component<{}, {}> {
  render() {
    const top=document.title+' : : ';
    return (
      <div className="app">
        <div className="app-header">
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

