
var clipboardDatasources = undefined;

var workspaceDatasources = {
    name: "datasources",
    current: null,
    datasources: [],
    propertyData: null,
    properySource: null,

    init: function() {
        Ext.define('datasourceModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'groupid', type: 'int' },
                { name: 'driver', type: 'string' },
                { name: 'host', type: 'string' },
                { name: 'datastore', type: 'string' },
                { name: 'user', type: 'string' },
                { name: 'password', type: 'string' },
            ]
        });

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

    drivers: Ext.create('Ext.data.Store', {
        fields: ['title', 'value'],
        data : [
            { 'title': "MySQL", 'value': "MYSQL" },
            { 'title': "Microsoft SQLServer", 'value': "MSSQL" },
            { 'title': "Oracle", 'value': "ORACLE" },
            { 'title': "PostgreSQL", 'value': "PGSQL" },
        ]
    }),
        
    menuDatasources: new Ext.menu.Menu({
        items: [
            { text: 'Modifier la source de données', key: 'moddatasource' },
            { text: 'Supprimer la source de données', key: 'deldatasource' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copydatasource' },
            { text: 'Couper', key: 'cutdatasource' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'moddatasource':
                    {
                        workspaceDatasources.gotoDatasource(workspaceDatasources.menuDatasources.rec);
                        break;
                    }

                    case 'deldatasource':
                    {
                        var rec = workspaceDatasources.menuDatasources.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de source de données',
                            msg: 'Etes-vous certain de vouloir supprimer la source de données [ ' + rec.raw.title + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceDatasources.itemDatasources, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "datasource", "datasource", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceDatasources.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copydatasource':
                    {
                        workspaceDatasources.copy(workspaceDatasources.menuDatasources.rec);
                        break;
                    }

                    case 'cutdatasource':
                    {
                        workspaceDatasources.cut(workspaceDatasources.menuDatasources.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupDatasources: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup' },
            { text: 'Couper', key: 'cutgroup' },
            { id: 'datasourcepaste', text: 'Coller', key: 'paste', disabled: true },
            { xtype: 'menuseparator' },
            { text: 'Ajouter une source de données', key: 'adddatasource' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspaceDatasources.copy(workspaceDatasources.menuGroupDatasources.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspaceDatasources.cut(workspaceDatasources.menuGroupDatasources.rec);
                        break;
                    }

                    case 'adddatasource':
                    {
                        workspaceDatasources.newDatasource(workspaceDatasources.menuGroupDatasources.rec);
                        break;
                    }
                
                    case 'paste':
                    {
                        workspaceDatasources.paste(workspaceDatasources.menuGroupDatasources.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspaceDatasources.groupForm.load("Nouveau groupe", "new", workspaceDatasources.menuGroupDatasources.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspaceDatasources.groupForm.load("Modifier un groupe", "update", workspaceDatasources.menuGroupDatasources.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspaceDatasources.menuGroupDatasources.rec;

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
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceDatasources.itemDatasources, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "datasource", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceDatasources.autoCloseCenterTab();
                                        
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
        clipboardDatasources = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('datasourcepaste').setDisabled(false);
        if (rec.raw.nodek == 'groupdatasource') Ext.getCmp('datasourcepasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardDatasources = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('datasourcepaste').setDisabled(false);
        if (rec.raw.nodek == 'groupdatasource') Ext.getCmp('datasourcepasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardDatasources.item;

        if (clipboardDatasources.action == 'cut')
        {
            if (clipboardDatasources.item.raw.nodek == 'datasource')
            {
                var datasource = {
                    id: clipboardDatasources.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "datasource", "datasource", datasource, function(result) {
                    if (workspaceDatasources.current != null && workspaceDatasources.current.Id == datasource.id)
                    {
                        workspaceDatasources.current.groupid = datasource.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardDatasources.item.raw.nodek == 'groupdatasource')
            {
                var group = {
                    id: clipboardDatasources.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "datasource", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardDatasources.item.raw.nodek == 'datasource')
            {
                var datasource = {
                    id: clipboardDatasources.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "datasource", "datasource", datasource, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardDatasources.item.raw.nodek == 'groupdatasource')
            {
                var group = {
                    id: clipboardDatasources.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "datasource", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardDatasources = null;
        Ext.getCmp('datasourcepaste').setDisabled(true);
        Ext.getCmp('datasourcepasteroot').setDisabled(true);
    },

    menuRootGroupDatasources: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'datasourcepasteroot', text: 'Coller', key: 'paste', disabled: true }
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspaceDatasources.groupForm.load("Nouveau groupe", "new", workspaceDatasources.menuGroupDatasources.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspaceDatasources.paste(workspaceDatasources.menuGroupDatasources.rec);
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

                        symfony("save", "group", "datasource", group, function(result) {
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
            if ("datasource" in tab && tab.datasource.Id != 0) {
                var datasource = {
                    id: tab.datasource.Id
                };

                symfony("exists", "datasource", "datasource", datasource, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspaceDatasources.current.Id == datasource.id)
                        {
                            workspaceDatasources.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },

    newDatasource: function(group) {
        var datasource = {
            groupid: group.raw.Id,
            title: "Nouvelle source de données",
        };  
        
        symfony("save", "datasource", "datasource", datasource, function(result) {
            var rec = group.insertChild(-1, result.data);
            workspaceDatasources.gotoDatasource(rec);
        });
    },

    gotoDatasource: function(rec) {
        //workspaceDatasources.set({});

        workspaceDatasources.getDatasource(rec.raw.Id, function(datasource) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.datasource && datasource.Id == tab.datasource.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.text,
                    iconCls: 'icon-database',
                    html: "contenu",
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', key: 'save', handler: workspaceDatasources.task },
                        { text: 'Tester', key: 'test', handler: workspaceDatasources.task },
                    ]
                });

                newTab.datasource = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceDatasources;
                newTab.propertySource = {
                    '(name)': datasource.title,
                    'description': Ext.encode({ description_resume: '', description_details: '' }),
                    'driver': 'ORACLE',
                    'host': datasource.host,
                    'datastore': datasource.datastore,
                    'user': datasource.user,
                    'password': datasource.password,
                };

                centerPanel.add(newTab);
                centerPanel.setActiveTab(newTab);
            }
        });
    },

    onCenterTabChange: function(tabPanel, tab) {
        if ("datasource" in tab) {
            workspaceDatasources.current = tab.datasource;
            
            workspaceDatasources.propertyData.setSource(tab.propertySource);
        }
    },

    itemDatasources : Ext.create('Ext.tree.Panel', {
        title: 'Sources de données',
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
                        if (data.records[0].raw.nodek == 'datasource')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupdatasource')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "datasource", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'datasource')
                    {
                        var datasource = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "datasource", "datasource", datasource, function(result) {
                            if (workspaceDatasources.current.Id == datasource.id)
                            {
                                workspaceDatasources.current.groupid = datasource.groupid;
                            }
                        });
                    }
                },
            }
        },
        rootVisible: false,

        listeners: {
            afterrender: function(component, eOpts) {
                var Mask = new Ext.LoadMask(workspaceDatasources.itemDatasources, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "datasource", "datasource", {}, function(result) {
                    var store = workspaceDatasources.itemDatasources.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspaceDatasources.itemDatasources, {
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
                     
                	symfony("get", "datasource", "datasource", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                        workspaceDatasources.gotoDatasource(rec);
                        
                        myMask.hide();
                    });
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspaceDatasources.menuGroupDatasources.rec = workspaceDatasources.itemDatasources.store.tree.root;
                workspaceDatasources.menuRootGroupDatasources.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                    workspaceDatasources.menuDatasources.rec = rec;
                    workspaceDatasources.menuDatasources.showAt(eventobj.getXY());
                }
                else
                {
                    workspaceDatasources.menuGroupDatasources.rec = rec;
                    workspaceDatasources.menuGroupDatasources.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspaceDatasources.propertySource[key] = value;
        });
        workspaceDatasources.propertyData.setSource(workspaceDatasources.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspaceDatasources;
        bottomPanel.hide();

        propertyPanel.removeAll();
        workspaceDatasources.propertySource = {
            '(name)': 'name',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'driver': '',
            'host': '',
            'datastore': '',
            'user': '',
            'password': '',
        };


        workspaceDatasources.propertyData = Ext.create('Ext.grid.property.Grid', {
            title: 'Propriétés',
            sortableColumns: false,
            propertyNames: {
                '(name)': '(Nom)',
                'description': 'Description',
                'driver': 'Pilote',
                'host': 'Hôte',
                'datastore': 'Schéma',
                'user': 'Utilisateur',
                'password': 'Mot de passe'
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
                driver: Ext.create('Ext.form.ComboBox', {                       
                    store: workspaceDatasources.drivers,
                    queryMode: 'local',
                    displayField: 'title',
                    valueField: 'value'    
                }),
                password: { inputType: 'password' },
            },
            customRenderers: {
                driver: function (v) {
                    workspaceDatasources.drivers.findBy(function(record) {
                        if (record.get('value') === v) {
                            v = record.get('title');
                            return true;
                        }
                    });
                    return v;
                },
                description: function( v ) {
                    var value = Ext.decode( v ),
                        description_details = value.description_details,
                        description_resume = value.description_resume,
                        description='';
                    description += '<b>' + description_resume + '</b>: ';
                    description += '<i>' + description_details + '</i>';
                    return description;
                },
                password: function( v ) {
                    return Array(v.length).join("*");
                }
            },
            source: workspaceDatasources.propertySource,
        });
        propertyPanel.add(workspaceDatasources.propertyData);
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspaceDatasources.propertyData);


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
            title: 'Résultats sources de données',
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

    getDatasource: function(id, func) {
        symfony("get", "datasource", "datasource", { id: id }, function(datasource) {
            //workspaceDatasources.current = datasource;
            if (workspaceDatasources.datasources[datasource.data.Id] === undefined) workspaceDatasources.datasources[datasource.data.Id] = {};

            func(datasource.data);
        });
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                var title = workspaceDatasources.propertyData.source['(name)'];
                workspaceDatasources.current.title = title;
                workspaceDatasources.current.driver = workspaceDatasources.propertyData.source['driver'];
                workspaceDatasources.current.host = workspaceDatasources.propertyData.source['host'];
                workspaceDatasources.current.datastore = workspaceDatasources.propertyData.source['datastore'];
                workspaceDatasources.current.user = workspaceDatasources.propertyData.source['user'];
                workspaceDatasources.current.password = workspaceDatasources.propertyData.source['password'];

                var datasource = {
                    id: workspaceDatasources.current.Id,
                    title: workspaceDatasources.current.title,
                    groupid: workspaceDatasources.current.groupid,
                    driver: workspaceDatasources.current.driver,
                    host: workspaceDatasources.current.host,
                    datastore: workspaceDatasources.current.datastore,
                    user: workspaceDatasources.current.user,
                    password: workspaceDatasources.current.password
                };

                var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
                myMask.show();
                
                symfony("save", "datasource", "datasource", datasource, function(response) {
                    //
                	
                	myMask.hide();
                });


                break;
            }
        }
    }
};

