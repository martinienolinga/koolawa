(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(c){var h="CodeMirror-activeline";var g="CodeMirror-activeline-background";var f="CodeMirror-activeline-gutter";c.defineOption("styleActiveLine",false,function(i,l,j){var k=j&&j!=c.Init;if(l&&!k){i.state.activeLines=[];e(i,i.listSelections());i.on("beforeSelectionChange",b)}else{if(!l&&k){i.off("beforeSelectionChange",b);d(i);delete i.state.activeLines}}});function d(j){for(var k=0;k<j.state.activeLines.length;k++){j.removeLineClass(j.state.activeLines[k],"wrap",h);j.removeLineClass(j.state.activeLines[k],"background",g);j.removeLineClass(j.state.activeLines[k],"gutter",f)}}function a(k,j){if(k.length!=j.length){return false}for(var l=0;l<k.length;l++){if(k[l]!=j[l]){return false}}return true}function e(j,l){var o=[];for(var n=0;n<l.length;n++){var m=l[n];if(!m.empty()){continue}var k=j.getLineHandleVisualStart(m.head.line);if(o[o.length-1]!=k){o.push(k)}}if(a(j.state.activeLines,o)){return}j.operation(function(){d(j);for(var p=0;p<o.length;p++){j.addLineClass(o[p],"wrap",h);j.addLineClass(o[p],"background",g);j.addLineClass(o[p],"gutter",f)}j.state.activeLines=o})}function b(i,j){e(i,j.ranges)}});