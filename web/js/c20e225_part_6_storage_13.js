var globalStoragebox = [];

// initialisation de la zone de saisie
function initStorageBox(filenumber)
{
	globalStoragebox[filenumber] = {};

	// double selection pour les opérations d'optimisation
	globalStoragebox[filenumber].storageFile = $('#storagefile_' + filenumber);
	globalStoragebox[filenumber].storageFileEl = document.getElementById('storagefile_' + filenumber);
	
	globalStoragebox[filenumber].code = $('#code_' + filenumber);
	globalStoragebox[filenumber].codeEl = document.getElementById('code_' + filenumber);

	// préselection du body Extjs qui contient le #Storage pour les besoins de manipulations Jquery
	globalStoragebox[filenumber].storageBody = globalStoragebox[filenumber].storageFile.parent().parent().parent();
	
	/*globalStoragebox[filenumber].editor = CodeMirror.fromTextArea(globalStoragebox[filenumber].codeEl, {
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true
	});
	globalStoragebox[filenumber].editor.setOption("theme", "cobalt");
	globalStoragebox[filenumber].editor.setOption("mode", "text/vbscript");
	
	globalStoragebox[filenumber].editorDiv = globalStoragebox[filenumber].storageFile.find('.CodeMirror');
	*/
	
}

function resizeStorageBox(filenumber)
{
	var parentBody = globalStoragebox[filenumber].storageBody;
	var parentWidth = parentBody.width();
	var parentHeight = parentBody.height();
	
	// on redimensionne l'éditeur
	//globalStoragebox[filenumber].editorDiv.height(parentHeight);
	//globalStoragebox[filenumber].editorDiv.width(parentWidth);
}

function startStorageBox(filenumber)
{
	initStorageBox(filenumber);
}
