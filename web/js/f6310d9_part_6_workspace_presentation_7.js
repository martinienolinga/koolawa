workspace.presentationpanel = {};


workspace.presentationpanel.getPresentationMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-presentation',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-presentation',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel presentation initial du workspace
    var presentationMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'presentationMenu',
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
	    
    return presentationMenu;
}

workspace.presentationpanel.getPresentationPanel = function()
{
	// Panel presentation initial du workspace
    var presentationPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'presentationPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.presentationpanel.presentationPanel = presentationPanel;
	    
    return presentationPanel;
}

workspace.centerpanel.initPresentationPanel = function()
{
	//
}
