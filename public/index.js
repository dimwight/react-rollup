(function (React,Dom,fn) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
Dom = Dom && 'default' in Dom ? Dom['default'] : Dom;
fn = fn && 'default' in fn ? fn['default'] : fn;

function errorTest(msg) {
    let err = new Error('Hell!');
    console.log(`Created ${err} for ${msg}...`);
    console.log(`..but didn't throw it.`);
}

class Welcome extends React.Component {
    render() {
        errorTest();
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

{
    document.getElementById('pageTitle').innerText = document.title;
    Dom.render(React.createElement(Welcome, null), document.getElementById('app'));
}

}(React,ReactDOM,libDateFormat));
//# sourceMappingURL=index.js.map
