(function (React,Dom) {
'use strict';

React = React && 'default' in React ? React['default'] : React;
Dom = Dom && 'default' in Dom ? Dom['default'] : Dom;

var Welcome = (function (_super) {
  var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
    __extends(Welcome, _super);
    function Welcome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Welcome.prototype.render = function () {
        var top = document.title + ' : : ';
        return (React.createElement("div", { className: "app" },
            React.createElement("div", { className: "app-header" },
                React.createElement("h2", null, "Welcome to react-rollup")),
            React.createElement("p", { className: "app-intro" },
                "Edited ",
                React.createElement("code", null, (document.title = top + this.constructor.name).replace(top, '')),
                ", perhaps for the last time?")));
    };
    return Welcome;
}(React.Component));

// import {errorTest} from './util/Bits';
// import {tellTheTime} from './util/Time';
// errorTest();
// tellTheTime();
document.getElementById('pageTitle').innerText = document.title;
Dom.render(React.createElement(Welcome, null), document.getElementById('app'));

}(React,ReactDOM));
//# sourceMappingURL=index.js.map
