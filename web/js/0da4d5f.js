var accordionPanel = {};
var propertyPanel = {};
var centerPanel = {};
var bottomPanel = {};
var currentWorkspace = { name : "" };
var clipboard = { kind: 'empty' };

function aboutTab()
{
	var html = '';
	html += '<div align="center">';
	
	html += '<div><br/></div>';
	html += '<div class="totem-logo"></div>';
	
	html += '<div><b>Totem</b></div>';
	html += '<div>0.0.1.34 alpha</div>';
	
	html += '<div><br/></div>';
	html += '<div>Totem est une application de génération de rapports basés sur les enregistrements d\'une ou plusieurs bases de données</div>';
	
	html += '<div><br/></div>';
	html += '<div>Développé par : <a href="mailto:martinien.olingaayissi@t2safrica.com">Martinien OLINGA AYISSI</a></div>';
	html += '<div>Ingénieur Système Linux</div>'
	html += '<div>T2SA - DSR</div>';
	
	html += '<div><br/></div>';
	html += '<div><b>Technologies utilisées</b></div>';
	html += '<div><br/></div>';
	html += '<div>Ext.Js 4.2.1.883</div>';
	html += '<div>Extensible 1.5.2</div>';
	html += '<div>Codemirror 5.3.1</div>';
	html += '<div>jQuery 2.1.4</div>';
	html += '<div><br/></div>';
	html += '<div>Symfony 2.3.30</div>';
	html += '<div>Html2Pdf 4.03</div>';
	html += '<div>FR3D 2.0.0</div>';
	
	html += '</div>';
	
	return Ext.create('Ext.Panel', {
        title: 'A propos de Totem',
        html: html
    });
}

var firstCenterDisplay = true;

function replaceAll(find, replace, str)
{
    var re = new RegExp(find, 'g');
    str = str.replace(re, replace);
    return str;
}


function showobject(obj)
{
	var frame = $('<div style="padding:5px; overflow:scroll; position: absolute; display:block; width:700px; height:400px; background-color:white; border:5px solid black; z-index:100000; left:10px; top:10px">');
	
	frame.append($('<div>').append($('<button>').html('close').on('click', function(){ frame.remove(); })).append($('<hr>')));
	
	var table = $('<table width="100%" border="0" style="padding-bottom:30px;">');
    table.append($('<tr>').append($('<td>').html('<b>KEY</b>')).append($('<td>').html('<b>VALUE</b>')));
    
    $.each(obj, function(key, val)
    {
    	var tdkey = $('<td style="font-weight:bold;">').html(key);
    	tdkey.obj = val;
    	
    	tdkey.on('click', function(sender){
    		showobject(tdkey.obj);
    	});
    	
    	var tdvalue = $('<td>').html('' + val);
    	
    	table.append($('<tr>').append(tdkey).append(tdvalue));
    });
    
    frame.append(table);
	
	$('body').append(frame);
}

function customField(name, alias, title, items) {
    Ext.define(name, {
        extend: 'Ext.form.field.Picker',
        alias: 'widget.' + alias,
        editable: false,
        hideTrigger: true,
        pickerOffset: [ 0, -24 ],
        listeners: {
            focus: function( fld, e, opts ) {
                fld.expand();
            }
        },
        cancelEdit: function() {
            var me = this;
            me.fireEvent( 'blur' );
            me.collapse();       
        },
        applyValues: function() {
            var me = this,
            form = me.picker,
            vals = form.getForm().getValues();    
        
            me.setValue( Ext.encode( vals ) );
            me.fireEvent( 'blur' );
            me.collapse();        
        },
        createPicker: function() {
            var me = this,
            format = Ext.String.format;
            return Ext.create('Ext.form.Panel', {
                title: title,
                bodypadding:5,
                pickerField: me,
                ownerCt: me.ownerCt,
                renderTo: document.body,
                floating: true,
                bodyPadding:8,
                items: items,
                dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            name:'cancel',
                            text:'Annuler',
                            iconCls: 'cancelicon',
                            handler: function( btn, e, opts ) {
                                me.cancelEdit();
                            }                                
                        },
                        '->',
                        {
                            xtype: 'button',
                            name:'save',
                            text:'OK',
                            iconCls: 'accepticon',
                            handler: function( btn, e, opts ) {
                                me.applyValues();
                            }                                
                        }
                    ]                    
                }
                ],
                listeners: {
                    afterrender: function( panel, opts ) {
                        panel.getForm().setValues( 
                            Ext.decode( me.getValue() ) 
                        );                      
                    }
                }
            })            
        }
    });
}

customField('DescriptionField', 'descriptionfield', 'Description', [
    {
        xtype: 'textfield',
        fieldLabel: 'Résumé',
        labelAlign: 'top',
        anchor: '100%',
        name: 'description_resume'
    },
    {
        xtype: 'textareafield',
        fieldLabel: 'Détails',
        labelAlign: 'top',
        anchor: '100%',
        name: 'description_details'
    }                           
]);



