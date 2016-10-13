
var clipboardUsers = undefined;

var workspaceUsers = {
    name: "users",
    current: null,
    users: [],
    groups: [],
    propertyData: null,
    properySource: null,

    init: function() {
    	Ext.require([ 'Ext.ux.form.field.ToggleSlide', 'Ext.ux.toggleslide.Thumb' ]);
    	
        Ext.define('treeModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'nodek', type: 'string' },
                { name: 'text', type: 'string' },
                { name: 'color', type: 'string' },
                { name: 'persist', type: 'boolean' },
                { name: 'groupid', type: 'int' },
            ]
        });
    },
 
    menuUsers: new Ext.menu.Menu({
        items: [
            { text: 'Modifier l\'utilisateur', key: 'moduser' },
            { text: 'Supprimer l\'utilisateur', key: 'deluser' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copyuser' },
            { text: 'Couper', key: 'cutuser' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'moduser':
                    {
                        workspaceUsers.gotoUser(workspaceUsers.menuUsers.rec);
                        break;
                    }

                    case 'deluser':
                    {
                        var rec = workspaceUsers.menuUsers.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression d\'utilisateur',
                            msg: 'Etes-vous certain de vouloir supprimer l\'utilisateur [ ' + rec.raw.username + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceUsers.itemUsers, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "user", "user", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceUsers.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copyuser':
                    {
                        workspaceUsers.copy(workspaceUsers.menuUsers.rec);
                        break;
                    }

                    case 'cutuser':
                    {
                        workspaceUsers.cut(workspaceUsers.menuUsers.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupUsers: new Ext.menu.Menu({
        items: [
            //{ text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { id: 'userdelete', text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup' },
            { text: 'Couper', key: 'cutgroup' },
            { id: 'userpaste', text: 'Coller', key: 'paste', disabled: true },
            { xtype: 'menuseparator' },
            { text: 'Ajouter un utilisateur', key: 'adduser' },
            { xtype: 'menuseparator' },
            { text: 'Règles par défaut de ce groupe', key: 'rulegroup' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspaceUsers.copy(workspaceUsers.menuGroupUsers.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspaceUsers.cut(workspaceUsers.menuGroupUsers.rec);
                        break;
                    }

                    case 'adduser':
                    {
                        workspaceUsers.newUser(workspaceUsers.menuGroupUsers.rec);
                        break;
                    }
                    
                    case 'rulegroup':
                	{
                    	workspaceUsers.rulesUserGroup(workspaceUsers.menuGroupUsers.rec);
                		break;
                	}
                
                    case 'paste':
                    {
                        workspaceUsers.paste(workspaceUsers.menuGroupUsers.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspaceUsers.groupForm.load("Nouveau groupe", "new", workspaceUsers.menuGroupUsers.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspaceUsers.groupForm.load("Modifier un groupe", "update", workspaceUsers.menuGroupUsers.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspaceUsers.menuGroupUsers.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de groupe',
                            msg: 'Etes-vous certain de vouloir supprimer le groupe [ ' + rec.raw.title + ' ] et tous les éléments qu\'il contient ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceUsers.itemUsers, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "user", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceUsers.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }
                }
            }
        }
    }),

    copy: function(rec) {
        clipboardUsers = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('userpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupuser') Ext.getCmp('userpasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardUsers = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('userpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupuser') Ext.getCmp('userpasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardUsers.item;

        if (clipboardUsers.action == 'cut')
        {
            if (clipboardUsers.item.raw.nodek == 'user')
            {
                var user = {
                    id: clipboardUsers.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "user", "user", user, function(result) {
                    if (workspaceUsers.current != null && workspaceUsers.current.Id == user.id)
                    {
                        workspaceUsers.current.groupid = user.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardUsers.item.raw.nodek == 'groupuser')
            {
                var group = {
                    id: clipboardUsers.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "user", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardUsers.item.raw.nodek == 'user')
            {
                var user = {
                    id: clipboardUsers.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "user", "user", user, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardUsers.item.raw.nodek == 'groupuser')
            {
                var group = {
                    id: clipboardUsers.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "user", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardUsers = null;
        Ext.getCmp('userpaste').setDisabled(true);
        Ext.getCmp('userpasteroot').setDisabled(true);
    },

    menuRootGroupUsers: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'userpasteroot', text: 'Coller', key: 'paste', disabled: true }
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspaceUsers.groupForm.load("Nouveau groupe", "new", workspaceUsers.menuGroupUsers.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspaceUsers.paste(workspaceUsers.menuGroupUsers.rec);
                        break;
                    }
                }
            }
        }
    }),

    groupForm: {
        load: function(title, opts, rec) {

            var cur = null;
            var prt = null;

            if (opts == "new")
            {
                cur = {raw: { Id: 0, title: '', text: '', color: 'x-cal-27-ad'}};
                prt = rec;
            }

            if (opts == "update")
            {
                cur = rec;
                prt = rec.parentNode;
            }

            var formgroup = new Ext.form.Panel({
                defaults: {
                    labelWidth: 150,
                },
                //width: 500,
                //height: 400,
                //title: title,
                //floating: true,
                //closable : true,
                modal: true,
                //frame: true,
                bodyStyle: 'padding: 10px 10px 0 10px; background-color:#dfeaf2',
                layout     : {
                    type  : 'vbox',
                    align : 'stretch'
                },
                items: [
                {
                    id: "name",
                    xtype: 'textfield',
                    fieldLabel: 'Nom',
                    name: 'name',
                    value: cur.raw.title
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Parent',
                    name: 'parent',
                    value: (prt.raw.Id == 0 || prt.raw.Id == null)?'(Racine)':prt.raw.title
                },{
                    xtype: 'tabpanel',
                    flex: 1,
                    frame: true,
                    bodyStyle: 'padding: 10px 10px 0 10px;',
                    items: [
                    {
                        title: 'Informations',
                        id: 'group_informations',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Country',
                            name: 'country'
                        },{
                            xtype: 'ux_colorcombo', 
                            fieldLabel: 'Code couleur',
                            id: 'codecouleur',
                            name: 'codecouleur',
                            forceSelection: true,
                            editable: false,
                            triggerAction: 'all',
                            allowBlank: false,
                            value: cur.raw.color,
                        }]
                    },{
                        title: 'Droits du groupe',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            name: 'email'
                        }
                        ]
                    }
                    ]
                },
                ],
        
                buttons: [{
                    text: 'Enregistrer',
                    handler: function() {
                        var title = formgroup.items.get('name').value;
                        var groupid = (prt.raw.Id)?prt.raw.Id:0;
                        var color = Ext.getCmp('group_informations').items.get('codecouleur').value;
                        
                        group = {
                            id: cur.raw.Id,
                            title: title,
                            groupid: groupid,
                            color: color,
                        };

                        symfony("save", "group", "user", group, function(result) {
                            if (opts == "new")
                            {
                                prt.insertChild(-1, { 
                                    Id: result.data.Id, 
                                    title: group.title, 
                                    text: group.title,
                                    color: color,
                                });
                                if (!prt.isExpanded()) prt.expand();
                            }

                            if (opts == "update")
                            {
                                cur.set('text', group.title);
                                cur.raw.text = group.title;
                                cur.raw.title = group.title;
                                cur.raw.color = group.color;
                                cur.commit();
                            }

                            myWinGroup.close();
                        });
                    }
                },{
                    text: 'Annuler',
                    handler: function() {
                    	myWinGroup.close();
                    }
                }]
            });
            
            var myWinGroup = Ext.create('Ext.Window',{
            	title: title,
                height: null,
                width: 500,
                closable: true,
                items : [ formgroup ]
            });
            
            return myWinGroup;

            //return formgroup;
        }
    },

    autoCloseCenterTab: function() {
        centerPanel.items.each(function(tab, index, totalcount) {
            if ("user" in tab && tab.user.Id != 0) {
                var user = {
                    id: tab.user.Id
                };

                symfony("exists", "user", "user", user, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspaceUsers.current.Id == user.id)
                        {
                            workspaceUsers.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },
    
    rulesUserGroup: function(rec) {
    	workspaceUsers.gotoUserGroup(rec);
    },

    newUser: function(group) {
        var user = {
            groupid: group.raw.Id,
            title: "Nouvel utilisateur",
        };  
        
        symfony("save", "user", "user", user, function(result) {
            var rec = group.insertChild(-1, result.data);
            workspaceUsers.gotoUser(rec);
        });
    },
    
    gotoUser: function(rec) {
        //workspaceUsers.set({});
    	
    	var myMask = new Ext.LoadMask(centerPanel, { msg: "Chargement en cours ..." });
        myMask.show();

        workspaceUsers.getUser(rec.raw.Id, function(user) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.user && user.Id == tab.user.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.text,
                    iconCls: 'icon-user',
                    items :[{
                    	xtype: 'panel',
                    	frame: true,
                        title: 'Accueil',
                        bodyStyle: 'padding: 10px;',
                        style: 'margin-bottom:10px;',
                        cls: 'subform',
                        items: [
                        {
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher la page d\'accueil',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeDisplay',
                            id: 'welcomeDisplayU' + user.Id,
                            state: user.rules.welcomeDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher les états qui datent de plus de 5 jours',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeMoreFiveDays',
                            id: 'welcomeMoreFiveDaysU' + user.Id,
                            state: user.rules.welcomeMoreFiveDays,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher le nombre de téléchargement',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeCountDownload',
                            id: 'welcomeCountDownloadU' + user.Id,
                            state: user.rules.welcomeCountDownload,
                        }]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Requêtes',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
                        {
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDisplay',
                            id: 'queryDisplayU' + user.Id,
                            state: user.rules.queryDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Créer des groupe de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupCreate',
                            id: 'queryGroupCreateU' + user.Id,
                            state: user.rules.queryGroupCreate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Modifier des groupes de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupUpdate',
                            id: 'queryGroupUpdateU' + user.Id,
                            state: user.rules.queryGroupUpdate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Supprimer des groupes de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupDelete',
                            id: 'queryGroupDeleteU' + user.Id,
                            state: user.rules.queryGroupDelete,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Créer des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryCreate',
                            id: 'queryCreateU' + user.Id,
                            state: user.rules.queryCreate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Modifier des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryUpdate',
                            id: 'queryUpdateU' + user.Id,
                            state: user.rules.queryUpdate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Supprimer des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDelete',
                            id: 'queryDeleteU' + user.Id,
                            state: user.rules.queryDelete,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Forcer l\'affichage de toutes les requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryForceDisplay',
                            id: 'queryForceDisplayU' + user.Id,
                            state: user.rules.queryForceDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Exécution des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryRun',
                            id: 'queryRunU' + user.Id,
                            state: user.rules.queryRun,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Extraire les requêtes CSV',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryExtractCSV',
                            id: 'queryExtractCSVU' + user.Id,
                            state: user.rules.queryExtractCSV,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher les logs des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDisplayLog',
                            id: 'queryDisplayLogU' + user.Id,
                            state: user.rules.queryDisplayLog,
                        },
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Rapports',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux rapports',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'reportDisplay',
                            id: 'reportDisplayU' + user.Id,
                            state: user.rules.reportDisplay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupCreate',
                            id: 'reportGroupCreateU' + user.Id,
                            state: user.rules.reportGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupUpdate',
                            id: 'reportGroupUpdateU' + user.Id,
                            state: user.rules.reportGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupDelete',
                            id: 'reportGroupDeleteU' + user.Id,
                            state: user.rules.reportGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportCreate',
                            id: 'reportCreateU' + user.Id,
                            state: user.rules.reportCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportUpdate',
                            id: 'reportUpdateU' + user.Id,
                            state: user.rules.reportUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportDelete',
                            id: 'reportDeleteU' + user.Id,
                            state: user.rules.reportDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportForceDisplay',
                            id: 'reportForceDisplayU' + user.Id,
                            state: user.rules.reportForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Exécuter les rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportRun',
                            id: 'reportRunU' + user.Id,
                            state: user.rules.reportRun,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Extraire les rapports PDF',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportExtractPDF',
                            id: 'reportExtractPDFU' + user.Id,
                            state: user.rules.reportExtractPDF,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Extraire les rapports Microsoft Word',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportExtractDOC',
                            id: 'reportExtractDOCU' + user.Id,
                            state: user.rules.reportExtractDOC,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportDisplayLog',
                            id: 'reportDisplayLogU' + user.Id,
                            state: user.rules.reportDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Tâches plannifiées',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux tâches plannifiée',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'planningDisplay',
                            id: 'planningDisplayU' + user.Id,
                            state: user.rules.planningDisplay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupCreate',
                            id: 'planningGroupCreateU' + user.Id,
                            state: user.rules.planningGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupUpdate',
                            id: 'planningGroupUpdateU' + user.Id,
                            state: user.rules.planningGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupDelete',
                            id: 'planningGroupDeleteU' + user.Id,
                            state: user.rules.planningGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningCreate',
                            id: 'planningCreateU' + user.Id,
                            state: user.rules.planningCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningUpdate',
                            id: 'planningUpdateU' + user.Id,
                            state: user.rules.planningUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningDelete',
                            id: 'planningDeleteU' + user.Id,
                            state: user.rules.planningDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningForceDisplay',
                            id: 'planningForceDisplayU' + user.Id,
                            state: user.rules.planningForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningDisplayLog',
                            id: 'planningDisplayLogU' + user.Id,
                            state: user.rules.planningDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Utilisateurs',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDisplay',
                            id: 'userDisplayU' + user.Id,
                            state: user.rules.userDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupCreate',
                            id: 'userGroupCreateU' + user.Id,
                            state: user.rules.userGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupUpdate',
                            id: 'userGroupUpdateU' + user.Id,
                            state: user.rules.userGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupDelete',
                            id: 'userGroupDeleteU' + user.Id,
                            state: user.rules.userGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userCreate',
                            id: 'userCreateU' + user.Id,
                            state: user.rules.userCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userUpdate',
                            id: 'userUpdateU' + user.Id,
                            state: user.rules.userUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDelete',
                            id: 'userDeleteU' + user.Id,
                            state: user.rules.userDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userForceDisplay',
                            id: 'userForceDisplayU' + user.Id,
                            state: user.rules.userForceDisplay,
						},{
                            xtype: 'textfield',
                            fieldLabel: 'Durée de session inactive',
                            name: 'sessionInactiveDelay',
                            id: 'sessionInactiveDelayU' + user.Id,
                            value: rec.raw.rules.sessionInactiveDelay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Désactiver les utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userEnabled',
                            id: 'userEnabledU' + user.Id,
                            state: user.rules.userEnabled,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDisplayLog',
                            id: 'userDisplayLogU' + user.Id,
                            state: user.rules.userDisplayLog,
						}
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Sources de données',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDisplay',
                            id: 'datasourceDisplayU' + user.Id,
                            state: user.rules.datasourceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupCreate',
                            id: 'datasourceGroupCreateU' + user.Id,
                            state: user.rules.datasourceGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupUpdate',
                            id: 'datasourceGroupUpdateU' + user.Id,
                            state: user.rules.datasourceGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupDelete',
                            id: 'datasourceGroupDeleteU' + user.Id,
                            state: user.rules.datasourceGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceCreate',
                            id: 'datasourceCreateU' + user.Id,
                            state: user.rules.datasourceCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceUpdate',
                            id: 'datasourceUpdateU' + user.Id,
                            state: user.rules.datasourceUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDelete',
                            id: 'datasourceDeleteU' + user.Id,
                            state: user.rules.datasourceDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceForceDisplay',
                            id: 'datasourceForceDisplayU' + user.Id,
                            state: user.rules.datasourceForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Autoriser le test des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceTest',
                            id: 'datasourceTestU' + user.Id,
                            state: user.rules.datasourceTest,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDisplayLog',
                            id: 'datasourceDisplayLogU' + user.Id,
                            state: user.rules.datasourceDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Configurations',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux configurations',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingDisplay',
                            id: 'settingDisplayU' + user.Id,
                            state: user.rules.settingDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des configurations',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingUpdate',
                            id: 'settingUpdateU' + user.Id,
                            state: user.rules.settingUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher toutes les logs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingDisplayLog',
                            id: 'settingDisplayLogU' + user.Id,
                            state: user.rules.settingDisplayLog,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Autoriser la modification du mot de passe',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingPasswordCanChange',
                            id: 'settingPasswordCanChangeU' + user.Id,
                            state: user.rules.settingPasswordCanChange,
						}
                        ]
                    }],
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', key: 'save', handler: workspaceUsers.task },
                    ]
                });

                newTab.user = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceUsers;
                newTab.propertySource = {
                    '(name)': user.username,
                    'ldapusername': user.ldapusername,
                    'description': Ext.encode({ description_resume: '', description_details: '' }),
                    'motscles': '',
                    'environnement': '',
                    'nodek': '',
                    'publiee': true
                };

                centerPanel.add(newTab);
                centerPanel.setActiveTab(newTab);
            }
            
            myMask.hide();
        });
    },

    gotoUserGroup: function(rec) {
        //workspaceUsers.set({});

        workspaceUsers.getGroup(rec.raw.Id, function(group) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.group && group.Id == tab.group.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.text,
                    iconCls: 'icon-user',
                    items :[{
                    	xtype: 'panel',
                    	frame: true,
                        title: 'Accueil',
                        bodyStyle: 'padding: 10px;',
                        style: 'margin-bottom:10px;',
                        cls: 'subform',
                        items: [
                        {
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher la page d\'accueil',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeDisplay',
                            id: 'welcomeDisplayG' + group.Id,
                            state: group.rules.welcomeDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher les états qui datent de plus de 5 jours',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeMoreFiveDays',
                            id: 'welcomeMoreFiveDaysG' + group.Id,
                            state: group.rules.welcomeMoreFiveDays,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher le nombre de téléchargement',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'welcomeCountDownload',
                            id: 'welcomeCountDownloadG' + group.Id,
                            state: group.rules.welcomeCountDownload,
                        }]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Requêtes',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
                        {
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDisplay',
                            id: 'queryDisplayG' + group.Id,
                            state: group.rules.queryDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Créer des groupe de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupCreate',
                            id: 'queryGroupCreateG' + group.Id,
                            state: group.rules.queryGroupCreate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Modifier des groupes de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupUpdate',
                            id: 'queryGroupUpdateG' + group.Id,
                            state: group.rules.queryGroupUpdate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Supprimer des groupes de requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryGroupDelete',
                            id: 'queryGroupDeleteG' + group.Id,
                            state: group.rules.queryGroupDelete,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Créer des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryCreate',
                            id: 'queryCreateG' + group.Id,
                            state: group.rules.queryCreate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Modifier des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryUpdate',
                            id: 'queryUpdateG' + group.Id,
                            state: group.rules.queryUpdate,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Supprimer des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDelete',
                            id: 'queryDeleteG' + group.Id,
                            state: group.rules.queryDelete,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Forcer l\'affichage de toutes les requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryForceDisplay',
                            id: 'queryForceDisplayG' + group.Id,
                            state: group.rules.queryForceDisplay,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Exécution des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryRun',
                            id: 'queryRunG' + group.Id,
                            state: group.rules.queryRun,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Extraire les requêtes CSV',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryExtractCSV',
                            id: 'queryExtractCSVG' + group.Id,
                            state: group.rules.queryExtractCSV,
                        },{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Afficher les logs des requêtes',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'queryDisplayLog',
                            id: 'queryDisplayLogG' + group.Id,
                            state: group.rules.queryDisplayLog,
                        },
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Rapports',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux rapports',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'reportDisplay',
                            id: 'reportDisplayG' + group.Id,
                            state: group.rules.reportDisplay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupCreate',
                            id: 'reportGroupCreateG' + group.Id,
                            state: group.rules.reportGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupUpdate',
                            id: 'reportGroupUpdateG' + group.Id,
                            state: group.rules.reportGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportGroupDelete',
                            id: 'reportGroupDeleteG' + group.Id,
                            state: group.rules.reportGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportCreate',
                            id: 'reportCreateG' + group.Id,
                            state: group.rules.reportCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportUpdate',
                            id: 'reportUpdateG' + group.Id,
                            state: group.rules.reportUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportDelete',
                            id: 'reportDeleteG' + group.Id,
                            state: group.rules.reportDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportForceDisplay',
                            id: 'reportForceDisplayG' + group.Id,
                            state: group.rules.reportForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Exécuter les rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportRun',
                            id: 'reportRunG' + group.Id,
                            state: group.rules.reportRun,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Extraire les rapports PDF',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportExtractPDF',
                            id: 'reportExtractPDFG' + group.Id,
                            state: group.rules.reportExtractPDF,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Extraire les rapports Microsoft Word',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportExtractDOC',
                            id: 'reportExtractDOCG' + group.Id,
                            state: group.rules.reportExtractDOC,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des rapports',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'reportDisplayLog',
                            id: 'reportDisplayLogG' + group.Id,
                            state: group.rules.reportDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Tâches plannifiées',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
                        	xtype: 'toggleslidefield',
                            fieldLabel: 'Accès aux tâches plannifiée',
                            onText: 'actif',
                            offText: 'inactif',
                            name: 'planningDisplay',
                            id: 'planningDisplayG' + group.Id,
                            state: group.rules.planningDisplay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupCreate',
                            id: 'planningGroupCreateG' + group.Id,
                            state: group.rules.planningGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupUpdate',
                            id: 'planningGroupUpdateG' + group.Id,
                            state: group.rules.planningGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningGroupDelete',
                            id: 'planningGroupDeleteG' + group.Id,
                            state: group.rules.planningGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningCreate',
                            id: 'planningCreateG' + group.Id,
                            state: group.rules.planningCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningUpdate',
                            id: 'planningUpdateG' + group.Id,
                            state: group.rules.planningUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningDelete',
                            id: 'planningDeleteG' + group.Id,
                            state: group.rules.planningDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningForceDisplay',
                            id: 'planningForceDisplayG' + group.Id,
                            state: group.rules.planningForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des tâches',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'planningDisplayLog',
                            id: 'planningDisplayLogG' + group.Id,
                            state: group.rules.planningDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Utilisateurs',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDisplay',
                            id: 'userDisplayG' + group.Id,
                            state: group.rules.userDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupCreate',
                            id: 'userGroupCreateG' + group.Id,
                            state: group.rules.userGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupUpdate',
                            id: 'userGroupUpdateG' + group.Id,
                            state: group.rules.userGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userGroupDelete',
                            id: 'userGroupDeleteG' + group.Id,
                            state: group.rules.userGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userCreate',
                            id: 'userCreateG' + group.Id,
                            state: group.rules.userCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userUpdate',
                            id: 'userUpdateG' + group.Id,
                            state: group.rules.userUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDelete',
                            id: 'userDeleteG' + group.Id,
                            state: group.rules.userDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userForceDisplay',
                            id: 'userForceDisplayG' + group.Id,
                            state: group.rules.userForceDisplay,
						},{
                            xtype: 'textfield',
                            fieldLabel: 'Durée de session inactive',
                            name: 'sessionInactiveDelay',
                            id: 'sessionInactiveDelayG' + group.Id,
                            value: rec.raw.rules.sessionInactiveDelay,
                        },{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Désactiver les utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userEnabled',
                            id: 'userEnabledG' + group.Id,
                            state: group.rules.userEnabled,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des utilisateurs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'userDisplayLog',
                            id: 'userDisplayLogG' + group.Id,
                            state: group.rules.userDisplayLog,
						}
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Sources de données',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDisplay',
                            id: 'datasourceDisplayG' + group.Id,
                            state: group.rules.datasourceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des groupe de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupCreate',
                            id: 'datasourceGroupCreateG' + group.Id,
                            state: group.rules.datasourceGroupCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des groupes de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupUpdate',
                            id: 'datasourceGroupUpdateG' + group.Id,
                            state: group.rules.datasourceGroupUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des groupes de sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceGroupDelete',
                            id: 'datasourceGroupDeleteG' + group.Id,
                            state: group.rules.datasourceGroupDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Créer des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceCreate',
                            id: 'datasourceCreateG' + group.Id,
                            state: group.rules.datasourceCreate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceUpdate',
                            id: 'datasourceUpdateG' + group.Id,
                            state: group.rules.datasourceUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Supprimer des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDelete',
                            id: 'datasourceDeleteG' + group.Id,
                            state: group.rules.datasourceDelete,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Forcer l\'affichage de toutes les sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceForceDisplay',
                            id: 'datasourceForceDisplayG' + group.Id,
                            state: group.rules.datasourceForceDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Autoriser le test des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceTest',
                            id: 'datasourceTestG' + group.Id,
                            state: group.rules.datasourceTest,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher les logs des sources de données',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'datasourceDisplayLog',
                            id: 'datasourceDisplayLogG' + group.Id,
                            state: group.rules.datasourceDisplayLog,
						},
                        ]
                    },{
                    	xtype: 'panel',
                    	frame: true,
                    	style: 'margin-bottom:10px;',
                        title: 'Configurations',
                        bodyStyle: 'padding: 10px',
                        cls: 'subform',
                        items: [
						{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Accès aux configurations',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingDisplay',
                            id: 'settingDisplayG' + group.Id,
                            state: group.rules.settingDisplay,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Modifier des configurations',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingUpdate',
                            id: 'settingUpdateG' + group.Id,
                            state: group.rules.settingUpdate,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Afficher toutes les logs',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingDisplayLog',
                            id: 'settingDisplayLogG' + group.Id,
                            state: group.rules.settingDisplayLog,
						},{
							xtype: 'toggleslidefield',
						    fieldLabel: 'Autoriser la modification du mot de passe',
						    onText: 'actif',
						    offText: 'inactif',
						    name: 'settingPasswordCanChange',
                            id: 'settingPasswordCanChangeG' + group.Id,
                            state: group.rules.settingPasswordCanChange,
						}
                        ]
                    }],
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', key: 'save', handler: workspaceUsers.task },
                        { text: 'Forcer l\'application sur les utilisateurs', key: 'apply', handler: workspaceUsers.task },
                    ]
                });

                newTab.group = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceUsers;
                newTab.propertySource = {
                    '(name)': group.title,
                    'ldapusername': group.title,
                    'description': Ext.encode({ description_resume: '', description_details: '' }),
                    'motscles': '',
                    'environnement': '',
                    'nodek': '',
                    'publiee': true
                };

                centerPanel.add(newTab);
                centerPanel.setActiveTab(newTab);
            }
        });
    },

    onCenterTabChange: function(tabPanel, tab) {
        if ("user" in tab) {
            workspaceUsers.current = tab.user;
            
            workspaceUsers.propertyData.setSource(tab.propertySource);
        }
    },

    itemUsers : Ext.create('Ext.tree.Panel', {
        title: 'Utilisateurs',
        store: Ext.create('Ext.data.TreeStore', {
            model: 'treeModel',
            proxy: {
                type: 'memory'
            },
        }),
        viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop'
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandler, eOpts) {
                    if ((dropPosition == "before" || dropPosition == "after") && overModel.parentNode.raw.text == "Root") {
                        if (data.records[0].raw.nodek == 'user')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupuser')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "user", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'user')
                    {
                        var user = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "user", "user", user, function(result) {
                            if (workspaceUsers.current.Id == user.id)
                            {
                                workspaceUsers.current.groupid = user.groupid;
                            }
                        });
                    }
                },
            }
        },
        rootVisible: false,

        listeners: {
            afterrender: function(component, eOpts) {
                var Mask = new Ext.LoadMask(workspaceUsers.itemUsers, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "user", "user", {}, function(result) {
                    var store = workspaceUsers.itemUsers.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspaceUsers.itemUsers, {
                        store: store
                    });

                    Mask.hide();
                });
            },
            itemdblclick: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                	workspaceUsers.gotoUser(rec);
                	
                	/*var myMask = new Ext.LoadMask(centerPanel, { msg: "Chargement en cours ..." });
                    myMask.show();
                     
                	symfony("get", "user", "user", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                		
                		
                		myMask.hide();
                    });*/
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspaceUsers.menuGroupUsers.rec = workspaceUsers.itemUsers.store.tree.root;
                workspaceUsers.menuRootGroupUsers.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                    workspaceUsers.menuUsers.rec = rec;
                    workspaceUsers.menuUsers.showAt(eventobj.getXY());
                }
                else
                {
                    Ext.getCmp('userdelete').setDisabled(false);
                    if (rec.raw.persist)
                        Ext.getCmp('userdelete').setDisabled(true);

                    workspaceUsers.menuGroupUsers.rec = rec;
                    workspaceUsers.menuGroupUsers.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspaceUsers.propertySource[key] = value;
        });
        workspaceUsers.propertyData.setSource(workspaceUsers.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspaceUsers;
        bottomPanel.hide();

        propertyPanel.removeAll();
        workspaceUsers.propertySource = {
            '(name)': 'name',
            'ldapusername': '',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'motscles': '',
            'environnement': '',
            'nodek': '',
            'publiee': true
        };


        workspaceUsers.propertyData = Ext.create('Ext.grid.property.Grid', {
            title: 'Propriétés',
            propertyNames: {
                '(name)': '(Nom)',
                'ldapusername': 'LDAP',
                'description': 'Description',
                'motscles': 'Mots clés',
                'environnement': 'Environnement',
                'nodek': 'Groupe',
                'publiee': 'Publiée'
            },
            listeners: {
                propertychange: function(source, recordId, value, oldValue) {
                    if (recordId == '(name)') {
                        var tab = centerPanel.getActiveTab();
                        tab.rec.set('text', value);
                        tab.rec.raw.text = value;
                        tab.rec.raw.username = value;
                        tab.rec.commit();

                        tab.setTitle(value);
                    }
                }
            },
            customEditors: {
                description: { xtype: 'descriptionfield' },
                groupe: { xtype: 'combobox' },
                environnement: { xtype: 'combobox' }
            },
            customRenderers: {
                description: function( v ) {
                    var value = Ext.decode( v ),
                        description_details = value.description_details,
                        description_resume = value.description_resume,
                        description='';
                    description += '<b>' + description_resume + '</b>: ';
                    description += '<i>' + description_details + '</i>';
                    return description;
                },
            },
            source: workspaceUsers.propertySource,
        });
        propertyPanel.add(workspaceUsers.propertyData);
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspaceUsers.propertyData);


        var gridColumns = Ext.create('Ext.grid.Panel', {
            columnLines : true,
            columns: [
                {
                    text: 'Ordre',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
                {
                    text: 'Nom SQL',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
                {
                    text: 'Titre de la colonne',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
                {
                    text: 'Cadrage',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
                {
                    text: 'Format de date',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
                {
                    text: 'Largeur de la colonne',
                    flex: 1,
                    sortable: 1,
                    //dataIndex: 'name'
                },
            ]
        });

        var gridResults = Ext.create('Ext.grid.Panel', {
            columnLines : true,
            columns: [
                {
                    text: 'Ordre',
                    flex: 1,
                    sortable: 1,
                },
                {
                    text: 'Nom SQL',
                    flex: 1,
                    sortable: 1,
                },
            ]
        });


        bottomPanel.removeAll();
        var parametreColonnes = Ext.create('Ext.Panel', {
            title: 'Paramètres d\'affichage des colonnes',
            iconCls: 'tabs',
            closable: false,
            items : [
                gridColumns
            ]
        });

        var resultatsRequetes = Ext.create('Ext.Panel', {
            title: 'Résultats utilisateurs',
            iconCls: 'tabs',
            html: 'center south',
            closable: false,
            items : [
                gridResults
            ]
        });

        bottomPanel.add(parametreColonnes);
        bottomPanel.add(resultatsRequetes);

        bottomPanel.setActiveTab(parametreColonnes);

        run();
    },

    getUser: function(id, func) {
        symfony("get", "user", "user", { id: id }, function(user) {
            if (workspaceUsers.users[user.data.Id] === undefined) workspaceUsers.users[user.data.Id] = {};
            func(user.data);
        });
    },
    
    getGroup: function(id, func) {
        symfony("get", "group", "user", { id: id }, function(group) {
            if (workspaceUsers.groups[group.data.Id] === undefined) workspaceUsers.groups[group.data.Id] = {};
            func(group.data);
        });
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
            	var tab = centerPanel.getActiveTab();
            	
            	var L = 'G';
            	if (tab.rec.raw.nodek == 'user')
            	{
            		L = 'U';
            	}
            	
            	var curId = tab.rec.raw.Id;
            	
                var rules = {
                	welcomeDisplay: Ext.getCmp('welcomeDisplay' + L + curId).value,
                	welcomeMoreFiveDays: Ext.getCmp('welcomeMoreFiveDays' + L + curId).value,
                	welcomeCountDownload: Ext.getCmp('welcomeCountDownload' + L + curId).value,
                	queryDisplay: Ext.getCmp('queryDisplay' + L + curId).value,
                	queryCreate: Ext.getCmp('queryCreate' + L + curId).value,
                	queryUpdate: Ext.getCmp('queryUpdate' + L + curId).value,
                	queryDelete: Ext.getCmp('queryDelete' + L + curId).value,
                	queryGroupCreate: Ext.getCmp('queryGroupCreate' + L + curId).value,
                	queryGroupUpdate: Ext.getCmp('queryGroupUpdate' + L + curId).value,
                	queryGroupDelete: Ext.getCmp('queryGroupDelete' + L + curId).value,
                	queryForceDisplay: Ext.getCmp('queryForceDisplay' + L + curId).value,
                	reportDisplay: Ext.getCmp('reportDisplay' + L + curId).value,
                	reportCreate: Ext.getCmp('reportCreate' + L + curId).value,
                	reportUpdate: Ext.getCmp('reportUpdate' + L + curId).value,
                	reportDelete: Ext.getCmp('reportDelete' + L + curId).value,
                	reportGroupCreate: Ext.getCmp('reportGroupCreate' + L + curId).value,
                	reportGroupUpdate: Ext.getCmp('reportGroupUpdate' + L + curId).value,
                	reportGroupDelete: Ext.getCmp('reportGroupDelete' + L + curId).value,
                	reportForceDisplay: Ext.getCmp('reportForceDisplay' + L + curId).value,
                	planningDisplay: Ext.getCmp('planningDisplay' + L + curId).value,
                	planningCreate: Ext.getCmp('planningCreate' + L + curId).value,
                	planningUpdate: Ext.getCmp('planningUpdate' + L + curId).value,
                	planningDelete: Ext.getCmp('planningDelete' + L + curId).value,
                	planningGroupCreate: Ext.getCmp('planningGroupCreate' + L + curId).value,
                	planningGroupUpdate: Ext.getCmp('planningGroupUpdate' + L + curId).value, 
                	planningGroupDelete: Ext.getCmp('planningGroupDelete' + L + curId).value,
                	planningForceDisplay: Ext.getCmp('planningForceDisplay' + L + curId).value,
                	userDisplay: Ext.getCmp('userDisplay' + L + curId).value,
                	userCreate: Ext.getCmp('userCreate' + L + curId).value,
                	userUpdate: Ext.getCmp('userUpdate' + L + curId).value,
                	userDelete: Ext.getCmp('userDelete' + L + curId).value,
                	userGroupCreate: Ext.getCmp('userGroupCreate' + L + curId).value,
                	userGroupUpdate: Ext.getCmp('userGroupUpdate' + L + curId).value,
                	userGroupDelete: Ext.getCmp('userGroupDelete' + L + curId).value,
                	userForceDisplay: Ext.getCmp('userForceDisplay' + L + curId).value,
                	datasourceDisplay: Ext.getCmp('datasourceDisplay' + L + curId).value,
                	datasourceCreate: Ext.getCmp('datasourceCreate' + L + curId).value,
                	datasourceUpdate: Ext.getCmp('datasourceUpdate' + L + curId).value,
                	datasourceDelete: Ext.getCmp('datasourceDelete' + L + curId).value,
                	datasourceGroupCreate: Ext.getCmp('datasourceGroupCreate' + L + curId).value,
                	datasourceGroupUpdate: Ext.getCmp('datasourceGroupUpdate' + L + curId).value,
                	datasourceGroupDelete: Ext.getCmp('datasourceGroupDelete' + L + curId).value,
                	datasourceForceDisplay: Ext.getCmp('datasourceForceDisplay' + L + curId).value,
                	settingDisplay: Ext.getCmp('settingDisplay' + L + curId).value,
                	settingUpdate: Ext.getCmp('settingUpdate' + L + curId).value,
                	queryRun: Ext.getCmp('queryRun' + L + curId).value,
                	reportRun: Ext.getCmp('reportRun' + L + curId).value,
                	userEnabled: Ext.getCmp('userEnabled' + L + curId).value,
                	queryExtractCSV: Ext.getCmp('queryExtractCSV' + L + curId).value,
                	reportExtractPDF: Ext.getCmp('reportExtractPDF' + L + curId).value,
                	reportExtractDOC: Ext.getCmp('reportExtractDOC' + L + curId).value,
                	datasourceTest: Ext.getCmp('datasourceTest' + L + curId).value,
                	datasourceDisplayLog: Ext.getCmp('datasourceDisplayLog' + L + curId).value,    
                	queryDisplayLog: Ext.getCmp('queryDisplayLog' + L + curId).value,
                	reportDisplayLog: Ext.getCmp('reportDisplayLog' + L + curId).value,
                	planningDisplayLog: Ext.getCmp('planningDisplayLog' + L + curId).value,
                	userDisplayLog: Ext.getCmp('userDisplayLog' + L + curId).value,
                	settingDisplayLog: Ext.getCmp('settingDisplayLog' + L + curId).value,
                	sessionInactiveDelay: Ext.getCmp('sessionInactiveDelay' + L + curId).value,
                	settingPasswordCanChange: Ext.getCmp('settingPasswordCanChange' + L + curId).value,
                	
                	userid: (L=='U')?curId:0,
                	usergroupid: (L=='G')?curId:0,
                };
                
                var obj = {};
                var tosave = '';
                
                if (L=='G')
                {
	                obj = {
	                	id: curId,
	                	rules: rules
	                };
	                
	                tosave = 'group';
                }
                
                if (L=='U')
                {
                	var username = workspaceUsers.propertyData.source['(name)'];
                    workspaceUsers.current.username = username;
                    workspaceUsers.current.ldapusername = workspaceUsers.propertyData.source['ldapusername'];
                	
	                obj = {
	                    id: workspaceUsers.current.Id,
	                    username: workspaceUsers.current.username,
	                    ldapusername: workspaceUsers.current.ldapusername,
	                    groupid: workspaceUsers.current.groupid,
	                    rules: rules
	                };
	                
	                tosave = 'user';
                }

                var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
                myMask.show();
                
                symfony("save", tosave, "user", obj, function(response) {
                	myMask.hide();
                });

                break;
            }
        }
    }
};

