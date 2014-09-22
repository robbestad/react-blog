/** @jsx React.DOM */

'use strict';

var React = require('react');
window.React = React;

var MyComponent = require('./components/mycomponent.jsx');
var FastSin = require('./components/fastsin.jsx');
var Background = require('./components/background.jsx');

React.renderComponent(<MyComponent />, document.getElementById('content'));
/*React.renderComponent(<FastSin />, document.getElementById('fastsin'));*/
React.renderComponent(<Background />, document.getElementById('background'));
