import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log(top+': '+JSON.stringify(thing,null,1))
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
    <img src={props.user.avatarUrl} alt={props.user.name}/>
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
function All(props){
  trace('Comment',props);
  const author=props.author,
    comment=props.comment;
  return false?(
    <div>
      <UserInfo user={author}/>
      <DatedText text={comment.text}
         date={comment.date}/>
    </div>
  ):(
    <div>
      <UserInfo user={author}/>
      <Text text={comment.text}/>
      <Dated date={comment.date}/>
    </div>
  );
}
function Frame(props){
  return <div>
    <All author={props.base.author} comment={props.base.comment}/>
    <All author={props.tweak.author} comment={props.tweak.comment}/>,
  </div>
}
type name='Facets'|'Superficial'
interface Author{
  name:name,
  avatarUrl:string
}
interface Comment{
  date:Date
  text:string
}
interface AuthorComment{
  author:Author
  comment:Comment
}
export function extract(){
  const url='http://superficial.sourceforge.net/Facets.jpg';
  const base:AuthorComment={
    author:{
      name:'Facets',
      avatarUrl: url,
    },
    comment:{
      date:new Date(),
      text:'Event and data binding with no events and no binding!',
    }
  },
  tweak:AuthorComment={
    comment:{
      date:new Date(),
      text:base.comment.text.replace('!',' - just the data!')
    },
    author:{
      name:'Superficial',
      avatarUrl:url,
    } as Author
  };
  trace('base',base);
  trace('tweak',tweak);
  ReactDOM.render(
    Frame({
      base:base,
      tweak:tweak
    }),
    document.getElementById('root'),
  );
}
