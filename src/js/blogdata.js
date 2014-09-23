(function(){
    'use strict';
})();

WebFontConfig = {
    google: {
        families: ['Lobster','Open Sans']
    }
};

//text: 'Robestad.com'

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

var displayBlogId=function(){
    var hash = window.location.hash;
    document.getElementById(hash).style;
    //$("."+hash).css("display","block");
}




/*
var blogData=[];
(function(){
$.ajax({
  url: "http://api.robbestad.com/robbestad",
  crossDomain:true,
  dataType: "json",
  }).then(function (data) {
      $.each(data, function(i, item) {
        if("object" === typeof item["robbestad"] ){
          blogData.push(item["robbestad"]);
        }
      }

  }, function (error) {
});
});

*/
//$.getJSON( "http://api.robbestad.com/robbestad", function( data ) {
//var items = [];
//$.each( data, function( key, val ) {
//  if("object" === typeof val["robbestad"] ){
//    for(var i=0; i < val["robbestad"].length; i++)
//      items.push( "<div id='" + key + "'>" + val["robbestad"][i].title + "<br/>" + val["robbestad"][i].content + "</div>" );
//  }
//});
//$( "<ul/>", {
//"class": "my-new-list",
//html: items.join( "" )
//}).appendTo( "#blogdata" );
//});


