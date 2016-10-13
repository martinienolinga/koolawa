workspace.spreadsheetpanel.getSpreadsheetMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet formules du workspace
    var tabFormules = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabFormules',
        title: 'Formules',
		cls: 'tab-menu tab-spreadsheet',
        closable: false
    });
	itemsMenu.push(tabFormules);
    
    // Onglet données du workspace
    var tabDonnees = Ext.create('Koolawa.ux.RibbonMenu', {
    	id: 'tabDonnees',
        title: 'Données',
		cls: 'tab-menu tab-spreadsheet',
        closable: false
    });
	itemsMenu.push(tabDonnees);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel spreadsheet initial du workspace
    var spreadsheetMenu = Ext.create('Koolawa.ux.Ribbon', {
        id: 'spreadsheetMenu',
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
		var spreadsheetMenu = workspace.spreadsheetpanel.spreadsheetMenu;
		
		spreadsheetMenu.updateSize();
	});
	
	workspace.spreadsheetpanel.spreadsheetMenu = spreadsheetMenu;
	    
    return spreadsheetMenu;
}

workspace.spreadsheetpanel.getRandomInt = function(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
} 

workspace.spreadsheetpanel.addNewSheet = function()
{
	//var sheetNumber = workspace.spreadsheetpanel.getRandomInt(1000, 9999);
	var countsheet = workspace.spreadsheetpanel.lastNumber + 1;
	while ($('#tabFeuille' + countsheet).get().length != 0)
	{
		countsheet++;
	}
	workspace.spreadsheetpanel.lastNumber = countsheet;
	
	var spreadbox = "";
	spreadbox += "<div id='functiondiv_" + countsheet + "' class='functiondiv'>";
	spreadbox += "	<div id='selectedcell_" + countsheet + "' class='selectedcell'></div>";
	spreadbox += "	<div id='functionbutton_" + countsheet + "' class='functionbutton'></div>";
	spreadbox += "	<div id='functionvalue_" + countsheet + "' class='functionvalue'><textarea></textarea></div>";
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
	
    var tabFeuille = Ext.create('Ext.Panel', {
    	id: 'tabFeuille' + countsheet,
        title: 'Feuille ' + countsheet,
        iconCls: 'icon-home',
        cls: 'tab-sheet',
        closable: false,
        countsheet: countsheet,
        listeners: {
        	'resize': function() {        		
        		//document.title = this.countsheet;
				resizeSpreadBox(this.countsheet);
        	},

			'afterrender': function(tabPanel, eOpts)
            {
				startSpreadBox(this.countsheet);
			}
        },
        html: spreadbox
    });
    
    workspace.spreadsheetpanel.spreadsheetPanel.add(tabFeuille);
    //startSpreadBox(countsheet);
    
    return tabFeuille;
}

workspace.spreadsheetpanel.getSpreadsheetPanel = function()
{
	workspace.spreadsheetpanel.lastNumber = 0;
	
    // Panel spreadsheet initial du workspace
    var spreadsheetPanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'spreadsheetPanel',
        resizeTabs: false,
        enableTabScroll: false,
        minHeight: 80,
        frame: true,
        border: false,
        tabPosition: 'bottom',
        defaults: {
            autoScroll: false,
        },
        items: [],
        listeners: {
            'tabchange': function(tabPanel, tab)
            {
                workspace.spreadsheetpanel.current = tab.countsheet;
            }
        }
    });
    
    workspace.spreadsheetpanel.spreadsheetPanel = spreadsheetPanel;
    workspace.spreadsheetpanel.spreadsheetMenu.centerPanel = spreadsheetPanel;
	    
    return spreadsheetPanel;
}

workspace.centerpanel.initSpreadsheetPanel = function()
{
	workspace.spreadsheetpanel.spreadsheetPanel.setActiveTab(workspace.spreadsheetpanel.addNewSheet());
    workspace.spreadsheetpanel.addNewSheet();
    workspace.spreadsheetpanel.addNewSheet();
    
    initSpreadBoxAction();
}
