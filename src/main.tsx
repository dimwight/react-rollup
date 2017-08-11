import React from 'react';
import Dom from 'react-dom';
import {Welcome} from './welcome/Welcome';
import {tellTheTime} from './util/Util';

if(false){
  tellTheTime();
}
else {
  document.getElementById('pageTitle').innerText=document.title;
  Dom.render(<Welcome />,
    document.getElementById('app') as HTMLElement
  );
}

