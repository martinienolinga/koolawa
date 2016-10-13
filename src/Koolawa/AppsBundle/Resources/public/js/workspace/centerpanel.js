workspace.centerpanel = {};

workspace.centerpanel.getCenterPanel = function()
{
    // Onglet d'accueil du workspace
    var tabWelcome = Ext.create('Ext.Panel', {
    	id: 'tabWelcome',
        title: 'Accueil',
        iconCls: 'icon-home',
        //html: '<div id="welcomediv"></div>',
        closable: false
    });
    //tabWelcome.welcome = true;


    // Panel central initial du workspace
    var centerPanel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        id: 'centerPanel',
        resizeTabs: true,
        enableTabScroll: true,
        minHeight: 80,
        frame: true,
        defaults: {
            autoScroll: true,
            bodyPadding: 10,
        },
        items: [ tabWelcome ],
        listeners: {
            'tabchange': function(tabPanel, tab)
            {
                /*if (tab.workspace !== undefined) {
                    currentWorkspace = tab.workspace;
                    currentWorkspace.set({tab: tab}, function() {
                        currentWorkspace.onCenterTabChange(tabPanel, tab);
                    });
                } else {
                    if (tab.welcome !== undefined) {
                        welcomeChange();
                    }
                }*/
            }
        }
    });
	    
    return centerPanel;
}

workspace.centerpanel.initCenterPanel = function()
{
    var spreadsheet_link = $('<div/>', {
		'class': 'application',
        html: 'SpreadSheet'
    }).css('backgroundColor', 'rgba(0, 167, 85, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/spreadsheet';
    });

    var write_link = $('<div/>', {
        'class': 'application',
        html: 'Write'
    }).css('backgroundColor', 'rgba(21, 127, 204, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/write';
    });

    var administration_link = $('<div/>', {
        'class': 'application',
        html: 'Administration'
    }).css('backgroundColor', 'rgba(173, 35, 29, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/administration';
    });

    var draw_link = $('<div/>', {
        'class': 'application',
        html: 'Draw'
    }).css('backgroundColor', 'rgba(129, 144, 145, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/draw';
    });

    var paint_link = $('<div/>', {
        'class': 'application',
        html: 'Paint'
    }).css('backgroundColor', 'rgba(51, 62, 85, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/paint';
    });

    var presentation_link = $('<div/>', {
        'class': 'application',
        html: 'Presentation'
    }).css('backgroundColor', 'rgba(204, 135, 0, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/presentation';
    });

    var project_link = $('<div/>', {
        'class': 'application',
        html: 'Project'
    }).css('backgroundColor', 'rgba(0, 167, 85, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/project';
    });

    var storage_link = $('<div/>', {
        'class': 'application',
        html: 'Storage'
    }).css('backgroundColor', 'rgba(21, 127, 204, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/storage';
    });

    var studio_link = $('<div/>', {
        'class': 'application',
        html: 'Studio'
    }).css('backgroundColor', 'rgba(83, 35, 137, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/studio';
    });

	var mail_link = $('<div/>', {
        'class': 'application',
        html: 'Mail'
    }).css('backgroundColor', 'rgba(204, 135, 0, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/mail';
    });

    var talk_link = $('<div/>', {
        'class': 'application',
        html: 'Talk'
    }).css('backgroundColor', 'rgba(0, 167, 85, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/talk';
    });

    var agenda_link = $('<div/>', {
        'class': 'application',
        html: 'Agenda'
    }).css('backgroundColor', 'rgba(21, 127, 204, 0.8)').on('click', function(e) {
        document.location = _request_scheme + '://' + _http_host + _script_name + '/' + _locale + '/agenda';
    });


    $('#tabWelcome-innerCt').append(spreadsheet_link);
    $('#tabWelcome-innerCt').append(write_link);  
    $('#tabWelcome-innerCt').append(administration_link);
    $('#tabWelcome-innerCt').append(draw_link);
    $('#tabWelcome-innerCt').append(paint_link);
    $('#tabWelcome-innerCt').append(presentation_link);
    $('#tabWelcome-innerCt').append(project_link);
    $('#tabWelcome-innerCt').append(storage_link);
    $('#tabWelcome-innerCt').append(studio_link);
	$('#tabWelcome-innerCt').append(mail_link);
    $('#tabWelcome-innerCt').append(talk_link);
    $('#tabWelcome-innerCt').append(agenda_link);
}
