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


workspace.workzone.getBeginMenu = function(optionm)
{
	var itemsMenu = [];
	if (typeof optionm === 'undefined') optionm = {};
	
	// Onglet fichier du workspace
    var tabFichier = Ext.create('Ext.Panel', {
    	id: 'tabFichier',
        title: 'Fichier',
		cls: 'tab-menu',
        closable: false,
        
        listeners: {
        	'afterrender': function(cmp)
            {
				var tf = $('#' + cmp.id + '-innerCt');
				
				tf.append($('<table>',{
					
					'class': 'filemenucontent',
					border: '0',
					cellspacing: '0',
					cellpadding: '0',
					width: '100%',
					height: '100%',
									
				}).append($('<tr>').append($('<td>', {
				
					id: 'filemenu1',
					width: '250',
					valign: 'top',
					
				})).append($('<td>', {
				
					id: 'filemenu2',
					valign: 'top',
					
				}))));
				
				var save = new Ext.Button({
					id: 'filemenu-save',
					text: 'Enregistrer',
					cls: 'filemenubutton oneshot',
					iconCls: 'icon-save',
					width: 240,
					renderTo: 'filemenu1',
					
					listeners: {
						click: function()
						{
							if (typeof optionm.savefile !== 'undefined')
							{
								optionm.savefile();
							}
						}
					},
				});
				
				var saveas = new Ext.Button({
					id: 'filemenu-saveas',
					text: 'Enregistrer sous',
					cls: 'filemenubutton oneshot',
					iconCls: 'icon-save-as',
					width: 240,
					renderTo: 'filemenu1',
				});
				
				var open = new Ext.Button({
					id: 'filemenu-open',
					iconCls: 'icon-open',
					text: 'Ouvrir',
					cls: 'filemenubutton oneshot',
					width: 240,
					renderTo: 'filemenu1',
					
					listeners: {
						click: function()
						{
							var fileDialog = workspace.storagepanel.com.fileDialog({
								onopen: function(data)
								{
									if (typeof optionm.onopen !== 'undefined')
									{
										optionm.onopen(data);
									}
								}
							});

							fileDialog.show();
						}
					},
				});
				
				var close = new Ext.Button({
					id: 'filemenu-close',
					text: 'Fermer',
					cls: 'filemenubutton oneshot',
					iconCls: 'icon-close',
					width: 240,
					renderTo: 'filemenu1',
				});
				
				var information = new Ext.Button({
					id: 'filemenu-information',
					text: 'Informations',
					cls: 'filemenubutton extendshot',
					iconCls: 'icon-empty',
					height: 40,
					width: 250,
					enableToggle: true,
					toggleGroup: 'extendshot',
		            allowDepress: false,
					renderTo: 'filemenu1',
				});
				
				var recent = new Ext.Button({
					id: 'filemenu-recent',
					text: 'Recent',
					cls: 'filemenubutton extendshot',
					iconCls: 'icon-empty',
					height: 40,
					width: 250,
					pressed: 'pressed',
					enableToggle: true,
					toggleGroup: 'extendshot',
		            allowDepress: false,
					renderTo: 'filemenu1',
				});
				
				var nouveau = new Ext.Button({
					id: 'filemenu-nouveau',
					text: 'Nouveau',
					cls: 'filemenubutton extendshot',
					iconCls: 'icon-empty',
					height: 40,
					width: 250,
					enableToggle: true,
					toggleGroup: 'extendshot',
		            allowDepress: false,
					renderTo: 'filemenu1',
				});
				
				var partager = new Ext.Button({
					id: 'filemenu-partager',
					text: 'Partager',
					cls: 'filemenubutton extendshot',
					iconCls: 'icon-shared_22',
					height: 40,
					width: 250,
					enableToggle: true,
					toggleGroup: 'extendshot',
		            allowDepress: false,
					renderTo: 'filemenu1',
				});
				
				var options = new Ext.Button({
					id: 'filemenu-options',
					text: 'Options',
					cls: 'filemenubutton oneshot',
					iconCls: 'icon-empty',
					width: 240,
					renderTo: 'filemenu1',
				});
				
				var quitter = new Ext.Button({
					id: 'filemenu-quitter',
					text: 'Quitter',
					cls: 'filemenubutton oneshot',
					iconCls: 'icon-exit',
					width: 240,
					renderTo: 'filemenu1',
					
					listeners: {
						click: function()
						{
							Ext.Msg.show({
								 title:'Koolawa',
								 msg: 'Voulez-vous vraiment quitter ?',
								 buttons: Ext.Msg.YESNO,
								 fn: function(btn, text) {
								 	if (btn == 'yes')
								 	{
										document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale;
									}
								 },
								 animateTarget: 'elId',
								 icon: Ext.window.MessageBox.QUESTION
							});
						}
					}
				});
			}
        },
    });
	itemsMenu.push(tabFichier);
	itemsMenu.tabFichier = tabFichier;
    
    
    if (typeof optionm.menuForce === 'undefined')
	{
		optionm.menuForce = [];
		optionm.menuForce.push('Accueil');
		optionm.menuForce.push('Insertion');
	}
	
    // Onglet accueil du workspace
    var tabAccueil = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabAccueil',
        title: optionm.menuForce[0],
		cls: 'tab-menu',
        closable: false,
        
        menu: [{
    		id: 'clipboardgroup',
    		label: 'Presse-papier',
    		toolbars: [{
        			id: 'clipboardtoolbar1',
        			alone: true,
        			components: [
        			{
        				id: 'pastebtn',
						tooltip:'Coller',
						cls: 'icon-paste_48',
						onclick: function() {
							//alert('hello world');
						},
					}]
				},{
        			id: 'clipboardtoolbar2',
        			components: [
        			{
        				id: 'copybtn',
						cls: 'icon-copy',
						tooltip:'Copier',
					}]
				},{
					id: 'clipboardtoolbar3',
        			components: [
        			{
						id: 'cutbtn',
						cls: 'icon-cut',
						tooltip:'Couper',
					}]
        		}]
        }],
    });
	itemsMenu.push(tabAccueil);
	itemsMenu.tabAccueil = tabAccueil;
    
    // Onglet insertion du workspace
    var tabInsertion = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabInsertion',
        title: optionm.menuForce[1],
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabInsertion);
	itemsMenu.tabInsertion = tabInsertion;

	return itemsMenu;
}

