import React from 'react';
import Dom from 'react-dom';
import {Welcome} from './welcome/Welcome';
// import {errorTest} from './util/Bits';
// import {tellTheTime} from './util/Time';

import './main.css';

// errorTest();


// tellTheTime();
document.getElementById('pageTitle').innerText=document.title;
Dom.render(<Welcome />,
  document.getElementById('app') as HTMLElement
);

