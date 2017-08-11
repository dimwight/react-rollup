import React from 'react';
import {render} from 'react-dom';
import App from './welcome/Welcome';
import myFormat from './util/myFormat';
import errorTest from './util/consoleError';

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
if(false){
  announceTime();
}
else {
  document.getElementById('pageTitle').innerText=document.title;
  render(<App />,
    document.getElementById('app') as HTMLElement
  );
}

