(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{289:function(t,e,n){"use strict";n.r(e);var a=n(295);function r(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i={data:function(){return{svg:null,channelData:[],tooltip:null,channelName:"ひなたチャンネル (Hinata Channel)",userName:"猫宮ひなた",subscriberCount:"460,000"}},computed:{},mounted:function(){var n=this;a.c("data.json").then(function(t){var e;(e=n.channelData).push.apply(e,r(t)),n.createChart()}),window.addEventListener("resize",this.handleResize)},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.svg&&this.svg.remove(),this.createChart()},createChart:function(){var t=document.body.offsetWidth,e=document.body.offsetHeight;this.tooltip=a.e(".tooltip"),this.svg=a.e("#chart").append("svg").attr("width","100%").attr("height","100%"),this.svg.append("defs").selectAll(".flag").data(this.channelData).enter().append("pattern").attr("id",function(t){return t.id}).attr("width","100%").attr("height","100%").attr("patternContentUnits","objectBoundingBox").append("image").attr("width",1).attr("height",1).attr("preserveAspectRatio","xMidYMid slice").attr("xlink:href",function(t){return t.thumbnail});var n=a.d().size([t-2,e-2]).padding(3)(a.b({children:this.channelData}).sum(function(t){return t.subscriberCount}));this.svg.selectAll("g").data(n.leaves()).join("g").attr("transform",function(t){return"translate(".concat(t.x+1,",").concat(t.y+1,")")}).on("mouseover",this.handleMouseOver).on("mouseout",this.handleMouseOut).append("circle").attr("r",function(t){return t.r}).attr("fill",function(t){return"url(#".concat(t.data.id,")")}).style("cursor","pointer")},handleMouseOver:function(t){this.channelName=t.data.title,this.subscriberCount=a.a(",")(t.data.subscriberCount);var e=t.y-t.r-80;e<=5&&(e=t.y+t.r+3);var n=Math.min(Math.max(t.x-115,5),document.body.offsetWidth-230-5);this.tooltip.transition().duration(200).style("opacity",1),this.tooltip.style("transform","translate(".concat(n,"px, ").concat(e,"px)"))},handleMouseOut:function(t){this.tooltip.transition().duration(500).style("opacity",0)}}},s=(n(293),n(292)),o={components:{Chart:Object(s.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"chart",attrs:{id:"chart"}},[n("div",{staticClass:"tooltip"},[n("div",{staticClass:"channel-name"},[t._v(t._s(t.channelName))]),t._v(" "),n("div",{staticClass:"tooltip__rule"}),t._v(" "),n("div",{staticClass:"subscriber-count"},[t._v(t._s(t.subscriberCount))])])])},[],!1,null,"5e8d22fb",null).exports},data:function(){return{updateTime:"2019/02/13"}},computed:{},created:function(){},methods:{}},c=(n(294),Object(s.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app"},[n("chart"),t._v(" "),n("div",{staticClass:"update-time"},[t._v(t._s("> "+t.updateTime))])],1)},[],!1,null,"557a2256",null));e.default=c.exports},290:function(t,e,n){},291:function(t,e,n){},293:function(t,e,n){"use strict";var a=n(290);n.n(a).a},294:function(t,e,n){"use strict";var a=n(291);n.n(a).a}}]);