import * as testLib from './testLib';
import {SimpleSurface,Test} from './testReact';

import './main.css';

if(false)testLib.buildSurface();
else new SimpleSurface(Test.Toggling).buildSurface();

