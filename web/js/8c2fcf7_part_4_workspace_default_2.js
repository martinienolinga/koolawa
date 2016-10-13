workspace.workzone = {};

workspace.workzone.getZonePanel = function(_workspace, itemsViewport)
{
    // creation du viewport principal
	var viewport = Ext.create('Ext.Viewport', {
		id : 'workspaceViewport',
		cls: 'workzone_' + _workspace,
        layout: {
            type: 'border',
            padding: 0
        },
        defaults: {
            split: false
        },
        items: itemsViewport
    });

	return viewport;
}


workspace.workzone.getBeginMenu = function()
{
	var itemsMenu = [];

	// Onglet fichier du workspace
    var tabFichier = Ext.create('Ext.Panel', {
    	id: 'tabFichier',
        title: 'Fichier',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabFichier);
    
    // Onglet accueil du workspace
    var tabAccueil = Ext.create('Ext.Panel', {
    	id: 'tabAccueil',
        title: 'Accueil',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabAccueil);
    
    // Onglet insertion du workspace
    var tabInsertion = Ext.create('Ext.Panel', {
    	id: 'tabInsertion',
        title: 'Insertion',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabInsertion);

	return itemsMenu;
}

workspace.workzone.getEndMenu = function(itemsMenu)
{
	// Onglet affichage du workspace
    var tabAffichage = Ext.create('Ext.Panel', {
    	id: 'tabAffichage',
        title: 'Affichage',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabAffichage);

	// Onglet aide du workspace
    var tabAide = Ext.create('Ext.Panel', {
    	id: 'tabAide',
        title: 'Aide',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabAide);

	return itemsMenu;
}
