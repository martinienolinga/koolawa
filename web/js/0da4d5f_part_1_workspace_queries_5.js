function parseSQLCode(Id) {
    var mime = 'text/x-mariadb';

    workspaceQueries.queries[Id].editor = CodeMirror.fromTextArea(document.getElementById('codesql' + Id), {
        mode: mime,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets : true,
        autofocus: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        hintOptions: { tables: {
            users: { name: null, score: null, birthDate: null },
            countries: { name: null, population: null, size: null }
        }}
    });
}

var clipboardQueries = undefined;

var workspaceQueries = {
    name: "queries",
    current: null,
    currentTab: null,
    queries: [],
    propertyData: null,
    properySource: null,
    
    init: function() {
        Ext.define('variableModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'type', type: 'string' },
                { name: 'value', type: 'string' },
            ]
        });

        Ext.define('queryModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'alias', type: 'string' },
                { name: 'groupid', type: 'int' },
                { name: 'content', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'motscles', type: 'string' },
                { name: 'datasourceid', type: 'string' },
                { name: 'publiee', type: 'boolean' },
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
 
    menuQueries: new Ext.menu.Menu({
        items: [
            { text: 'Modifier la requête', key: 'modquery' },
            { text: 'Supprimer la requête', key: 'delquery' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copyquery', iconCls: 'icon-copy' },
            { text: 'Couper', key: 'cutquery', iconCls: 'icon-cut' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'modquery':
                    {
                        workspaceQueries.gotoQuery(workspaceQueries.menuQueries.rec);
                        break;
                    }

                    case 'delquery':
                    {
                        var rec = workspaceQueries.menuQueries.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de requête',
                            msg: 'Etes-vous certain de vouloir supprimer la requête [ ' + rec.raw.alias + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceQueries.itemQueries, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "query", "query", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceQueries.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copyquery':
                    {
                        workspaceQueries.copy(workspaceQueries.menuQueries.rec);
                        break;
                    }

                    case 'cutquery':
                    {
                        workspaceQueries.cut(workspaceQueries.menuQueries.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupQueries: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup', iconCls: 'icon-copy-folder' },
            { text: 'Couper', key: 'cutgroup', iconCls: 'icon-cut' },
            { id: 'querypaste', text: 'Coller', key: 'paste', disabled: true, iconCls: 'icon-paste' },
            { xtype: 'menuseparator' },
            { text: 'Ajouter une requête', key: 'addquery' },
        ],
        listeners: {
            click: function(menu, item) {
                //alert(item.text);
                //Ext.Msg.alert('Status', 'Changes saved successfully.');

                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspaceQueries.copy(workspaceQueries.menuGroupQueries.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspaceQueries.cut(workspaceQueries.menuGroupQueries.rec);
                        break;
                    }

                    case 'addquery':
                    {
                        workspaceQueries.newQuery(workspaceQueries.menuGroupQueries.rec);
                        break;
                    }
                
                    case 'paste':
                    {
                        workspaceQueries.paste(workspaceQueries.menuGroupQueries.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspaceQueries.groupForm.load("Nouveau groupe", "new", workspaceQueries.menuGroupQueries.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspaceQueries.groupForm.load("Modifier un groupe", "update", workspaceQueries.menuGroupQueries.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspaceQueries.menuGroupQueries.rec;

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
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceQueries.itemQueries, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "query", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceQueries.autoCloseCenterTab();
                                        
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
        clipboardQueries = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('querypaste').setDisabled(false);
        if (rec.raw.nodek == 'groupquery') Ext.getCmp('querypasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardQueries = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('querypaste').setDisabled(false);
        //showobject(rec);
        if (rec.raw.nodek == 'groupquery') Ext.getCmp('querypasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardQueries.item;

        if (clipboardQueries.action == 'cut')
        {
            if (clipboardQueries.item.raw.nodek == 'query')
            {
                var query = {
                    id: clipboardQueries.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "query", "query", query, function(result) {
                    if (workspaceQueries.current != null && workspaceQueries.current.Id == query.id)
                    {
                        workspaceQueries.current.groupid = query.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardQueries.item.raw.nodek == 'groupquery')
            {
                var group = {
                    id: clipboardQueries.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "query", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardQueries.item.raw.nodek == 'query')
            {
                var query = {
                    id: clipboardQueries.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "query", "query", query, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardQueries.item.raw.nodek == 'groupquery')
            {
                var group = {
                    id: clipboardQueries.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "query", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardQueries = null;
        Ext.getCmp('querypaste').setDisabled(true);
        Ext.getCmp('querypasteroot').setDisabled(true);
    },

    menuRootGroupQueries: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'querypasteroot', text: 'Coller', key: 'paste', disabled: true, iconCls: 'icon-paste' }
        ],
        listeners: {
            click: function(menu, item) {
                //alert(item.text);
                //Ext.Msg.alert('Status', 'Changes saved successfully.');

                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspaceQueries.groupForm.load("Nouveau groupe", "new", workspaceQueries.menuGroupQueries.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspaceQueries.paste(workspaceQueries.menuGroupQueries.rec);
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

                        symfony("save", "group", "query", group, function(result) {
                            if (opts == "new")
                            {
                                prt.insertChild(-1, { 
                                    Id: result.data.Id, 
                                    title: group.title, 
                                    text: group.title,
                                    iconCls: 'tree-folder' 
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
            if ("query" in tab && tab.query.Id != 0) {
                var query = {
                    id: tab.query.Id
                };

                symfony("exists", "query", "query", query, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspaceQueries.current.Id == query.id)
                        {
                            workspaceQueries.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },

    newQuery: function(group) {
        var query = {
            groupid: group.raw.Id,
            title: "Nouvelle requête",
            content: "select * from table;"
        };  
        
        symfony("save", "query", "query", query, function(result) {
            var rec = group.insertChild(-1, result.data.Id);
            workspaceQueries.gotoQuery(rec);
        });
    },

    gotoQuery: function(rec) {
        //workspaceQueries.set({});

        workspaceQueries.getQuery(rec.raw.Id, function(query) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.query && query.Id == tab.query.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                    //workspaceQueries.propertyData.setSource(tab.propertySource);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.alias,
                    iconCls: 'icon-sql',
                    html: "<textarea id='codesql" + query.Id + "' name='codesql'>" + query.content + "</textarea>",
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', iconCls: 'icon-save', key: 'save', handler: workspaceQueries.task },
                        { text: 'Analyser', iconCls: 'icon-analyse', key: 'analyse', handler: workspaceQueries.task },
                        { text: 'Exécuter', iconCls: 'icon-run', key: 'run', handler: workspaceQueries.task },
                        { text: 'Exporter', iconCls: 'icon-run', key: 'run', handler: workspaceQueries.task, region: 'east' }
                    ]
                });

                newTab.query = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceQueries;
                newTab.propertySource = {
                    '(name)': query.title,
                    'alias' : query.alias,
                    'description': Ext.encode({ description_resume: '', description_details: '' }),
                    
                    'motscles': query.motscles,
                    'datasourceid': query.datasourceid,
                    'publiee': query.publiee
                };

                //var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
                //myMask.show();

                symfony("get", "columns", "query", { id: rec.raw.Id }, function(response) {
                    var data = [];
                    var dataresult = [];
                    $.each(response.data, function(key, value){
                        data.push(value);
                        if (value.printed)
                            dataresult.push(value);
                    });

                    newTab.columnSource = Ext.create('Ext.data.Store', {
                        fields: ['Id', 'type', 'table', 'name', 'len', 'precision', 'ordre', 'displayed', 'printed', 'width'],
                        data: data
                    });

                    newTab.coldata = dataresult;
                    
                    centerPanel.add(newTab);
                    centerPanel.setActiveTab(newTab);
                    //alert(query.Id);
                    parseSQLCode(query.Id);

                });


                //centerPanel.add(newTab);
                //centerPanel.setActiveTab(newTab);

               // parseSQLCode(query.Id);

                /*workspaceQueries.setProperties({
                    '(name)': query.title
                });*/
                //workspaceQueries.propertyData.setSource(newTab.propertySource);
            }
        });
    },

    onCenterTabChange: function(tabPanel, tab) {
        if ("query" in tab) {
            workspaceQueries.current = tab.query;
            
            workspaceQueries.propertyData.setSource(tab.propertySource);
            //workspaceQueries.propertyData.getView().refresh();

            workspaceQueries.gridColumns.unbindStore();
            workspaceQueries.gridColumns.bindStore(tab.columnSource);

            workspaceQueries.gridResults.reconfigure(null, tab.coldata);
        }
    },

    itemQueries : Ext.create('Ext.tree.Panel', {
        title: 'Requêtes',
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
                        if (data.records[0].raw.nodek == 'query')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupquery')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "query", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'query')
                    {
                        var query = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "query", "query", query, function(result) {
                            if (workspaceQueries.current.Id == query.id)
                            {
                                workspaceQueries.current.groupid = query.groupid;
                            }
                        });
                    }
                    //Ext.Msg.alert(dropPosition);       
                },
            }
        },
        rootVisible: false,

        listeners: {
            afterrender: function(component, eOpts) {
                var Mask = new Ext.LoadMask(workspaceQueries.itemQueries, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "query", "query", {}, function(result) {
                    var store = workspaceQueries.itemQueries.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspaceQueries.itemQueries, {
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
                     
                	symfony("get", "query", "query", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                        workspaceQueries.gotoQuery(rec);
                        
                        myMask.hide();
                    });
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspaceQueries.menuGroupQueries.rec = workspaceQueries.itemQueries.store.tree.root;
                workspaceQueries.menuRootGroupQueries.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                //showobject(rec.raw);
                if (rec.get('leaf'))
                {
                    workspaceQueries.menuQueries.rec = rec;
                    workspaceQueries.menuQueries.showAt(eventobj.getXY());
                }
                else
                {
                    workspaceQueries.menuGroupQueries.rec = rec;
                    workspaceQueries.menuGroupQueries.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspaceQueries.propertySource[key] = value;
        });
        workspaceQueries.propertyData.setSource(workspaceQueries.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspaceQueries;
        bottomPanel.show();

        propertyPanel.removeAll();
        workspaceQueries.propertySource = {
            '(name)': 'name',
            'alias': 'alias',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'motscles': '',
            'datasourceid': '',
            'publiee': true
        };

        symfony("list", "datasrc", "datasource", {}, function(response) {
            var data = [];
            $.each(response.data, function(key, value){
                data.push(value);
            });

            var storeDatasource = Ext.create('Ext.data.Store', {
                fields: ['Id', 'title'],
                data: data
            });

            workspaceQueries.setAfterLoad(options, storeDatasource, run);
        });
    },

    setAfterLoad: function(options, storeDatasource, run) {
        /*workspaceQueries.propertySource = {
            '(name)': 'Propriétés',
            'grouping': false,
            'autoFitColumns': true,
            'productionQuality': false,
            'created': Ext.Date.parse('10/15/2015', 'm/d/Y'),
            'tested': false,
            'version': 0.01,
            'borderWidth': 1
        };*/

        workspaceQueries.currentTab = options.tab;

        workspaceQueries.propertyData = Ext.create('Ext.grid.property.Grid', {
            title: 'Propriétés',
            propertyNames: {
                '(name)': '(Nom)',
                'alias': 'Alias',
                'description': 'Description',
                'motscles': 'Mots clés',
                'datasourceid': 'Source de données',
                'publiee': 'Publiée'
            },
            sourceConfig: {
                datasourceid: {
                    renderer: function (v) {
                        storeDatasource.data.each(function(item, index, totalcount){
                            if (item.raw.Id == v) {
                                v = item.raw.title;
                            }
                        });
                        return v;
                    }
                }
            },
            listeners: {
                propertychange: function(source, recordId, value, oldValue) {
                    var tab = centerPanel.getActiveTab();

                    var valeur = value;
                    if (recordId == '(name)')
                    {
                        valeur = replaceAll(' ', '_', value);
                    }

                    if (recordId == '(name)' && tab.rec.raw.alias.trim() === "") {
                        tab.rec.set('text', valeur);
                        tab.rec.raw.text = valeur;
                        tab.rec.raw.title = valeur;
                        tab.rec.commit();

                        //workspaceQueries.propertyData.source['(name)'] = valeur;
                        //workspaceQueries.propertyData.setSource({ '(name)': valeur });

                        tab.setTitle(value);
                    }

                    if (recordId == 'alias' && value.trim() !== "") {
                        tab.rec.set('text', value);
                        tab.rec.raw.text = value;
                        tab.rec.raw.alias = value;
                        tab.rec.commit();

                        tab.setTitle(value);
                    }

                }
            },
            customEditors: {
                //'(name)': { 
                //    xtype: 'textfield',
                //    enableKeyEvents: true,
                //    listeners: {
                //        keyup: function(txt, newValue, oldValue) {
                //            Ext.Msg.alert(oldValue);
                //        }
                //    }
                //},
                description: { xtype: 'descriptionfield' },
                groupe: { xtype: 'combobox' },
                datasourceid: Ext.create('Ext.form.ComboBox', {
                    store: storeDatasource,
                    queryMode: 'local',
                    displayField: 'title',
                    valueField: 'Id',
                    emptyText: '(Aucun)'
                }),
            },
            customRenderers: {
                '(name)': function(v) {
                    return replaceAll(' ', '_', v);
                },
                description: function (v) {
                    var value = Ext.decode( v ),
                        description_details = value.description_details,
                        description_resume = value.description_resume,
                        description='';
                    description += '<b>' + description_resume + '</b>: ';
                    description += '<i>' + description_details + '</i>';
                    return description;
                },
                publiee: function(v) {
                    if (v) {
                        return 'Oui';
                    } else {
                        return 'Non';
                    }
                },
            },
            source: workspaceQueries.propertySource,
        });
        propertyPanel.add(workspaceQueries.propertyData);
        workspaceQueries.propertyData.columns[0].width = 150;


        propertyPanel.add(Ext.create('Ext.Panel', {
            title: 'Historique',
            items: []
        }));
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspaceQueries.propertyData);

        workspaceQueries.gridColumns = Ext.create('Ext.grid.Panel', {
            columnLines : true,
            columns: [
                {
                    text: 'Ordre',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'ordre'
                },
                {
                    text: 'Table',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'table'
                },
                {
                    text: 'Nom SQL',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'name'
                },
                {
                    text: 'Titre de la colonne',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'displayed',
                    editor: 'textfield'
                },
                {
                    text: 'Afficher',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'printed',
                    editor: {
                        xtype: 'combobox',
                        forceSelection: true,
                        editable: false,
                        triggerAction: 'all',
                        allowBlank: false,
                        valueField: 'value',
                        displayField: 'descr',
                        store: Ext.create('Ext.data.Store', {
                            fields: [ 'descr', 'value' ],
                            data: [{
                                descr: 'Oui',
                                value: true
                            },{
                                descr: 'Non',
                                value: false
                            }]
                        })
                    },
                    renderer: function(value, metaData, record){
                        switch(value) {
                            case false:
                                return 'Non';
                            case true:
                                return 'Oui';
                        }
                    }
                },
                {
                    text: 'Type',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'type',
                    renderer: function(value, metaData, record){
                        switch(value) {
                            case 'STRING':
                                return 'Chaîne';
                            case 'INTEGER':
                                return 'Entier';
                            case 'DATE':
                                return 'Date';
                            case 'LONG':
                                return 'Entier long';
                            case 'TINY':
                                return 'Booléen';
                            case 'VAR_STRING':
                                return 'Chaîne';
                            case 'TEXT':
                                return 'Texte';
                        }
                        return value;
                    }
                },
                {
                    text: 'Longueur',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'len'
                },
                {
                    text: 'Précision',
                    flex: 1,
                    sortable: 1,
                    dataIndex: 'precision'
                },
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            listeners: {
                edit: function(editor, e) {
                    if (e.field == 'displayed') {
                        e.record.raw.displayed = e.value;
                    }

                    if (e.field == 'printed') {
                        e.record.raw.printed = e.value;
                    }

                    var column = {
                        id: e.record.raw.Id,
                        displayed: e.record.raw.displayed,
                        printed: e.record.raw.printed
                    };

                    symfony("save", "column", "query", column, function(result) {
                        e.record.commit();
                    });
                }
            }
        });

        workspaceQueries.gridResults = Ext.create('Ext.grid.Panel', {
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

        workspaceQueries.gridVars = Ext.create('Ext.grid.Panel', {
            columnLines : true,
            selType: 'checkboxmodel',
            selModel: {
                mode: 'MULTI',
            },
            viewConfig: {
                stripeRows: true,
            },
            columns: [
                {
                    text : "Id",
                    dataIndex : 'Id',
                    hidden : true,
                },
                {
                    text: 'Nom',
                    dataIndex: 'name',
                    flex: 1,
                    sortable: 1,
                    editor : 
                    {
                        allowBlank : false
                    }
                },
                {
                    text: 'Libellé',
                    dataIndex: 'title',
                    flex: 1,
                    sortable: 1,
                    editor :
                    {
                        allowBlank : true
                    }
                },
                {
                    text: 'Type',
                    dataIndex: 'type',
                    flex: 1,
                    sortable: 1,
                    editor: {
                        xtype: 'combobox',
                        forceSelection: true,
                        editable: false,
                        triggerAction: 'all',
                        allowBlank: false, 
                        valueField: 'value',
                        displayField: 'descr',
                        store: Ext.create('Ext.data.Store', {
                            fields: [ 'descr', 'value' ],
                            data: [{
                                descr:'Chaîne',
                                value:'STRING'
                            },{
                                descr:'Entier',
                                value:'INTEGER'
                            },{
                                descr:'Date',
                                value:'DATE'
                            },{
                                descr:'Booléen',
                                value:'BOOLEAN'
                            }]
                        })
                    },
                    renderer: function(value, metaData, record){
                        switch(value) {
                            case 'STRING':
                                return 'Chaîne';
                            case 'INTEGER':
                                return 'Entier';
                            case 'DATE':
                                return 'Date';
                            case 'BOOLEAN':
                                return 'Booléen';
                        }
                    }
                },
                {
                    text: 'Valeur initiale',
                    dataIndex: 'value',
                    flex: 1,
                    sortable: 1,
                    editor :
                    {
                        allowBlank : true
                    }
                },
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            listeners: {
                edit: function(editor, e) {
                    if (e.field == 'name') {
                        e.record.raw.name = e.value;
                    }

                    if (e.field == 'title') {
                        e.record.raw.title = e.value;
                    }

                    if (e.field == 'type') {
                        e.record.raw.type = e.value;
                    }

                    if (e.field == 'value') {
                        e.record.raw.value = e.value;
                    }
                }
            }
        });



        bottomPanel.removeAll();
        //bottomPanel.title = "Requête";
        workspaceQueries.parametreColonnes = Ext.create('Ext.Panel', {
            title: 'Paramètres d\'affichage des colonnes',
            iconCls: 'tabs',
            closable: false,
            items : [
                workspaceQueries.gridColumns
            ]
        });

        workspaceQueries.resultatsRequetes = Ext.create('Ext.Panel', {
            title: 'Résultats requetes',
            iconCls: 'tabs',
            //html: 'center south',
            closable: false,
            items : [
                workspaceQueries.gridResults
            ],
            tbar: [
                { text: 'Extraire', iconCls: 'icon-export', key: 'csv', handler: workspaceQueries.resulttask },
            ]
        });

        workspaceQueries.variablesRequetes = Ext.create('Ext.Panel', {
            title: 'Variables',
            iconCls: 'tabs',
            closable: false,
            items : [
                workspaceQueries.gridVars
            ],
            tbar: [
                { text: 'Ajouter', iconCls: 'icon-add', key: 'add', handler: workspaceQueries.vartask },
                { text: 'Recharger', iconCls: 'icon-refresh', key: 'load', handler: workspaceQueries.vartask },
                { text: 'Enregistrer', iconCls: 'icon-save', key: 'save', handler: workspaceQueries.vartask },
                { text: 'Supprimer', iconCls: 'icon-delete', key: 'delete', handler: workspaceQueries.vartask }
            ]
        });

        workspaceQueries.variablesRequetes.Mask = new Ext.LoadMask(workspaceQueries.variablesRequetes, { msg: "Veuillez patienter ..." });

        if (workspaceQueries.currentTab.storeVariables !== undefined)
        {
            workspaceQueries.gridVars.getView().bindStore(workspaceQueries.currentTab.storeVariables);
        }
        else
        {
            symfony("list", "variable", "query", { id: workspaceQueries.currentTab.rec.raw.Id }, function(response) {
                var data = [];
                $.each(response.data, function(key, value){
                    data.push(value);
                });

                workspaceQueries.currentTab.storeVariables = Ext.create('Ext.data.Store', {
                    fields: ['Id', 'name', 'title', 'type', 'value'],
                    data: data
                });

                workspaceQueries.gridVars.getView().bindStore(workspaceQueries.currentTab.storeVariables);
            });
        }

        bottomPanel.add(workspaceQueries.variablesRequetes);
        bottomPanel.add(workspaceQueries.parametreColonnes);
        bottomPanel.add(workspaceQueries.resultatsRequetes);

        bottomPanel.setActiveTab(workspaceQueries.variablesRequetes);

        run();
    },

    getQuery: function(id, func) {
        symfony("get", "query", "query", { id: id }, function(query) {
            
            if (workspaceQueries.queries[query.data.Id] === undefined) workspaceQueries.queries[query.data.Id] = {};
            workspaceQueries.queries[query.data.Id] = {};

            func(query.data);
        });
    },

    saveCurrent: function(run)
    {
        var content = workspaceQueries.queries[workspaceQueries.current.Id].editor.getValue();
        workspaceQueries.current.content = content;

        workspaceQueries.current.title = replaceAll(' ', '_', workspaceQueries.propertyData.source['(name)']);
        workspaceQueries.current.alias = workspaceQueries.propertyData.source['alias'];

        workspaceQueries.current.description = workspaceQueries.propertyData.source['description'];
        workspaceQueries.current.motscles = workspaceQueries.propertyData.source['motscles'];
        workspaceQueries.current.datasourceid = workspaceQueries.propertyData.source['datasourceid'];
        workspaceQueries.current.publiee = workspaceQueries.propertyData.source['publiee'];

        var query = {
            id: workspaceQueries.current.Id,
            title: workspaceQueries.current.title,
            alias: workspaceQueries.current.alias,
            content: workspaceQueries.current.content,
            groupid: workspaceQueries.current.groupid,

            description: workspaceQueries.current.description,
            motscles: workspaceQueries.current.motscles,
            datasourceid: workspaceQueries.current.datasourceid,
            publiee: workspaceQueries.current.publiee
        };

        var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
        myMask.show();
        
        symfony("save", "query", "query", query, function(response) {
            if (run !== undefined) run(response.data);
            
            myMask.hide();
        });
    },

    analyseCurrent: function(run) {

	    function analyse(vars)
	    {
		    workspaceQueries.saveCurrent(function(result) {
		        var query = {
    		        id: result.Id,
                    variables: vars,
	    	    };

    		    symfony("analyse", "query", "query", query, function(response) {
	    	        var data = [];
                    var dataresult = [];
		            $.each(response.data, function(key, value){
		                data.push(value);
                        if (value.printed)
                            dataresult.push(value);
    		        });
    
    		        var columnSource = Ext.create('Ext.data.Store', {
	    	            fields: ['Id', 'type', 'table', 'name', 'len', 'precision', 'ordre', 'displayed', 'printed', 'width'],
		                data: data
    		        });
	    	        workspaceQueries.gridColumns.unbindStore();
		            workspaceQueries.gridColumns.bindStore(columnSource);

    		        workspaceQueries.gridResults.reconfigure(null, dataresult);

	    	        if (run !== undefined) run(response.data, vars);
		        });
		    });
	    }


        if (workspaceQueries.currentTab.storeVariables.data.items.length)
        {
            var variableForm = Ext.create('Ext.form.Panel',{
                renderTo: Ext.getBody(),
                id: 'variableform',
                cls: 'my-form-class',
                defaults: {
                    labelWidth: 150,
                },
                floating: true,
                closable : true,
                modal: true,
                frame: true,
                title: 'Valeurs des variables',

                bodyStyle: 'padding: 10px 10px 0 10px;',
                
                items: [],
                buttons: [{
                    text: 'OK',
                    formBind: true,
                    handler: function() {
                        analyse(variableForm.getValues());
                        variableForm.close();
                    }
                },{
                    text: 'Annuler',
                    handler: function() {
                        variableForm.close();
                    }
                }]
            });

            function xtyper(field, vtype)
            {
                field.xtype = 'textfield';

                switch(vtype) {
                    case 'DATE':
                    {
                        field.xtype = 'datefield';
                        field.format = 'd/m/Y';

                        break;
                    }

                    case 'BOOLEAN':
                    {
                        field.xtype = 'combobox';
                        field.forceSelection = true;
                        field.editable = false;
                        field.triggerAction = 'all';
                        field.valueField = 'value';
                        field.displayField = 'descr';
                        field.store = Ext.create('Ext.data.Store', {
                            fields: [ 'descr', 'value' ],
                            data: [{
                                descr: 'Vrai',
                                value: 1
                            },{
                                descr: 'Faux',
                                value: 0
                            }]
                        });
                        field.renderer = function(value, metaData, record) {
                            switch(value) {
                                case 1:
                                    return 'Vrai';
                                case 0:
                                    return 'Faux';
                            }
                        };

                        break;
                    }
                }

                return field;
            }

            $.each(workspaceQueries.currentTab.storeVariables.data.items, function(key, value){
                var field = {
                    xtype: xtyper(value.raw.type),
                    fieldLabel: value.raw.title,
                    name: value.raw.name,
                    allowBlank: false,
                    value: value.raw.value,
                    //listeners: formListener,
                };
                field = xtyper(field, value.raw.type);

                variableForm.add(field);
            });

            variableForm.show();
        }
        else
        {
            analyse([]);
        }

    },

    saveVariables: function(variables, index)
    {
        if (index >= variables.length) {
            workspaceQueries.variablesRequetes.Mask.hide();
            return;
        }

        var value = variables[index];
        var variable = {
            id: value.raw.Id,
            name: value.raw.name,
            title: value.raw.title,
            type: value.raw.type,
            value: value.raw.value,
            queryid: workspaceQueries.currentTab.rec.raw.Id
        };

        symfony("save", "variable", "query", variable, function(result) {
            value.raw.Id = result.data.Id;
            value.commit();

            workspaceQueries.saveVariables(variables, index + 1);
        });
    },

    deleteVariables: function(variables, index)
    {
        if (index >= variables.length) {
            workspaceQueries.variablesRequetes.Mask.hide();
            return;
        }

        var value = variables[index];
        var variable = {
            id: value.raw.Id,
        };

        symfony("delete", "variable", "query", variable, function(result) {
            workspaceQueries.currentTab.storeVariables.remove(value);

            workspaceQueries.deleteVariables(variables, index + 1);
        });
    },

    vartask: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                var gridVars = workspaceQueries.gridVars;
                var selectedRows = gridVars.getSelectionModel().getSelection();
        
                if(selectedRows.length) {
                    workspaceQueries.variablesRequetes.Mask.show();
                    workspaceQueries.saveVariables(selectedRows, 0);
                } else
                    Ext.Msg.alert('Totem', 'Selectionnez les variables à enregistrer.');

                break;
            }

            case 'add':
            {
                var gridVars = workspaceQueries.gridVars;
                var varStore = workspaceQueries.currentTab.storeVariables

                var r = Ext.create('variableModel', {
                    'Id': 0,
                    'name': 'variable',
                    'title': 'Variable',
                    'type': 'STRING',
                    'value': ''
                });

                varStore.insert(varStore.count(), r);;
                gridVars.editingPlugin.startEdit(r, 1);

                break;
            }

            case 'load':
            {
                workspaceQueries.variablesRequetes.Mask.show();
                symfony("list", "variable", "query", { id: workspaceQueries.currentTab.rec.raw.Id }, function(response) {
                    var data = [];
                    $.each(response.data, function(key, value){
                        data.push(value);
                    });

                    workspaceQueries.currentTab.storeVariables = Ext.create('Ext.data.Store', {
                        fields: ['Id', 'name', 'title', 'type', 'value'],
                        data: data
                    });

                    workspaceQueries.gridVars.getView().bindStore(workspaceQueries.currentTab.storeVariables);
                    workspaceQueries.variablesRequetes.Mask.hide();
                });

                break;
            }

            case 'delete':
            {
                var gridVars = workspaceQueries.gridVars;
                var selectedRows = gridVars.getSelectionModel().getSelection();

                if(selectedRows.length) {
                    workspaceQueries.variablesRequetes.Mask.show();
                    workspaceQueries.deleteVariables(selectedRows, 0);
                } else
                    Ext.Msg.alert('Totem', 'Selectionnez les variables à supprimer.');

                break;
            }
        } 
    },

    resulttask: function(btn)
    {
        switch (btn.key) {
            case 'csv':
            {
                var site = (window.location.href.indexOf("admin") > -1)?"./admin/":"./";
                window.location = site + 'csv?id=' + workspaceQueries.current.Id;

                break;
            }
        }
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                workspaceQueries.saveCurrent();
                break;
            }

            case 'analyse':
            {
                bottomPanel.setActiveTab(workspaceQueries.parametreColonnes);
                workspaceQueries.analyseCurrent();
                break;
            }

            case 'run':
            {
                bottomPanel.setActiveTab(workspaceQueries.resultatsRequetes);
                workspaceQueries.analyseCurrent(function(result, vars) {
                    var query = {
                        id: workspaceQueries.current.Id,
                        variables: vars,
                    };
                
                    symfony("run", "query", "query", query, function(response) {
                        var fields = [];
                        $.each(result, function(key, value){
                            if (value.printed)
                                fields.push(value.name);
                        });

                        var data = [];
                        $.each(response.data, function(key, value){
                            data.push(value);
                        });

                        var dataSource = Ext.create('Ext.data.Store', {
                            fields: fields,
                            data: data
                        });
                        workspaceQueries.gridResults.unbindStore();
                        workspaceQueries.gridResults.bindStore(dataSource);
                    });
                });

                break;
            }
        }
    }
};

