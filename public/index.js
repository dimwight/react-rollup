(function (React,ReactDOM) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

function tick() {
    const element = (React.createElement("div", null,
        React.createElement("h2", null,
            "Time now is ",
            new Date().toLocaleTimeString())));
    ReactDOM.render(element, document.getElementById('root'));
}
function start() {
    setInterval(tick, 2000);
}

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
start();
//# sourceMappingURL=main.js.map

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
