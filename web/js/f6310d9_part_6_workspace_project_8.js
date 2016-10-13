workspace.projectpanel = {};


workspace.projectpanel.getProjectMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-project',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-project',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel project initial du workspace
    var projectMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'projectMenu',
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
	    
    return projectMenu;
}

workspace.projectpanel.getProjectPanel = function()
{
	// Panel project initial du workspace
    var projectPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'projectPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.projectpanel.projectPanel = projectPanel;
	    
    return projectPanel;
}

workspace.centerpanel.initProjectPanel = function()
{
	//
}
