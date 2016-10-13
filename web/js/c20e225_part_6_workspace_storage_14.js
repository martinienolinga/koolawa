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

workspace.storagepanel.newTab = function(data)
{
	var counttab = workspace.storagepanel.lastNumber + 1;
	while ($('#tabStorage' + counttab).get().length != 0)
	{
		counttab++;
	}
	workspace.storagepanel.lastNumber = counttab;

	var tab = Ext.create('Ext.Panel', {
    	id: 'tabStorage' + counttab,
        title: data.title,
        iconCls: 'icon-home',
        cls: 'tab-storagefile tab-kind-' + data.kind,
        closable: data.closable,
		afterrender: data.afterrender,
        kind: data.kind,
        counttab: counttab,
        listeners: {
        	'resize': function()
        	{        		
				resizeStorageBox(this.counttab);
        	},

			'afterrender': function(tabPanel, eOpts)
            {
				if (typeof this.afterrender !== 'undefined') this.afterrender(tabPanel, eOpts);
				startStorageBox(this.counttab);
			}
        },
        html: data.html
    });

	return tab;
}

workspace.storagepanel.showDirectory = function(directory)
{
	var counttab = workspace.storagepanel.lastNumber;

	var tabFile = workspace.storagepanel.newTab({
		title: 'Répertoire',
		closable: true,
		kind: 'directory',

		afterrender: function(tabPanel, eOpts)
		{
			tabPanel.path = Ext.widget('panel', {
				id: 'storagepathpanel_' + counttab,
				border: false,
				height: 30,
				layout: {
			        padding: 0
			    },
				renderTo: 'storagepath_' + counttab,
			});

			tabPanel.content = Ext.widget('panel', {
				id: 'storagecontentpanel_' + counttab,
				border: false,
				height: 200,
				renderTo: 'storagecontent_' + counttab,
			});
		},
	});
	
	var storagebox = "";
	storagebox += "<div id='storagetab_" + counttab + "' class='storagetab'>";
	storagebox += "   <div id='storagepath_" + counttab + "' class='storagepath'></div>";
	storagebox += "   <div id='storagecontent_" + counttab + "' class='storagecontent'></div>";
	storagebox += "</div>";
	
	tabFile.update(storagebox);
    
    workspace.storagepanel.storagePanel.filesPanel.add(tabFile);
    
    return tabFile;
}

workspace.storagepanel.showFile = function(file)
{
	var storagebox = "";
	//storagebox += "<div id='storagefile_" + counttab + "' class='storagefile'>";
	//storagebox += "	<textarea id='code_" + counttab + "' name='code_" + counttab + "'>commentaire</textarea>";
	//storagebox += "</div>";

    var tabFile = workspace.storagepanel.newTab({
		title: 'Fichier',
		closable: true,
		kind: 'file',
		html: '<div>test fichier</div>'
	});
    
    workspace.storagepanel.storagePanel.filesPanel.add(tabFile);
    
    return tabFile;
}

workspace.storagepanel.getStoragePanel = function()
{
	var treeFilesPanel = workspace.storagepanel.getFileTreePanel();

	workspace.storagepanel.lastNumber = 0;

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
	workspace.storagepanel.storagePanel.filesPanel.setActiveTab(workspace.storagepanel.showDirectory('new file 1'));
	workspace.storagepanel.showFile('new file 2');
}
