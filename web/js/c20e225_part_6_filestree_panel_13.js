Ext.onReady(function() {

	Ext.define('filesTreeModel', {
	    extend: 'Ext.data.Model',
	    fields: [
			//{ name: 'Id', type: 'int'},
	        { name: 'recid', type: 'string' },
	        { name: 'idpath', type: 'string' },
	        { name: 'text', type: 'string' },
	        { name: 'path', type: 'string' },
	        { name: 'shortpath', type: 'string' },
	    ],
	    proxy: {
	        type: 'memory'
	    },
	});

});

workspace.storagepanel.getFileTreePanel = function(options)
{
	if (typeof options.isCom === 'undefined') options.isCom = false;

	// Panel tree
    var treeFilesPanel = Ext.create('Ext.Panel', {
        region: 'west',
        //Id: 'projectFilesPanel',
        minWidth: 200,
        width: 300,
		autoScroll:true,
        items: [
			workspace.storagepanel.getFilesTree(options)
		],
    });
    
    if (options.isCom) treeFilesPanel.collapsible = false;

	return treeFilesPanel;
}

workspace.storagepanel.getFilesTree = function(options)
{
	if (typeof options.isCom === 'undefined') options.isCom = false;

	var filesTree = Ext.create('Ext.tree.Panel', {
	
		store: Ext.create('Ext.data.TreeStore', {
            model: 'filesTreeModel',
        }),
	
		rootVisible: false,

		gotoNode: function (itemrec)
		{
			filesTree.selectPath(itemrec.shortpath, 'text', null, function() 
			{
				var root = filesTree.getRootNode();
				var record = root.findChild('recid', itemrec.recid, true);

				var view = filesTree.getView();
				var nodeEl = view.getNode(record);

				nodeEl.scrollIntoView(filesTree.view.el, false, true);
				
				filesTree.fireEvent('itemclick', view, record);
			});
		},
		
		addChildren: function(node, data)
		{
			$.each(data, function(index, value)
			{
				var child = node.appendChild(
				{
					recid: value.recid,
					text: value.text,
					path: value.path,
					shortpath: value.shortpath,
					idpath: value.idpath,
					leaf: value.leaf,
				});
				
				if (!value.leaf)
				{
					filesTree.addChildren(child, value.children);
				}
			});
		},
	
		listeners: {
            afterrender: function(component, eOpts)
            {
				var Mask = new Ext.LoadMask({
                	target: filesTree.up('panel'),
                	msg: "Veuillez patienter ..."
                });
                Mask.show();

                symfony("list", "directories", "storage", {}, function(result) {
                    
                    var root = filesTree.getRootNode();
                    filesTree.addChildren(root, result.data);

                    Mask.hide();
                });			
            },
            
            itemclick: function(view, rec, item, index, eventobj)
            {
            	if (!rec.get('leaf'))
                {
                	var activeTab = {};
                	if (options.isCom)
                	{
                		var activeTab = workspace.storagepanel.storagePanel.filesPanel;
                	}
                	else
                	{
		            	var activeTab = workspace.storagepanel.storagePanel.filesPanel.getActiveTab();
		                if (activeTab.kind !== 'directory')
		                {
		                	activeTab = workspace.storagepanel.showDirectory('new file 1');
		                	workspace.storagepanel.storagePanel.filesPanel.setActiveTab(activeTab);
		                }
                    }
                        
                	var myMask = new Ext.LoadMask({
						target: activeTab.content,
		            	msg: "Chargement en cours ..."
		            });
		            myMask.show();
                     
                	symfony("list", "files", "storage", { path: rec.data.path }, function(result) {
                        
                        var pathtemp = $(activeTab.path.getEl().dom);
						pathtemp.empty();
                        
                        var arr = rec.data.idpath.split('>');
                        $.each(arr, function(i, v)
                        {
                        	if (v !== 'root') 
                        	{
		                    	var root = filesTree.getRootNode();            
								var record = root.findChild('recid', v, true);
		                    
		                    	var button = new Ext.Button({
									//id: component.id + '-cmp',
									text: record.data.text,
									//recid: record.data.recid,
									//cls: 'icon ' +componentmenu.cls,
									
									listeners: {
										click: function ()
										{
											filesTree.gotoNode(record.data);
										}
									},
							
									renderTo: pathtemp.get()[0],
								});
							}
                        });

                        

						var contenttemp = $(activeTab.content.getEl().dom).find('.fileitems');
						contenttemp.empty();
                         
                        $.each(result.data, function(index, value) {
                        	var itype = 'icon-empty_48';
                        	if (!value.leaf)
                        	{
                        		itype = 'icon-folder_48';
                        	}
                        	
                        	var thumb = $('<div>', {
                        		'class': 'thumb icon ' + itype
                        	});
                        	
                        	var label = $('<div>', {
                        		'class': 'label',
                        		html: value.text
                        	});
                        	
                        	var tabitem = $('<div>', {
                        		'class': 'tabitem',
                        		title: value.text
                        	});
                        	
                        	tabitem.rec = value;
                        	
                        	tabitem.append(thumb);
                        	tabitem.append(label);
                        	
                        	tabitem.on('dblclick', function(e)
                        	{
								if (!tabitem.rec.leaf)
								{
									filesTree.gotoNode(tabitem.rec);
								}
								else
								{
									if (typeof options.ondblclick !== 'undefined')
									{
										options.ondblclick();
									}
								}
							});
							
							tabitem.on('click', function(e)
							{
								$('.tabitem').removeClass('tabitemselected');
							
								symfony("get", "stat", "storage", { path: tabitem.rec.path }, function(result) {
								
									var statusbar = $(activeTab.status.getEl().dom);
									
									var size = parseInt(result.data.stat.size);
									var unit = 'o';
									
									if (size >= 1024) { size = size / 1024; unit = 'Ko'}
									if (size >= 1024) { size = size / 1024; unit = 'Mo'}
									if (size >= 1024) { size = size / 1024; unit = 'Go'}
									if (size >= 1024) { size = size / 1024; unit = 'To'}
									
									size = Math.round(size);
									
									statusbar.html("Taille: " + size + " " + unit +" | " + tabitem.rec.path);
									
									tabitem.addClass('tabitemselected');
									
									if (!tabitem.rec.leaf)
									{
										//filesTree.gotoNode(tabitem.rec);
									}
								
									if (typeof options.onselect !== 'undefined')
									{
										result.data.rec = tabitem.rec;
										options.onselect(result.data);
									}
								});
							});
                        	
                        	contenttemp.append(tabitem);
                        });
                        


						resizeStorageBox(activeTab.counttab);

                        myMask.hide();

						$(document).tooltip();
                    });
                }
            }
		}
	});
	
	return filesTree;
}
