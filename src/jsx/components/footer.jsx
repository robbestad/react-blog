/**
 * @jsx React.DOM
 */
(function(){
    'use strict';
})();

var React = require('react'),
    Footer = React.createClass({
    getInitialState: function(){
      return { windowHeight:$("#blogdata").height()};
    },
    componentDidUpdate: function(){
      this.setState({windowHeight:$("#blogdata").height()})
    },
    render: function() {
        var windowHeight = 'undefined' !== this.state.windowHeight ?
            this.state.windowHeight : $("#blogdata").height();
        var footerStyle = {
            position:'fixed',
            bottom:'0px',
            backgroundColor:'#f5f5f5',
            width:'100%',
            height:'35px',
            fontSize:'1.3rem',
            textAlign:'center',
            padding:'15px 10px 0 20px',
            marginTop:'35px',
            borderRadius: '5px',
            borderTop: '1px solid #a5a5a5',
            zIndex:'999',
            marginLeft:'-15px'
    }
    return (
       <div ref="footer" style={footerStyle}>&copy;
       Sven Anders Robbestad - 2014 -&nbsp;
       <a href="https://github.com/svenanders/react-fullscreen">Github</a></div>
      )
    }
});

module.exports = Footer;
