/** @jsx React.DOM */

var React = require('react');

var Layout = require('../components/layout.jsx');
var HomePage = require('./homepage.jsx');

//
//var isIPhone5 = require('../environment/isIPhone5');
//
//var IS_IPHONE_5 = isIPhone5();
var Message = require('../components/message.jsx');

var RootPage = React.createClass({
    getInitialState: function() {
        return {force: true};
    },

    handleClick: function() {
        //this.setState({force: false});
    },


    render: function() {
        // if (!IS_IPHONE_5 && !this.state.force) {
        //   return (
        //     <Message>
        //
        //     </Message>
        //   );

        var routeName = this.props.routeName;

        if (routeName === '' || routeName === 'home') {
            //return (<Layout><HomePage /></Layout>);
            return (<HomePage />);
        //} else if (routeName === 'glass') {
        //    return <Layout><GlassPage /></Layout>;
        //} else if (routeName === 'innenriks') {
        //    return <Layout><InnenriksPage /></Layout>;
        //} else if (routeName === 'utenriks') {
        //    return <Layout><UtenriksPage /></Layout>;
        //} else if (routeName === 'sport') {
        //    return <Layout><SportPage /></Layout>;
        } else {
            return <h1>Route {routeName} not found</h1>;
        }
    }
});

module.exports = RootPage;