workspace.workzone.getEndMenu = function(itemsMenu)
{
	// Onglet affichage du workspace
    var tabAffichage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabAffichage',
        title: 'Affichage',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabAffichage);
	itemsMenu.tabAffichage = tabAffichage;

	// Onglet aide du workspace
    var tabAide = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabAide',
        title: 'Aide',
		cls: 'tab-menu',
        closable: false
    });
	itemsMenu.push(tabAide);
	itemsMenu.tabAide = tabAide;

	return itemsMenu;
}

workspace.workzone.addShortMenu = function(topMenu, newmenu)
{
	var tabbar = $('#' + topMenu.id).find('div').get()[0];
	var tabbar_target = $('#' + tabbar.id + '-targetEl');

	var as = tabbar_target.find('a');

	as.each(function(index)
	{
		var a = $(this);
		if (index == 1)
		{
			a.css('marginLeft', 32 * newmenu.length + 'px');
			return false;
		}
	});

	var n = 0;
	$.each(newmenu, function(key, value) {
		var shortmenu = $('<div>', {
			'class': 'shortmenu icon ' + value.cls,
			'title': value.tooltip
		});

		if (typeof value.onclick !== 'undefined')
		{
			shortmenu.on('click', value.onclick);
		}

		shortmenu.css('left', (73 + n*29) + 'px');
		n++;

		tabbar_target.append(shortmenu);
	});
	
	$(document).tooltip();
}
