workspace.spreadsheetpanel={};workspace.spreadsheetpanel.getSpreadsheetMenu=function(){var c=Ext.create("Ext.Panel",{id:"tabFichier",title:"Fichier",closable:false});var d=Ext.create("Ext.Panel",{id:"tabAccueil",title:"Accueil",closable:false});var e=Ext.create("Ext.Panel",{id:"tabInsertion",title:"Insertion",closable:false});var b=Ext.create("Ext.Panel",{id:"tabFormules",title:"Formules",closable:false});var f=Ext.create("Ext.Panel",{id:"tabDonnees",title:"Données",closable:false});var a=Ext.create("Ext.tab.Panel",{region:"north",id:"spreadsheetMenu",resizeTabs:false,enableTabScroll:false,height:120,minHeight:120,maxHeight:120,frame:true,defaults:{autoScroll:true,bodyPadding:10},items:[c,d,e,b,f],listeners:{tabchange:function(h,g){}}});return a};workspace.spreadsheetpanel.getRandomInt=function(b,a){return Math.floor(Math.random()*(a-b))+b};workspace.spreadsheetpanel.addNewSheet=function(){var c=workspace.spreadsheetpanel.lastNumber+1;while($("#tabFeuille"+c).get().length!=0){c++}workspace.spreadsheetpanel.lastNumber=c;var b="";b+="<div id='spreadbox_+"+c+"'>";b+="   <div id='spreadboxline1_+"+c+"' class='spreadboxline'>";b+="      <div id='freezebox_+"+c+"'></div><div id='columnsbox_+"+c+"'><div></div></div>";b+="   </div>";b+="   <div id='spreadboxline2_+"+c+"' class='spreadboxline'>";b+="      <div id='rowsbox_+"+c+"'><div></div></div><div id='contener_+"+c+"'>";b+="         <div id='sheet_+"+c+"'></div>";b+="      </div>";b+="   </div>";b+="</div>";var a=Ext.create("Ext.Panel",{id:"tabFeuille"+c,title:"Feuille "+c,iconCls:"icon-home",cls:"tab-sheet",closable:false,listeners:{resize:function(){document.title=this.id}},html:b});workspace.spreadsheetpanel.spreadsheetPanel.add(a);startSpreadBox(c)};workspace.spreadsheetpanel.getSpreadsheetPanel=function(){workspace.spreadsheetpanel.lastNumber=0;var a=Ext.create("Ext.tab.Panel",{region:"center",id:"spreadsheetPanel",resizeTabs:false,enableTabScroll:false,minHeight:80,frame:true,tabPosition:"bottom",defaults:{autoScroll:false},items:[],listeners:{tabchange:function(c,b){}}});workspace.spreadsheetpanel.spreadsheetPanel=a;return a};workspace.centerpanel.initSpreadsheetPanel=function(){workspace.spreadsheetpanel.addNewSheet();workspace.spreadsheetpanel.addNewSheet()};