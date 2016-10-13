workspace.paintpanel.getPaintMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-paint',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-paint',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel paint initial du workspace
    var paintMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'paintMenu',
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
		var paintMenu = workspace.paintpanel.paintMenu;
		
		paintMenu.updateSize();
	});
	
	workspace.paintpanel.paintMenu = paintMenu;
	    
    return paintMenu;
}

workspace.paintpanel.getPaintPanel = function()
{
	// Panel tools
    var toolsPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'toolsPanel',
        minWidth: 300,
        items: [],
    });

	// Panel picture
    var picturePanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'picturePanel',
		resizeTabs: false,
		collapsible: false,
        items: [],
    });

	// Panel propriétés
    var propertiesPanel = Ext.create('Ext.Panel', {
        region: 'east',
        id: 'propertiesPanel',
        minWidth: 250,
        items: [],
    });


	// Panel paint initial du workspace
    var paintPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'paintPanel',

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			toolsPanel,
			picturePanel,
			propertiesPanel
		],
    });

	paintPanel.toolsPanel = toolsPanel;
	paintPanel.picturePanel = picturePanel;
	paintPanel.propertiesPanel = propertiesPanel;
    
    workspace.paintpanel.paintPanel = paintPanel;
	workspace.paintpanel.paintMenu.centerPanel = paintPanel;
	    
    return paintPanel;
}

workspace.centerpanel.initPaintPanel = function()
{
	//
}
