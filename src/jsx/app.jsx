/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactTouch = require('react-touch');

window.React = React;

var MyComponent = require('./components/mycomponent.jsx');
var Masthead = require('./components/masthead.jsx');
var Footer = require('./components/footer.jsx');
var Menu = require('./components/menu.jsx');

React.renderComponent(<MyComponent />, document.getElementById('content'));
React.renderComponent(<Masthead myTitle="Robbestad.com" />, document.getElementById('masthead'));
React.renderComponent(<Footer />, document.getElementById('myfooter'));
React.renderComponent(<Menu />, document.getElementById('menu'));
//React.renderComponent(<Layout />, document.getElementById('layout'));
