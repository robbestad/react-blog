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
        this.setInterval(this.tick, 1000); // Call a method on the mixin
        this.fetchBlogData();
    },
    getInitialState: function(){
        this.addResizeAttach();
        return {
          overflow:true,
          scrollPosition:{
              0:0,1:0
          },
          width: window.innerWidth,
          height: window.innerHeight,
            sliderVisible:false
        }
    },
    getInitialProps: function(){
      return {
          blogData: []
      }
    },
    tick: function() {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var menuTop = document.getElementById("menu").style.position;
        var width=document.body.clientWidth;
        this.setProps({scrollTop: scrollTop, menuTop:menuTop, width: width, blogData: this.props.blogData});
        if(undefined === this.props.blogData) {
            this.fetchBlogData();
        }

    },
    onResize: function(){
            this.setState({
                overflow:this.state.overflow,
                scrollPosition:{
                    0:this.state.scrollPosition[0],
                    1:this.state.scrollPosition[1]
                },
                sliderVisible: this.state.sliderVisible,
                width: window.innerWidth,
                height:window.innerHeight
            });
    },
    addResizeAttach: function() {
        if(window.attachEvent) {
            window.attachEvent('onresize', this.onResize);
        }
        else if(window.addEventListener) {
            window.addEventListener('resize', this.onResize, true);
        }
        else {
            //The browser does not support Javascript event binding
        }
    },
    removeAttachmentResize: function() {
        if(window.detachEvent) {
            window.detachEvent('onresize', this.onResize);
        }
        else if(window.removeEventListener) {
            window.removeEventListener('resize', this.onResize);
        }
        else {
            //The browser does not support Javascript event binding
        }
    },

    fetchBlogData: function(){
        var react = this;
        $.ajax({
            url: "http://api.robbestad.com/robbestad",
            crossDomain:true,
            dataType: "json",
            success:function(data,text,xhqr){
                $.each(data, function(i, item) {
                    if("object" === typeof item["robbestad"] ){
                        react.setProps({ blogData: item["robbestad"]});
                    }
                });
            }
        });

    },
    getBlogTitles:function(){
        var results;
        if(undefined !== this.props.blogData){
            results = this.props.blogData;
            var items='';
            for(var i=0; i < this.props.blogData.length; i++)
              items+= "<li key='" + i + "'><a href=\"/index.php?id="+this.props.blogData[i].id+"#nosplash\">" +
                          this.props.blogData[i].title +
                          "</a></li>" ;
            return items;
        } else {
            return 'Loading';
        }
    },
    toggleNavClick: function () {

        if(this.state.overflow){
            // lock scroll position, but retain settings for later
            var scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
            ];

            this.setState({
                overflow:false,
                scrollPosition:{
                    0:window.document.body.scrollTop,
                    1:0
                },
                sliderVisible: true,
                width: window.innerWidth,
                height:window.innerHeight
            });
            $("body").css("overflow","hidden");
            $(".container-fluid").css("overflow","hidden");
            var width = this.state.width <= 320 ? 320 : this.state.width/2;


            var slider=$("#slider");
            slider.css("display","block");
            slider.css("backgroundColor","#e0e0e0");
            slider.css("height","0px");
            slider.css("width","0px");
            slider.css("position","absolute");
            slider.css("left","0");
            slider.css("overflow","auto");
            slider.css("top",(scrollPosition[1]+40)+"px");
            slider.css("zIndex","998");
            slider.animate({
                height: (this.state.height-75)+"px",
                width: width+"px"
            }, 100, function(){
                // suksess
            });




        } else {
            // un-lock scroll position
            var html = jQuery('html');
            var scrollPosition = html.data('scroll-position');
            html.css('overflow', html.data('previous-overflow'));
            $("body").css("overflow","visible");

            window.scrollTo(this.state.scrollPosition[1], this.state.scrollPosition[0])

            this.setState({
                overflow:true,
                scrollPosition:{
                    0:window.document.body.scrollTop,
                    1:0
                },
                sliderVisible: false,
                width: window.innerWidth,
                height:window.innerHeight
            });
            var slider=$("#slider");
            slider.animate({
                height: "0px",
                width: "0px"
            }, 100, function(){
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

        var slider=$("#slider");
        if(this.state.sliderVisible){
            slider.css("height",(this.state.height - 75) + "px");
            slider.html("<ul class='slider'>" +
            this.getBlogTitles() +
            "</ul>");
        }


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

        var liFontStyle = {
            fontFamily: 'Lobster, Open Sans',
            fontSize:'2rem',
            float: 'left',
            width: width+"px",
            padding: '5px 5px',
            borderTop: '0',
            height:'40px',
            borderBottom: '1px solid black'
        }


        return <section style={divStyle} id="menu">
            <div>
                <ul style={ulStyle}>
                    <li style={liStyle} className="hidden-lg">
                        <div onClick={this.toggleNavClick}  onTouchEnd={this.toggleNavClick} className="Layout-hamburger fa fa-bars" />
                    </li>
                    <li style={liFontStyle}><div>Robbestad.com</div>
                    </li>
                    <li style={liFontStyle}><a href="/index.php?content=about#nosplash">About</a>
                    </li>
                </ul>
            </div>
        </section>;

    }
});
module.exports = Menu;
