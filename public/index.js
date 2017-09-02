(function (React,ReactDOM) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

const user = {
    first: 'Wilma',
    last: 'Flintstone',
};
function formatName(user) {
    if (typeof user == 'string')
        return user;
    return user.firstName + ' ' + user.lastName;
}
const name = (React.createElement("p", null,
    "Hello, ",
    formatName(user),
    "!"));

//# sourceMappingURL=hello.js.map

//# sourceMappingURL=clock.js.map

function render$2() {
    function Welcome(props) {
        return React.createElement("h1", null,
            "Hello, ",
            props.name);
    }
    const element = React.createElement(Welcome, { name: "Sara" });
    ReactDOM.render(element, document.getElementById('root'));
}
//# sourceMappingURL=props.js.map

render$2();

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
