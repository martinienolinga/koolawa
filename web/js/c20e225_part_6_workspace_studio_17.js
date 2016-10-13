workspace.studiopanel.getStudioMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu({
		onopen: function(data)
		{
			studioMenu.setActiveTab(itemsMenu.tabAccueil);

			workspace.studiopanel.studioPanel.codePanel.setActiveTab(workspace.studiopanel.openFile({
				path: data.path
			}));
		},

		savefile: function()
		{
			studioMenu.setActiveTab(itemsMenu.tabAccueil);

			var activeTab = workspace.studiopanel.studioPanel.codePanel.getActiveTab();
			if (typeof activeTab.savefile !== 'undefined')
			{
				activeTab.savefile();
			}
		}
	});

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
		
        items: itemsMenu,

		listeners: {
        	'afterrender': function(cmp)
            {
				workspace.workzone.addShortMenu(cmp, [
					{
						cls: 'icon-save_22white',
						tooltip: 'Enregistrer',
						onclick: function()
						{
							var activeTab = workspace.studiopanel.studioPanel.codePanel.getActiveTab();
							if (typeof activeTab.savefile !== 'undefined')
							{
								activeTab.savefile();
							}
						}
					},
					{
						cls: 'icon-undo_22white',
						tooltip: 'Annuler la dernière action',
						onclick: function()
						{
							var activeTab = workspace.studiopanel.studioPanel.codePanel.getActiveTab();
							if (typeof activeTab.undo !== 'undefined')
							{
								activeTab.undo();
							}
						}
					},
					{
						cls: 'icon-redo_22white',
						tooltip: 'Refaire la dernière action',
						onclick: function()
						{
							var activeTab = workspace.studiopanel.studioPanel.codePanel.getActiveTab();
							if (typeof activeTab.redo !== 'undefined')
							{
								activeTab.redo();
							}
						}
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

workspace.studiopanel.generateStudiobox = function(countfile, content)
{
	var studiobox = "";
	studiobox += "<div id='studiofile_" + countfile + "' class='studiofile'>";
	studiobox += "	<textarea id='code_" + countfile + "' name='code_" + countfile + "'>" + content + "</textarea>";
	studiobox += "</div>";

	return studiobox;
}

workspace.studiopanel.openFile = function(data)
{
	var countfile = workspace.studiopanel.lastNumber + 1;
	while ($('#tabStudioFile' + countfile).get().length != 0)
	{
		countfile++;
	}
	workspace.studiopanel.lastNumber = countfile;

    var tabFile = Ext.create('Ext.Panel', {
    	id: 'tabStudioFile' + countfile,
        title: 'Fichier ' + countfile,
        iconCls: 'icon-home',
        cls: 'tab-studiofile',
        closable: true,
		currentfile: 'Fichier ' + countfile,
        countfile: countfile,
        listeners: {
        	'resize': function()
        	{        		
				resizeStudioBox(tabFile.countfile);
        	},

			'afterrender': function(tabPanel, eOpts)
            {
				if (typeof data.path !== 'undefined')
				{
					var myMask = new Ext.LoadMask({
						target: tabFile,
		            	msg: "Chargement en cours ..."
		            });
		            myMask.show();

					symfony("get", "file", "storage", { path: data.path }, function(result)
					{
						var studiobox = workspace.studiopanel.generateStudiobox(tabFile.countfile, result.data.content);
						tabFile.update(studiobox);

						tabFile.currentfile = result.data.info.basename;
						tabFile.setTitle(tabFile.currentfile);

						startStudioBox(tabFile.countfile);
						resizeStudioBox(tabFile.countfile);

						globalStudiobox[tabFile.countfile].editor.on('change', function(cMirror)
						{
							tabFile.setTitle(tabFile.currentfile + " *");
						});

						myMask.hide();
					});
				}
				else
				{
					var studiobox = workspace.studiopanel.generateStudiobox(tabFile.countfile, "commentaire");
					tabFile.update(studiobox);
					startStudioBox(tabFile.countfile);
					resizeStudioBox(tabFile.countfile);

					globalStudiobox[tabFile.countfile].editor.on('change', function(cMirror)
					{
						tabFile.setTitle(tabFile.currentfile + " *");
					});
				}
			}
        },

		savefile: function()
		{
			var content = globalStudiobox[tabFile.countfile].editor.getValue();
			symfony("save", "file", "storage", { path: data.path, content: content }, function(result)
			{
				if ($.md5(content) === result.data.md5)
				{
					tabFile.setTitle(tabFile.currentfile);
				}
			});
		},

		undo: function()
		{
			globalStudiobox[tabFile.countfile].editor.undo();
		},

		redo: function()
		{
			globalStudiobox[tabFile.countfile].editor.redo();
		},
        //html: studiobox
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
        minWidth: 300,
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
        minWidth: 250,
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
	workspace.studiopanel.studioPanel.codePanel.setActiveTab(workspace.studiopanel.openFile({ title: 'new file 1' }));
	workspace.studiopanel.openFile({ title: 'new file 2' });
}
