workspace.studiopanel = {};


workspace.studiopanel.getStudioMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-studio',
        closable: false
    });
	itemsMenu.push(tabReferences);

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
	// Panel studio initial du workspace
    var studioPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'studioPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.studiopanel.studioPanel = studioPanel;
	    
    return studioPanel;
}

workspace.centerpanel.initStudioPanel = function()
{
	//
}
