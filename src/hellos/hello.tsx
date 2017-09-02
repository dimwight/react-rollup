import React from 'react';
import ReactDOM from 'react-dom';

interface Named{
  first,
  last,
}

type FredOrWilma='Fred'|'Wilma';

interface Flintstone extends Named{
  first:FredOrWilma,
  last:'Flintstone',
}

function untypedLiteral():Flintstone{
  return {
    first:'Wilma',
    last:'Flintstone',
  }
}

function typedVar():Flintstone{
  const wilma:Flintstone={
    first:'Wilma',
    last:'Flintstone',
  };
  return wilma
}

function formatName(user:Named|FredOrWilma){
  if(typeof user=='string')return user;
  return user.first+' '+user.last;
}

export function getGreeting(user?:FredOrWilma|Flintstone){
  return false?para():
    user?<h1>Greetings to {formatName(user)}!</h1>
      :<h1>Hello sailor!</h1>
}
function para(){
  return (<p>
    Hello there, {formatName(false?typedVar():'Fred')}!
  </p>);
}
export function hello(){
  ReactDOM.render(
  getGreeting(typedVar().first as FredOrWilma),
  document.getElementById('root'),
);
}
