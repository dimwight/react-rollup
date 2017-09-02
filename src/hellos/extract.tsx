import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date){
  return date.toLocaleTimeString();
}
function Avatar(props){
  trace('Avatar',props);
  return (
    <img className="Avatar"
         src={props.user.avatarUrl}
         alt={props.user.name}
    />
  );
}
function trace(top,props){
  console.log(top+': props='+JSON.stringify(props,null,1))
}
function UserInfo(props){
  trace('UserInfo',props);
  return (
    <div className="UserInfo">
      <Avatar user={props.user}/>
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
function Data(props){
  trace('Data',props);
  return (
    <div>
      <div className="Comment-text">
        {props.text.replace('Event and data binding with no events and no binding - j','J')}
      </div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}
function Comment(props){
  trace('Comment',props);
  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <Data text={props.text} date={props.date}/>
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
