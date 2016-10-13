workspace.administrationpanel.getAdministrationMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-administration',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-administration',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel administration initial du workspace
    var administrationMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'administrationMenu',
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
		var administrationMenu = workspace.administrationpanel.administrationMenu;
		
		administrationMenu.updateSize();
	});
	
	workspace.administrationpanel.administrationMenu = administrationMenu;
	
    return administrationMenu;
}

workspace.administrationpanel.getAdministrationPanel = function()
{
	// Panel administration initial du workspace
    var administrationPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'administrationPanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
    });
    
    workspace.administrationpanel.administrationPanel = administrationPanel;
    workspace.administrationpanel.administrationMenu.centerPanel = administrationPanel;
	    
    return administrationPanel;
}

workspace.centerpanel.initAdministrationPanel = function()
{
	//
}
