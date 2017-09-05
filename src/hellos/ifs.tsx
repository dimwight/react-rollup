import React from 'react';
import ReactDOM from 'react-dom';

function GreetUser(props){
  return <h1>Welcome back!</h1>;
}
function GreetGuest(props){
  return <h1>Please sign up!</h1>;
}
function Greeting(props){
  const isLoggedIn=props.isLoggedIn;
  if(isLoggedIn){
    return <GreetUser/>;
  }
  return <GreetGuest/>;
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

export function ifs(){
  ReactDOM.render(
    <div>
      <p><Greeting isLoggedIn={false}/></p>
      <p><Greeting isLoggedIn={true}/></p>
      <p><LoginControl/></p>
    </div>,
    document.getElementById('root'));
}