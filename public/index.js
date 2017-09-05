(function (React,ReactDOM) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

//# sourceMappingURL=hello.js.map

//# sourceMappingURL=clock.js.map

//# sourceMappingURL=props.js.map

//# sourceMappingURL=extract.js.map

//# sourceMappingURL=events.js.map

function UserGreeting(props) {
    return React.createElement("h1", null, "Welcome back!");
}
function GuestGreeting(props) {
    return React.createElement("h1", null, "Please sign up!");
}
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return React.createElement(UserGreeting, null);
    }
    return React.createElement(GuestGreeting, null);
}
function ifs() {
    ReactDOM.render(React.createElement("div", null,
        React.createElement("p", null,
            React.createElement(Greeting, { isLoggedIn: false })),
        React.createElement("p", null,
            React.createElement(Greeting, { isLoggedIn: true }))), document.getElementById('root'));
}

//# sourceMappingURL=_exports.js.map

ifs();
//# sourceMappingURL=main.js.map

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
