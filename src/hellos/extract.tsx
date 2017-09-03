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
      props.full?text
        :text.replace('Event and data binding with no events and no binding - j','J')
    }</div>
  )
}
function formatDate(date){
  return date.toLocaleTimeString();
}
function Dated(props){
  trace('Dated',props);
  return <div>{formatDate(props.date)}</div>
}
function Comment(props){
  trace('Comment',props);
  return (
    <div>
      <div>Commented: &lsquo;{props.text}&rsquo;</div>
      <div>{formatDate(props.date)}</div>
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
  if(props.all)props=props.all;
  const author:UserLike=props.author,comment:CommentLike=props.comment,
    text=comment.text,date=comment.date;
  return author.name==='Facets'?(
    <div>
      <User user={author}/>
      <Comment text={text} date={date}/>
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
  const items=props.items as [AuthorCommentLike],
    above=items[0],below=items[1];
  return <div>
    <AuthorComment author={above.author} comment={above.comment}/>
    <p/>
    <AuthorComment all={below}/>
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
  author:UserLike
  comment:CommentLike
}
export function extract(){
  const url='http://superficial.sourceforge.net/Facets.jpg';
  const base:AuthorCommentLike={
    author:{
      name:'Facets',
      avatarUrl:url,
    },
    comment:{
      date:new Date(),
      text:'Event and data binding with no events and no binding!',
    }
  },
  tweaks:AuthorCommentLike={
    comment:{
      date:new Date(),
      text:base.comment.text.replace('!',' - just the data!')
    },
    author:{
      name:'Superficial',
    } as UserLike
  };
  ReactDOM.render(
    Comments({
      items:[base,tweaks]
    }),
    document.getElementById('root'),
  );
}
