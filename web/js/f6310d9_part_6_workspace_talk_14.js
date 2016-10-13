workspace.talkpanel = {};


workspace.talkpanel.getTalkMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-talk',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-talk',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel talk initial du workspace
    var talkMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'talkMenu',
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
	    
    return talkMenu;
}

workspace.talkpanel.getTalkPanel = function()
{
	// Panel talk initial du workspace
    var talkPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'talkPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.talkpanel.talkPanel = talkPanel;
	    
    return talkPanel;
}

workspace.centerpanel.initTalkPanel = function()
{
	//
}
