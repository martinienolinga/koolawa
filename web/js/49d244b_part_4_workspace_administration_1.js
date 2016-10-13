workspace.administrationpanel = {};


workspace.administrationpanel.getAdministrationMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-administration',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-administration',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel administration initial du workspace
    var administrationMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'administrationMenu',
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
	    
    return administrationMenu;
}

workspace.administrationpanel.getAdministrationPanel = function()
{
	// Panel administration initial du workspace
    var administrationPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'administrationPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.administrationpanel.administrationPanel = administrationPanel;
	    
    return administrationPanel;
}

workspace.centerpanel.initAdministrationPanel = function()
{
	//
}
