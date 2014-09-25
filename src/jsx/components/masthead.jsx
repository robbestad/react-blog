/** @jsx React.DOM */

(function(){
    'use strict';
})();

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};
var React = require('react'),

  Masthead = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    componentDidMount: function() {
        this.setInterval(this.tick, 20); // Call a method on the mixin

    },
      getInitialState: function(){
          return {
            countdown:1.4
          }
      },
    tick: function() {
        var scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset : (document.documentElement
            || document.body.parentNode || document.body).scrollTop,
            width=document.body.clientWidth;

        if(this.state.countdown>=0){
            this.setState({
                countdown: this.state.countdown-0.005
            });
        }

        var dontShowVal;
        if($(".container-fluid").innerHeight()<document.body.clientHeight){
            dontShowVal=true;
        }
        else
        if(this.refs.masthead.getDOMNode().style.opacity <= 0
            && scrollTop > 0){
            dontShowVal=true;
        } else if(window.location.hash==="#nosplash"){
            dontShowVal=true;
        } else if(window.innerWidth<768){
            dontShowVal=true;
        }
        else dontShowVal = this.props.dontShow;

        this.setProps({scrollTop: -scrollTop, logoTop:scrollTop/1.75,
            width: width, dontShow:dontShowVal});

    },
    render: function() {
        var reducify=40;
        var modifier = Math.abs(this.props.scrollTop/reducify);
        var opacity = 1-modifier > 0 ? 1-(modifier) : 0;
        opacity = this.props.scrollTop > 0 ? 1 : opacity;
        if(this.props.dontShow === true){
            opacity=0;
        }
        var z = opacity > 0.05 ? 90 : -1;

        opacity=(opacity-(1-this.state.countdown));
        var divStyle= {
            position: 'fixed',
            //top: this.props.scrollTop,
            left: '0',
            top: '0',
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'url(img/bg.png) repeat 50% 50%',
            backgroundSize:'cover',
            fontFamily:'Arial, Verdana, sans-serif',
            transform: 'translateZ(0) scale(1)',
            zIndex: z,
            opacity: opacity,
            textAlign: 'center'
        }
        var logoStyle = {
            top: ((window.innerHeight/2)-100)+"px",
            color: 'white',
            fontSize: '7rem',
            left: (window.innerWidth/2)-(567/2)+"px",
            position: 'fixed'
        }
      return (<div ref="masthead" style={divStyle}>
        <div className="animated zoomIn" style={logoStyle}><img src="img/robcom.png" /></div>
        </div>)
    }
});

module.exports = Masthead;
