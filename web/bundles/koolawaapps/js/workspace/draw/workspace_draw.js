workspace.drawpanel.getDrawMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-draw',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-draw',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel draw initial du workspace
    var drawMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'drawMenu',
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
		var drawMenu = workspace.drawpanel.drawMenu;
		
		drawMenu.updateSize();
	});
	
	workspace.drawpanel.drawMenu = drawMenu;
	    
    return drawMenu;
}

workspace.drawpanel.getDrawPanel = function()
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


	// Panel draw initial du workspace
    var drawPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'drawPanel',

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

	drawPanel.toolsPanel = toolsPanel;
	drawPanel.picturePanel = picturePanel;
	drawPanel.propertiesPanel = propertiesPanel;
    
    workspace.drawpanel.drawPanel = drawPanel;
    workspace.drawpanel.drawMenu.centerPanel = drawPanel;
	    
    return drawPanel;
}

workspace.centerpanel.initDrawPanel = function()
{
	//
}
