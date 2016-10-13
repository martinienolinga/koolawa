workspace.storagepanel.com = {

	fileDialog: function(options)
	{
		Ext.destroy(Ext.getCmp('dialogOpenFile'));
	
		var dialog = Ext.create('Ext.Window', {
			id: 'dialogOpenFile',
		    title: 'Open file',
		    cls: 'workzone_storage com',
		    
		    width: 850,
		    height: 500,
			
			modal: true,
			closable: false,
			selected: null,

		    plain: true,
		    layout: 'fit',

		    items: [ workspace.storagepanel.getStoragePanel({
		    	isCom: true,
		    	
		    	onselect: function(data)
		    	{
		    		if (data.rec.leaf)
		    		{
		    			dialog.selected = data;
		    			dialog.setTitle('Open file : ' + data.path);
		    		}
		    	},
		    	
		    	ondblclick: function()
		    	{
		    		// on ferme la boite de dialogue
					dialog.hide();
					
					// puis on déclenche l'évenement suite à l'ouverture
					if (typeof options.onopen !== 'undefined')
					{
						options.onopen(dialog.selected);
					}
		    	},
		    }) ],
			buttons: [
				{
					text : 'Cancel',
					handler: function()
					{
						// si annulation, on ferme la boite de dialogue
            		    dialog.hide();
            		}
				},
				{
					text : 'Open',
					handler: function()
					{
						// on ferme la boite de dialogue
						dialog.hide();
						
						// puis on déclenche l'évenement suite à l'ouverture
						if (typeof options.onopen !== 'undefined')
						{
							options.onopen(dialog.selected);
						}
					}
				}
			]
		});
		
		return dialog;
	}

};
