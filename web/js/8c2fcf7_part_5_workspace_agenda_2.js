workspace.agendapanel = {};


workspace.agendapanel.getAgendaMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-agenda',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-agenda',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel agenda initial du workspace
    var agendaMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'agendaMenu',
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
	    
    return agendaMenu;
}

workspace.agendapanel.getAgendaPanel = function()
{
	// Panel agenda initial du workspace
    var agendaPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'agendaPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.agendapanel.agendaPanel = agendaPanel;
	    
    return agendaPanel;
}

workspace.centerpanel.initAgendaPanel = function()
{
	//
}
