workspace.drawpanel = {};


workspace.drawpanel.getDrawMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-draw',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-draw',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel draw initial du workspace
    var drawMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'drawMenu',
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
	    
    return drawMenu;
}

workspace.drawpanel.getDrawPanel = function()
{
	// Panel draw initial du workspace
    var drawPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'drawPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.drawpanel.drawPanel = drawPanel;
	    
    return drawPanel;
}

workspace.centerpanel.initDrawPanel = function()
{
	//
}
