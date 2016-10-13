workspace.writepanel = {};


workspace.writepanel.getWriteMenu = function()
{
	var itemsMenu = workspace.workzone.getBeginMenu();

    // Onglet mise en page du workspace
    var tabMiseEnPage = Ext.create('Ext.Panel', {
    	id: 'tabMiseEnPage',
        title: 'Mise en page',
		cls: 'tab-menu tab-write',
        closable: false
    });
	itemsMenu.push(tabMiseEnPage);
    
    // Onglet références du workspace
    var tabReferences = Ext.create('Ext.Panel', {
    	id: 'tabReferences',
        title: 'Références',
		cls: 'tab-menu tab-write',
        closable: false
    });
	itemsMenu.push(tabReferences);

	itemsMenu = workspace.workzone.getEndMenu(itemsMenu);

    // Panel write initial du workspace
    var writeMenu = Ext.create('Ext.tab.Panel', {
        region: 'north',
        id: 'writeMenu',
		cls: 'workspaceMenu',
        resizeTabs: false,
        enableTabScroll: false,
        height: 120,
        minHeight: 120,
        maxHeight: 120,
        frame: true,
        border: false,
		activeTab: 1,
        defaults: {
            autoScroll: true,
            bodyPadding: 10,
        },
        items: itemsMenu,
        listeners: {
            'tabchange': function(tabPanel, tab)
            {
                //
            }
        }
    });
	    
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