Ext.require(['*']);
Ext.onReady(function() {

    var Mask = new Ext.LoadMask(Ext.getBody(), { msg: "Veuillez patienter ..." });
    Mask.show();
    
    symfony("get", "logged", "user", {}, function(response) 
    {
    	workspaceUsers.logged = response['data'];
    	
	    workspaceQueries.init();
	    workspaceReports.init();
	    workspacePlannings.init();
	    workspaceUsers.init();
	    workspaceDatasources.init();
	    workspaceSettings.init();
	    Mask.hide();
	
	
	    propertyPanel = Ext.create('Ext.tab.Panel', {
	        tabPosition: 'bottom',
	        region: 'west',
	        collapsible: true,
	        split: true,
	        width: 330,
	        minWidth: 220,
	        minHeight: 140,
	        title: 'Etat',
	        activeTab: 0,
	        layout: { 
	            type: 'vbox',
	            padding: 5,
	            align: 'stretch'
	        },
	        items: []
	    });
	
	    bottomPanel = Ext.create('Ext.tab.Panel', {
	        id: 'bottom-panel',
	        title: 'Splitter above me',
	        resizeTabs: true,
	        enableTabScroll: true,
	        region: 'south',
	        height: 300,
	        split: true,
	        collapsible: true,
	        frame: true,
	        minHeight: 60,
	        weight: -100,
	        defaults: {
	            autoScroll: true,
	            bodyPadding: 10,
	        },
	        items: []
	    });

	    
	    accordionPanel = Ext.create('Ext.Panel', {
	        id: 'accordion',
	        region:'west',
	        split:true,
	        width: 250, 
	        layout:'accordion',
	        items: [ 
	            (workspaceUsers.logged.rules.queryDisplay)?workspaceQueries.itemQueries:null,
	            (workspaceUsers.logged.rules.reportDisplay)?workspaceReports.itemReports:null,
	            (workspaceUsers.logged.rules.planningDisplay)?workspacePlannings.itemPlannings:null,
	            (workspaceUsers.logged.rules.userDisplay)?workspaceUsers.itemUsers:null,
	            (workspaceUsers.logged.rules.datasourceDisplay)?workspaceDatasources.itemDatasources:null,
	            (workspaceUsers.logged.rules.settingDisplay)?workspaceSettings.itemSettings:null,
	        ],
	        tbar: [
	            { text: 'Se déconnecter', iconCls: 'icon-logout', key: 'logout', handler: function() {
	            	symfony("logout", "user", "user", {}, function(report) {
	            		document.location = './logout';
	                });
	            }},
	        ]
	    });
	
	
	    var tabWelcome = Ext.create('Ext.Panel', {
	        title: 'Accueil',
	        iconCls: 'icon-home',
	        html: '<div id="welcomediv"></div>',
	        closable: false
	    });
	    tabWelcome.welcome = true;
	
	    centerPanel = Ext.create('Ext.tab.Panel', {
	        region: 'center',
	        id: 'centerPanel',
	        resizeTabs: true,
	        enableTabScroll: true,
	        minHeight: 80,
	        frame: true,
	        defaults: {
	            autoScroll: true,
	            bodyPadding: 10,
	        },
	        items: [ tabWelcome ],
	        listeners: {
	            'tabchange': function(tabPanel, tab)
	            {
	                if (tab.workspace !== undefined) {
	                    currentWorkspace = tab.workspace;
	                    currentWorkspace.set({tab: tab}, function() {
	                        currentWorkspace.onCenterTabChange(tabPanel, tab);
	                    });
	                } else {
	                    if (tab.welcome !== undefined) {
	                        welcomeChange();
	                    }
	                }
	            }
	        }
	    });
	
	
	    workspaceReports.set({tab: 'welcome'}, function() {
	        welcomeChange();
	    });
	
	    function welcomeChange() {
	        bottomPanel.hide();
	        
	        var renderto = centerPanel;
	        if (firstCenterDisplay)
	        {
	        	renderto = Ext.getBody();
	        	firstCenterDisplay = false;
	        }
	        
	        propertyPanel.removeAll();
	        var aboutT = aboutTab();
	        propertyPanel.add(aboutT);
	        propertyPanel.setActiveTab(aboutT);
	        
	        var Mask = new Ext.LoadMask(renderto, { msg: "Chargement en cours ..." });
	        Mask.show();
	        
	        symfony("get", "files", "report", { }, function(response) {
		        
		    	var div = '<div>';
		        $.each(response['data'], function(key, value){
		            div += '<div class="totem-files">' + '<a href="./file?' + value['Id'] + '">' + value['text'] + '</a>' + '</div>';
		        });
		        div += '</div>';
		        
		        $('#welcomediv').html(div);
		        
		        Mask.hide();
		    });
	    }
	
	
	    var cw;
	
	    function closeRegion (e, target, header, tool) {
	        var region = header.ownerCt;
	        newRegions.unshift(region.initialConfig);
	        workspace.remove(region);
	    }
	
	    var newRegions = [{
	            region: 'north',
	            title: 'North 2',
	            height: 100,
	            collapsible: true,
	            weight: -120
	        }, {
	            region: 'east',
	            title: 'East 2',
	            width: 100,
	            collapsible: true,
	            weight: -110
	        }, {
	            region: 'west',
	            title: 'West 2',
	            width: 100,
	            collapsible: true,
	            weight: -110
	        }];
	
	    var workspace = Ext.create('Ext.Viewport', {
	        layout: {
	            type: 'border',
	            padding: 0
	        },
	        defaults: {
	            split: true
	        },
	        items: [{
	            region: 'north',
	            cls: 'app-header',
				height: 60,
	            minHeight: 60,
				maxHeight: 60,
	            html: '<div class="totem-logo-small"></div>Plateforme Totem'
	        },
	        accordionPanel,
	        centerPanel,
	        propertyPanel,
	        bottomPanel]
	    });
	    
	    /*symfony("get", "files", "report", { }, function(response) {
	        
	    	var div = '<div>';
	        $.each(response['data'], function(key, value){
	            div += '<div class="totem-files">' + '<a href="./file?' + value['Id'] + '">' + value['text'] + '</a>' + '</div>';
	        });
	        div += '</div>';
	        
	        $('#welcomediv').html(div);
	    });*/
    });
});



