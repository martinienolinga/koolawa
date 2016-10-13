workspace.mailpanel.getMailMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-mail',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-mail',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel mail initial du workspace
    var mailMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'mailMenu',
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
		var mailMenu = workspace.mailpanel.mailMenu;
		
		mailMenu.updateSize();
	});
	
	workspace.mailpanel.mailMenu = mailMenu;
	    
    return mailMenu;
}

workspace.mailpanel.getMailPanel = function()
{
	// Panel mailbox
    var mailboxPanel = Ext.create('Ext.Panel', {
        region: 'west',
        id: 'mailboxPanel',
        minWidth: 300,
        items: [],
    });

	// Panel mail list
    var mailListPanel = Ext.create('Koolawa.ux.Panel', {
        region: 'north',
        id: 'mailListPanel',
		collapsible: false,
		//minHeight: 250,
		scroll: 'auto',
		
		extras: [
			{
				position: 'begin',
				region: 'east',
				tooltip: 'begin east',
			},{
				position: 'end',
				region: 'east',
				tooltip: 'end east 1',
			},{
				position: 'begin',
				region: 'south',
				tooltip: 'begin south',
			},{
				position: 'end',
				region: 'east',
				tooltip: 'end east 2',
				listeners: {
					'render': function(panel)
					{
						panel.body.on('click', function(e)
						{
							alert('south end');
						});
					}
				}
			}
		],
		
		height: 250,
        items: [],
    });

	// Panel mail content
    var mailContentPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'mailContentPanel',
		collapsible: false,
        items: [],
    });

	// Panel box
    var boxPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'boxPanel',

		//collapsible: false,

		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			mailListPanel,
			mailContentPanel,
		],
    });

	boxPanel.mailListPanel = mailListPanel;
	boxPanel.mailContentPanel = mailContentPanel;

	// Panel mail initial du workspace
    var mailPanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'mailPanel',

        layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
		},

        items: [
			mailboxPanel,
			boxPanel,
		],
    });

	mailPanel.mailboxPanel = mailboxPanel;
	mailPanel.boxPanel = boxPanel;
    
    workspace.mailpanel.mailPanel = mailPanel;
    workspace.mailpanel.mailMenu.centerPanel = mailPanel;
	    
    return mailPanel;
}

workspace.centerpanel.initMailPanel = function()
{
	//
}
