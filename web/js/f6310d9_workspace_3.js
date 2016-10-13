Ext.require(['*']);
Ext.onReady(function() {

	// Affichage du masque de chargement
    var Mask = new Ext.LoadMask(Ext.getBody(), { msg: "Veuillez patienter ..." });
    Mask.show();
    
    
    symfony("get", "logged", "user", {}, function(response)
    {
    	var itemsViewport = [];
    	
    	// Initialisation des différents workspaces
    	switch(_workspace)
    	{
			case 'write':
    		{
				itemsViewport.push(workspace.writepanel.getWriteMenu());
    			itemsViewport.push(workspace.writepanel.getWritePanel());

    			break;
    		}

    		case 'spreadsheet':
    		{
    			itemsViewport.push(workspace.spreadsheetpanel.getSpreadsheetMenu());
    			itemsViewport.push(workspace.spreadsheetpanel.getSpreadsheetPanel());
    			
    			break;
    		}
    		
    		case 'home':
    		{
    			itemsViewport.push({
                	id: 'workspaceHeader',
                    region: 'north',
                    cls: 'app-header',
                    height: 60,
                    minHeight: 60,
                    maxHeight: 60,
                });
    			
    			itemsViewport.push(workspace.centerpanel.getCenterPanel());
    			    			
    			itemsViewport.entetepage = $('<div/>', {
    				html: '<div class="koolawa-logo-small"></div>Koolawa Apps' 
    			});
    			
    			break;
    		}
    		
    		case 'administration':
    		{
    			itemsViewport.push(workspace.administrationpanel.getAdministrationMenu());
    			itemsViewport.push(workspace.administrationpanel.getAdministrationPanel());
    			
    			break;
    		}
    		
    		case 'draw':
    		{
    			itemsViewport.push(workspace.drawpanel.getDrawMenu());
    			itemsViewport.push(workspace.drawpanel.getDrawPanel());
    			
    			break;
    		}
    		
    		case 'paint':
    		{
    			itemsViewport.push(workspace.paintpanel.getPaintMenu());
    			itemsViewport.push(workspace.paintpanel.getPaintPanel());
    			
    			break;
    		}
    		
    		case 'presentation':
    		{
    			itemsViewport.push(workspace.presentationpanel.getPresentationMenu());
    			itemsViewport.push(workspace.presentationpanel.getPresentationPanel());
    			
    			break;
    		}
    		
    		case 'project':
    		{
    			itemsViewport.push(workspace.projectpanel.getProjectMenu());
    			itemsViewport.push(workspace.projectpanel.getProjectPanel());
    			
    			break;
    		}
    		
    		case 'storage':
    		{
    			itemsViewport.push(workspace.storagepanel.getStorageMenu());
    			itemsViewport.push(workspace.storagepanel.getStoragePanel());
    			
    			break;
    		}
    		
    		case 'studio':
    		{
    			itemsViewport.push(workspace.studiopanel.getStudioMenu());
    			itemsViewport.push(workspace.studiopanel.getStudioPanel());
    			
    			break;
    		}

    		case 'mail':
    		{
    			itemsViewport.push(workspace.mailpanel.getMailMenu());
    			itemsViewport.push(workspace.mailpanel.getMailPanel());
    			
    			break;
    		}
    		
    		case 'talk':
    		{
    			itemsViewport.push(workspace.talkpanel.getTalkMenu());
    			itemsViewport.push(workspace.talkpanel.getTalkPanel());
    			
    			break;
    		}
    		
    		case 'agenda':
    		{
    			itemsViewport.push(workspace.agendapanel.getAgendaMenu());
    			itemsViewport.push(workspace.agendapanel.getAgendaPanel());
    			
    			break;
    		}
    		
    		default:
    		{
    			//
    		}
    	}
    	
    	// Cache du masque de chargement
    	Mask.hide();
    	
    	// Le principal workspace est créé
    	workspace.viewport = workspace.workzone.getZonePanel(_workspace, itemsViewport);
    	
    	
    	switch(_workspace)
    	{
    		case 'write':
    		{
				workspace.centerpanel.initWritePanel();

    			break;
    		}
    		
    		case 'spreadsheet':
    		{
    			workspace.centerpanel.initSpreadsheetPanel();

    			break;
    		}
    		
    		case 'home':
    		{
    			$('#workspaceHeader-innerCt').append(itemsViewport.entetepage);
    	    	workspace.centerpanel.initCenterPanel();
    	    	
    	    	break;
    		}
    		
    		case 'administration':
    		{
    			workspace.centerpanel.initAdministrationPanel();
    			
    			break;
    		}
    		
    		case 'draw':
    		{
    			workspace.centerpanel.initDrawPanel();
    			
    			break;
    		}
    		
    		case 'paint':
    		{
    			workspace.centerpanel.initPaintPanel();
    			
    			break;
    		}
    		
    		case 'presentation':
    		{
    			workspace.centerpanel.initPresentationPanel();
    			
    			break;
    		}
    		
    		case 'project':
    		{
    			workspace.centerpanel.initProjectPanel();
    			
    			break;
    		}
    		
    		case 'storage':
    		{
    			workspace.centerpanel.initStoragePanel();
    			
    			break;
    		}
    		
    		case 'studio':
    		{
    			workspace.centerpanel.initStudioPanel();
    			
    			break;
    		}

			case 'mail':
    		{
    			workspace.centerpanel.initMailPanel();
    			
    			break;
    		}
    		
    		case 'talk':
    		{
    			workspace.centerpanel.initTalkPanel();
    			
    			break;
    		}
    		
    		case 'agenda':
    		{
    			workspace.centerpanel.initAgendaPanel();
    			
    			break;
    		}
    		
    		default:
    		{
    			//
    		}
    	}
    });
    
});
