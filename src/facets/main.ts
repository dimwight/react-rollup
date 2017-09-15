import * as thinking from '../thinking/_exports';
import * as testLib from './testLib';
import * as testReact from './testReact';
import * as field from './TextField';

import './main.css';

if(true)field.render();
else if(false)testReact.buildSurface();
else if(false)testLib.buildSurface();
else thinking.table();

