Ext.define("ExtThemeNeptune.Component",{override:"Ext.Component",initComponent:function(){this.callParent();if(this.dock&&this.border===undefined){this.border=false}},initStyles:function(){var c=this,d=c.border;if(c.dock){c.border=null}c.callParent(arguments);c.border=d}});Ext.define("ExtThemeNeptune.panel.Panel",{override:"Ext.panel.Panel",border:false,bodyBorder:false,initBorderProps:Ext.emptyFn,initBodyBorder:function(){if(this.bodyBorder!==true){this.callParent()}}});Ext.define("ExtThemeNeptune.layout.component.Dock",{override:"Ext.layout.component.Dock",noBorderClassTable:[0,Ext.baseCSSPrefix+"noborder-l",Ext.baseCSSPrefix+"noborder-b",Ext.baseCSSPrefix+"noborder-bl",Ext.baseCSSPrefix+"noborder-r",Ext.baseCSSPrefix+"noborder-rl",Ext.baseCSSPrefix+"noborder-rb",Ext.baseCSSPrefix+"noborder-rbl",Ext.baseCSSPrefix+"noborder-t",Ext.baseCSSPrefix+"noborder-tl",Ext.baseCSSPrefix+"noborder-tb",Ext.baseCSSPrefix+"noborder-tbl",Ext.baseCSSPrefix+"noborder-tr",Ext.baseCSSPrefix+"noborder-trl",Ext.baseCSSPrefix+"noborder-trb",Ext.baseCSSPrefix+"noborder-trbl"],edgeMasks:{top:8,right:4,bottom:2,left:1},handleItemBorders:function(){var i=this,T=0,b=8,J=4,O=2,U=1,X=i.owner,G=X.bodyBorder,M=X.border,Q=i.collapsed,K=i.edgeMasks,P=i.noBorderClassTable,B=X.dockedItems.generation,C,V,D,R,H,N,E,L,S,I,F,W;if(i.initializedBorders===B){return}F=[];W=[];V=i.getBorderCollapseTable();P=i.getBorderClassTable?i.getBorderClassTable():P;i.initializedBorders=B;i.collapsed=false;D=i.getDockedItems();i.collapsed=Q;for(H=0,N=D.length;H<N;H++){E=D[H];if(E.ignoreBorderManagement){continue}L=E.dock;I=R=0;F.length=0;W.length=0;if(L!=="bottom"){if(T&b){C=E.border}else{C=M;if(C!==false){R+=b}}if(C===false){I+=b}}if(L!=="left"){if(T&J){C=E.border}else{C=M;if(C!==false){R+=J}}if(C===false){I+=J}}if(L!=="top"){if(T&O){C=E.border}else{C=M;if(C!==false){R+=O}}if(C===false){I+=O}}if(L!=="right"){if(T&U){C=E.border}else{C=M;if(C!==false){R+=U}}if(C===false){I+=U}}if((S=E.lastBorderMask)!==I){E.lastBorderMask=I;if(S){W[0]=P[S]}if(I){F[0]=P[I]}}if((S=E.lastBorderCollapse)!==R){E.lastBorderCollapse=R;if(S){W[W.length]=V[S]}if(R){F[F.length]=V[R]}}if(W.length){E.removeCls(W)}if(F.length){E.addCls(F)}T|=K[L]}I=R=0;F.length=0;W.length=0;if(T&b){C=G}else{C=M;if(C!==false){R+=b}}if(C===false){I+=b}if(T&J){C=G}else{C=M;if(C!==false){R+=J}}if(C===false){I+=J}if(T&O){C=G}else{C=M;if(C!==false){R+=O}}if(C===false){I+=O}if(T&U){C=G}else{C=M;if(C!==false){R+=U}}if(C===false){I+=U}if((S=i.lastBodyBorderMask)!==I){i.lastBodyBorderMask=I;if(S){W[0]=P[S]}if(I){F[0]=P[I]}}if((S=i.lastBodyBorderCollapse)!==R){i.lastBodyBorderCollapse=R;if(S){W[W.length]=V[S]}if(R){F[F.length]=V[R]}}if(W.length){X.removeBodyCls(W)}if(F.length){X.addBodyCls(F)}},onRemove:function(c){var d=c.lastBorderMask;if(!c.isDestroyed&&!c.ignoreBorderManagement&&d){c.lastBorderMask=0;c.removeCls(this.noBorderClassTable[d])}this.callParent([c])}});Ext.define("ExtThemeNeptune.toolbar.Toolbar",{override:"Ext.toolbar.Toolbar",usePlainButtons:false,border:false});Ext.define("ExtThemeNeptune.container.ButtonGroup",{override:"Ext.container.ButtonGroup",usePlainButtons:false});Ext.define("ExtThemeNeptune.toolbar.Paging",{override:"Ext.toolbar.Paging",defaultButtonUI:"plain-toolbar",inputItemWidth:40});Ext.define("ExtThemeNeptune.picker.Month",{override:"Ext.picker.Month",measureMaxHeight:36});Ext.define("ExtThemeNeptune.form.field.HtmlEditor",{override:"Ext.form.field.HtmlEditor",defaultButtonUI:"plain-toolbar"});Ext.define("ExtThemeNeptune.panel.Table",{override:"Ext.panel.Table",bodyBorder:true});Ext.define("ExtThemeNeptune.grid.RowEditor",{override:"Ext.grid.RowEditor",buttonUI:"default-toolbar"});Ext.define("ExtThemeNeptune.grid.column.RowNumberer",{override:"Ext.grid.column.RowNumberer",width:25});Ext.define("ExtThemeNeptune.resizer.Splitter",{override:"Ext.resizer.Splitter",size:8});Ext.define("ExtThemeNeptune.menu.Menu",{override:"Ext.menu.Menu",showSeparator:false});Ext.define("ExtThemeNeptune.menu.Separator",{override:"Ext.menu.Separator",border:true});Ext.define("ExtThemeNeptune.panel.Tool",{override:"Ext.panel.Tool",height:16,width:16});Ext.define("ExtThemeNeptune.tab.Tab",{override:"Ext.tab.Tab",border:false});