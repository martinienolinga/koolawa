var globalStudiobox = [];

// initialisation de la zone de saisie
function initStudioBox(filenumber)
{
	globalStudiobox[filenumber] = {};

	// double selection pour les opérations d'optimisation
	globalStudiobox[filenumber].studioFile = $('#studiofile_' + filenumber);
	globalStudiobox[filenumber].studioFileEl = document.getElementById('studiofile_' + filenumber);
	
	globalStudiobox[filenumber].code = $('#code_' + filenumber);
	globalStudiobox[filenumber].codeEl = document.getElementById('code_' + filenumber);

	// préselection du body Extjs qui contient le #Studio pour les besoins de manipulations Jquery
	globalStudiobox[filenumber].studioBody = globalStudiobox[filenumber].studioFile.parent().parent().parent();
	
	globalStudiobox[filenumber].editor = CodeMirror.fromTextArea(globalStudiobox[filenumber].codeEl, {
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true
	});
	globalStudiobox[filenumber].editor.setOption("theme", "cobalt");
	globalStudiobox[filenumber].editor.setOption("mode", "text/x-php");
	
	globalStudiobox[filenumber].editorDiv = globalStudiobox[filenumber].studioFile.find('.CodeMirror');
}

function resizeStudioBox(filenumber)
{
	if (typeof globalStudiobox[filenumber] !== 'undefined')
	{
		var parentBody = globalStudiobox[filenumber].studioBody;
		var parentWidth = parentBody.width();
		var parentHeight = parentBody.height();
	
		// on redimensionne l'éditeur
		globalStudiobox[filenumber].editorDiv.height(parentHeight);
		globalStudiobox[filenumber].editorDiv.width(parentWidth);
		
		/*$(globalStudiobox[filenumber].editor).jScrollPane({
			showArrows: true,
			horizontalGutter: 10,
			verticalButtons: [
				{ cls: 'x', click: function(e) { alert('x'); } }, 
				{ cls: 'y', click: function(e) { alert('y'); } }, 
				{ cls: 'z', click: function(e) { alert('z'); } }
			]
		});*/
	}
}

function startStudioBox(filenumber)
{
	initStudioBox(filenumber);
}
