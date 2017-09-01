import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './welcome/Welcome';
// import {errorTest} from './util/Bits';
// import {tellTheTime} from './util/Time';

import './main.css';

// errorTest();
// tellTheTime();
const title=document.getElementById('pageTitle');
if(title!=null)title.innerText=document.title;
ReactDOM.render(<Welcome />,
  document.getElementById('app') as HTMLElement
);

