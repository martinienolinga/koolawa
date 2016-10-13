workspace.presentationpanel.getPresentationMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-presentation',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-presentation',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel presentation initial du workspace
    var presentationMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'presentationMenu',
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
		var presentationMenu = workspace.presentationpanel.presentationMenu;
		
		presentationMenu.updateSize();
	});
	
	workspace.presentationpanel.presentationMenu = presentationMenu;
	    
    return presentationMenu;
}

workspace.presentationpanel.getPresentationPanel = function()
{
	// Panel slide list
    var slideListPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'slideListPanel',
        minWidth: 300,
        items: [],
    });

	// Panel slide
    var slidePanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'slidePanel',
		collapsible: false,
        items: [],
    });

	// Panel presentation initial du workspace
    var presentationPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'presentationPanel',

        layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			slideListPanel,
			slidePanel,
		],
    });

	presentationPanel.slideListPanel = slideListPanel;
	presentationPanel.slidePanel = slidePanel;
    
    workspace.presentationpanel.presentationPanel = presentationPanel;
    workspace.presentationpanel.presentationMenu.centerPanel = presentationPanel;
	    
    return presentationPanel;
}

workspace.centerpanel.initPresentationPanel = function()
{
	//
}
