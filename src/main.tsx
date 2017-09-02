import React from 'react';
import ReactDOM from 'react-dom';
import * as clock from './clock'
import './main.css';

interface Flintstone{
  first:FredOrWilma,
  last:'Flintstone',
}

type FredOrWilma='Fred'|'Wilma';

const user:Flintstone={
  first:'Wilma',
  last:'Flintstone',
};

function formatName(user){
  if(typeof user=='string')return user;
  return user.firstName+' '+user.lastName;
}
const name=(
  <p>
    Hello, {formatName(user)}!
  </p>
);
function getGreeting(user?:FredOrWilma|Flintstone){
  return <h1>Hello {user?formatName(user):' sailor'}!</h1>
}

if(false)ReactDOM.render(
  false?getGreeting(user.first as FredOrWilma)
    :<h1>Hello</h1>,
  document.getElementById('root'),
);
else clock.start();
