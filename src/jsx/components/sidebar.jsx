/**
 * @jsx React.DOM
 */

(function(){
    'use strict';
})();

var React = require('react'),
    Sidebar = React.createClass({
    getInitialState: function(){
      return { windowHeight:window.outerHeight };
    },
    componentDidUpdate: function(){
      this.setState({windowHeight:window.outerHeight})
    },
    render: function() {
        var windowHeight = 'undefined' !== this.state.windowHeight ?
            this.state.windowHeight : window.outerHeight;
        var sidebarStyle = {
          background: 'none repeat scroll 0% 0% #D6EDFF',
          height:'100%'
    }
    return (
       <div ref="sidebar" style={sidebarStyle}>

       </div>
      )
    }
});

module.exports = Sidebar;
