import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,props){
  console.log(top+': props='+JSON.stringify(props,null,1))
}
function Text(props){
  trace('Text',props);
  const text=props.text;
  return(
    <div>{
      false?text
        :text.replace('Event and data binding with no events and no binding - j','J')
    }</div>
  )
}
function formatDate(date){
  return date.toLocaleTimeString();
}
function Dated(props){
  trace('Dated',props);
  return (
    <div>{formatDate(props.date)}</div>
  )
}
function DatedText(props){
  trace('DatedText',props);
  return (
    <div>
      <div>Great! {props.text}</div>
      <div>{formatDate(props.date)}</div>
    </div>
  )
}
function Avatar(props){
  trace('Avatar',props);
  return (
    <img src={props.user.avatarUrl}alt={props.user.name}/>
  );
}
function UserInfo(props){
  trace('UserInfo',props);
  return (
    <div>
      <Avatar user={props.user}/>
      <div>
        {props.user.name}
      </div>
    </div>
  );
}
function Comment(props){
  trace('Comment',props);
  const author=props.author;
  return true?(
    <div>
      <UserInfo user={author}/>
      <DatedText text={props.text} date={props.date}/>
    </div>
  ):(
    <div>
      <UserInfo user={props.author}/>
      <Text text={props.text}/>
      <Dated date={props.date}/>
    </div>
  );
}
export function extract(){
  const base={
    date:new Date(),
    text:'Event and data binding with no events and no binding!',
    author:{
      name:'Facets:',
      avatarUrl:'http://superficial.sourceforge.net/Facets.jpg',
    },
  },
  src=Object.assign({},base,{
    text:base.text.replace('!',' - just the data!'),
  });
  ReactDOM.render(
    false?Comment(base)
      :<Comment date={src.date} text={src.text} author={src.author}/>,
    document.getElementById('root'),
  );
}
