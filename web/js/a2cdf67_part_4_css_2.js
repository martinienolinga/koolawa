(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(p){p.defineMode("css",function(T,G){if(!G.propertyKeywords){G=p.resolveMode("text/css")}var M=T.indentUnit,y=G.tokenHooks,w=G.documentTypes||{},S=G.mediaTypes||{},I=G.mediaFeatures||{},F=G.propertyKeywords||{},z=G.nonStandardPropertyKeywords||{},B=G.fontProperties||{},R=G.counterDescriptors||{},L=G.colorKeywords||{},O=G.valueKeywords||{},J=G.allowNested;var A,K;function U(X,Y){A=Y;return X}function W(aa,Z){var Y=aa.next();if(y[Y]){var X=y[Y](aa,Z);if(X!==false){return X}}if(Y=="@"){aa.eatWhile(/[\w\\\-]/);return U("def",aa.current())}else{if(Y=="="||(Y=="~"||Y=="|")&&aa.eat("=")){return U(null,"compare")}else{if(Y=='"'||Y=="'"){Z.tokenize=H(Y);return Z.tokenize(aa,Z)}else{if(Y=="#"){aa.eatWhile(/[\w\\\-]/);return U("atom","hash")}else{if(Y=="!"){aa.match(/^\s*\w*/);return U("keyword","important")}else{if(/\d/.test(Y)||Y=="."&&aa.eat(/\d/)){aa.eatWhile(/[\w.%]/);return U("number","unit")}else{if(Y==="-"){if(/[\d.]/.test(aa.peek())){aa.eatWhile(/[\w.%]/);return U("number","unit")}else{if(aa.match(/^-[\w\\\-]+/)){aa.eatWhile(/[\w\\\-]/);if(aa.match(/^\s*:/,false)){return U("variable-2","variable-definition")}return U("variable-2","variable")}else{if(aa.match(/^\w+-/)){return U("meta","meta")}}}}else{if(/[,+>*\/]/.test(Y)){return U(null,"select-op")}else{if(Y=="."&&aa.match(/^-?[_a-z][_a-z0-9-]*/i)){return U("qualifier","qualifier")}else{if(/[:;{}\[\]\(\)]/.test(Y)){return U(null,Y)}else{if((Y=="u"&&aa.match(/rl(-prefix)?\(/))||(Y=="d"&&aa.match("omain("))||(Y=="r"&&aa.match("egexp("))){aa.backUp(1);Z.tokenize=V;return U("property","word")}else{if(/[\w\\\-]/.test(Y)){aa.eatWhile(/[\w\\\-]/);return U("property","word")}else{return U(null,null)}}}}}}}}}}}}}function H(X){return function(ab,Z){var aa=false,Y;while((Y=ab.next())!=null){if(Y==X&&!aa){if(X==")"){ab.backUp(1)}break}aa=!aa&&Y=="\\"}if(Y==X||!aa&&X!=")"){Z.tokenize=null}return U("string","string")}}function V(Y,X){Y.next();if(!Y.match(/\s*[\"\')]/,false)){X.tokenize=H(")")}else{X.tokenize=null}return U(null,"(")}function N(Y,X,Z){this.type=Y;this.indent=X;this.prev=Z}function D(Y,Z,X){Y.context=new N(X,Z.indentation()+M,Y.context);return X}function P(X){X.context=X.context.prev;return X.context.type}function x(X,Z,Y){return C[Y.context.type](X,Z,Y)}function Q(Y,aa,Z,ab){for(var X=ab||1;X>0;X--){Z.context=Z.context.prev}return x(Y,aa,Z)}function E(Y){var X=Y.current().toLowerCase();if(O.hasOwnProperty(X)){K="atom"}else{if(L.hasOwnProperty(X)){K="keyword"}else{K="variable"}}}var C={};C.top=function(X,Z,Y){if(X=="{"){return D(Y,Z,"block")}else{if(X=="}"&&Y.context.prev){return P(Y)}else{if(/@(media|supports|(-moz-)?document)/.test(X)){return D(Y,Z,"atBlock")}else{if(/@(font-face|counter-style)/.test(X)){Y.stateArg=X;return"restricted_atBlock_before"}else{if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(X)){return"keyframes"}else{if(X&&X.charAt(0)=="@"){return D(Y,Z,"at")}else{if(X=="hash"){K="builtin"}else{if(X=="word"){K="tag"}else{if(X=="variable-definition"){return"maybeprop"}else{if(X=="interpolation"){return D(Y,Z,"interpolation")}else{if(X==":"){return"pseudo"}else{if(J&&X=="("){return D(Y,Z,"parens")}}}}}}}}}}}}return Y.context.type};C.block=function(X,aa,Y){if(X=="word"){var Z=aa.current().toLowerCase();if(F.hasOwnProperty(Z)){K="property";return"maybeprop"}else{if(z.hasOwnProperty(Z)){K="string-2";return"maybeprop"}else{if(J){K=aa.match(/^\s*:(?:\s|$)/,false)?"property":"tag";return"block"}else{K+=" error";return"maybeprop"}}}}else{if(X=="meta"){return"block"}else{if(!J&&(X=="hash"||X=="qualifier")){K="error";return"block"}else{return C.top(X,aa,Y)}}}};C.maybeprop=function(X,Z,Y){if(X==":"){return D(Y,Z,"prop")}return x(X,Z,Y)};C.prop=function(X,Z,Y){if(X==";"){return P(Y)}if(X=="{"&&J){return D(Y,Z,"propBlock")}if(X=="}"||X=="{"){return Q(X,Z,Y)}if(X=="("){return D(Y,Z,"parens")}if(X=="hash"&&!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(Z.current())){K+=" error"}else{if(X=="word"){E(Z)}else{if(X=="interpolation"){return D(Y,Z,"interpolation")}}}return"prop"};C.propBlock=function(Y,X,Z){if(Y=="}"){return P(Z)}if(Y=="word"){K="property";return"maybeprop"}return Z.context.type};C.parens=function(X,Z,Y){if(X=="{"||X=="}"){return Q(X,Z,Y)}if(X==")"){return P(Y)}if(X=="("){return D(Y,Z,"parens")}if(X=="interpolation"){return D(Y,Z,"interpolation")}if(X=="word"){E(Z)}return"parens"};C.pseudo=function(X,Z,Y){if(X=="word"){K="variable-3";return Y.context.type}return x(X,Z,Y)};C.atBlock=function(X,aa,Y){if(X=="("){return D(Y,aa,"atBlock_parens")}if(X=="}"){return Q(X,aa,Y)}if(X=="{"){return P(Y)&&D(Y,aa,J?"block":"top")}if(X=="word"){var Z=aa.current().toLowerCase();if(Z=="only"||Z=="not"||Z=="and"||Z=="or"){K="keyword"}else{if(w.hasOwnProperty(Z)){K="tag"}else{if(S.hasOwnProperty(Z)){K="attribute"}else{if(I.hasOwnProperty(Z)){K="property"}else{if(F.hasOwnProperty(Z)){K="property"}else{if(z.hasOwnProperty(Z)){K="string-2"}else{if(O.hasOwnProperty(Z)){K="atom"}else{K="error"}}}}}}}}return Y.context.type};C.atBlock_parens=function(X,Z,Y){if(X==")"){return P(Y)}if(X=="{"||X=="}"){return Q(X,Z,Y,2)}return C.atBlock(X,Z,Y)};C.restricted_atBlock_before=function(X,Z,Y){if(X=="{"){return D(Y,Z,"restricted_atBlock")}if(X=="word"&&Y.stateArg=="@counter-style"){K="variable";return"restricted_atBlock_before"}return x(X,Z,Y)};C.restricted_atBlock=function(X,Z,Y){if(X=="}"){Y.stateArg=null;return P(Y)}if(X=="word"){if((Y.stateArg=="@font-face"&&!B.hasOwnProperty(Z.current().toLowerCase()))||(Y.stateArg=="@counter-style"&&!R.hasOwnProperty(Z.current().toLowerCase()))){K="error"}else{K="property"}return"maybeprop"}return"restricted_atBlock"};C.keyframes=function(X,Z,Y){if(X=="word"){K="variable";return"keyframes"}if(X=="{"){return D(Y,Z,"top")}return x(X,Z,Y)};C.at=function(X,Z,Y){if(X==";"){return P(Y)}if(X=="{"||X=="}"){return Q(X,Z,Y)}if(X=="word"){K="tag"}else{if(X=="hash"){K="builtin"}}return"at"};C.interpolation=function(X,Z,Y){if(X=="}"){return P(Y)}if(X=="{"||X==";"){return Q(X,Z,Y)}if(X=="word"){K="variable"}else{if(X!="variable"&&X!="("&&X!=")"){K="error"}}return"interpolation"};return{startState:function(X){return{tokenize:null,state:"top",stateArg:null,context:new N("top",X||0,null)}},token:function(Z,Y){if(!Y.tokenize&&Z.eatSpace()){return null}var X=(Y.tokenize||W)(Z,Y);if(X&&typeof X=="object"){A=X[1];X=X[0]}K=X;Y.state=C[Y.state](A,Z,Y);return K},indent:function(ab,Z){var Y=ab.context,aa=Z&&Z.charAt(0);var X=Y.indent;if(Y.type=="prop"&&(aa=="}"||aa==")")){Y=Y.prev}if(Y.prev&&(aa=="}"&&(Y.type=="block"||Y.type=="top"||Y.type=="interpolation"||Y.type=="restricted_atBlock")||aa==")"&&(Y.type=="parens"||Y.type=="atBlock_parens")||aa=="{"&&(Y.type=="at"||Y.type=="atBlock"))){X=Y.indent-M;Y=Y.prev}return X},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace"}});function g(y){var x={};for(var w=0;w<y.length;++w){x[y[w]]=true}return x}var k=["domain","regexp","url","url-prefix"],a=g(k);var b=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],t=g(b);var v=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid"],i=g(v);var d=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-position","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],h=g(d);var m=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],e=g(m);var r=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"],f=g(r);var o=["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"],s=g(o);var c=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],l=g(c);var j=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","column","compact","condensed","contain","content","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","dashed","decimal","decimal-leading-zero","default","default-button","destination-atop","destination-in","destination-out","destination-over","devanagari","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","footnotes","forwards","from","geometricPrecision","georgian","graytext","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row-resize","rtl","run-in","running","s-resize","sans-serif","scale","scale3d","scaleX","scaleY","scaleZ","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","solid","somali","source-atop","source-in","source-out","source-over","space","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","x-large","x-small","xor","xx-large","xx-small"],q=g(j);var n=k.concat(b).concat(v).concat(d).concat(m).concat(c).concat(j);p.registerHelper("hintWords","css",n);function u(z,y){var w=false,x;while((x=z.next())!=null){if(w&&x=="/"){y.tokenize=null;break}w=(x=="*")}return["comment","comment"]}p.defineMIME("text/css",{documentTypes:a,mediaTypes:t,mediaFeatures:i,propertyKeywords:h,nonStandardPropertyKeywords:e,fontProperties:f,counterDescriptors:s,colorKeywords:l,valueKeywords:q,tokenHooks:{"/":function(x,w){if(!x.eat("*")){return false}w.tokenize=u;return u(x,w)}},name:"css"});p.defineMIME("text/x-scss",{mediaTypes:t,mediaFeatures:i,propertyKeywords:h,nonStandardPropertyKeywords:e,colorKeywords:l,valueKeywords:q,fontProperties:f,allowNested:true,tokenHooks:{"/":function(x,w){if(x.eat("/")){x.skipToEnd();return["comment","comment"]}else{if(x.eat("*")){w.tokenize=u;return u(x,w)}else{return["operator","operator"]}}},":":function(w){if(w.match(/\s*\{/)){return[null,"{"]}return false},"$":function(w){w.match(/^[\w-]+/);if(w.match(/^\s*:/,false)){return["variable-2","variable-definition"]}return["variable-2","variable"]},"#":function(w){if(!w.eat("{")){return false}return[null,"interpolation"]}},name:"css",helperType:"scss"});p.defineMIME("text/x-less",{mediaTypes:t,mediaFeatures:i,propertyKeywords:h,nonStandardPropertyKeywords:e,colorKeywords:l,valueKeywords:q,fontProperties:f,allowNested:true,tokenHooks:{"/":function(x,w){if(x.eat("/")){x.skipToEnd();return["comment","comment"]}else{if(x.eat("*")){w.tokenize=u;return u(x,w)}else{return["operator","operator"]}}},"@":function(w){if(w.eat("{")){return[null,"interpolation"]}if(w.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,false)){return false}w.eatWhile(/[\w\\\-]/);if(w.match(/^\s*:/,false)){return["variable-2","variable-definition"]}return["variable-2","variable"]},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"})});