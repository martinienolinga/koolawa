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

	//globalWritebox.write.html('test');

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
	var parentWidth = parentBody.width(); //- 50;
	var parentHeight = parentBody.height(); //- 20 - globalWritebox.functiondiv.get()[0].offsetHeight;	
	
	// on redimensionne le #write
	$('#writebox #write').height(parentHeight);
	$('#writebox #write').width(parentWidth);
}
