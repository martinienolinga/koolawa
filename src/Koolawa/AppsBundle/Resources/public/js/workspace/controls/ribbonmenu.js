function workspace_control_init_ribbonmenu()
{
	Ext.define('Koolawa.ux.Ribbon', {
		extend: 'Ext.tab.Panel',
		alias: 'widget.ux_ribbon',
		
		region: 'north',
        resizeTabs: false,
        enableTabScroll: false,
        height: 120,
        minHeight: 120,
        frame: true,
        border: false,
		activeTab: 1,
		
		centerPanel: {},
		
		initComponent: function() {
            var me = this;

			me.on('tabchange', me.tabChange);
		 
			me.callParent();
        },
        
        updateSize: function() {
        	var me = this;
        	var selectedTab = me.getActiveTab();

			if (selectedTab.id === 'tabFichier')
		    {
		    	me.centerPanel.hide();
		    	me.setHeight($('body').height() - 5);
		    }
        },
		
		tabChange: function(tabPanel, tab)
        {
        	var selectedTab = tabPanel.getActiveTab();
            if (selectedTab.id === 'tabFichier')
            {
            	tabPanel.updateSize();
            	
				$('#' + tabPanel.id + ' .x-tab-bar-strip').addClass('fmenu');
            }
            else
            {
				tabPanel.centerPanel.show();
				tabPanel.setHeight(120);
				
				$('#' + tabPanel.id + ' .x-tab-bar-strip').removeClass('fmenu');
            }
        }
	});


	Ext.define('Koolawa.ux.RibbonMenu', {
        extend: 'Ext.Panel',
        alias: 'widget.ux_ribbonmenu',
        
        data: {},
        menu: [],
        
        menu2: [],
        
        tpl: 'x',
        
        initComponent: function() {
            var me = this;
            
            var tpl = '<div>';

            $.each(me.menu, function(index, group) {
            
            	if (group === "|")
            	{
            		tpl += '<div class="groupseparator"></div>';
            	}
            	else
            	{
            		var once = "";
            		if (group.toolbars.length == 1) once = " once";
            	
		        	tpl += '<div id="' + group.id + '" class="ribbongroup' + once + '">';
		        	tpl += '<div class="toolbarzone">';
		        	
		        	var nbloc = false;
		        	var abloc = false;
		        	
		        	$.each(group.toolbars, function(index, toolbar) {
		        		var clearleft = "";
	            		if (index != 0) clearleft = " clearleft";
	            		
	            		var alone = "";
	            		if (typeof toolbar.alone !== 'undefined')
	            		{
	            			if (nbloc)
	            			{
	            				tpl += '</div>';
	            				nbloc = false;
	            			}
	            			
	            			alone = " alone";
	            			abloc = true;
	            		}
	            		else
	            		{
	            			if (abloc)
	            			{
	            				tpl += '<div class="blocalone">';
	            				abloc = false;
	            				nbloc = true;
	            			}
	            		}
		        		
		        		if (alone !== "") clearleft = "";
		        		tpl += '<div id="' + toolbar.id + '" class="ribbontoolbar' + clearleft + alone + '">';
		        		
		        		$.each(toolbar.components, function(index, component) {
		        			me.menu2[group.id + toolbar.id + component.id] = component;
		        			
		        			tpl += '<div id="' + component.id + '" class="ribboncomponent"></div>';
		        		});
		        		
		        		tpl += '</div>';
		        	});
		        	
		        	if (nbloc)
        			{
        				tpl += '</div>';
        				nbloc = false;
        			}
		        	
		        	tpl += '</div>';
		        	
		        	var label = "&nbsp;";
		        	if (typeof group.label !== 'undefined') label = group.label;
		        	
		        	tpl += '<div class="label">' + label + '</div>';
		        	tpl += '</div>';
            	}
            });
            
            tpl += '</div>';
            
			//me.on('afterrender', me.afterRender);
			
			me.tpl = tpl;
         
			me.callParent();
        },
        
    	listeners: {
			'afterrender': function()
		    {
		    	var me = this;
		    
		    	var ribbongroups = $('#' + me.id + ' .ribbongroup');
		    	ribbongroups.each(function(gindex, group)
		    	{
		    		var ribbontoolbars = $(group).find('.ribbontoolbar');
			    	ribbontoolbars.each(function(tindex, toolbar)
			    	{
			    		var ribboncomponents = $(toolbar).find('.ribboncomponent');
					    ribboncomponents.each(function(cindex, component)
			    		{
			    			var componentmenu = me.menu2[group.id + toolbar.id + component.id];
			    			
			    			if (typeof componentmenu.text === 'undefined') componentmenu.text = '';
							if (typeof componentmenu.cls === 'undefined') componentmenu.cls = '';
			    		
			    			var button = new Ext.Button({
								id: component.id + '-cmp',
								text: componentmenu.text,
								cls: 'icon ' +componentmenu.cls,
							
								height: component.offsetHeight,
								width: component.offsetWidth,
							
								renderTo: component,
							});
						
							if (typeof componentmenu.tooltip !== 'undefined')
							{
								$('#' + button.id).attr('title', componentmenu.tooltip);
							}
						
							if (typeof componentmenu.onclick !== 'undefined')
							{
								$('#' + button.id).on('click', componentmenu.onclick);
							}
			    		});
			    	});
		    	});
		    	
		    	$(document).tooltip();
			}
		}
    });
    

/*var panel = new Ext.create('My.Example', {
    data: {
        x: 'World'
    },
    renderTo: Ext.getBody()
});

var button = new Ext.create('Ext.button.Button', {
    text: "click me",
    listeners: {
        click: function () {
            panel.tpl = new Ext.XTemplate('my name is {y}');
            panel.update({
                y: 'monkey magic'
            });
        }
    },
    renderTo: Ext.getBody()
});*/

}

