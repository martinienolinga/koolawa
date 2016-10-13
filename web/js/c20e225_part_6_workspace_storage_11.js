workspace.storagepanel = {};


workspace.storagepanel.getStorageMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-storage',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-storage',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel storage initial du workspace
    var storageMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'storageMenu',
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
	    
    return storageMenu;
}

workspace.storagepanel.getStoragePanel = function()
{
	// Panel storage initial du workspace
    var storagePanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'storagePanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.storagepanel.storagePanel = storagePanel;
	    
    return storagePanel;
}

workspace.centerpanel.initStoragePanel = function()
{
	//
}
