workspace.spreadsheetpanel.getSpreadsheetMenu=function(){var b=workspace.workzone.getBeginMenu();var c=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabFormules",title:"Formules",cls:"tab-menu tab-spreadsheet",closable:false});b.push(c);var d=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabDonnees",title:"Données",cls:"tab-menu tab-spreadsheet",closable:false});b.push(d);b=workspace.workzone.getEndMenu(b);var a=Ext.create("Koolawa.ux.Ribbon",{id:"spreadsheetMenu",cls:"workspaceMenu",items:b,listeners:{afterrender:function(e){workspace.workzone.addShortMenu(e,[{cls:"icon-save_22white",tooltip:"Enregistrer"},{cls:"icon-undo_22white",tooltip:"Annuler la dernière action"},{cls:"icon-redo_22white",tooltip:"Refaire la dernière action"}])}}});$(window).on("resize",function(){var e=workspace.spreadsheetpanel.spreadsheetMenu;e.updateSize()});workspace.spreadsheetpanel.spreadsheetMenu=a;return a};workspace.spreadsheetpanel.getRandomInt=function(b,a){return Math.floor(Math.random()*(a-b))+b};workspace.spreadsheetpanel.addNewSheet=function(){var c=workspace.spreadsheetpanel.lastNumber+1;while($("#tabFeuille"+c).get().length!=0){c++}workspace.spreadsheetpanel.lastNumber=c;var b="";b+="<div id='functiondiv_"+c+"' class='functiondiv'>";b+="	<div id='selectedcell_"+c+"' class='selectedcell'></div>";b+="	<div id='functionbutton_"+c+"' class='functionbutton'></div>";b+="	<div id='functionvalue_"+c+"' class='functionvalue'><textarea></textarea></div>";b+="</div>";b+="<div id='spreadbox_"+c+"' class='spreadbox'>";b+="   <div id='spreadboxline1_"+c+"' class='spreadboxline'>";b+="      <div id='freezebox_"+c+"' class='freezebox'></div><div id='columnsbox_"+c+"' class='columnsbox'><div></div></div>";b+="   </div>";b+="   <div id='spreadboxline2_"+c+"' class='spreadboxline' style='outline: 1px solid #aaa;'>";b+="      <div id='rowsbox_"+c+"' class='rowsbox'><div></div></div><div id='contener_"+c+"' class='contener'>";b+="         <div id='sheet_"+c+"' class='sheet'></div>";b+="      </div>";b+="   </div>";b+="</div>";var a=Ext.create("Ext.Panel",{id:"tabFeuille"+c,title:"Feuille "+c,iconCls:"icon-home",cls:"tab-sheet",closable:false,countsheet:c,listeners:{resize:function(){resizeSpreadBox(this.countsheet)},afterrender:function(e,d){startSpreadBox(this.countsheet)}},html:b});workspace.spreadsheetpanel.spreadsheetPanel.add(a);return a};workspace.spreadsheetpanel.getSpreadsheetPanel=function(){workspace.spreadsheetpanel.lastNumber=0;var a=Ext.create("Ext.tab.Panel",{region:"center",id:"spreadsheetPanel",resizeTabs:false,enableTabScroll:false,minHeight:80,frame:true,border:false,tabPosition:"bottom",defaults:{autoScroll:false},items:[],listeners:{tabchange:function(c,b){workspace.spreadsheetpanel.current=b.countsheet}}});workspace.spreadsheetpanel.spreadsheetPanel=a;workspace.spreadsheetpanel.spreadsheetMenu.centerPanel=a;return a};workspace.centerpanel.initSpreadsheetPanel=function(){workspace.spreadsheetpanel.spreadsheetPanel.setActiveTab(workspace.spreadsheetpanel.addNewSheet());workspace.spreadsheetpanel.addNewSheet();workspace.spreadsheetpanel.addNewSheet();initSpreadBoxAction()};