workspace.studiopanel.getStudioMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet source
    var tabSource = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabSource',
        title: 'Source',
		cls: 'tab-menu tab-studio',
        closable: false
    });
	itemsMenu.push(tabSource);
	
	// Onglet refactor
    var tabRefactor = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabRefactor',
        title: 'Refactor',
		cls: 'tab-menu tab-studio',
        closable: false
    });
	itemsMenu.push(tabRefactor);
	
	// Onglet projet
    var tabProjet = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabProjet',
        title: 'Projet',
		cls: 'tab-menu tab-studio',
        closable: false
    });
	itemsMenu.push(tabProjet);
	
	// Onglet exécuter
    var tabExecuter = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabExecuter',
        title: 'Exécuter',
		cls: 'tab-menu tab-studio',
        closable: false
    });
	itemsMenu.push(tabExecuter);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel studio initial du workspace
    var studioMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'studioMenu',
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
		var studioMenu = workspace.studiopanel.studioMenu;
		
		studioMenu.updateSize();
	});
	
	workspace.studiopanel.studioMenu = studioMenu;
	    
    return studioMenu;
}

workspace.studiopanel.openFile = function()
{
	var countfile = workspace.studiopanel.lastNumber + 1;
	while ($('#tabStudioFile' + countfile).get().length != 0)
	{
		countfile++;
	}
	workspace.studiopanel.lastNumber = countfile;

	var studiobox = "";
	studiobox += "<div id='studiofile_" + countfile + "' class='studiofile'>";
	studiobox += "	<textarea id='code_" + countfile + "' name='code_" + countfile + "'>commentaire</textarea>";
	studiobox += "</div>";

    var tabFile = Ext.create('Ext.Panel', {
    	id: 'tabStudioFile' + countfile,
        title: 'Fichier ' + countfile,
        iconCls: 'icon-home',
        cls: 'tab-studiofile',
        closable: true,
        countfile: countfile,
        listeners: {
        	'resize': function()
        	{        		
				resizeStudioBox(this.countfile);
        	},

			'afterrender': function(tabPanel, eOpts)
            {
				startStudioBox(this.countfile);
			}
        },
        html: studiobox
    });
    
    workspace.studiopanel.studioPanel.codePanel.add(tabFile);
    
    return tabFile;
}

workspace.studiopanel.getStudioPanel = function()
{
	workspace.studiopanel.lastNumber = 0;

	// Panel projet
    var projectFilesPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'projectFilesPanel',
        minWidth: 200,
        items: [],
    });

	// Panel code
    var codePanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'codePanel',
		resizeTabs: false,
		collapsible: false,
        items: [],
    });

	// Panel propriétés
    var propertiesPanel = Ext.create('Ext.Panel', {
        region: 'east',
        id: 'propertiesPanel',
        minWidth: 200,
        items: [],
    });



	// Panel studio initial du workspace
    var studioPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'studioPanel',

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			projectFilesPanel,
			codePanel,
			propertiesPanel
		],
    });

	studioPanel.projectFilesPanel = projectFilesPanel;
	studioPanel.codePanel = codePanel;
	studioPanel.propertiesPanel = propertiesPanel;
    
    workspace.studiopanel.studioPanel = studioPanel;
    workspace.studiopanel.studioMenu.centerPanel = studioPanel;
	    
    return studioPanel;
}

workspace.centerpanel.initStudioPanel = function()
{
	workspace.studiopanel.studioPanel.codePanel.setActiveTab(workspace.studiopanel.openFile('new file 1'));
	workspace.studiopanel.openFile('new file 2');
}
