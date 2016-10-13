workspace.agendapanel.getAgendaMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-agenda',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-agenda',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel agenda initial du workspace
    var agendaMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'agendaMenu',
		cls: 'workspaceMenu',
		
        items: itemsMenu,

		listeners: {
        	'afterrender': function(cmp)
            {
				workspace.workzone.addShortMenu(cmp, [
					{
						cls: 'icon-save_22white',
						tooltip: 'Enregistrer'
					},
					{
						cls: 'icon-undo_22white',
						tooltip: 'Annuler la dernière action'
					},
					{
						cls: 'icon-redo_22white',
						tooltip: 'Refaire la dernière action'
					},
				]);
			}
        },
    });
    
    $(window).on('resize', function() {
		var agendaMenu = workspace.agendapanel.agendaMenu;
		
		agendaMenu.updateSize();
	});
	
	workspace.agendapanel.agendaMenu = agendaMenu;
    
    return agendaMenu;
}

workspace.agendapanel.getAgendaPanel = function()
{
	// Panel projet
    var optionsPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'optionsPanel',
        minWidth: 300,
        items: [],
    });

	// Panel diagram
    var calendarPanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'calendarPanel',
		resizeTabs: false,
		collapsible: false,
        items: [],
    });

	// Panel agenda initial du workspace
    var agendaPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'agendaPanel',

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			optionsPanel,
			calendarPanel,
		],
    });

	agendaPanel.optionsPanel = optionsPanel;
	agendaPanel.calendarPanel = calendarPanel;
    
    workspace.agendapanel.agendaPanel = agendaPanel;
    workspace.agendapanel.agendaMenu.centerPanel = agendaPanel;
	    
    return agendaPanel;
}

workspace.centerpanel.initAgendaPanel = function()
{
	//
}
