/** @jsx React.DOM */

(function(){
    'use strict';
})();

var React = require('react'),


Background = React.createClass({
    getInitialState: function () {
        return {
            opacity:1.0
        }
    },
   componentWillMount: function (props, state) {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onMouseMove);
   },
    onMouseMove: function (e) {
      if(this.state.opacity>0)
        this.setState({opacity:this.state.opacity-0.01})
    },
    render: function () {
        var myStyle= {
        width: window.outerWidth,
        height: window.outerHeight,
        position: 'absolute',
        backgroundColor:'#dd0',
        zIndex:'1',
        opacity:this.state.opacity
      }
      return (<div style={myStyle}></div>)
    }

});


module.exports = Background;
