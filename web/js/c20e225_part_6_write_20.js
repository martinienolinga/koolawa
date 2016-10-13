var globalWritebox = {};

function initWriteBoxAction()
{
	//
}

// initialisation de la zone de saisie
function initWriteBox()
{
	globalWritebox = {};

	// double selection pour les opérations d'optimisation
	globalWritebox.write = $('#write');
	globalWritebox.writeEl = document.getElementById('write');
	
	// double selection pour les opérations d'optimisation
	globalWritebox.writebox = $('#writebox');
	globalWritebox.writeboxEl = document.getElementById('writebox');

	// préselection du body Extjs qui contient le #write pour les besoins de manipulations Jquery
	globalWritebox.writeBody = globalWritebox.writebox.parent().parent().parent();

	globalWritebox.pages = [];
	
	//globalWritebox.writebox.on('mousemove', function(e){ resizeWriteBox(); });
	
	var inter = setInterval(function() {
		if (globalWritebox.writeBody.height() != 0)
		{
			resizeWriteBox();
			clearInterval(inter);
		}
	}, 50);
	
	/*$('.scroll-pane-arrows').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 10
		}
	);*/
}

function addWritePage()
{
	var page = $('<div>', {
		'class': 'writepage',
		'contenteditable' : true,
		'spellcheck' : false
	});

	//page.html('');

	globalWritebox.write.append(page);

	globalWritebox.pages.push(page);
}

function startWriteBox()
{
	initWriteBox();
}

function resizeWriteBox()
{
	var parentBody = globalWritebox.writeBody;
	var parentWidth = parentBody.width();
	var parentHeight = parentBody.height();
	
	$('#writebox').height(parentHeight);
	$('#writebox').width(parentWidth);
	
	globalWritebox.writebox.jScrollPane({
		showArrows: true,
		horizontalGutter: 10,
		verticalButtons: [
			{ cls: 'x', click: function(e) { alert('x'); } }, 
			{ cls: 'y', click: function(e) { alert('y'); } }, 
			{ cls: 'z', click: function(e) { alert('z'); } }
		]
	});
}
