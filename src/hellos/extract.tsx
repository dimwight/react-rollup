import React from 'react';
import ReactDOM from 'react-dom';
import {props} from './props';

function formatDate(date) {
  return date.toLocaleTimeString();
}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
             src={props.author.avatarUrl}
             alt={props.author.name} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

export function extract(){
  const base={
    date: new Date(),
    text: 'Event and data binding with no events and no binding!',
    author: {
      name: 'Facets:',
      avatarUrl: 'http://superficial.sourceforge.net/Facets.jpg'
    }
  },
  src = Object.assign({},base,{
    text:base.text.replace('!',' - just the data!'),
  });
  ReactDOM.render(
    false?Comment(base)
    :<Comment date={src.date} text={src.text} author={src.author}/>,
    document.getElementById('root')
  );
}
