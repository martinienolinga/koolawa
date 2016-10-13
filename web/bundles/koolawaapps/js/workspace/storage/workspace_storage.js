workspace.storagepanel.getStorageMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu({
		menuForce: ['Accueil', 'Edition'],
		onopen: function(data)
		{
			alert('fichier: ' + data.path);
		}
	});

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
        //iconCls: 'icon-home',
        cls: 'tab-storagefile tab-kind-' + data.kind,
        closable: data.closable,
		//afterrender: data.afterrender,
        kind: data.kind,
        counttab: counttab,
        listeners: {
        	'resize': function()
        	{        		
				resizeStorageBox(this.counttab);
        	},

			'afterrender': function(tabPanel, eOpts)
            {
				//if (typeof this.afterrender !== 'undefined') this.afterrender(tabPanel, eOpts);
				startStorageBox(this.counttab);
			}
        },
        html: data.html
    });
    
    if (typeof data.collapsible !== 'undefined') tab.collapsible = data.collapsible;
    if (typeof data.iconCls !== 'undefined' && data.iconCls !== null) tab.collapsible = data.iconCls;

	return tab;
}

workspace.storagepanel.showDirectory = function(directory, isCom)
{
	if (typeof isCom === 'undefined') isCom = false;

	var counttab = workspace.storagepanel.lastNumber;

	var tabFile = workspace.storagepanel.newTab({
		kind: 'directory',
		collapsible: false,
		iconCls: (isCom)?null:'icon-home',
		
		/*afterrender: function(tabPanel, eOpts)
		{
		},*/
	});
	
	tabFile.path = Ext.widget('panel', {
		id: 'storagepathpanel_' + counttab,
		border: false,
		region: 'north',
		height: (isCom)?34:29,
		cls: 'storagepath',
		layout: {
	        padding: 0
	    },
	});

	tabFile.content = Ext.widget('panel', {
		id: 'storagecontentpanel_' + counttab,
		border: false,
		region: 'center',
		cls: 'storagecontent',		
		viewConfig: {
			scroll: 'vertical'
		},
		
		html: '<div class="fileitems"></div>',
	});
	
	tabFile.status = Ext.widget('panel', {
		id: 'storagestatuspanel_' + counttab,
		border: false,
		region: 'south',
		height: 34,
		cls: 'storagestatus',
		layout: {
	        padding: 5
	    },
	});
	
	
	tabFile.layout = 'border';
	tabFile.bodyBorder = false;
	tabFile.defaults = {
		collapsible: false,
	};
	
	tabFile.add(tabFile.path);
	tabFile.add(tabFile.content);
	tabFile.add(tabFile.status);
	
	/*var storagebox = "";
	storagebox += "<div id='storagetab_" + counttab + "' class='storagetab'>";
	storagebox += "   <div id='storagepath_" + counttab + "' class='storagepath'></div>";
	storagebox += "   <div id='storagecontent_" + counttab + "' class='storagecontent'></div>";
	storagebox += "</div>";*/
	
	//tabFile.update(storagebox);
	
	if (isCom)
	{
		tabFile.region = 'center';
		tabFile.closable = false;
	}
	else
	{
		tabFile.title = 'Répertoire';
		tabFile.closable = true;
	
		workspace.storagepanel.storagePanel.filesPanel.add(tabFile);
	}
    
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

workspace.storagepanel.getStoragePanel = function(options)
{
	if (typeof options === 'undefined') options = {};
	if (typeof options.isCom === 'undefined') options.isCom = false;

	var treeFilesPanel = workspace.storagepanel.getFileTreePanel(options);

	workspace.storagepanel.lastNumber = 0;

	var filesPanel = {};
	if (!options.isCom)
	{
		// Panel files
		filesPanel = Ext.create('Ext.tab.Panel', {
		    region: 'center',
		    id: 'filesPanel',
			resizeTabs: false,
			collapsible: false,
		    items: [],
		});
    }
    else
    {
		filesPanel = workspace.storagepanel.showDirectory('new file 1', options.isCom);
    }

	if (!options.isCom)
	{
		// Panel propriétés
		var propertiesPanel = Ext.create('Ext.Panel', {
		    region: 'east',
		    id: 'propertiesPanel',
		    minWidth: 200,
		    width: 300,
		    items: [],
		});
    }


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
    });
    
    storagePanel.add(treeFilesPanel);
    storagePanel.add(filesPanel);
    if (!options.isCom) storagePanel.add(propertiesPanel);
    
        
	storagePanel.treeFilesPanel = treeFilesPanel;
	storagePanel.filesPanel = filesPanel;
	if (!options.isCom) storagePanel.propertiesPanel = propertiesPanel;
    
    workspace.storagepanel.storagePanel = storagePanel;
    
    if (!options.isCom)
    {
		workspace.storagepanel.storageMenu.centerPanel = storagePanel;
	}
	    
    return storagePanel;
}

workspace.centerpanel.initStoragePanel = function()
{
	workspace.storagepanel.storagePanel.filesPanel.setActiveTab(workspace.storagepanel.showDirectory('new file 1'));
	workspace.storagepanel.showFile('new file 2');
}
