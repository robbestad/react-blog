/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactTouch = require('react-touch');

window.React = React;

var MyComponent = require('./components/mycomponent.jsx');
var FastSin = require('./components/fastsin.jsx');
var Background = require('./components/background.jsx');
var Masthead = require('./components/masthead.jsx');
var BlogData = require('./components/blogdata.jsx');
var Footer = require('./components/footer.jsx');
var Sidebar = require('./components/sidebar.jsx');
var Layout = require('./components/layout.jsx');

React.renderComponent(<MyComponent />, document.getElementById('content'));
/*React.renderComponent(<FastSin />, document.getElementById('fastsin'));*/
/*React.renderComponent(<Background />, document.getElementById('background'));*/
React.renderComponent(<Masthead myTitle="Robbestad.com" />, document.getElementById('masthead'));
//React.renderComponent(<BlogData />, document.getElementById('blogdata'));
React.renderComponent(<Footer />, document.getElementById('myfooter'));
React.renderComponent(<Layout />, document.getElementById('layout'));
//React.renderComponent(<Sidebar />, document.getElementById('sidebar'));
