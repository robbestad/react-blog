/**
 * @jsx React.DOM
 */
(function () {
    'use strict';
})();

var ReactTouch = require('react-touch');
var RoutedLink = require('react-touch/lib/routing/RoutedLink');
var LeftNavContainer = require('react-touch/lib/interactions/leftnav/LeftNavContainer');
var SIDEBAR_WIDTH = 242;
var TOPBAR_HEIGHT = 51; // + 1 for the border
var Header = require('./Header.jsx');

var Layout = React.createClass({
    handleNavClick: function () {
        this.refs['leftNavContainer'].closeNav();
    },
    toggleNavClick: function () {
        this.refs['leftNavContainer']._handleTap();
    },

    render: function () {
        var button = (
            <div onClick={this.toggleNavClick} className="Layout-hamburger fa fa-bars" />
        );

        var topContent = (
            <Header className="Layout-topBar">Robbestad.com</Header>
        );
        var sideContent = (
            <div className="Layout-nav">
                <a href="na.php#" className="Layout-navLink" onClick={this.handleNavClick}>Første lenke</a>
            </div>
        );
        return (
            <div className="hidden-md hidden-sm hidden-lg">
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

});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT; // account for border

module.exports = Layout;
