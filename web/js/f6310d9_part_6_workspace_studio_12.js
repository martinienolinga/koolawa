workspace.studiopanel = {};


workspace.studiopanel.getStudioMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet source
    var tabSource = Ext.create('Ext.Panel', {
    	id: 'tabSource',
        title: 'Source',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabSource);
	
	// Onglet refactor
    var tabRefactor = Ext.create('Ext.Panel', {
    	id: 'tabRefactor',
        title: 'Refactor',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabRefactor);
	
	// Onglet projet
    var tabProjet = Ext.create('Ext.Panel', {
    	id: 'tabProjet',
        title: 'Projet',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabProjet);
	
	// Onglet exécuter
    var tabExecuter = Ext.create('Ext.Panel', {
    	id: 'tabExecuter',
        title: 'Exécuter',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabExecuter);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel studio initial du workspace
    var studioMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'studioMenu',
		cls: 'workspaceMenu',
        resizeTabs: false,
        enableTabScroll: false,
        height: 120,
        minHeight: 120,
        maxHeight: 120,
        frame: true,
        border: false,
		activeTab: 1,
        defaults: {
            autoScroll: true,
            bodyPadding: 10,
        },
        items: itemsMenu,
        listeners: {
            'tabchange': function(tabPanel, tab)
            {
                //
            }
        }
    });
	    
    return studioMenu;
}

workspace.studiopanel.getStudioPanel = function()
{
	// Panel projet
    var projectFilesPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'projectFilesPanel',
        minWidth: 200,
        /*frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },*/
        items: [],
    });

	// Panel code
    var codePanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'codePanel',
        /*frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },*/
        items: [],
    });

	// Panel propriétés
    var propertiesPanel = Ext.create('Ext.Panel', {
        region: 'east',
        id: 'propertiesPanel',
        minWidth: 200,
        /*frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },*/
        items: [],
    });



	// Panel studio initial du workspace
    var studioPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'studioPanel',

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
			bodyPadding: 15
		},

        /*minHeight: 80,
        frame: true,
        border: false,
		//layout: 'border',
		layout: {
                type: 'border',
                padding: 0
            },
		bodyBorder: false,
        defaults: {
            autoScroll: false,
			collapsible: true,
			split: true,
			bodyPadding: 15
        },*/
        items: [
			projectFilesPanel,
			codePanel,
			propertiesPanel
		],
    });
    
    workspace.studiopanel.studioPanel = studioPanel;
	    
    return studioPanel;
}

workspace.centerpanel.initStudioPanel = function()
{
	//
}
