workspace.administrationpanel.getAdministrationMenu=function(){var a=workspace.workzone.getBeginMenu();var b=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabMiseEnPage",title:"Mise en page",cls:"tab-menu tab-administration",closable:false});a.push(b);var d=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabReferences",title:"Références",cls:"tab-menu tab-administration",closable:false});a.push(d);a=workspace.workzone.getEndMenu(a);var c=Ext.create("Koolawa.ux.Ribbon",{id:"administrationMenu",cls:"workspaceMenu",items:a,listeners:{afterrender:function(e){workspace.workzone.addShortMenu(e,[{cls:"icon-save_22white",tooltip:"Enregistrer"},{cls:"icon-undo_22white",tooltip:"Annuler la dernière action"},{cls:"icon-redo_22white",tooltip:"Refaire la dernière action"}])}}});$(window).on("resize",function(){var e=workspace.administrationpanel.administrationMenu;e.updateSize()});workspace.administrationpanel.administrationMenu=c;return c};workspace.administrationpanel.getAdministrationPanel=function(){var a=Ext.create("Ext.Panel",{region:"center",id:"administrationPanel",minHeight:80,frame:true,border:false,defaults:{autoScroll:false},items:[]});workspace.administrationpanel.administrationPanel=a;workspace.administrationpanel.administrationMenu.centerPanel=a;return a};workspace.centerpanel.initAdministrationPanel=function(){};