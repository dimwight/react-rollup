import React from 'react';
import Dom from 'react-dom';
import {Welcome} from './welcome/Welcome';
import {announceTime} from './util/myFormat';

if(false){
  announceTime();
}
else {
  document.getElementById('pageTitle').innerText=document.title;
  Dom.render(<Welcome />,
    document.getElementById('app') as HTMLElement
  );
}

