(function (React,Dom) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
Dom = Dom && 'default' in Dom ? Dom['default'] : Dom;

class Welcome extends React.Component {
    render() {
        const top = document.title + ' : : ';
        return (React.createElement("div", { className: "app" },
            React.createElement("div", { className: "app-header" },
                React.createElement("h2", null, "Welcome to react-rollup")),
            React.createElement("p", { className: "app-intro" },
                "Edited ",
                React.createElement("code", null, (document.title = top + this.constructor.name).replace(top, '')),
                ", perhaps for the last time?")));
    }
}

// import {errorTest} from './util/Bits';
// import {tellTheTime} from './util/Time';
// errorTest();
// tellTheTime();
document.getElementById('pageTitle').innerText = document.title;
Dom.render(React.createElement(Welcome, null), document.getElementById('app'));

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
