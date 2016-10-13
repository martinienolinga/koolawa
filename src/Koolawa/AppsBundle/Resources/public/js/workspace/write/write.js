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
	
	/*var inter = setInterval(function() {
		if (globalWritebox.writeBody.height() != 0)
		{
			//resizeWriteBox();
			//clearInterval(inter);
			
			var coord = getCaretPosition();
			document.title = coord.x + ' ' + coord.y;
		}
	}, 50);*/
	
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
	});



	var headercontent = $('<div>', {
		'class': 'headerpage',
	});

	var header = $('<td>', { 'height': 80 }).append(headercontent);

	header.css('padding-left', '40px');
	header.css('padding-right', '40px');
	header.css('padding-top', '40px');



	var writable = $('<td>', {
		'class': 'writable',
		'valign': 'top',
		/*'contenteditable' : true,
		'spellcheck' : false*/
	});

	writable.css('padding-left', '40px');
	writable.css('padding-right', '40px');

	var textzone = $('<div>', {
		'contenteditable': true,
		'spellcheck': false
	});
	
	// a la moindre action, on rafraichi tout
	textzone.on('keyup keydown mousedown mouseup mousemove focus', function(e)
	{
		while($('.write-paragraph .write-paragraph').size() > 0)
		{
			textzone.find('>.write-paragraph').each(function()
			{
				var me = $(this);
				var last = me;
				
				$.each(me.find('.write-paragraph').get(), function(index, value)
				{
					var jvalue = $(value);
					jvalue.detach();
					
					jvalue.insertAfter(last);
					last = jvalue;
				});
			});
		}
	
		$('.write-paragraph').each(function()
		{
			var me = $(this);
			
			me.find('br').remove();
			
			while (me.find('span.beginparagraph').size() > 1)
			{
				me.find('span.beginparagraph').last().remove();
			}
			
			if (me.text().indexOf($('<span>').html('&#8203;').text()) != 0)
			{
				var span = me.find('span.beginparagraph').detach();
				me.prepend(span);
			}
		});
	});
	
	textzone.html('<div class="write-paragraph" contenteditable="true" spellcheck="false"><span class="beginparagraph" contenteditable="false">&#8203;</span></div>');
	

	var writablecontent = $('<table>', {
		'height': '100%',
		'width': '100%',
		'border': '0',
		'cellspacing': '0',
		'cellpadding': '0',
	})
	.append($('<tr>').append($('<td>', {
		'class': 'writablecontent richtext',
		'valign': 'top',
		/*'contenteditable' : true,
		'spellcheck' : false,*/
	}).append(textzone)));
	
	



	writablecontent.splitNode = function(node, offset, limit)
	{
		var parent = limit.parentNode;
		var parentOffset = writablecontent.getNodeIndex(parent, limit);

		var doc = node.ownerDocument;  
		var leftRange = doc.createRange();
		leftRange.setStart(parent, parentOffset);
		leftRange.setEnd(node, offset);

		var left = leftRange.extractContents();
		parent.insertBefore(left, limit);

		return [left, limit];
	};

	writablecontent.getNodeIndex = function(parent, node)
	{
		var index = parent.childNodes.length;
		while (index--)
		{
			if (node === parent.childNodes[index])
			{
			  break;
			}
		}
		return index;
	};
	
	writablecontent.insertNewParagraph = function()
	{
		if (window.getSelection)
		{
			var sel = window.getSelection();
			var range = sel.getRangeAt(0);
			
			var newParagraph = $('<div>', { 'contenteditable': true, 'spellcheck' : false, 'class': 'write-paragraph' });
			var beginOfParagraph = $('<span>', { 'class': 'beginparagraph', 'contenteditable': false }).html('&#8203;');
			newParagraph.append(beginOfParagraph);
			

			var endContainer = $(range.endContainer).closest('.write-paragraph');
			if (endContainer.hasClass('write-paragraph'))
			{
				//partText1 = endContainer.html().substring(0, range.startOffset);
				//partText2 = endContainer.html().substr(range.endOffset);
				
				//endContainer.html(partText1);
				//newParagraph.html(partText2);
			
				//newParagraph.insertAfter(endContainer); //, partText2);

				newParagraph = $(writablecontent.splitNode(range.endContainer, range.endOffset, endContainer.get(0)));
				beginOfParagraph = $('<span>', { 'class': 'beginparagraph', 'contenteditable': false }).html('&#8203;');
				newParagraph.prepend(beginOfParagraph);
			}
			else
			{
				writablecontent.find('.writablecontent > div').append(newParagraph);
			}
			
			//newParagraph.focus();
			
			range.setStartAfter(beginOfParagraph.get(0));
			//range.setStartAfter(newParagraph.find('.vide').get(0));
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	};

	writablecontent.find('.writablecontent > div').keyup(function(e) {
		//if (typeof writablecontent.currentParagraph === 'undefined') return;
		var sel = window.getSelection();
		var range = sel.getRangeAt(0);
		
		var currentParagraph = $(e.target);

		/*
		var html = $.trim(currentParagraph.html()); //$.trim(writablecontent.currentParagraph.html());

		while ((html.indexOf('<br>') == html.length - 4) || (html.indexOf('<br/>') == html.length - 5))
		{
			if (substring(html, html.length - 4, html.length - 1) === '<br>') html = substring(html, 0, html.length - 5);
			if (substring(html, html.length - 5, html.length - 1) === '<br/>') html = substring(html, 0, html.length - 6);
		}

		//writablecontent.currentParagraph.html(html);
		currentParagraph.html(html);
		*/
		//sel.removeAllRanges();
		//sel.addRange(range);

		//currentParagraph.find('br').remove(); 
		/*.each(function() {
			var br = $(this);
			var nxt = br.next();
			
			x = 10;
		});*/

		/*var endContainer = $(range.endContainer).closest('.write-paragraph');
		if (endContainer.hasClass('write-paragraph'))
		{
			endContainer.find('br').remove();

			while (endContainer.find('span.beginparagraph').size() > 1)
			{
				endContainer.find('span.beginparagraph').last().remove();
			}

			//document.title = endContainer.text().length;
			if (endContainer.text().indexOf($('<span>').html('&#8203;').text()) != 0)
			{
				var span = endContainer.find('span.beginparagraph').detach();
				endContainer.prepend(span);
				
				//range.setStartAfter(span.get(0));
			}
		}*/

		/*var v = "";
		currentParagraph.find('span').each(function(index) {
			v += " " + index;
			if (index > 0)
			{
				$(this).remove();
			}
		});
		document.title = v;*/

		/*currentParagraph.focus();
		var textNode = currentParagraph.html();
		var caret = 10; // insert caret after the 10th character say
		var range = document.createRange();
		range.setStart(textNode, caret);
		range.setEnd(textNode, caret);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);*/
	});
	
	writablecontent.find('.writablecontent > div').keydown(function(e) {
		if (e.keyCode == 13)
		{
			//document.execCommand('insertHTML', false, '<div>&nbsp;</div>');

			var sel;
			if (window.getSelection && (sel = window.getSelection()).rangeCount)
			{
				var range = sel.getRangeAt(0);
				range.collapse(true);
				
				//richtext
				
				/*var insertInRichText = true;
				var insertNewLigne = true;
				
				if (range.startContainer !== range.endContainer)
				{
					//
				}
				
				var startContainer = $(range.startContainer);
				var endContainer = $(range.endContainer);
				var commonAncestorContainer = $(range.commonAncestorContainer);
				
				var p1 = startContainer.parent();
				var p2 = endContainer.parent();
				var p3 = commonAncestorContainer.parent();
				
				x = 0;*/
				
				writablecontent.insertNewParagraph();
				
				/*var parentContainer = $(range.startContainer.parentNode);

				var newParagraph = $('<div>', { 'class': 'write-paragraph' }); //.html('<span>&nbsp;</span>'); //.html('test');

				var beginOfParagraph = $('<span>', { 'contenteditable': 'false' }).html('mjxxx');
				newParagraph.append(beginOfParagraph);

				document.title = parentContainer.prop('tagName') + ' ' + parentContainer.attr('class');

				if (parentContainer.prop('tagName') === 'DIV' && parentContainer.hasClass('write-paragraph'))
				{
					newParagraph.insertAfter(parentContainer);
				}
				else
				{
					range.insertNode(newParagraph.get(0));
				}*/
				
				/*if (insertNewLigne)
				{
					if (insertInRichText)
					{
						range.insertNode(newParagraph.get(0));
					}
					else
					{
						newParagraph.insertAfter(parentContainer);
					}

					range.setStartAfter(beginOfParagraph.get(0));
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}*/
			}

			e.preventDefault();
			//return false;
		}
	});

	writable.append(writablecontent);



	var footercontent = $('<div>', {
		'class': 'footerpage',
	});

	var footer = $('<td>', { 'height': 80 }).append(footercontent);

	footer.css('padding-left', '40px');
	footer.css('padding-right', '40px');
	footer.css('padding-bottom', '40px');




	page.append($('<table>', {
		'height': '100%',
		'width': '100%',
		'border': '0',
		'cellspacing': '0',
		'cellpadding': '0',
	})
	.append($('<tr>').append(header))
	.append($('<tr>').append(writable)) 
	.append($('<tr>').append(footer)));

	
	//page.append(writable);
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
	
	//$('#writebox').height(parentHeight);
	//$('#writebox').width(parentWidth);
	
	/*globalWritebox.writebox.jScrollPane({
		showArrows: true,
		horizontalGutter: 10,
		verticalButtons: [
			{ cls: 'x', click: function(e) { alert('x'); } }, 
			{ cls: 'y', click: function(e) { alert('y'); } }, 
			{ cls: 'z', click: function(e) { alert('z'); } }
		]
	});*/
}
