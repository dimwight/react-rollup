import React from 'react';
import ReactDOM from 'react-dom';

function GreetUser(props){
  return <h1>Welcome back!</h1>;
}
function GreetGuest(props){
  return <h1>Please sign up!</h1>;
}
function FarewellUser(props){
  return <h1>Come back soon!</h1>;
}
function Greeting(props){
  const isLoggedIn=props.isLoggedIn;
  if(isLoggedIn){
    return <GreetUser/>;
  }
  return <FarewellUser/>;
}

function LoginButton(props){
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props){
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
interface Logged{
  isLoggedIn
}
class LoginControl extends React.Component<null,Logged>{
  constructor(props){
    super(props);
    this.state={isLoggedIn:false};
  }
  loginClicked=()=>{
    this.setState({isLoggedIn:true});
  };
  logoutClicked=()=>{
    this.setState({isLoggedIn:false});
  };
  render(){
    const isLoggedIn=this.state.isLoggedIn;
    let button=null;
    if(isLoggedIn){
      button=<LogoutButton onClick={this.logoutClicked}/>;
    }else{
      button=<LoginButton onClick={this.loginClicked}/>;
    }
    return (
      <div>
        {button}
        <Greeting isLoggedIn={isLoggedIn}/>
      </div>
    );
  }
}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      {unreadMessages.length > 0?
      <h2>You have {unreadMessages.length} unread messages.</h2>
        :<h2>You have no unread messages.</h2>
      }
    </div>
  );
}
export function ifs(){
  if(false)ReactDOM.render(
    <div>
      <p><Greeting isLoggedIn={false}/></p>
      <p><Greeting isLoggedIn={true}/></p>
      <p><LoginControl/></p>
    </div>,
    document.getElementById('root'));
  else{
    const messages = ['React', 'Re: React', 'Re:Re: React'];
    ReactDOM.render(
      <div>
        <p><Mailbox unreadMessages={messages.slice(0,0)}/></p>
        <p><Mailbox unreadMessages={messages}/></p>
      </div>,
      document.getElementById('root')
    );  }

}
