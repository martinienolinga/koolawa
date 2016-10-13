workspace.paintpanel = {};


workspace.paintpanel.getPaintMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-paint',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-paint',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel paint initial du workspace
    var paintMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'paintMenu',
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
	    
    return paintMenu;
}

workspace.paintpanel.getPaintPanel = function()
{
	// Panel paint initial du workspace
    var paintPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'paintPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.paintpanel.paintPanel = paintPanel;
	    
    return paintPanel;
}

workspace.centerpanel.initPaintPanel = function()
{
	//
}
