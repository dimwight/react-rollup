import * as React from 'react';

export default class Welcome extends React.Component<{}, {}> {
  render() {
    const top=document.title+' : : ';
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to react-rollup</h2>
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