Ext.require(['*']);
Ext.onReady(function() {
	
	var datacouleur = [];
	for (i = 1; i <= 32; i++)
	{
	    datacouleur.push({
	        value: 'color' + i,
	        text: 'Couleur ' + i,
	        color: 'x-cal-' + i + '-ad'
	    });
	}

	var storecouleur = Ext.create('Ext.data.Store', {
	    fields: ['value', 'text', 'color'],
	    data: datacouleur
	});
	
	
	Ext.define('Totem.ux.color.Combo', {
        extend: 'Ext.form.field.ComboBox',
        alias: 'widget.ux_colorcombo',

        colorField: 'color',
        displayField: 'text',
        valueField: 'color',

        tpl : Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item">',
            '<span class="{color} color-box-icon"></span>{text}',
            '</div>',
            '</tpl>'
        ),

		fieldSubTpl : [
		    '<div class="{hiddenDataCls}" role="presentation"></div>',
		    '<div>',
		    '<span id="{id}color" class="{[this.getColor(values)]} color-box-icon" style="float: left; position: absolute; margin: 0px 2px 2px 3px;"></span>',
		
		    '<input id="{id}" type="{type}" {inputAttrTpl} class="fieldCls" {typeCls} {editableCls} autocomplete="off"',
		    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
		    'style="border:none; display:none;"/>',
		    
		    '<span id="{id}span" style="margin-left: 23px;">',
		    '<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',
		    '</span>',
		    
		    '</div>',
		    {
		        compiled: true,
		        disableFormats: true,
		        
		        getColor: function(values) {
		        	var me  = this;
		        	var data = storecouleur.findRecord('text', values.value);
		        	return data.get('color');
		        },
		    }
		],

		initComponent: function() {
			var me = this;
			
			me.store = storecouleur;
			this.callParent(arguments);
			
			me.on('change',
				function(element, newValue) {
				 	var data = me.getStore().findRecord(me.valueField, me.value);
				 	$('#' + me.inputId + 'color').attr('class', data.get(me.colorField) + ' color-box-icon');
					$('#' + me.inputId + 'span').html(data.get(me.displayField));
				}
			);
		},
    });

    Ext.define('Totem.ux.view.GroupingList', {
        extend: 'Ext.view.View',
        alias: 'widget.groupinlist',
        requires: ['Ext.layout.component.BoundList', 'Ext.toolbar.Paging'],
    
        pageSize: 0,
    
        autoScroll: true,
        baseCls: Ext.baseCSSPrefix + 'boundlist',
        listItemCls: '',
        shadow: false,
        trackOver: true,
        refreshed: 0,

        ariaRole: 'listbox',

        componentLayout: 'boundlist',

        renderTpl: ['<div class="list-ct"></div>'],

        initComponent: function() {
            var me = this;
            var baseCls = me.baseCls;
            var itemCls = baseCls + '-item';

            me.itemCls = itemCls;
            me.selectedItemCls = baseCls + '-selected';
            me.overItemCls = baseCls + '-item-over';
            me.itemSelector = "." + itemCls;

            if (me.floating) {
                me.addCls(baseCls + '-floating');
            }
        
            var tpl = [
                '<ul class="ul-x-combobox">',
                    '<tpl for=".">'
            ];
        
            var padding = 1;
        
            if (Ext.isArray(me.groupField)) {           
                padding = me.groupField.length;         
                for (var i = 0; i < me.groupField.length; i++) {                
                    tpl.push(
                        '<tpl if="xindex == 1 || parent[xindex - 2][\'' + me.groupField[i] + '\'] != values[\'' + me.groupField[i] + '\']">',
                            '<li class="x-combo-list-group" style="padding-left:' + (i * 16) + 'px;">{[values["' + me.groupField[i] + '"]]}</li>',
                        '</tpl>'
                    );
                }
            }        
            else {          
                tpl.push(
                    '<tpl if="xindex == 1 || parent[xindex - 2][\'' + me.groupField + '\'] != values[\'' + me.groupField + '\']">',
                        '<li class="x-combo-list-group">{[values["' + me.groupField + '"]]}</li>',
                    '</tpl>'
                );
            }

            tpl.push(
                    '<li role="option" class="' + itemCls + '" style="padding-left:' + (padding * 16) + 'px;">{[values["' + me.displayField + '"]]}</li>',
                    '</tpl>',
                '</ul>'
            );
        
            me.tpl = Ext.create('Ext.XTemplate', tpl);

            if (me.pageSize) {
                me.pagingToolbar = me.createPagingToolbar();
            }

            me.callParent();

            Ext.applyIf(me.renderSelectors, {
                listEl: '.list-ct'
            });
        },

        createPagingToolbar: function() {
            return Ext.widget('pagingtoolbar', {
                pageSize: this.pageSize,
                store: this.store,
                border: false
            });
        },

        onRender: function() {
            var me = this;
            var toolbar = me.pagingToolbar;

            me.callParent(arguments);
            if (toolbar) {
                toolbar.render(me.el);
            }
        },

        bindStore : function(store, initial) {
            var me = this;
            var toolbar = me.pagingToolbar;

            me.callParent(arguments);
            if (toolbar) {
                toolbar.bindStore(store, initial);
            }
        },

        getTargetEl: function() {
            return this.listEl || this.el;
        },

        getInnerTpl: function(displayField) {
            return '{' + displayField + '}';
        },

        refresh: function() {
            var me = this;

            me.callParent();
            if (me.isVisible()) {
                me.refreshed++;
                me.doComponentLayout();
                me.refreshed--;
            }
        },
    
        initAria: function() {
            this.callParent();
        
            var selModel = this.getSelectionModel();
            var mode     = selModel.getSelectionMode();
            var actionEl = this.getActionEl();
        
            if (mode !== 'SINGLE') {
                actionEl.dom.setAttribute('aria-multiselectable', true);
            }
        },

        onDestroy: function() {
            Ext.destroyMembers(this, 'pagingToolbar', 'listEl');
            this.callParent();
        }
    });


    Ext.define('Totem.ux.form.GroupingComboBox', {
        extend: 'Ext.form.field.ComboBox',
        requires: ['Totem.ux.view.GroupingList'],
        alias: ['widget.groupingcombobox', 'widget.groupingcombo'],

        initComponent: function() {
            var me = this;

            if (!me.displayTpl) {
                var display = [],
                    tpl = '<tpl for=".">{0}</tpl>';
                if (Ext.isArray(me.groupField)) {
                    for (var i = 0; i < me.groupField.length; i++) {
                        display.push('{[values["' + me.groupField[i] + '"]]}');
                    }
                }
                else {
                    display.push('{[values["' + me.groupField + '"]]}');
                }
                display.push('{[values["' + me.displayField + '"]]}');
                me.displayTpl = Ext.String.format(tpl, display.join(this.displaySeparator || ' '));
            }
            me.callParent();
        },

        createPicker: function() {
            var me = this,
                picker,
                menuCls = Ext.baseCSSPrefix + 'menu',
                opts = Ext.apply({
                    selModel: {
                        mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                    },
                    floating: true,
                    hidden: true,
                    ownerCt: me.ownerCt,
                    cls: me.el.up('.' + menuCls) ? menuCls : '',
                    store: me.store,
                    groupField: me.groupField,
                    displayField: me.displayField,
                    focusOnToFront: false,
                    pageSize: me.pageSize
                }, me.listConfig, me.defaultListConfig);

            //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
            picker = me.picker = Ext.create('Totem.ux.view.GroupingList', opts);

            me.mon(picker, {
                itemclick: me.onItemClick,
                refresh: me.onListRefresh,
                scope: me
            });

            me.mon(picker.getSelectionModel(), 'selectionchange', me.onListSelectionChange, me);

            return picker;
        }
    });

});


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

