(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{144:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),n=a(156),s=a(161),o=a(153);t.default=function(){return i.a.createElement(n.a,null,i.a.createElement(o.a,{title:"Home"}),i.a.createElement("div",{className:"summary"},i.a.createElement("p",null,"Failed philosopher. Former librarian. I like writing code. I write regular words as well."),i.a.createElement("p",null,"Author of ",i.a.createElement("a",{href:"https://pragprog.com/book/es6tips/simplifying-javascript"}," Simplifing JavaScript.")),i.a.createElement("p",null,"Blogging via ",i.a.createElement("a",{href:"https://medium.com/@jsmapr1"},"Medium")),i.a.createElement("p",null,"On twitter ",i.a.createElement("a",{href:"https://twitter.com/joesmorgan"},"@joesmorgan"),"."),i.a.createElement("div",{style:{width:300}},i.a.createElement(s.a,null))),i.a.createElement("div",null))}},149:function(e,t,a){"use strict";a.d(t,"b",function(){return d});var r=a(0),i=a.n(r),n=a(4),s=a.n(n),o=a(33),l=a.n(o);a.d(t,"a",function(){return l.a});a(150);var c=i.a.createContext({}),d=function(e){return i.a.createElement(c.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):i.a.createElement("div",null,"Loading (StaticQuery)")})};d.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},150:function(e,t,a){var r;e.exports=(r=a(152))&&r.default||r},151:function(e){e.exports={data:{site:{siteMetadata:{title:"Joe Morgan"}}}}},152:function(e,t,a){"use strict";a.r(t);a(34);var r=a(0),i=a.n(r),n=a(4),s=a.n(n),o=a(55),l=a(2),c=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return i.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};c.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=c},153:function(e,t,a){"use strict";var r=a(154),i=a(0),n=a.n(i),s=a(4),o=a.n(s),l=a(160),c=a.n(l),d=a(155),u=a.n(d);function A(e){var t=e.description,a=e.lang,i=e.meta,s=e.keywords,o=e.title,l=r.data.site,d=t||l.siteMetadata.description;return n.a.createElement(c.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+l.siteMetadata.title,link:[{rel:"shortcut icon",type:"image/png",href:""+u.a}],meta:[{name:"description",content:d},{property:"og:title",content:o},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:d}].concat(s.length>0?{name:"keywords",content:s.join(", ")}:[]).concat(i)})}A.defaultProps={lang:"en",meta:[],keywords:[],description:""},A.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.arrayOf(o.a.object),keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},t.a=A},154:function(e){e.exports={data:{site:{siteMetadata:{title:"Joe Morgan",description:"My Site",author:"@joesmorgan"}}}}},155:function(e,t,a){e.exports=a.p+"static/favicon-56ed36637400a63dccd2ae360f33b7b9.ico"},156:function(e,t,a){"use strict";var r=a(151),i=a(0),n=a.n(i),s=a(4),o=a.n(s),l=a(149),c=function(e){var t=e.siteTitle;return n.a.createElement("header",null,n.a.createElement("div",{className:"header"},n.a.createElement("h1",{style:{margin:0}},n.a.createElement(l.a,{to:"/",style:{textDecoration:"none"}},t))))};c.propTypes={siteTitle:o.a.string},c.defaultProps={siteTitle:""};var d=c,u=(a(157),!1);function A(){return Object(i.useEffect)(function(){console.log("here"),u=!1},[]),n.a.createElement("div",{className:"menu"},n.a.createElement(l.a,{className:"menu-item "+(u?"":"menu-splash"),to:"/speaking",style:{textDecoration:"none"}},"Speaking"),n.a.createElement(l.a,{className:"menu-item "+(u?"":"menu-splash"),to:"/writing",style:{textDecoration:"none"}},"Writing"))}a(158),a(159);var f=function(e){var t=e.children;return n.a.createElement(l.b,{query:"755544856",render:function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement(d,{siteTitle:e.site.siteMetadata.title}),n.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},n.a.createElement(A,null),n.a.createElement("svg",{className:"separator",viewBox:"0 0 700 1",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("line",{x1:"0",y1:"0",x2:"700",y2:"0",stroke:"black",strokeDasharray:"1 4"})),n.a.createElement("main",null,t),n.a.createElement("svg",{className:"separator",viewBox:"0 0 700 1",xmlns:"http://www.w3.org/2000/svg"},n.a.createElement("line",{x1:"0",y1:"0",x2:"700",y2:"0",stroke:"black",strokeDasharray:"1 4"})),n.a.createElement("footer",null,"© ",(new Date).getFullYear()," ")))},data:r})};f.propTypes={children:o.a.node.isRequired};t.a=f},161:function(e,t,a){"use strict";var r=a(162),i=a(0),n=a.n(i),s=a(149),o=a(163),l=a.n(o);t.a=function(){return n.a.createElement(s.b,{query:"3557118216",render:function(e){return n.a.createElement(l.a,{fluid:e.placeholderImage.childImageSharp.fluid})},data:r})}},162:function(e){e.exports={data:{placeholderImage:{childImageSharp:{fluid:{base64:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAYABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwX/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAfZ3SaQctmswS//EABoQAAIDAQEAAAAAAAAAAAAAAAARAQIQEiH/2gAIAQEAAQUCvy6pHgoyJxn/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/AR//xAAVEQEBAAAAAAAAAAAAAAAAAAAQAf/aAAgBAgEBPwEp/8QAFxAAAwEAAAAAAAAAAAAAAAAAAAEhMP/aAAgBAQAGPwKomH//xAAaEAEAAgMBAAAAAAAAAAAAAAABADEQESHw/9oACAEBAAE/IRZLqPgNBhFcLDBPbimoes//2gAMAwEAAgADAAAAEN//AP8A/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEQEf/aAAgBAwEBPxCJmn//xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEh/9oACAECAQE/EOoxEf/EAB8QAQACAgAHAAAAAAAAAAAAAAEAESFBEDFRYXGRof/aAAgBAQABPxBYdoDr3EFWADwyGveoREz5lnRglkTnncBZJYY+J//Z",aspectRatio:.8333333333333334,src:"/static/c42fea87418943512075b0519db29efb/eadbd/es6tips.jpg",srcSet:"/static/c42fea87418943512075b0519db29efb/f01f2/es6tips.jpg 75w,\n/static/c42fea87418943512075b0519db29efb/1986a/es6tips.jpg 150w,\n/static/c42fea87418943512075b0519db29efb/eadbd/es6tips.jpg 300w,\n/static/c42fea87418943512075b0519db29efb/f7c4a/es6tips.jpg 450w,\n/static/c42fea87418943512075b0519db29efb/6d7df/es6tips.jpg 600w,\n/static/c42fea87418943512075b0519db29efb/8c3c8/es6tips.jpg 900w,\n/static/c42fea87418943512075b0519db29efb/b879b/es6tips.jpg 2250w",sizes:"(max-width: 300px) 100vw, 300px"}}}}}},163:function(e,t,a){"use strict";var r=a(8);t.__esModule=!0,t.default=void 0;var i,n=r(a(7)),s=r(a(35)),o=r(a(74)),l=r(a(75)),c=r(a(0)),d=r(a(4)),u=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},A=Object.create({}),f=function(e){var t=u(e),a=t.fluid?t.fluid.src:t.fixed.src;return A[a]||!1},p=new WeakMap;var g=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){if(p.has(e.target)){var t=p.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),p.delete(e.target),t())}})},{rootMargin:"200px"})),i);return a&&(a.observe(e),p.set(e,t)),function(){a.unobserve(e),p.delete(e)}},m=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSetWebp?"<source type='image/webp' srcset=\""+e.srcSetWebp+'" '+a+"/>":"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ';return"<picture>"+r+"<img "+(e.width?'width="'+e.width+'" ':"")+(e.height?'height="'+e.height+'" ':"")+a+i+t+s+n+(e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"")+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},h=c.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,d=e.onError,u=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError"]);return c.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:i},u,{onLoad:s,onError:d,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))});h.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var E=function(e){function t(t){var a;a=e.call(this,t)||this;var r=!0,i=!1,n=t.fadeIn,o=f(t);!o&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=!1,i=!0),"undefined"==typeof window&&(r=!1),t.critical&&(r=!0,i=!1);var l=!(t.critical&&!t.fadeIn);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,IOSupported:i,fadeIn:n,hasNoScript:l,seenBefore:o},a.imageRef=c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)((0,s.default)(a))),a.handleRef=a.handleRef.bind((0,s.default)((0,s.default)(a))),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:f(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&(this.cleanUpListeners=g(e,function(){var e=f(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:t.imageRef.current.currentSrc.length>0})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=t.fluid?t.fluid.src:t.fixed.src,A[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,o=void 0===s?{}:s,d=e.placeholderStyle,A=void 0===d?{}:d,f=e.placeholderClassName,p=e.fluid,g=e.fixed,E=e.backgroundColor,b=e.Tag,y=e.itemProp,w=this.state.imgLoaded||!1===this.state.fadeIn,v=!0===this.state.fadeIn&&!this.state.imgCached,S=(0,l.default)({opacity:w?1:0,transition:v?"opacity 0.5s":"none"},o),j="boolean"==typeof E?"lightgray":E,R={transitionDelay:"0.5s"},x=(0,l.default)({opacity:this.state.imgLoaded?0:1},v&&R,o,A),L={title:t,alt:this.state.isVisible?"":a,style:x,className:f};if(p){var N=p;return c.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(N.srcSet)},c.default.createElement(b,{style:{width:"100%",paddingBottom:100/N.aspectRatio+"%"}}),j&&c.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},v&&R)}),N.base64&&c.default.createElement(h,(0,l.default)({src:N.base64},L)),N.tracedSVG&&c.default.createElement(h,(0,l.default)({src:N.tracedSVG},L)),this.state.isVisible&&c.default.createElement("picture",null,N.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:N.srcSetWebp,sizes:N.sizes}),c.default.createElement(h,{alt:a,title:t,sizes:N.sizes,src:N.src,crossOrigin:this.props.crossOrigin,srcSet:N.srcSet,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,l.default)({alt:a,title:t},N))}}))}if(g){var B=g,Q=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:B.width,height:B.height},n);return"inherit"===n.display&&delete Q.display,c.default.createElement(b,{className:(r||"")+" gatsby-image-wrapper",style:Q,ref:this.handleRef,key:"fixed-"+JSON.stringify(B.srcSet)},j&&c.default.createElement(b,{title:t,style:(0,l.default)({backgroundColor:j,width:B.width,opacity:this.state.imgLoaded?0:1,height:B.height},v&&R)}),B.base64&&c.default.createElement(h,(0,l.default)({src:B.base64},L)),B.tracedSVG&&c.default.createElement(h,(0,l.default)({src:B.tracedSVG},L)),this.state.isVisible&&c.default.createElement("picture",null,B.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:B.srcSetWebp,sizes:B.sizes}),c.default.createElement(h,{alt:a,title:t,width:B.width,height:B.height,sizes:B.sizes,src:B.src,crossOrigin:this.props.crossOrigin,srcSet:B.srcSet,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:m((0,l.default)({alt:a,title:t},B))}}))}return null},t}(c.default.Component);E.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var b=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string}),y=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string});E.propTypes={resolutions:b,sizes:y,fixed:b,fluid:y,fadeIn:d.default.bool,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,crossOrigin:d.default.oneOfType([d.default.string,d.default.bool]),style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,onStartLoad:d.default.func,Tag:d.default.string,itemProp:d.default.string};var w=E;t.default=w}}]);
//# sourceMappingURL=component---src-pages-index-js-dbf72fb218485ef8c045.js.map