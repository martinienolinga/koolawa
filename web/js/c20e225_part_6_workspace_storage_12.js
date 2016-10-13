workspace.storagepanel = {};


workspace.storagepanel.getStorageMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu(['Accueil', 'Edition']);

    // Onglet allez-à du workspace
    var tabAllezA = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabAllezA',
        title: 'Allez-à',
		cls: 'tab-menu tab-storage',
        closable: false
    });
	itemsMenu.push(tabAllezA);
    
    // Onglet favoris du workspace
    var tabFavoris = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabFavoris',
        title: 'Favoris',
		cls: 'tab-menu tab-storage',
        closable: false
    });
	itemsMenu.push(tabFavoris);

	// Onglet outils du workspace
    var tabOutils = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabOutils',
        title: 'Outils',
		cls: 'tab-menu tab-storage',
        closable: false
    });
	itemsMenu.push(tabOutils);

	// Onglet recherche du workspace
    var tabRecherche = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabRecherche',
        title: 'Recherche',
		cls: 'tab-menu tab-storage',
        closable: false
    });
	itemsMenu.push(tabRecherche);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel storage initial du workspace
    var storageMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'storageMenu',
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
		var storageMenu = workspace.storagepanel.storageMenu;
		
		storageMenu.updateSize();
	});
	
	workspace.storagepanel.storageMenu = storageMenu;
	    
    return storageMenu;
}

workspace.storagepanel.getStoragePanel = function()
{
	// Panel tree
    var treeFilesPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'projectFilesPanel',
        minWidth: 200,
        width: 300,
        items: [],
    });

	// Panel files
    var filesPanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'filesPanel',
		resizeTabs: false,
		collapsible: false,
        items: [],
    });

	// Panel propriétés
    var propertiesPanel = Ext.create('Ext.Panel', {
        region: 'east',
        id: 'propertiesPanel',
        minWidth: 200,
        width: 300,
        items: [],
    });


	// Panel storage initial du workspace
    var storagePanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'storagePanel',
        layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},
        items: [
			treeFilesPanel,
			filesPanel,
			propertiesPanel
		],
    });
    
	storagePanel.treeFilesPanel = treeFilesPanel;
	storagePanel.filesPanel = filesPanel;
	storagePanel.propertiesPanel = propertiesPanel;
    
    workspace.storagepanel.storagePanel = storagePanel;
	workspace.storagepanel.storageMenu.centerPanel = storagePanel;
	    
    return storagePanel;
}

workspace.centerpanel.initStoragePanel = function()
{
	//
}
