/**
 * @jsx React.DOM
 */
'use strict';

React.initializeTouchEvents(true);

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

var Menu = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
    componentDidMount: function() {
        this.setInterval(this.tick, 0); // Call a method on the mixin
    },
    getInitialState: function(){
      return {
          overflow:true,
          scrollPosition:{
              0:0,1:0
          }
      }
    },
    tick: function() {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var menuTop = document.getElementById("menu").style.position;
        var width=document.body.clientWidth;

        this.setProps({scrollTop: scrollTop, menuTop:menuTop, width: width});
    },
    toggleNavClick: function () {
        if(this.state.overflow){
            // lock scroll position, but retain settings for later
            var scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
            ];
            var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
            html.data('scroll-position', scrollPosition);
            html.data('previous-overflow', html.css('overflow'));
            html.css('overflow', 'hidden');
            this.setState({
                overflow:false,
                scrollPosition:{
                    0:window.document.body.scrollTop,
                    1:0
                }
            });

            var slider=$("#slider");
            slider.css("display","block");
            slider.css("backgroundColor","#e0e0e0");
            slider.css("height","0px");
            slider.css("width","0px");
            slider.css("position","fixed");
            slider.css("left","0");
            slider.css("top","40px");
            slider.css("zIndex","999");
            slider.animate({
                height: (window.innerHeight-75)+"px",
                width: window.outerWidth/2+"px"
            }, 200, function(){
                // suksess
            });



        } else {
            // un-lock scroll position
            var html = jQuery('html');
            var scrollPosition = html.data('scroll-position');
            html.css('overflow', html.data('previous-overflow'));
            window.scrollTo(this.state.scrollPosition[1], this.state.scrollPosition[0])
            this.setState({
                overflow:true,
                scrollPosition:{
                    0:window.document.body.scrollTop,
                    1:0
                }
            });
            var slider=$("#slider");
            slider.animate({
                height: "0px",
                width: "0px"
            }, 200, function(){
                // suksess
                $("#slider").css("zIndex","0");

            });
        }


    },

    render: function () {
        var width = ((document.getElementById("App").clientWidth) / 3) - 2;
        var reducify=200;
        var padding=31;
        var opacity = this.props.scrollTop/reducify <= 1.0 ? this.props.scrollTop/reducify > 0.0 ? this.props.scrollTop/reducify : 0.0 : 1.0;


        $(".mainRow").css("paddingTop",padding+'px');
        var divStyle= {
            display: 'block',
            position: 'fixed',
            top: '0px',
            width: document.getElementById("App").clientWidth+"px",
            background: 'white',
            zIndex:'9999999'
        };

        var liStyle = {
            float: 'left',
            width: width+"px",
            padding: '15px 5px',
            borderTop: '0',
            height:'40px',
            borderBottom: '1px solid black'
        };

        var ulStyle = {
            display: 'block',
            height: '30px',
            marginBottom: '10px',
            listStyle: 'none outside none',
            margin: '0px',
            padding: '0px',
            textAlign: 'center'
        };


        var navOpen='hmm';

        if(this.state.overflow)
            navOpen='yes';
        else
            navOpen='no';
        return <section style={divStyle} id="menu">
            <div>
                <ul style={ulStyle}>
                    <li style={liStyle} className="hidden-lg">
                        <div onClick={this.toggleNavClick} className="Layout-hamburger fa fa-bars" />
                    </li>
                    <li className="hidden-xs hidden-sm" style={liStyle}>
                        <div onTouchStart={this.toggleNavClick}  className="Layout-hamburger2 fa fa-bars" />
                    </li>
                    <li style={liStyle}><div>{navOpen}</div>
                    </li>
                    <li className="hidden-lg" style={liStyle}>{Math.round(this.props.scrollTop*1.2)}
                    </li>
                </ul>
            </div>
        </section>;

    }
});
module.exports = Menu;
