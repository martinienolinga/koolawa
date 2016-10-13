workspace.talkpanel.getTalkMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-talk',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-talk',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel talk initial du workspace
    var talkMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'talkMenu',
		cls: 'workspaceMenu',

		tabsTripColor: '#1065a3',		
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
		var talkMenu = workspace.talkpanel.talkMenu;
		
		talkMenu.updateSize();
	});
	
	workspace.talkpanel.talkMenu = talkMenu;
	    
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
    workspace.talkpanel.talkMenu.centerPanel = talkPanel;
	    
    return talkPanel;
}

workspace.centerpanel.initTalkPanel = function()
{
	//
}
