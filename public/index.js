(function (React,ReactDOM) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
ReactDOM = ReactDOM && 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

//# sourceMappingURL=hello.js.map

//# sourceMappingURL=clock.js.map

//# sourceMappingURL=props.js.map

function trace(top, props) {
    console.log(top + ': props=' + JSON.stringify(props, null, 1));
}
function formatDate(date) {
    return date.toLocaleTimeString();
}
function DatedText(props) {
    trace('DatedText', props);
    return (React.createElement("div", null,
        React.createElement("div", null,
            "Great! ",
            props.text),
        React.createElement("div", null, formatDate(props.date))));
}
function Avatar(props) {
    trace('Avatar', props);
    return (React.createElement("img", { src: props.user.avatarUrl, alt: props.user.name }));
}
function UserInfo(props) {
    trace('UserInfo', props);
    return (React.createElement("div", null,
        React.createElement(Avatar, { user: props.user }),
        React.createElement("div", null, props.user.name)));
}
function Comment(props) {
    trace('Comment', props);
    const author = props.author;
    return React.createElement("div", null,
        React.createElement(UserInfo, { user: author }),
        React.createElement(DatedText, { text: props.text, date: props.date }));
}
function extract() {
    const base = {
        date: new Date(),
        text: 'Event and data binding with no events and no binding!',
        author: {
            name: 'Facets:',
            avatarUrl: 'http://superficial.sourceforge.net/Facets.jpg',
        },
    }, src = Object.assign({}, base, {
        text: base.text.replace('!', ' - just the data!'),
    });
    ReactDOM.render(React.createElement(Comment, { date: src.date, text: src.text, author: src.author }), document.getElementById('root'));
}

//# sourceMappingURL=_exports.js.map

extract();
//# sourceMappingURL=main.js.map

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
