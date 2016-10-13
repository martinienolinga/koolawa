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

