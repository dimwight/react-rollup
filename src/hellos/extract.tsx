import React from 'react';
import ReactDOM from 'react-dom';

function trace(top,thing){
  console.log((true?(top+': '):"")+JSON.stringify(thing,null,1))
}
function Text(props){
  trace('Text',props);
  const text=props.text;
  return(
    <div>{
      props.full?text
        :text.replace('Event and data binding with no events and no binding - j','J')
    }</div>
  )
}
function formatDate(date){
  return date.toLocaleTimeString();
}
function Dated(props){
  trace('ClockState',props);
  return <div>{formatDate(props.time)}</div>
}


function Comment(props){
  trace('Comment',props);
  const comment=props.comment;
  return (
    <div>
      <div>Commented: &lsquo;{comment.text}&rsquo;</div>
      <div>{formatDate(comment.date)}</div>
    </div>
  )
}
function Image(props){
  trace('Image',props);
  const alt=props.alt;
  return <img src={props.src} alt={alt} title={alt}/>;
}
function User(props){
  trace('User',props);
  const user:UserLike=props.user;
  const name:NameLike=user.name,url=user.avatarUrl;
  return url?(
    <div>
      <Image src={url} alt={name}/>

      <div>{name}</div>
    </div>
  ):<div>{name} [No image]</div>;
}
function AuthorComment(props){
  trace('AuthorComment',props);
  if(props.authorComment)props=props.authorComment;
  const author:UserLike=props.author,comment:CommentLike=props.comment,
    text=comment.text,date=comment.date;
  return author.name==='Facets'?(
    <div>
      <User user={author as UserLike}/>
      <Comment comment={comment}/>
    </div>
  ):(
    <div>
      <User user={author}/>
      <Text text={text} full={false}/>
      <Dated date={date}/>
    </div>
  );
}
function Comments(props){
  trace('Comments',props);
  const items=props.comments as [AuthorCommentLike],
    first=items[0],second=items[1];
  return <div>
    <AuthorComment author={first.author} comment={first.comment}/>
    <AuthorComment authorComment={second}/>
    <p/>
  </div>
}
type NameLike='Facets'|'Superficial'
interface UserLike{
  name:NameLike,
  avatarUrl?:string
}
interface CommentLike{
  date:Date
  text:string
}
interface AuthorCommentLike{
  type?:'AuthorComment'
  author:UserLike
  comment:CommentLike
}
export function extract(){
  const url='http://superficial.sourceforge.net/Facets.jpg';
  const full:AuthorCommentLike={
    type:'AuthorComment',
    author:{
      name:'Facets',
      avatarUrl:url,
    },
    comment:{
      date:new Date(),
      text:'Event and data binding with no events and no binding!',
    }
  },
  bare:AuthorCommentLike={
    comment:{
      date:new Date(),
      text:full.comment.text.replace('!',' - just the data!')
    },
    author:{
      name:'Superficial',
    }
  };
  ReactDOM.render(
    Comments({
      comments:[
        full,
        bare,
      ]
    }),
    document.getElementById('root'),
  );
}
