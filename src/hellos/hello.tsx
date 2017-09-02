import React from 'react';
import ReactDOM from 'react-dom';

interface UserTwo{
  first,
  last,
}
export interface Flintstone extends UserTwo{
  first:FredOrWilma,
  last:'Flintstone',
}
export type FredOrWilma='Fred'|'Wilma';
function formatName(user:UserTwo|FredOrWilma){
  if(typeof user=='string')return user;
  return user.first+' '+user.last;
}
export function getGreeting(user?:FredOrWilma|Flintstone){
  return false?para():
    <h1>Hello {user?formatName(user):' sailor'}!</h1>
}
function para(){
  return (<p>
    Hello there, {formatName(false?user():'Fred')}!
  </p>);
}
function user():Flintstone{
  return{
    first:'Wilma',
    last:'Flintstone',
  }
}
export function hello(){
  ReactDOM.render(
  getGreeting(user().first as FredOrWilma),
  document.getElementById('root'),
);
}
