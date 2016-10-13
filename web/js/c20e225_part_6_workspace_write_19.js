workspace.writepanel.getWriteMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-write',
        closable: false,
        
        menu: [{
        		id: 'groupe1',
        		label: 'Groupe 1',
        		toolbars: [{
        			id: 'toolbar11',
        			components: [
        			{
        				id: 'cmp111',
						text:'Button w/ cmp111',
					}]
        		}]
        	},{
        		id: 'groupe2',
        		label: 'Groupe 2',
        		toolbars: [{
        			id: 'toolbar21',
        			alone: true,
        			components: [
        			{
        				id: 'cmp211',
						text:'Button w/ cmp211',
						onclick: function() {
							alert('hello world');
						},
					}]
				},{
        			id: 'toolbar21y',
        			alone: true,
        			components: [
        			{
        				id: 'cmp211y',
						text:'Button w/ cmp211y',
					}]
				},{
        			id: 'toolbar21x',
        			components: [
        			{
        				id: 'cmp211x',
						text:'Button w/ cmp211',
					}]
				},{
					id: 'toolbar22',
        			components: [
        			{
        				id: 'cmp221',
						tooltip:'Button w/ cmp221',
					},{
						id: 'cmp222',
						tooltip:'Cmp222',
					},{
						id: 'cmp223',
						tooltip:'Cmp223',
					}]
        		},{
        			id: 'toolbar21r',
        			alone: true,
        			components: [
        			{
        				id: 'cmp211r',
						text:'Button w/ cmp211r',
					}]
				}]
        	},'|',{
        		id: 'groupe3',
        		label: 'Groupe 3',
        		toolbars: [{
        			id: 'toolbar31',
        			components: [
        			{
        				id: 'cmp311',
						text:'Button w/ cmp311',
					},{
        				id: 'cmp312',
						text:'Button w/ cmp312',
					}]
        		}]
        	},
        ],
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = new Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-write',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);



    // Panel write initial du workspace
    var writeMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'writeMenu',
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
		var writeMenu = workspace.writepanel.writeMenu;
		
		writeMenu.updateSize();
	});

	workspace.writepanel.writeMenu = writeMenu;
	    
    return writeMenu;
}

workspace.writepanel.getWritePanel = function()
{
	/*

	var spreadbox = "";
	spreadbox += "<div id='functiondiv_" + countsheet + "' class='functiondiv'>";
	spreadbox += "	<div id='selectedcell_" + countsheet + "' class='selectedcell'></div>";
	spreadbox += "	<div id='functionbutton_" + countsheet + "' class='functionbutton'></div>";
	spreadbox += "	<div id='functionvalue_" + countsheet + "' class='functionvalue' contenteditable='true'></div>";
	spreadbox += "</div>";

	spreadbox += "<div id='spreadbox_" + countsheet + "' class='spreadbox'>";
	spreadbox += "   <div id='spreadboxline1_" + countsheet + "' class='spreadboxline'>";
	spreadbox += "      <div id='freezebox_" + countsheet + "' class='freezebox'></div><div id='columnsbox_" + countsheet + "' class='columnsbox'><div></div></div>";
	spreadbox += "   </div>";
	spreadbox += "   <div id='spreadboxline2_" + countsheet + "' class='spreadboxline' style='outline: 1px solid #aaa;'>";
	spreadbox += "      <div id='rowsbox_" + countsheet + "' class='rowsbox'><div></div></div><div id='contener_" + countsheet + "' class='contener'>";
	spreadbox += "         <div id='sheet_" + countsheet + "' class='sheet'></div>";
	spreadbox += "      </div>";
    spreadbox += "   </div>";
   	spreadbox += "</div>";

	*/

	var writebox = "";
	writebox += "<div id='writebox' class='writebox'>";
	writebox += "	<div id='write' class='write'>";
	writebox += "	</div>";
	writebox += "</div>";


	// Panel write initial du workspace
    var writePanel = Ext.create('Ext.Panel', {
        region: 'center',
        id: 'writePanel',
        minHeight: 80,
        frame: true,
        border: false,
        defaults: {
            autoScroll: false,
        },
        items: [],
		listeners: {
        	'resize': function()
			{        		
				resizeWriteBox();
        	},

			'afterrender': function()
            {
				startWriteBox();
			}
        },
		html: writebox,
    });
    
    workspace.writepanel.writePanel = writePanel;
    workspace.writepanel.writeMenu.centerPanel = writePanel;
	
    return writePanel;
}

workspace.centerpanel.initWritePanel = function()
{
	initWriteBoxAction();

	addWritePage();
	addWritePage();
	addWritePage();
	addWritePage();
	
}
