function parseHTMLCode(Id) {
    var mime = 'text/html';

    workspaceReports.reports[Id].editor = CodeMirror.fromTextArea(document.getElementById('codehtml' + Id), {
        mode: mime,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets : true,
        autofocus: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        hintOptions: {tables: {
            users: {name: null, score: null, birthDate: null},
            countries: {name: null, population: null, size: null}
        }}
    });
}

var clipboardReports = undefined;

var workspaceReports = {
    name: "reports",
    current: null,
    reports: [],
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
 
    menuReports: new Ext.menu.Menu({
        items: [
            { text: 'Modifier le rapport', key: 'modreport' },
            { text: 'Supprimer le rapport', key: 'delreport' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copyreport' },
            { text: 'Couper', key: 'cutreport' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'modreport':
                    {
                        workspaceReports.gotoReport(workspaceReports.menuReports.rec);
                        break;
                    }

                    case 'delreport':
                    {
                        var rec = workspaceReports.menuReports.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de rapport',
                            msg: 'Etes-vous certain de vouloir supprimer le rapport [ ' + rec.raw.title + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceReports.itemReports, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "report", "report", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceReports.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copyreport':
                    {
                        workspaceReports.copy(workspaceReports.menuReports.rec);
                        break;
                    }

                    case 'cutreport':
                    {
                        workspaceReports.cut(workspaceReports.menuReports.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupReports: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup' },
            { text: 'Couper', key: 'cutgroup' },
            { id: 'reportpaste', text: 'Coller', key: 'paste', disabled: true },
            { xtype: 'menuseparator' },
            { text: 'Ajouter un rapport', key: 'addreport' },
            { text: 'Générer un rapport', key: 'wizardreport' },
        ],
        listeners: {
            click: function(menu, item) {
                //alert(item.text);
                //Ext.Msg.alert('Status', 'Changes saved successfully.');

                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspaceReports.copy(workspaceReports.menuGroupReports.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspaceReports.cut(workspaceReports.menuGroupReports.rec);
                        break;
                    }

                    case 'wizardreport':
                    {
                        workspaceReports.wizardreport(workspaceReports.menuGroupReports.rec);
                        break;
                    }

                    case 'addreport':
                    {
                        workspaceReports.newReport(workspaceReports.menuGroupReports.rec);
                        break;
                    }
                
                    case 'paste':
                    {
                        workspaceReports.paste(workspaceReports.menuGroupReports.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspaceReports.groupForm.load("Nouveau groupe", "new", workspaceReports.menuGroupReports.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspaceReports.groupForm.load("Modifier un groupe", "update", workspaceReports.menuGroupReports.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspaceReports.menuGroupReports.rec;

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
                                    
                                    var myMask2 = new Ext.LoadMask(workspaceReports.itemReports, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "report", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspaceReports.autoCloseCenterTab();
                                        
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
    
    wizardreport: function(rec) {
    	var dataQueries = [];
    	
        symfony("listall", "query", "query", {}, function(result) {
        	dataQueries = result['data'];
        	
        	var formwizard = new Ext.form.Panel({
                defaults: {
                    labelWidth: 150,
                },
                width: 700,
                height: 170,
                title: 'Assistant de génération de rapport',
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
                    fieldLabel: 'Nom du rapport',
                    allowBlank: false,
                    name: 'name',
                },{
                    id: "query",
                    anchor: '100%',
                    fieldLabel: 'Requête',
                    xtype: 'groupingcombobox',
                    name: 'query',
                    allowBlank: false,
                    groupField: ['grouptree'], //['nivel1', 'nivel2'],// string or array
                    valueField: 'Id',
                    displayField: 'text',
                    displaySeparator: ' ❱ ',
                    queryMode: 'local',
                    editable: false,
                    typeAhead: true,
                    store: {
                    fields: [
                        { name: 'Id', type: 'int' },
                        { name: 'grouptree', type: 'string' },
                        { name: 'text', type: 'string' }
                    ],
                    sorters: [
                        { property: 'grouptree', direction: 'ASC' },
                    ],
                    data: dataQueries
                    }               
                }],
                buttons: [{
                    text: 'Generer',
                    formBind: true,
                    handler: function() {
                    	var title = formwizard.items.get('name').value;
                    	var queryid = formwizard.items.get('query').getValue();
                    	
                    	var wizard = {
                    		queryid: queryid,
                    		title: title,
                    		parentid: rec.raw.Id
                    	};
                    	
                    	symfony("generate", "report", "report", wizard, function(result) {
                    		rec.appendChild(result['data']);
                        	formwizard.close();
                    	});
                    }
                },{
                    text: 'Annuler',
                    handler: function() {
                        formwizard.close();
                    }
                }]
            });

            formwizard.show();
        }); 
    },

    copy: function(rec) {
        clipboardReports = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('reportpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupreport') Ext.getCmp('reportpasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardReports = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('reportpaste').setDisabled(false);
        //showobject(rec);
        if (rec.raw.nodek == 'groupreport') Ext.getCmp('reportpasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardReports.item;

        if (clipboardReports.action == 'cut')
        {
            if (clipboardReports.item.raw.nodek == 'report')
            {
                var report = {
                    id: clipboardReports.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "report", "report", report, function(result) {
                    if (workspaceReports.current != null && workspaceReports.current.Id == report.id)
                    {
                        workspaceReports.current.groupid = report.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardReports.item.raw.nodek == 'groupreport')
            {
                var group = {
                    id: clipboardReports.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "report", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardReports.item.raw.nodek == 'report')
            {
                var report = {
                    id: clipboardReports.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "report", "report", report, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardReports.item.raw.nodek == 'groupreport')
            {
                var group = {
                    id: clipboardReports.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "report", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardReports = null;
        Ext.getCmp('reportpaste').setDisabled(true);
        Ext.getCmp('reportpasteroot').setDisabled(true);
    },

    menuRootGroupReports: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'reportpasteroot', text: 'Coller', key: 'paste', disabled: true }
        ],
        listeners: {
            click: function(menu, item) {
                //alert(item.text);
                //Ext.Msg.alert('Status', 'Changes saved successfully.');

                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspaceReports.groupForm.load("Nouveau groupe", "new", workspaceReports.menuGroupReports.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspaceReports.paste(workspaceReports.menuGroupReports.rec);
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

                        symfony("save", "group", "report", group, function(result) {
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

                        /*var currentNode = tree.getNodeById('toto');
                        if(currentNode.isLeaf()){
                            tree.getSelectionModel().select(currentNode);
                            tree.fireEvent("click", currentNode);
                        }*/
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
            if ("report" in tab && tab.report.Id != 0) {
                var report = {
                    id: tab.report.Id
                };

                symfony("exists", "report", "report", report, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspaceReports.current.Id == report.id)
                        {
                            workspaceReports.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },

    newReport: function(group) {
        var report = {
            groupid: group.raw.Id,
            title: "Nouveau rapport",
            content: "<html>\n\t<body>\n\t\tContenu du rapport\n\t</body>\n</html>"
        };  
        
        symfony("save", "report", "report", report, function(result) {
            var rec = group.insertChild(-1, result.data);
            workspaceReports.gotoReport(rec);
        });
    },

    gotoReport: function(rec) {
        //workspaceReports.set({});

        workspaceReports.getReport(rec.raw.Id, function(report) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.report && report.Id == tab.report.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                    //workspaceReports.propertyData.setSource(tab.propertySource);
                }
            });

            if (!deja)
            {
                var newTab = Ext.create('Ext.Panel', {
                    title: rec.raw.text,
                    iconCls: 'icon-report',
                    html: "<textarea id='codehtml" + report.Id + "' name='codehtml'>" + report.content + "</textarea>",
                    closable: true,
                    active: true,
                    tbar: [
                        { text: 'Enregistrer', key: 'save', handler: workspaceReports.task },
                        { text: 'Aperçu', key: 'apercu', handler: workspaceReports.task },
                        { text: 'Exécuter', key: 'run', handler: workspaceReports.task }

                    ]
                });

                newTab.report = rec.raw;
                newTab.rec = rec;
                newTab.workspace = workspaceReports;
                newTab.propertySource = {
                    '(name)': report.title,
                    'description': Ext.encode({ description_resume: '', description_details: '' }),
                    'motscles': '',
                    'environnement': '',
                    'nodek': '',
                    'publiee': true
                };

                centerPanel.add(newTab);
                centerPanel.setActiveTab(newTab);

                parseHTMLCode(report.Id);
            }
        });
    },

    onCenterTabChange: function(tabPanel, tab) {
        if ("report" in tab) {
            workspaceReports.current = tab.report;

            workspaceReports.propertyData.setSource(tab.propertySource);
        }
    },

    itemReports : Ext.create('Ext.tree.Panel', {
        title: 'Rapports',
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
                        if (data.records[0].raw.nodek == 'report')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupreport')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "report", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'report')
                    {
                        var report = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "report", "report", report, function(result) {
                            if (workspaceReports.current.Id == report.id)
                            {
                                workspaceReports.current.groupid = report.groupid;
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
                var Mask = new Ext.LoadMask(workspaceReports.itemReports, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "report", "report", {}, function(result) {
                    var store = workspaceReports.itemReports.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspaceReports.itemReports, {
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
                     
                	symfony("get", "report", "report", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                        workspaceReports.gotoReport(rec);
                        
                        myMask.hide();
                    });
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspaceReports.menuGroupReports.rec = workspaceReports.itemReports.store.tree.root;
                workspaceReports.menuRootGroupReports.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                //showobject(rec.raw);
                if (rec.get('leaf'))
                {
                    workspaceReports.menuReports.rec = rec;
                    workspaceReports.menuReports.showAt(eventobj.getXY());
                }
                else
                {
                    workspaceReports.menuGroupReports.rec = rec;
                    workspaceReports.menuGroupReports.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspaceReports.propertySource[key] = value;
        });
        workspaceReports.propertyData.setSource(workspaceReports.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspaceReports;
        bottomPanel.show();

        propertyPanel.removeAll();
        workspaceReports.propertySource = {
            '(name)': 'name',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'motscles': '',
            'environnement': '',
            'nodek': '',
            'publiee': true
        };

        /*workspaceReports.propertySource = {
            '(name)': 'Propriétés',
            'grouping': false,
            'autoFitColumns': true,
            'productionQuality': false,
            'created': Ext.Date.parse('10/15/2015', 'm/d/Y'),
            'tested': false,
            'version': 0.01,
            'borderWidth': 1
        };*/


        workspaceReports.propertyData = Ext.create('Ext.grid.property.Grid', {
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
                /*'(name)': { 
                    xtype: 'textfield',
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function(txt, newValue, oldValue) {
                            Ext.Msg.alert(oldValue);
                        }
                    }
                },*/
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
            source: workspaceReports.propertySource,
        });
        propertyPanel.add(workspaceReports.propertyData);
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspaceReports.propertyData);


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

        var resultatsRapports = Ext.create('Ext.Panel', {
            title: 'Résultats rapports',
            iconCls: 'tabs',
            html: 'center south',
            closable: false,
            items : [
                gridResults
            ]
        });

        bottomPanel.add(parametreColonnes);
        bottomPanel.add(resultatsRapports);

        bottomPanel.setActiveTab(parametreColonnes);

        run();
    },

    getReport: function(id, func) {
        symfony("get", "report", "report", { id: id }, function(report) {
            //workspaceReports.current = report;
            if (workspaceReports.reports[report.data.Id] === undefined) workspaceReports.reports[report.data.Id] = {};

            func(report.data);
        });
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                var content = workspaceReports.reports[workspaceReports.current.Id].editor.getValue();
                workspaceReports.current.content = content;
                
                var title = workspaceReports.propertyData.source['(name)'];
                workspaceReports.current.title = title;

                var report = {
                    id: workspaceReports.current.Id,
                    title: workspaceReports.current.title,
                    content: workspaceReports.current.content,
                    groupid: workspaceReports.current.groupid
                };

                var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
                myMask.show();
                
                symfony("save", "report", "report", report, function(response) {
                    //
                	
                	myMask.hide();
                });


                break;
            }

            case 'apercu':
            {
                var formapercu = new Ext.form.Panel({
                    defaults: {
                        labelWidth: 150,
                    },
                    width: 800,
                    height: 600,
                    title: 'Aperçu du rapport',
                    floating: true,
                    closable : true,
                    modal: true,
                    frame: true,
                    bodyStyle: 'padding: 10px 10px 0 10px;',
                    layout     : {
                        type  : 'vbox',
                        align : 'stretch'
                    },
                    html: '',
                    buttons: [{
                        text: 'Imprimer',
                        handler: function() {
                            var site = (window.location.href.indexOf("admin") > -1)?"./admin/":"./";
                            window.location = site + 'report?id=' + workspaceReports.current.Id;
                        }
                    },{
                        text: 'Fermer',
                        handler: function() {
                            formapercu.close();
                        }
                    }]
                });

                formapercu.show();

                var myMask = new Ext.LoadMask(formapercu, {msg:"Chargement en cours ..."});
                myMask.show();

                var report = {
                    id: workspaceReports.current.Id,
                };

                symfony("run", "report", "report", report, function(response) {
                    formapercu.update(response.data.html);

                    myMask.hide();
                });

                break;
            }

            case 'run':
            {
                var site = (window.location.href.indexOf("admin") > -1)?"./admin/":"./";
                window.location = site + 'report?id=' + workspaceReports.current.Id;

                break;
            }
        }
    }
};

