/**
 * @jsx React.DOM
 */
(function(){
    'use strict';
})();
var ReactTouch = require('react-touch');
//var FPSCounter = require('react-touch/lib/environment/FPSCounter');
var RoutedLink = require('react-touch/lib/routing/RoutedLink');

var RootPage = require('../pages/RootPage.jsx');
var Message = require('../components/message.jsx');

//FPSCounter.start();
ReactTouch.start(RootPage, document.getElementById('react-root'), {
    '/home': 'home',
    '/glass': 'news',
    '/innenriks' : 'innenriks',
    '/utenriks' : 'utenriks',
    '/sport' : 'sport',
    '/': 'home'
});


var LeftNavContainer = require('react-touch/lib/interactions/leftnav/LeftNavContainer');
var SIDEBAR_WIDTH = 242;
var TOPBAR_HEIGHT = 51; // + 1 for the border
var Header = require('./Header.jsx');

var Layout = React.createClass({
    handleNavClick: function() {
        //console.log('closing LeftNavContainer');
        this.refs['leftNavContainer'].closeNav();
    },

    render: function() {
        var button = (
            <div className="Layout-hamburger fa fa-bars" />
        );

        var topContent = (
            <Header className="Layout-topBar">Robbestad.com</Header>
        );
        var sideContent = (
            <div className="Layout-nav">
                <RoutedLink href="/home" className="Layout-navLink" onClick={this.handleNavClick}>Hjem</RoutedLink>
                <RoutedLink href="/innenriks" className="Layout-navLink" onClick={this.handleNavClick}>Innenriks</RoutedLink>
                <RoutedLink href="/utenriks" className="Layout-navLink" onClick={this.handleNavClick}>Utenriks</RoutedLink>
                <RoutedLink href="/sport" className="Layout-navLink" onClick={this.handleNavClick}>Sport</RoutedLink>
            </div>
        );
        return (
            <div className="1hidden-md 1hidden-sm hidden-lg">
                <LeftNavContainer
                ref="leftNavContainer"
                button={button}
                topContent={topContent}
                sideContent={sideContent}

                topHeight={TOPBAR_HEIGHT}
                sideWidth={SIDEBAR_WIDTH}>
                    <div className="Layout-content">
                    {this.props.children}
                    </div>
                </LeftNavContainer>
             </div>
        )
        }
    /*
    return this.transferPropsTo(
            <App>
                <LeftNavContainer
                ref="leftNavContainer"
                button={button}
                topContent={topContent}
                sideContent={sideContent}
                topHeight={TOPBAR_HEIGHT}
                sideWidth={SIDEBAR_WIDTH}>
                    <div className="Layout-content">
            {this.props.children}
                    </div>
                </LeftNavContainer>
            </App>
        );
    }
    */
});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT; // account for border

module.exports = Layout;
