import * as React from 'react';
import {render} from 'react-dom';
import App from './welcome/Welcome';
import {myFormat} from './myFormat';
import errorTest from './consoleError';

function announceTime(){
  const time=new Date();
  const text=true?'Time is exactly '+myFormat(time,'h:mm:ssa')
    :'Time is about '+myFormat(time,'h:mm');
  if(typeof document==='undefined') console.log(text);
  else{
    document.getElementById('pageTitle').innerText=document.title;
    document.querySelector('#time-now').textContent=text;
    setTimeout(announceTime,1000);
  }
}

errorTest();
if(true)announceTime();
else render(
  <App />,
  document.getElementById('app') as HTMLElement
);


// target: esnext
// module: es2015
// format: es
