/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Search = React.createClass({

        _onKeyDown: function(event) {
            // If there are no visible elements, don't perform selector navigation.
            // Just pass this up to the upstream onKeydown handler
            console.log("on key down");
            if (!this.refs.sel) {
                return this.props.onKeyDown(event);
            }

            var handler = this.eventMap()[event.keyCode];

            if (handler) {
                handler(event);
            } else {
                return this.props.onKeyDown(event);
            }
            // Don't propagate the keystroke back to the DOM/browser
            return false;
        },
        _onTextEntryUpdated: function() {
            var value = this.refs.entry.getDOMNode().value;
            this.setState({visible: this.getOptionsForValue(value, this.state.options),
                selection: null,
                entryValue: value});
            return false;
        },


        render: function() {

            var searchStyle;
            if(!this.props.visible){
                searchStyle={
                    display:'none',
                    visibility:'hidden',
                    height:0,
                    width:0,
                    margin:0,
                    position:"auto"
                }
            } else {
                searchStyle={
                    display:'block',
                    visibility:'visible',
                    marginTop:'40px',
                    backgroundColor:'#e0e0e0',
                    //overflow:'scroll',
                    position:'absolute',
                    right:0,
                    width:this.props.width <= 768 ? this.props.width : this.props.width/2+"px",
                    //height:(this.props.height-75)+"px",
                    height:'100%',
                    zIndex:'998'

                }
            }

            if(window.innerWidth>=768){
                return (
                    <div />
                )
            } else {
                return (
                    <div style={searchStyle}>
                        <ul className="search">
                            <li className="searchItem">Search is under construction...:)</li>
                        </ul>
                    </div>
                )
            }
        }
    });

module.exports = Search;
