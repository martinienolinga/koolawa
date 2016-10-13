workspace.projectpanel.getProjectMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-project',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-project',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel project initial du workspace
    var projectMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'projectMenu',
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
		var projectMenu = workspace.projectpanel.projectMenu;
		
		projectMenu.updateSize();
	});
	
	workspace.projectpanel.projectMenu = projectMenu;
	    
    return projectMenu;
}

workspace.projectpanel.getProjectPanel = function()
{
	// Panel projet
    var projectFilesPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'projectFilesPanel',
        minWidth: 300,
        items: [],
    });

	// Panel diagram
    var diagramPanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'diagramPanel',
		resizeTabs: false,
		collapsible: false,
        items: [],
    });


	// Panel project initial du workspace
    var projectPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'projectPanel',

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			projectFilesPanel,
			diagramPanel,
		],
    });

	projectPanel.projectFilesPanel = projectFilesPanel;
	projectPanel.diagramPanel = diagramPanel;
    
    workspace.projectpanel.projectPanel = projectPanel;
    workspace.projectpanel.projectMenu.centerPanel = projectPanel;
	    
    return projectPanel;
}

workspace.centerpanel.initProjectPanel = function()
{
	//
}
