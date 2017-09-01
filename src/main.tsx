import React from 'react';
import ReactDOM from 'react-dom';

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
const element=(
  <p>
    Hello, {formatName(user)}!
  </p>
);
function getGreeting(user?:FredOrWilma|Flintstone){
  return <h1>Hello {user?formatName(user):' sailor'}!</h1>
}

ReactDOM.render(
  getGreeting(user.first as FredOrWilma),
  document.getElementById('root'),
);

