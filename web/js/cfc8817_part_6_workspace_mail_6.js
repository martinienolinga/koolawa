workspace.mailpanel.getMailMenu=function(){var a=workspace.workzone.getBeginMenu();var c=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabMiseEnPage",title:"Mise en page",cls:"tab-menu tab-mail",closable:false});a.push(c);var d=Ext.create("Koolawa.ux.RibbonMenu",{id:"tabReferences",title:"Références",cls:"tab-menu tab-mail",closable:false});a.push(d);a=workspace.workzone.getEndMenu(a);var b=Ext.create("Koolawa.ux.Ribbon",{id:"mailMenu",cls:"workspaceMenu",items:a,listeners:{afterrender:function(e){workspace.workzone.addShortMenu(e,[{cls:"icon-save_22white",tooltip:"Enregistrer"},{cls:"icon-undo_22white",tooltip:"Annuler la dernière action"},{cls:"icon-redo_22white",tooltip:"Refaire la dernière action"}])}}});$(window).on("resize",function(){var e=workspace.mailpanel.mailMenu;e.updateSize()});workspace.mailpanel.mailMenu=b;return b};workspace.mailpanel.getMailPanel=function(){var d=Ext.create("Ext.Panel",{region:"west",id:"mailboxPanel",minWidth:300,items:[]});var c=Ext.create("Ext.Panel",{region:"north",id:"mailListPanel",collapsible:false,minHeight:250,items:[]});var a=Ext.create("Ext.Panel",{region:"center",id:"mailContentPanel",collapsible:false,items:[]});var b=Ext.create("Ext.Panel",{region:"center",id:"boxPanel",collapsible:false,layout:"border",bodyBorder:false,defaults:{collapsible:true,split:true},items:[c,a]});b.mailListPanel=c;b.mailContentPanel=a;var e=Ext.create("Ext.Panel",{region:"center",id:"mailPanel",layout:"border",bodyBorder:false,defaults:{collapsible:true,split:true},items:[d,b]});e.mailboxPanel=d;e.boxPanel=b;workspace.mailpanel.mailPanel=e;workspace.mailpanel.mailMenu.centerPanel=e;return e};workspace.centerpanel.initMailPanel=function(){};