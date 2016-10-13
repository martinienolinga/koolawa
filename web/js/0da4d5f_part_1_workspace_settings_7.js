
var clipboardSettings = undefined;

var workspaceSettings = {
    name: "settings",
    current: null,
    settings: [],
    propertyData: null,
    properySource: null,

    init: function() {
        Ext.define('treeModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'nodek', type: 'string' },
                { name: 'text', type: 'string' },
                { name: 'groupid', type: 'int' },
            ]
        });
    },
 
    menuSettings: new Ext.menu.Menu({
        items: [
            { text: 'Modifier la configuration', key: 'modsetting' },
            { text: 'Supprimer la configuration', key: 'delsetting' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copysetting' },
            { text: 'Couper', key: 'cutsetting' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'modsetting':
                    {
                        workspaceSettings.gotoSetting(workspaceSettings.menuSettings.rec);
                        break;
                    }

                    case 'delsetting':
                    {
                        var rec = workspaceSettings.menuSettings.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de configuration',
                            msg: 'Etes-vous certain de vouloir supprimer la configuration [ ' + rec.raw.title + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceSettings.itemSettings, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "setting", "setting", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceSettings.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copysetting':
                    {
                        workspaceSettings.copy(workspaceSettings.menuSettings.rec);
                        break;
                    }

                    case 'cutsetting':
                    {
                        workspaceSettings.cut(workspaceSettings.menuSettings.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupSettings: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup' },
            { text: 'Couper', key: 'cutgroup' },
            { id: 'settingpaste', text: 'Coller', key: 'paste', disabled: true },
            { xtype: 'menuseparator' },
            { text: 'Ajouter une configuration', key: 'addsetting' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspaceSettings.copy(workspaceSettings.menuGroupSettings.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspaceSettings.cut(workspaceSettings.menuGroupSettings.rec);
                        break;
                    }

                    case 'addsetting':
                    {
                        workspaceSettings.newSetting(workspaceSettings.menuGroupSettings.rec);
                        break;
                    }
                
                    case 'paste':
                    {
                        workspaceSettings.paste(workspaceSettings.menuGroupSettings.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspaceSettings.groupForm.load("Nouveau groupe", "new", workspaceSettings.menuGroupSettings.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspaceSettings.groupForm.load("Modifier un groupe", "update", workspaceSettings.menuGroupSettings.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspaceSettings.menuGroupSettings.rec;

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
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceSettings.itemSettings, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "setting", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceSettings.autoCloseCenterTab();
                                        
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
        clipboardSettings = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('settingpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupsetting') Ext.getCmp('settingpasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardSettings = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('settingpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupsetting') Ext.getCmp('settingpasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardSettings.item;

        if (clipboardSettings.action == 'cut')
        {
            if (clipboardSettings.item.raw.nodek == 'setting')
            {
                var setting = {
                    id: clipboardSettings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "setting", "setting", setting, function(result) {
                    if (workspaceSettings.current != null && workspaceSettings.current.Id == setting.id)
                    {
                        workspaceSettings.current.groupid = setting.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardSettings.item.raw.nodek == 'groupsetting')
            {
                var group = {
                    id: clipboardSettings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "setting", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardSettings.item.raw.nodek == 'setting')
            {
                var setting = {
                    id: clipboardSettings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "setting", "setting", setting, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardSettings.item.raw.nodek == 'groupsetting')
            {
                var group = {
                    id: clipboardSettings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "setting", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardSettings = null;
        Ext.getCmp('settingpaste').setDisabled(true);
        Ext.getCmp('settingpasteroot').setDisabled(true);
    },

    menuRootGroupSettings: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'settingpasteroot', text: 'Coller', key: 'paste', disabled: true }
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspaceSettings.groupForm.load("Nouveau groupe", "new", workspaceSettings.menuGroupSettings.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspaceSettings.paste(workspaceSettings.menuGroupSettings.rec);
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
                cur = {raw: { Id: 0, title: "", text: ""}};
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
                width: 500,
                height: 400,
                title: title,
                floating: true,
                closable : true,
                modal: true,
                frame: true,
                bodyStyle: 'padding: 10px 10px 0 10px; background-color:#dfeaf2',
                layout     : {
                    type  : 'vbox',
                    align : 'stretch'
                },
                items: [
                {
                    id: "name",
                    xtype: 'textfield',
                    fieldLabel: 'Name',
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
                        title: 'Info',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Country',
                            name: 'country'
                        }]
                    },{
                        title: 'Contact',
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
            
                        group = {
                            id: cur.raw.Id,
                            title: title,
                            groupid: groupid
                        };

                        symfony("save", "group", "setting", group, function(result) {
                            if (opts == "new")
                            {
                                prt.insertChild(-1, { 
                                    Id: result.data.Id, 
                                    title: group.title, 
                                    text: group.title 
                                });
                                if (!prt.isExpanded()) prt.expand();
                            }

                            if (opts == "update")
                            {
                                cur.set('text', group.title);
                                cur.raw.text = group.title;
                                cur.raw.title = group.title;
                                cur.commit();
                            }

                            formgroup.close();
                        });
                    }
                },{
                    text: 'Annuler',
                    handler: function() {
                        formgroup.close();
                    }
                }]
            });

            return formgroup;
        }
    },

    autoCloseCenterTab: function() {
        centerPanel.items.each(function(tab, index, totalcount) {
            if ("setting" in tab && tab.setting.Id != 0) {
                var setting = {
                    id: tab.setting.Id
                };

                symfony("exists", "setting", "setting", setting, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspaceSettings.current.Id == setting.id)
                        {
                            workspaceSettings.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },

    newSetting: function(group) {
        var setting = {
            groupid: group.raw.Id,
            title: "Nouvelle configuration",
        };  
        
        symfony("save", "setting", "setting", setting, function(result) {
            var rec = group.insertChild(-1, result.data);
            workspaceSettings.gotoSetting(rec);
        });
    },

    gotoSetting: function(rec) {
        //workspaceSettings.set({});

        workspaceSettings.getSetting(rec.raw.Id, function(setting) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.setting && setting.Id == tab.setting.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.text,
                    iconCls: 'icon-setting',
                    html: "contenu",
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', key: 'save', handler: workspaceSettings.task },
                        { text: 'Analyser', key: 'analyse', handler: workspaceSettings.task },
                        { text: 'Exécuter', key: 'run', handler: workspaceSettings.task }
                    ]
                });

                newTab.setting = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceSettings;
                newTab.propertySource = {
                    '(name)': setting.title,
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
        if ("setting" in tab) {
            workspaceSettings.current = tab.setting;
            
            workspaceSettings.propertyData.setSource(tab.propertySource);
        }
    },

    itemSettings : Ext.create('Ext.tree.Panel', {
        title: 'Configurations',
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
                        if (data.records[0].raw.nodek == 'setting')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupsetting')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "setting", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'setting')
                    {
                        var setting = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "setting", "setting", setting, function(result) {
                            if (workspaceSettings.current.Id == setting.id)
                            {
                                workspaceSettings.current.groupid = setting.groupid;
                            }
                        });
                    }
                },
            }
        },
        rootVisible: false,

        listeners: {
            afterrender: function(component, eOpts) {
                var Mask = new Ext.LoadMask(workspaceSettings.itemSettings, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "setting", "setting", {}, function(result) {
                    var store = workspaceSettings.itemSettings.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspaceSettings.itemSettings, {
                        store: store
                    });

                    Mask.hide();
                });
            },
            itemdblclick: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                	var myMask = new Ext.LoadMask(centerPanel, { msg: "Chargement en cours ..." });
                    myMask.show();
                     
                	symfony("get", "setting", "setting", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                        workspaceSettings.gotoSetting(rec);
                        
                        myMask.hide();
                    });
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspaceSettings.menuGroupSettings.rec = workspaceSettings.itemSettings.store.tree.root;
                workspaceSettings.menuRootGroupSettings.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                    workspaceSettings.menuSettings.rec = rec;
                    workspaceSettings.menuSettings.showAt(eventobj.getXY());
                }
                else
                {
                    workspaceSettings.menuGroupSettings.rec = rec;
                    workspaceSettings.menuGroupSettings.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspaceSettings.propertySource[key] = value;
        });
        workspaceSettings.propertyData.setSource(workspaceSettings.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspaceSettings;
        bottomPanel.hide();

        propertyPanel.removeAll();
        workspaceSettings.propertySource = {
            '(name)': 'name',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'motscles': '',
            'environnement': '',
            'nodek': '',
            'publiee': true
        };


        workspaceSettings.propertyData = Ext.create('Ext.grid.property.Grid', {
            title: 'Propriétés',
            propertyNames: {
                '(name)': '(Nom)',
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
                        tab.rec.raw.title = value;
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
            source: workspaceSettings.propertySource,
        });
        propertyPanel.add(workspaceSettings.propertyData);
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspaceSettings.propertyData);


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
            title: 'Résultats configurations',
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

    getSetting: function(id, func) {
        symfony("get", "setting", "setting", { id: id }, function(setting) {
            //workspaceSettings.current = setting;
            if (workspaceSettings.settings[setting.data.Id] === undefined) workspaceSettings.settings[setting.data.Id] = {};

            func(setting.data);
        });
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                var title = workspaceSettings.propertyData.source['(name)'];
                workspaceSettings.current.title = title;

                var setting = {
                    id: workspaceSettings.current.Id,
                    title: workspaceSettings.current.title,
                    groupid: workspaceSettings.current.groupid
                };

                var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
                myMask.show();
                
                symfony("save", "setting", "setting", setting, function(response) {
                    //
                	
                	myMask.hide();
                });


                break;
            }
        }
    }
};

