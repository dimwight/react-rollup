import React from 'react';
import ReactDOM from 'react-dom';
import * as hello from './hello';
import * as clock from './clock';
import * as props from './props';

import './main.css';

if(true)props.render();
else if(true)clock.render();
else hello.render();
