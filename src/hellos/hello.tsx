import React from 'react';
import ReactDOM from 'react-dom';

interface UserTwo{
  first,
  last,
}
interface Flintstone extends UserTwo{
  first:FredOrWilma,
  last:'Flintstone',
}
type FredOrWilma='Fred'|'Wilma';

export function hello(){
  function formatName(user:UserTwo|FredOrWilma){
    if(typeof user=='string')return user;
    return user.first+' '+user.last;
  }
  const user:Flintstone={
    first:'Wilma',
    last:'Flintstone',
  };
  const para=(
    <p>
      Hello there, {formatName(false?user:'Fred')}!
    </p>
  );
  function getGreeting(user?:FredOrWilma|Flintstone){
    return true?para:
      <h1>Hello {user?formatName(user):' sailor'}!</h1>
  }
  ReactDOM.render(
    true?getGreeting(user.first as FredOrWilma)
      :<h1>Hello</h1>,
    document.getElementById('root'),
  );
}
