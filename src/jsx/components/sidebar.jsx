/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Sidebar = React.createClass({
        render: function() {
            var style;
            if(!this.props.visible){
                style={
                    display:'none',
                    visibility:'hidden',
                    height:0,
                    width:0
                }
            } else {
                style={
                    display:'block',
                    visibility:'visible',
                    marginTop:'40px',
                    position:'absolute',
                    left:0,
                    width:this.props.width <= 768 ? this.props.width : this.props.width/2+"px",
                    //height:(this.props.height-75)+"px",
                    height:'100%',
                    zIndex:'998'
                }
            }
            var bg={
                backgroundColor:'#e0e0e0'
            };
            if(window.innerWidth>=768){
                style={
                    display:'none',
                    visibility:'hidden',
                    height:0,
                    width:0
                }
            }
            return (
                <div style={style} className="responsiveSlide">
                    <ul className="slider" style={bg} dangerouslySetInnerHTML={{__html: this.props.blogTitles}} />
                </div>
            )
        }
    });

module.exports = Sidebar;
