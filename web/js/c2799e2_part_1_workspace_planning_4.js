Ext.require([
    'Ext.TabPanel',
    'Extensible.calendar.data.MemoryEventStore',
    'Extensible.calendar.CalendarPanel',
//    'Extensible.totem.calendar.data.Events'
]);

var clipboardPlannings = undefined;

var workspacePlannings = {
    name: "plannings",
    current: null,
    plannings: [],
    propertyData: null,
    properySource: null,
    
    storecouleur: null,

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
        
    	Extensible.calendar.data.EventMappings = {
	        EventId:     {name: 'ID', mapping:'Id'}, //type:'string'}, // int by default
	        CalendarId:  {name: 'CalID', mapping: 'usergroupid'},
	        Title:       {name: 'EvtTitle', mapping: 'title'},
	        StartDate:   {name: 'StartDt', mapping: 'startdate', type: 'date'}, //dateFormat: 'c'},
	        EndDate:     {name: 'EndDt', mapping: 'enddate', type: 'date'}, //dateFormat: 'c'},
	        RRule:       {name: 'RecurRule', mapping: 'recurrule'},
	        Location:    {name: 'Location', mapping: 'location'},
	        Notes:       {name: 'Desc', mapping: 'notes'},
	        Url:         {name: 'LinkUrl', mapping: 'url'},
	        IsAllDay:    {name: 'AllDay', mapping: 'isallday', type: 'boolean'},
	        Reminder:    {name: 'Reminder', mapping: 'reminder'},
	        ReportId:    {name: 'ReportId', mapping: 'reportid', type: 'int'},
	        CreatedBy:   {name: 'CreatedBy', mapping: 'createdby'},
	    };
	    Extensible.calendar.data.EventModel.reconfigure();
    	    
    	    
    	Extensible.calendar.data.CalendarMappings = {
	        CalendarId:   {name:'ID', mapping: 'cal_id'}, // int by default
	        Title:        {name:'CalTitle', mapping: 'cal_title', type: 'string'},
	        Description:  {name:'Desc', mapping: 'cal_desc', type: 'string'},
	        ColorId:      {name:'Color', mapping: 'cal_color', type: 'int'},
	        IsHidden:     {name:'Hidden', mapping: 'hidden', type: 'boolean'}
	    };
	    Extensible.calendar.data.CalendarModel.reconfigure();
    	
    	symfony("listall", "report", "report", {}, function(result) {
        	dataReports = result['data'];
        	
	        Ext.override(Extensible.calendar.form.EventWindow, {
	            titleTextAdd: 'Programmer une génération automatique de rapport',
	            
	            labelWidth: 150,
	            width: 760,
	            
	            initRefs: function() {
	            	this.callParent();
	            	this.reportField = this.down('#' + this.id + '-report');
	            },
	            
	            show: function(o, animateTarget) {
	            	this.callParent(arguments);
	            	
	            	var M = Extensible.calendar.data.EventMappings;
	            	if (o.data) {
	            		var rec = o;
	            		this.reportField.setValue(rec.data[M.ReportId.name]);
	            	}
	            },
	
	            getFooterBarConfig: function() {
	                this.enableEditDetails = false;
	                return this.callParent();
	            },
	
	            getFormItemConfigs: function() {
	                var items = [{
	                    xtype: 'textfield',
	                    itemId: this.id + '-title',
	                    name: Extensible.calendar.data.EventMappings.Title.name,
	                    fieldLabel: this.titleLabelText,
	                    anchor: '100%'
	                },{
	                    xtype: 'extensible.daterangefield',
	                    itemId: this.id + '-dates',
	                    name: 'dates',
	                    anchor: '95%',
	                    singleLine: true,
	                    fieldLabel: this.datesLabelText
	                },{
	                	itemId: this.id + '-report',
	                    anchor: '100%',
	                    fieldLabel: 'Rapport',
	                    xtype: 'groupingcombobox',
	                    name: Extensible.calendar.data.EventMappings.ReportId.name,
	                    allowBlank: false,
	                    groupField: [ 'grouptree' ], //['nivel1', 'nivel2'],// string or array
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
		                    data: dataReports
	                    }               
	                }];
	        
	                if (this.calendarStore) {
	                    items.push({
	                        xtype: 'extensible.calendarcombo',
	                        itemId: this.id + '-calendar',
	                        editable: false,
	                        forceSelection: true,
	                        allowBlank: false,
	                        name: Extensible.calendar.data.EventMappings.CalendarId.name,
	                        anchor: '100%',
	                        fieldLabel: 'Groupe d\'utilisateurs',
	                        store: this.calendarStore,
	                    });
	                }
	        
	                return items;
	            },
	        });
        
    	});
    },
 
    menuPlannings: new Ext.menu.Menu({
        items: [
            { text: 'Modifier la tâche plannifiée', key: 'modplanning' },
            { text: 'Supprimer la tâche plannifiée', key: 'delplanning' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copyplanning' },
            { text: 'Couper', key: 'cutplanning' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'modplanning':
                    {
                        workspacePlannings.gotoPlanning(workspacePlannings.menuPlannings.rec);
                        break;
                    }

                    case 'delplanning':
                    {
                        var rec = workspacePlannings.menuPlannings.rec;

                        Ext.MessageBox.show({
                            title: 'Totem : Suppression de tâche plannifiée',
                            msg: 'Etes-vous certain de vouloir supprimer la tâche plannifiée [ ' + rec.raw.title + ' ] ?',
                            width: 400,
                            buttons: Ext.MessageBox.YESNO,
                            buttonText: { yes: 'Oui', no: 'Non' },
                            fn: function(btn) {
                                if (btn == 'yes') {
                                	var myMask1 = new Ext.LoadMask(centerPanel, { msg: "Suppression en cours ..." });
                                    myMask1.show();
                                    
                                    var myMask2 = new Ext.LoadMask(workspacePlannings.itemPlannings, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "planning", "planning", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspacePlannings.autoCloseCenterTab();
                                        
                                        myMask1.hide();
                                        myMask2.hide();
                                    });
                                }
                            },
                        });

                        break;
                    }

                    case 'copyplanning':
                    {
                        workspacePlannings.copy(workspacePlannings.menuPlannings.rec);
                        break;
                    }

                    case 'cutplanning':
                    {
                        workspacePlannings.cut(workspacePlannings.menuPlannings.rec);
                        break;
                    }
                }
            }
        }
    }),

    menuGroupPlannings: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { text: 'Modifier ce groupe', key: 'modgroup' },
            { text: 'Supprimer ce groupe', key: 'delgroup' },
            { xtype: 'menuseparator' },
            { text: 'Copier', key: 'copygroup' },
            { text: 'Couper', key: 'cutgroup' },
            { id: 'planningpaste', text: 'Coller', key: 'paste', disabled: true },
            { xtype: 'menuseparator' },
            { text: 'Ajouter une tâche plannifiée', key: 'addplanning' },
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'copygroup':
                    {
                        workspacePlannings.copy(workspacePlannings.menuGroupPlannings.rec);
                        break;
                    }

                    case 'cutgroup':
                    {
                        workspacePlannings.cut(workspacePlannings.menuGroupPlannings.rec);
                        break;
                    }

                    case 'addplanning':
                    {
                        workspacePlannings.newPlanning(workspacePlannings.menuGroupPlannings.rec);
                        break;
                    }
                
                    case 'paste':
                    {
                        workspacePlannings.paste(workspacePlannings.menuGroupPlannings.rec);
                        break;
                    }

                    case 'addgroup':
                    {
                        workspacePlannings.groupForm.load("Nouveau groupe", "new", workspacePlannings.menuGroupPlannings.rec).show();
                        break;
                    }

                    case 'modgroup':
                    {
                        workspacePlannings.groupForm.load("Modifier un groupe", "update", workspacePlannings.menuGroupPlannings.rec).show();
                        break;
                    }

                    case 'delgroup':
                    {
                        var rec = workspacePlannings.menuGroupPlannings.rec;

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
                                    
                                    var myMask2 = new Ext.LoadMask(workspacePlannings.itemPlannings, { msg: "Suppression en cours ..." });
                                    myMask2.show();
                                    
                                    symfony("delete", "group", "planning", { id: rec.raw.Id }, function(result) {
                                        rec.remove(true);
                                        workspacePlannings.autoCloseCenterTab();
                                        
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
        clipboardPlannings = {
            item: rec,
            action: 'copy'
        };
        Ext.getCmp('planningpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupplanning') Ext.getCmp('planningpasteroot').setDisabled(false);
    },

    cut: function(rec) {
        clipboardPlannings = {
            item: rec,
            action: 'cut'
        };
        Ext.getCmp('planningpaste').setDisabled(false);
        if (rec.raw.nodek == 'groupplanning') Ext.getCmp('planningpasteroot').setDisabled(false);
    },

    paste: function(newparent) {
        var item = clipboardPlannings.item;

        if (clipboardPlannings.action == 'cut')
        {
            if (clipboardPlannings.item.raw.nodek == 'planning')
            {
                var planning = {
                    id: clipboardPlannings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "planning", "planning", planning, function(result) {
                    if (workspacePlannings.current != null && workspacePlannings.current.Id == planning.id)
                    {
                        workspacePlannings.current.groupid = planning.groupid;
                    }
                    newparent.appendChild(item);
                });
            }
            else if (clipboardPlannings.item.raw.nodek == 'groupplanning')
            {
                var group = {
                    id: clipboardPlannings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("save", "group", "planning", group, function(result) {
                    newparent.appendChild(item);
                });
            }
        }
        else // copy
        {
            if (clipboardPlannings.item.raw.nodek == 'planning')
            {
                var planning = {
                    id: clipboardPlannings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "planning", "planning", planning, function(result) {
                    newparent.appendChild(result.data);
                });
            }
            else if (clipboardPlannings.item.raw.nodek == 'groupplanning')
            {
                var group = {
                    id: clipboardPlannings.item.raw.Id,
                    groupid: newparent.raw.Id
                };

                symfony("clone", "group", "planning", group, function(result) {
                    newparent.appendChild(result.data);
                });
            }
        }

        clipboardPlannings = null;
        Ext.getCmp('planningpaste').setDisabled(true);
        Ext.getCmp('planningpasteroot').setDisabled(true);
    },

    menuRootGroupPlannings: new Ext.menu.Menu({
        items: [
            { text: 'Ajouter un groupe', key: 'addgroup' },
            { xtype: 'menuseparator' },
            { id: 'planningpasteroot', text: 'Coller', key: 'paste', disabled: true }
        ],
        listeners: {
            click: function(menu, item) {
                switch(item.key)
                {
                    case 'addgroup':
                    {
                        workspacePlannings.groupForm.load("Nouveau groupe", "new", workspacePlannings.menuGroupPlannings.rec).show();
                        break;
                    }

                    case 'paste':
                    {
                        workspacePlannings.paste(workspacePlannings.menuGroupPlannings.rec);
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

                        symfony("save", "group", "planning", group, function(result) {
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
            if ("planning" in tab && tab.planning.Id != 0) {
                var planning = {
                    id: tab.planning.Id
                };

                symfony("exists", "planning", "planning", planning, function(result) {
                    if (result.data.response == 'false')
                    {
                        if (workspacePlannings.current.Id == planning.id)
                        {
                            workspacePlannings.current = null;
                        }
        
                        centerPanel.remove(tab);
                    }
                });
            }
        });
    },

    newPlanning: function(group) {
        var planning = {
            groupid: group.raw.Id,
            title: "Nouvelle tâche plannifiée",
        };  
        
        symfony("save", "planning", "planning", planning, function(result) {
            var rec = group.insertChild(-1, result.data);
            workspacePlannings.gotoPlanning(rec);
        });
    },

    gotoPlanning: function(rec) {
        //workspacePlannings.set({});

        workspacePlannings.getPlanning(rec.raw.Id, function(planning) {
            var deja = false;

            centerPanel.items.each(function(tab, index, totalcount) {
                if (tab.planning && planning.Id == tab.planning.Id) {
                    deja = true;
                    centerPanel.setActiveTab(tab);
                }
            });

            if (!deja)
            {
            	symfony("get", "events", "planning", { planningid: rec.raw.Id }, function(result) {
                	var dataEvents = result['data'];
                	Ext.define('Extensible.totem.calendar.data.Events', {
    				    constructor :  function() {
    				    	return {
    				    		"evts": dataEvents
    				    	}
    				    }
                	});

	                symfony("list", "group", "user", {}, function(result) {
	                	var dataUsergroups = result['data'];
	                	
	                	Ext.define('Extensible.totem.calendar.data.Calendar', {
	                	    constructor :  function() {
	                	    	var result = [];
	                	    	
	                	    	$.each(dataUsergroups, function(key, value) {
	                	    		var i = Math.abs(value.color.replace('x-cal-', '').replace('-ad', '')) + 0;
	                	    		var x = {
	                	    			'cal_id' : value.Id,
	                	    			'cal_color' : i,
	                	    			'cal_title' : value.text,
	                	    		};
	                	    		result.push(x);
	                	    	});
	                	    	
	                	    	return {
	                	    		"calendars": result,
	                	    	}
	                	    }
	                	});
	                	
	                	var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
	                        data: Ext.create('Extensible.totem.calendar.data.Events')
	                    });
	                    
	                	workspacePlannings.calendarStore = Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
	                    	data: Ext.create('Extensible.totem.calendar.data.Calendar')
	                    });
	                	
		                var newTab = Ext.create('Ext.Panel', {
		                    title: rec.raw.text,
		                    iconCls: 'icon-planning',
		                    closable: true,
		                    active: true,
		                    tbar: [
		                        { text: 'Enregistrer', key: 'save', handler: workspacePlannings.task },
		                        { text: 'Analyser', key: 'analyse', handler: workspacePlannings.task },
		                        { text: 'Exécuter', key: 'run', handler: workspacePlannings.task }
		                    ],
		                    items: [
		                        {
		                            xtype: 'extensible.calendarpanel',
		                            //title: 'Calendar',
		                            eventStore: eventStore,
		                            calendarStore: workspacePlannings.calendarStore,
		                            //width: 700,
		                            height: 1098,
		                            //autoHeight: true,
		                            activeItem: 1,
		                            // this is a good idea since we are in a TabPanel and we don't want
		                            // the user switching tabs on us while we are editing an event:
		                            editModal: true,
		                            
		                            listeners: {
		                            	'eventclick': {
		                            		fn: function(vw, record, el) {
		                            			//this.clearMsg();
		                            		},
		                            		scope: this
		                            	},
		                            	'dayclick': {
		                            		fn: function(vw, dt, ad, el) {
		                            			//this.clearMsg();
		                            		},
		                            		scope: this
		                            	},
		                            	'eventupdate': {
		                            		fn: function(cp, record) {
		                            			
		                            			var eventplanning = {
		                            				id: record.data[Extensible.calendar.data.EventMappings.EventId.name],
		                            				title: record.data[Extensible.calendar.data.EventMappings.Title.name],
									    	    	planningid: rec.raw.Id,
									    	    	usergroupid: record.data[Extensible.calendar.data.EventMappings.CalendarId.name],
									    	    	startdate: ''+record.data[Extensible.calendar.data.EventMappings.StartDate.name],
									    	    	enddate: ''+record.data[Extensible.calendar.data.EventMappings.EndDate.name],
									    	    	recurrule: record.data[Extensible.calendar.data.EventMappings.RRule.name],
									    	    	location: record.data[Extensible.calendar.data.EventMappings.Location.name],
									    	    	notes: record.data[Extensible.calendar.data.EventMappings.Notes.name],
									    	    	url: record.data[Extensible.calendar.data.EventMappings.Url.name],
									    	    	isallday: record.data[Extensible.calendar.data.EventMappings.IsAllDay.name],
									    	    	reminder: record.data[Extensible.calendar.data.EventMappings.Reminder.name],
									    	    	reportid: record.data[Extensible.calendar.data.EventMappings.ReportId.name],
									    	    	createdby: record.data[Extensible.calendar.data.EventMappings.CreatedBy.name],
		                            			};
		                            			
		                            			//alert(eventplanning.startdate);
		                            			
		                            			symfony("save", "event", "planning", eventplanning, function(result) {
		                                        	//
		                            			});
		                            			
		                            		},
		                            		scope: this
		                            	},
		                            	'eventadd': {
		                            		fn: function(cp, record) {
		                            			
		                            			var eventplanning = {
		                            				title: record.data[Extensible.calendar.data.EventMappings.Title.name],
									    	    	planningid: rec.raw.Id,
									    	    	usergroupid: record.data[Extensible.calendar.data.EventMappings.CalendarId.name],
									    	    	startdate: ''+record.data[Extensible.calendar.data.EventMappings.StartDate.name],
									    	    	enddate: ''+record.data[Extensible.calendar.data.EventMappings.EndDate.name],
									    	    	recurrule: record.data[Extensible.calendar.data.EventMappings.RRule.name],
									    	    	location: record.data[Extensible.calendar.data.EventMappings.Location.name],
									    	    	notes: record.data[Extensible.calendar.data.EventMappings.Notes.name],
									    	    	url: record.data[Extensible.calendar.data.EventMappings.Url.name],
									    	    	isallday: record.data[Extensible.calendar.data.EventMappings.IsAllDay.name],
									    	    	reminder: record.data[Extensible.calendar.data.EventMappings.Reminder.name],
									    	    	reportid: record.data[Extensible.calendar.data.EventMappings.ReportId.name],
									    	    	createdby: record.data[Extensible.calendar.data.EventMappings.CreatedBy.name],
		                            			};
		                            			
		                            			symfony("save", "event", "planning", eventplanning, function(result) {
		                            				record.data[Extensible.calendar.data.EventMappings.EventId.name] = result['data'].Id;
		                            			});
		                            		},
		                            		scope: this
		                            	},
		                            	'eventdelete': {
		                            		fn: function(cp, record) {
		                            			this.eventStore.remove(record);
		                            			alert(record.data[Extensible.calendar.data.EventMappings.Title.name]);
		                            		},
		                            		scope: this
		                            	},
		                            },
		                        }
		                    ]
		                });
		
		                newTab.planning = rec.raw;
		                newTab.rec = rec;
		                newTab.workspace = workspacePlannings;
		                newTab.propertySource = {
		                    '(name)': planning.title,
		                    'description': Ext.encode({ description_resume: '', description_details: '' }),
		                    'motscles': '',
		                    'environnement': '',
		                    'nodek': '',
		                    'publiee': true
		                };
		
		                centerPanel.add(newTab);
		                centerPanel.setActiveTab(newTab);
	                });
                
            	});
            }
        });
    },

    onCenterTabChange: function(tabPanel, tab) {
        if ("planning" in tab) {
            workspacePlannings.current = tab.planning;
            
            workspacePlannings.propertyData.setSource(tab.propertySource);
        }
    },

    itemPlannings : Ext.create('Ext.tree.Panel', {
        title: 'Tâches plannifiées',
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
                        if (data.records[0].raw.nodek == 'planning')
                        {
                            dropHandler.cancelDrop();
                        }
                    }
                },
       
                drop: function (node, data, overModel, dropPosition) {         

                    if (data.records[0].raw.nodek == 'groupplanning')
                    {
                        var group = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "group", "planning", group, function(result) {
                            // nothing
                        });
                    }
                    else if (data.records[0].raw.nodek == 'planning')
                    {
                        var planning = {
                            id: data.records[0].raw.Id,
                            groupid: overModel.raw.Id
                        };

                        symfony("save", "planning", "planning", planning, function(result) {
                            if (workspacePlannings.current.Id == planning.id)
                            {
                                workspacePlannings.current.groupid = planning.groupid;
                            }
                        });
                    }
                },
            }
        },
        rootVisible: false,

        listeners: {
            afterrender: function(component, eOpts) {
                var Mask = new Ext.LoadMask(workspacePlannings.itemPlannings, { msg: "Veuillez patienter ..." });
                Mask.show();

                symfony("list", "planning", "planning", {}, function(result) {
                    var store = workspacePlannings.itemPlannings.getStore();
                    var rootNode = store.setRootNode({
                        children: result.data
                    });

                    Ext.apply(workspacePlannings.itemPlannings, {
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
                     
                	symfony("get", "planning", "planning", { id: rec.raw.Id }, function(result) {
                        rec.raw = result.data;
                        workspacePlannings.gotoPlanning(rec);
                        
                        myMask.hide();
                    });
                }
            },
            containercontextmenu: function(view, eventobj) {
                workspacePlannings.menuGroupPlannings.rec = workspacePlannings.itemPlannings.store.tree.root;
                workspacePlannings.menuRootGroupPlannings.showAt(eventobj.getXY());

                eventobj.stopEvent();
            },
            itemcontextmenu: function(view, rec, item, index, eventobj) {
                if (rec.get('leaf'))
                {
                    workspacePlannings.menuPlannings.rec = rec;
                    workspacePlannings.menuPlannings.showAt(eventobj.getXY());
                }
                else
                {
                    workspacePlannings.menuGroupPlannings.rec = rec;
                    workspacePlannings.menuGroupPlannings.showAt(eventobj.getXY());
                }

                eventobj.stopEvent();
            }
        }
    }),

    setProperties: function(values) {
        $.each(values, function(key, value) {
            workspacePlannings.propertySource[key] = value;
        });
        workspacePlannings.propertyData.setSource(workspacePlannings.propertySource);
    },

    set: function(options, run) {
        currentWorkspace = workspacePlannings;
        bottomPanel.hide();

        propertyPanel.removeAll();
        workspacePlannings.propertySource = {
            '(name)': 'name',
            'description': Ext.encode({ description_resume: '', description_details: '' }),
            'motscles': '',
            'environnement': '',
            'nodek': '',
            'publiee': true
        };


        workspacePlannings.propertyData = Ext.create('Ext.grid.property.Grid', {
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
            source: workspacePlannings.propertySource,
        });
        propertyPanel.add(workspacePlannings.propertyData);
        
        propertyPanel.add(aboutTab());
        propertyPanel.setActiveTab(workspacePlannings.propertyData);


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
            title: 'Résultats tâches plannifiées',
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

    getPlanning: function(id, func) {
        symfony("get", "planning", "planning", { id: id }, function(planning) {
            //workspacePlannings.current = planning;
            if (workspacePlannings.plannings[planning.data.Id] === undefined) workspacePlannings.plannings[planning.data.Id] = {};

            func(planning.data);
        });
    },

    task: function(btn)
    {
        switch (btn.key) {
            case 'save':
            {
                var title = workspacePlannings.propertyData.source['(name)'];
                workspacePlannings.current.title = title;

                var planning = {
                    id: workspacePlannings.current.Id,
                    title: workspacePlannings.current.title,
                    groupid: workspacePlannings.current.groupid
                };

                var myMask = new Ext.LoadMask(centerPanel, { msg: "Sauvegarde en cours ..." });
                myMask.show();
                
                symfony("save", "planning", "planning", planning, function(response) {
                    //
                	
                	myMask.hide();
                });


                break;
            }
        }
    }
};

