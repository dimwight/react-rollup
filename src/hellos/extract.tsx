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
  const name=props.user.name,url=props.user.avatarUrl;
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
  const author=props.author,comment=props.comment,
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
function Frame(props){
  trace('Frame',props);
  return <div>
    <AuthorComment all={props.above}/>
    <p/>
    <AuthorComment author={props.below.author} comment={props.below.comment}/>
  </div>
}
type NameLike='Facets'|'Superficial'
interface AuthorLike{
  name:NameLike,
  avatarUrl?:string
}
interface CommentLike{
  date:Date
  text:string
}
interface AuthorCommentLike{
  author:AuthorLike
  comment:CommentLike
}
export function extract(){
  const url='http://superficial.sourceforge.net/Facets.jpg';
  const base:AuthorCommentLike={
    author:{
      name:'Facets',
    },
    comment:{
      date:new Date(),
      text:'Event and data binding with no events and no binding!',
    }
  },
  tweak:AuthorCommentLike={
    comment:{
      date:new Date(),
      text:base.comment.text.replace('!',' - just the data!')
    },
    author:{
      name:'Superficial',
      avatarUrl:url,
    } as AuthorLike
  };
  ReactDOM.render(
    Frame({
      above:tweak,
      below:base
    }),
    document.getElementById('root'),
  );
}
