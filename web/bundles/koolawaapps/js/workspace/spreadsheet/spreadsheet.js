var globalSpreadbox = [];

// initialisation des actions de manipulation des grilles
function initSpreadBoxAction()
{
	// l'exécution doit se faire uniquement sur la feuille en cours

	$(document).on('mousemove', function(e) {
		var index = workspace.spreadsheetpanel.current;
		globalSpreadbox[index].mousemove(e, index);
	});

	$(document).on('mousedown', function(e) {
		var index = workspace.spreadsheetpanel.current;
		globalSpreadbox[index].mousedown(e, index);
	});

	$(document).on('mouseup', function(e) {
		var index = workspace.spreadsheetpanel.current;
		globalSpreadbox[index].mouseup(e, index);
	});
}

// initialisation d'une grille de données
function initSpreadBox(sheetnumber)
{
	globalSpreadbox[sheetnumber] = {};

	// double selection pour les opérations d'optimisation
	globalSpreadbox[sheetnumber].sheet = $('#sheet_' + sheetnumber);
	globalSpreadbox[sheetnumber].sheetEl = document.getElementById('sheet_' + sheetnumber);
	
	// double selection pour les opérations d'optimisation
	globalSpreadbox[sheetnumber].spreadbox = $('#spreadbox_' + sheetnumber);
	globalSpreadbox[sheetnumber].spreadboxEl = document.getElementById('spreadbox_' + sheetnumber);
	
	// préselection du body Extjs qui contient le #sheet pour les besoins de manipulations Jquery
	globalSpreadbox[sheetnumber].tabfeuilleBody = globalSpreadbox[sheetnumber].spreadbox.parent().parent().parent();
	globalSpreadbox[sheetnumber].functiondiv = $('#functiondiv_' + sheetnumber);
	globalSpreadbox[sheetnumber].functionvalue = $('#functionvalue_' + sheetnumber);
	globalSpreadbox[sheetnumber].functionvalueEl = document.getElementById('functionvalue_' + sheetnumber);
	globalSpreadbox[sheetnumber].textarea = globalSpreadbox[sheetnumber].functionvalue.find('textarea');

	globalSpreadbox[sheetnumber].functionEditor = CodeMirror.fromTextArea(globalSpreadbox[sheetnumber].textarea.get()[0], {
		matchBrackets: true,
		extraKeys: {"Tab":  "indentAuto"}
	});
	globalSpreadbox[sheetnumber].functionEditor.setOption("mode", "text/x-spreadsheet");

	globalSpreadbox[sheetnumber].functionEditorDiv = globalSpreadbox[sheetnumber].functionvalue.find('.CodeMirror');

	globalSpreadbox[sheetnumber].functionEditor.on("beforeChange", function(instance, change) {
		document.title = change.text;		
		var newtext = change.text.join("").replace(/\n/g, ""); // on retire TOUS LES \n !
		change.update(change.from, change.to, [newtext]);
		return true;
	});

	// on s'assure que le scrollbar horizontal restera toujours invisible
	globalSpreadbox[sheetnumber].functionEditor.on("change", function(instance, change) {
    	globalSpreadbox[sheetnumber].functionEditorDiv.find(".CodeMirror-hscrollbar").css('display', 'none');
	});

	globalSpreadbox[sheetnumber].functionEditorDiv.find(".CodeMirror-scroll").css('overflow', 'hidden');
	
	
	globalSpreadbox[sheetnumber].rowshead = [];
	globalSpreadbox[sheetnumber].columnshead = [];
	globalSpreadbox[sheetnumber].cells = [];
	globalSpreadbox[sheetnumber].rowsline = [];
	globalSpreadbox[sheetnumber].cellseditable = [];

	globalSpreadbox[sheetnumber].resizerowboxDown = null;
	globalSpreadbox[sheetnumber].resizerowboxY = 0;
	globalSpreadbox[sheetnumber].resizecolumnboxDown = null;
	globalSpreadbox[sheetnumber].resizecolumnboxX = 0;
	globalSpreadbox[sheetnumber].sizeHztdiv = 0;
	globalSpreadbox[sheetnumber].sizeVrtdiv = 0;
	globalSpreadbox[sheetnumber].sizeableIndex = 0;

	globalSpreadbox[sheetnumber].horizontalSlide = 0;
	globalSpreadbox[sheetnumber].slideLeftToCellID = 0;
	globalSpreadbox[sheetnumber].verticalSlide = 0;
	globalSpreadbox[sheetnumber].slideTopToCellID = 0;

	globalSpreadbox[sheetnumber].firstcell = null;
	globalSpreadbox[sheetnumber].secondcell = null;
	globalSpreadbox[sheetnumber].sheetMouseDown = false;
	globalSpreadbox[sheetnumber].selectedcell = null;

	globalSpreadbox[sheetnumber].sheetBarreTop = false;
	globalSpreadbox[sheetnumber].sheetBarreLeft = false;

	globalSpreadbox[sheetnumber].columnselected = [];
	globalSpreadbox[sheetnumber].rowselected = [];

	globalSpreadbox[sheetnumber].SX = 0;
	globalSpreadbox[sheetnumber].SY = 0;

	globalSpreadbox[sheetnumber].sheetScrolled = 0;
	globalSpreadbox[sheetnumber].visibleCells = [];
	globalSpreadbox[sheetnumber].sheetEl.scrollTopFixe = 0;
	
	
    resizeSpreadBox(sheetnumber);
	



	globalSpreadbox[sheetnumber].functionvalue.on("input", function(event) {
		/*var target = $(event.target);
		c = event.keyCode;
		
		if(c === 13 || c === 27) {
		    globalSpreadbox[sheetnumber].functionvalue.blur();
		    // Workaround for webkit's bug
		    window.getSelection().removeAllRanges();
		}*/
		
		var selectedcell = globalSpreadbox[sheetnumber].selectedcell;
		var address = selectedcell.attr('address');

		if (typeof globalSpreadbox[sheetnumber].cellseditable[address] === 'undefined')
		{
			var addr = address.split(' ');
			var cindex = parseInt(addr[1]) - 1;
			var rindex = parseInt(addr[0]);
			
			var celleditable = globalSpreadbox[sheetnumber].cells[rindex][cindex].editable;

			globalSpreadbox[sheetnumber].sheet.prepend(celleditable);
			celleditable.isvisible = true;

			celleditable.width(selectedcell.width());
			celleditable.height(selectedcell.height());
			celleditable.css('marginTop', '-' + selectedcell.height() + 'px');

			var l = selectedcell.offset().left;
			var t = selectedcell.offset().top;
			celleditable.offset({ left: l, top: t });

			globalSpreadbox[sheetnumber].cellseditable[address] = celleditable;
		}

		var celleditable = globalSpreadbox[sheetnumber].cellseditable[address];
		celleditable.html(globalSpreadbox[sheetnumber].functionvalue.html());
	});

	globalSpreadbox[sheetnumber].functionvalue.on("focus", function() {
		globalSpreadbox[sheetnumber].functionvalue.toggleClass("focus");
	});

	globalSpreadbox[sheetnumber].functionvalue.on("blur", function() {
		globalSpreadbox[sheetnumber].functionvalue.toggleClass("focus");
	});



	globalSpreadbox[sheetnumber].selector1 = $('<div/>', {
		'id' : 'selector1_' + sheetnumber,
		'class' : 'selector1'
	});
	globalSpreadbox[sheetnumber].selector1.css('visibility', 'hidden');

	globalSpreadbox[sheetnumber].selector3 = $('<div/>', {
		'id' : 'selector3_' + sheetnumber,
		'class' : 'selector3'
	});
	globalSpreadbox[sheetnumber].selector3.css('visibility', 'hidden');

	globalSpreadbox[sheetnumber].selector2 = $('<div/>', {
		'id' : 'selector2_' + sheetnumber,
		'class' : 'selector2'
	});
	globalSpreadbox[sheetnumber].selector2.css('visibility', 'hidden');


	globalSpreadbox[sheetnumber].sizeableVrtdiv = $('<div/>', {
		'id' : 'sizeableVrtdiv_' + sheetnumber,
		'class' : 'sizeableVrtdiv'
	});
	globalSpreadbox[sheetnumber].sizeableVrtdiv.css('marginTop', '-' + (globalSpreadbox[sheetnumber].spreadbox.height()) + 'px');
	globalSpreadbox[sheetnumber].sizeableVrtdiv.html('<div></div>');


	globalSpreadbox[sheetnumber].sizeableHztdiv = $('<div/>', {
		'id' : 'sizeableHztdiv_' + sheetnumber,
		'class' : 'sizeableHztdiv'
	});
	globalSpreadbox[sheetnumber].sizeableHztdiv.css('top', '-' + (globalSpreadbox[sheetnumber].spreadbox.height() - 5) + 'px');
	globalSpreadbox[sheetnumber].sizeableHztdiv.html('<div></div>');

	
    // ------------------------------------------------------------------------------------------------

	
	$('#spreadboxline2_' + sheetnumber).height(globalSpreadbox[sheetnumber].sheet.height());

	
	$('#sheet_' + sheetnumber).on('scroll', function(e) {
	   
	   $('#columnsbox_' + sheetnumber).get()[0].scrollLeft = globalSpreadbox[sheetnumber].sheetEl.scrollLeft;
	   $('#rowsbox_' + sheetnumber).get()[0].scrollTop = globalSpreadbox[sheetnumber].sheetEl.scrollTop;

	   if(isFirefox) {
	      if (globalSpreadbox[sheetnumber].sheetEl.scrollTop == (globalSpreadbox[sheetnumber].sheetEl.scrollHeight - globalSpreadbox[sheetnumber].sheetEl.clientHeight)) {
	         globalSpreadbox[sheetnumber].sheetEl.scrollTopFixe = -1;
	      }

	      if (globalSpreadbox[sheetnumber].sheetEl.scrollTop == 0 && globalSpreadbox[sheetnumber].sheetEl.scrollTopFixe != 0) {
	         globalSpreadbox[sheetnumber].sheetEl.scrollTopFixe = 0;
	      }
	   }

	   $('#rowsbox_' + sheetnumber).get()[0].scrollTop += globalSpreadbox[sheetnumber].sheetEl.scrollTopFixe;

	   globalSpreadbox[sheetnumber].getVisiblesCells(sheetnumber);

	});

	$('#sheet_' + sheetnumber).append(globalSpreadbox[sheetnumber].selector1);
	$('#sheet_' + sheetnumber).append(globalSpreadbox[sheetnumber].selector2);
	$('#sheet_' + sheetnumber).append(globalSpreadbox[sheetnumber].selector3);

	$('#spreadbox_' + sheetnumber).append(globalSpreadbox[sheetnumber].sizeableHztdiv);
	$('#spreadbox_' + sheetnumber).append(globalSpreadbox[sheetnumber].sizeableVrtdiv);
	
	
	globalSpreadbox[sheetnumber].addmatrix = function(rows, columns, sheetnumber)
	{
	   var rsindex = globalSpreadbox[sheetnumber].sheet.find('.rowhead').size();

	   var rowsboxdiv = $('#rowsbox_' + sheetnumber + ' > div');
	   
	   for(i = 0; i < rows; i++)
	   {
	      rindex = rsindex + i + 1;
	      rsizeh = 20;

	      var rowh = $('<div/>', {
	         'class': 'rowhead head',
	         'kind': 'header'
	      });
	      rowh.attr('index', rindex);
	      rowh.height(rsizeh);
	      rowh.attr('sizeh', rsizeh);
	      globalSpreadbox[sheetnumber].rowshead[rindex] = rowh;
	      globalSpreadbox[sheetnumber].cells[rindex - 1] = [];

	      var contentrowbox = $('<div/>', {
	         'class': 'contentrowbox',
	      });
	      contentrowbox.css('height', rsizeh + 'px');
	      contentrowbox.html(rindex);

	      var resizerowbox = $('<div/>', {
	         'class': 'resizerowbox',
	      });
	      resizerowbox.attr('index', rindex);

	      resizerowbox.on('mousedown', function(e) {
	    	 //document.title=globalSpreadbox[sheetnumber].resizerowboxDown;
	         if (globalSpreadbox[sheetnumber].resizerowboxDown == null)
	         {
	            globalSpreadbox[sheetnumber].sizeableHztdiv.css('display', 'block');
				var top = $(this).offset().top;
	            
	            globalSpreadbox[sheetnumber].sizeableHztdiv.width(globalSpreadbox[sheetnumber].tabfeuilleBody.width());
	            globalSpreadbox[sheetnumber].sizeableHztdiv.offset({top: top});
	            globalSpreadbox[sheetnumber].resizerowboxY = top;
	            globalSpreadbox[sheetnumber].resizerowboxDown = e.pageY;

	            globalSpreadbox[sheetnumber].sizeableIndex = parseInt($(e.target).attr('index'));
	         }
	      });

	      rowh.append(contentrowbox);
	      rowh.append(resizerowbox);

	      rowsboxdiv.append(rowh);

	      // ------------------------------------

	      var row = $('<div/>', {
	         'class': 'row',
	      });
	      row.attr('index', rindex);
	      row.height(rsizeh);
	      row.attr('sizeh', rsizeh);
	      row.get()[0].head = rowh;
	      globalSpreadbox[sheetnumber].rowsline[rindex] = row;

	      globalSpreadbox[sheetnumber].sheet.append(row);
	   }

	   var rbheight = rowsboxdiv.height() + 100;
	   rowsboxdiv.height(rbheight);


	   //---------------------------------------------------------------------


	   var csindex = globalSpreadbox[sheetnumber].sheet.find('.columnhead').size();
	   var columnsboxdiv = $('#columnsbox_' + sheetnumber + ' > div');
	   var cbwidth = columnsboxdiv.width();

	   if (csindex == 0) cbwidth = 100;

	   for(i = 0; i < columns; i++)
	   {
			cindex = csindex + i + 1;
			csizew = 100;

			var columnh = $('<div/>', {
				'class': 'columnhead head',
				'kind': 'header'
			});
			columnh.attr('index', cindex);
			columnh.width(csizew);
			columnh.attr('sizew', csizew);
			globalSpreadbox[sheetnumber].columnshead[cindex] = columnh;

			var contentcolumnbox = $('<div/>', {
				'class': 'contentcolumnbox',
			});
			contentcolumnbox.css('width', (csizew - 5) + 'px');
			contentcolumnbox.html(String.fromCharCode(64 + cindex));

			var resizecolumnbox = $('<div/>', {
				'class': 'resizecolumnbox',
			});
			resizecolumnbox.attr('index', cindex);

			resizecolumnbox.on('mousedown', function(e) {
				if (globalSpreadbox[sheetnumber].resizecolumnboxDown == null)
				{
					globalSpreadbox[sheetnumber].sizeableVrtdiv.css('display', 'block');
					var left = $(this).offset().left;

					globalSpreadbox[sheetnumber].sizeableVrtdiv.height(globalSpreadbox[sheetnumber].tabfeuilleBody.height() - globalSpreadbox[sheetnumber].functiondiv.get()[0].offsetHeight);
					globalSpreadbox[sheetnumber].sizeableVrtdiv.offset({left: left});
					globalSpreadbox[sheetnumber].resizecolumnboxX = left;
					globalSpreadbox[sheetnumber].resizecolumnboxDown = e.pageX;

					globalSpreadbox[sheetnumber].sizeableIndex = parseInt($(e.target).attr('index'));
				}
			});

			columnh.append(contentcolumnbox);
			columnh.append(resizecolumnbox);

			columnsboxdiv.append(columnh);

			cbwidth += csizew;

			//-----------------------------------------------

			$('#sheet_' + sheetnumber + ' .row').each(function(index)
			{
				var csizeh = $(this).height();

				var cell = $('<div/>', {
					'class': 'cell'
				});
				cell.width(csizew);
				cell.height(csizeh);
				cell.attr('sizew', csizew);
				cell.attr('sizeh', csizeh);
				cell.get()[0].column = columnh;
				cell.get()[0].row = this.head;

				cell.attr('address', index + " " + cindex);
				cell.attr('addresscell', String.fromCharCode(64 + cindex) + (index+1));
				cell.attr('addressrow', (index+1));
				cell.attr('addresscolumn', String.fromCharCode(64 + cindex));
				
				cell.editable =  $('<div>', {
					'class' : 'celleditable'
				});
				cell.editable.isvisible = false;

				//globalSpreadbox[sheetnumber].cells[parseInt($(this).attr('index')) - 1][cindex - 1] = cell;
				globalSpreadbox[sheetnumber].cells[index][cindex - 1] = cell;

				$(this).append(cell);
			});
		}

		columnsboxdiv.width(cbwidth);
	}

	globalSpreadbox[sheetnumber].slideLeftToCell = function(cell, sheetnumber)
	{
	   if (globalSpreadbox[sheetnumber].sheetMouseDown && globalSpreadbox[sheetnumber].sheetBarreLeft && globalSpreadbox[sheetnumber].slideLeftToCellID == 0) {
	      globalSpreadbox[sheetnumber].slideLeftToCellID = setInterval(function() {
	         globalSpreadbox[sheetnumber].sheetEl.scrollLeft += globalSpreadbox[sheetnumber].horizontalSlide * 10;
	      }, 1);
	   }
	}

	globalSpreadbox[sheetnumber].slideTopToCell = function(cell, sheetnumber)
	{
	   if (globalSpreadbox[sheetnumber].sheetMouseDown && globalSpreadbox[sheetnumber].sheetBarreTop && globalSpreadbox[sheetnumber].slideTopToCellID == 0) {
	      globalSpreadbox[sheetnumber].slideTopToCellID = setInterval(function() {
	         globalSpreadbox[sheetnumber].sheetEl.scrollTop += globalSpreadbox[sheetnumber].verticalSlide * 10;
	      }, 1);
	   }
	}

	globalSpreadbox[sheetnumber].stopSlideLeft = function(sheetnumber)
	{
	   clearInterval(globalSpreadbox[sheetnumber].slideLeftToCellID);
	   globalSpreadbox[sheetnumber].slideLeftToCellID = 0;
	}

	globalSpreadbox[sheetnumber].stopSlideTop = function(sheetnumber)
	{
	   clearInterval(globalSpreadbox[sheetnumber].slideTopToCellID);
	   globalSpreadbox[sheetnumber].slideTopToCellID = 0;
	}

	globalSpreadbox[sheetnumber].getCellFromCursor = function(e, sheetnumber) {

		var target = null;

		//document.title = e.pageX + ' : ' + e.pageY;

		for (var i = 0; i < globalSpreadbox[sheetnumber].visibleCells.length; i++) {

			var cell = globalSpreadbox[sheetnumber].visibleCells[i];

			var ofsLeft = $(cell).offset().left;
			var ofsTop = $(cell).offset().top;

			var clmw = cell.offsetWidth;
			var clmh = cell.offsetHeight;

			if ((e.pageX >= ofsLeft && e.pageX <= ofsLeft + clmw) &&
			(e.pageY >= ofsTop && e.pageY <= ofsTop + clmh))
			{
				target = cell;
				break;
			}

		}

		return target;
	}

	globalSpreadbox[sheetnumber].mousedown = function(e, sheetnumber) {

		var tabfeuilleBody = globalSpreadbox[sheetnumber].tabfeuilleBody;
		var sheet = globalSpreadbox[sheetnumber].sheet;

		// Toute la zone de la grille sauf les barres de défilement
		if ((e.pageX < tabfeuilleBody.offset().left ) || (e.pageY < tabfeuilleBody.offset().top ) ||
			((e.pageX > tabfeuilleBody.offset().left + 50) && (e.pageY > sheet.offset().top + sheet.get()[0].clientHeight)) ||
			((e.pageY > tabfeuilleBody.offset().top + 20) && (e.pageX > sheet.offset().left + sheet.get()[0].clientWidth)))
		{
			return;
		}		 

		globalSpreadbox[sheetnumber].sheetMouseDown = true;
		
		var target = globalSpreadbox[sheetnumber].getCellFromCursor(e, sheetnumber);
		if (target == null) return;
		
		if ($(target).hasClass('cell'))
		{
			if ((globalSpreadbox[sheetnumber].resizecolumnboxDown == null) && (globalSpreadbox[sheetnumber].resizerowboxDown == null))
			{
				globalSpreadbox[sheetnumber].selector2.css('visibility', 'hidden');
				globalSpreadbox[sheetnumber].selector2.removeClass('selector2_border');
			
				globalSpreadbox[sheetnumber].selector3.css('visibility', 'hidden');
			
				if (globalSpreadbox[sheetnumber].selector1.css('visibility') === 'hidden')
				{
					globalSpreadbox[sheetnumber].selector1.css('visibility', 'visible');
				}
			
				cell = $(target);
				globalSpreadbox[sheetnumber].positionSelector(cell, sheetnumber);
				globalSpreadbox[sheetnumber].positionSelection(globalSpreadbox[sheetnumber].firstcell, cell, sheetnumber);
			}
		}
		
		if (typeof target.id !== typeof undefined && target.id === "selector1_" + sheetnumber)
		{
			globalSpreadbox[sheetnumber].firstcell = globalSpreadbox[sheetnumber].selector1.cell;
		}
	}

	globalSpreadbox[sheetnumber].positionSelector = function(cell, sheetnumber)
	{
		if (cell != null)
		{
			$('#selectedcell_' + sheetnumber).html(cell.attr('addresscell'));

			globalSpreadbox[sheetnumber].firstcell = cell;
			globalSpreadbox[sheetnumber].selector1.cell = cell;
			globalSpreadbox[sheetnumber].selectedcell = cell;
			
			
			var addr = cell.attr('address').split(' ');
			var cindex = parseInt(addr[1]) - 1;
			var rindex = parseInt(addr[0]);

			var celleditable = globalSpreadbox[sheetnumber].cells[rindex][cindex].editable;
			//globalSpreadbox[sheetnumber].functionvalue.html(celleditable.html());

			globalSpreadbox[sheetnumber].selector1.css('width', (cell.width() + 4 - 1) + 'px');
			globalSpreadbox[sheetnumber].selector1.css('height', (cell.height() + 4) + 'px');

			globalSpreadbox[sheetnumber].selector1.css('marginTop', '-' + (globalSpreadbox[sheetnumber].selector1.height() + 6) + 'px');
			
			globalSpreadbox[sheetnumber].selector1.offset({ top: (cell.offset().top - 2), left: (cell.offset().left - 2) });
		}
	}
	
	globalSpreadbox[sheetnumber].updateCmpEditable = function(sheetnumber)
	{
		for (var ri = 0; ri < globalSpreadbox[sheetnumber].cells.length; ri++)
		{
			for (var ci = 0; ci < globalSpreadbox[sheetnumber].cells[ri].length; ci++)
			{
				var cell = globalSpreadbox[sheetnumber].cells[ri][ci];
				var celleditable = cell.editable;
				if (celleditable.isvisible)
				{
					celleditable.width(cell.width());
					celleditable.height(cell.height());
					
					celleditable.css('marginTop', '-' + cell.height() + 'px');
					celleditable.offset({ left: cell.offset().left, top: cell.offset().top });
				}
			}
		}
	}

	globalSpreadbox[sheetnumber].mouseup = function(e, sheetnumber) {

	   clearInterval(globalSpreadbox[sheetnumber].slideLeftToCellID);
	   clearInterval(globalSpreadbox[sheetnumber].slideTopToCellID);
	   globalSpreadbox[sheetnumber].slideLeftToCellID = 0;
	   globalSpreadbox[sheetnumber].slideTopToCellID = 0;

	   if (globalSpreadbox[sheetnumber].resizecolumnboxDown != null)
	   {
	      var col = globalSpreadbox[sheetnumber].columnshead[globalSpreadbox[sheetnumber].sizeableIndex];
	      var wsize = col.width() + globalSpreadbox[sheetnumber].sizeVrtdiv;
	      if (wsize < 10) wsize = 10;
	      col.width(wsize);
	      
	      col.find('.contentcolumnbox').css('width', (col.width() - 5) + 'px');

	      var cindex = parseInt(col.attr('index'));
	      for (var i = 0; i < globalSpreadbox[sheetnumber].cells.length; i++)
	      {
	         globalSpreadbox[sheetnumber].cells[i][cindex - 1].width(col.width());
	      }

	      globalSpreadbox[sheetnumber].sizeVrtdiv = 0;
	      globalSpreadbox[sheetnumber].updateCmpEditable(sheetnumber);
	      
	      if (globalSpreadbox[sheetnumber].selector2.cell1 != null)
	      {
			  globalSpreadbox[sheetnumber].positionSelector(globalSpreadbox[sheetnumber].selector2.cell1, sheetnumber);
			  globalSpreadbox[sheetnumber].positionSelection(globalSpreadbox[sheetnumber].selector2.cell1, globalSpreadbox[sheetnumber].selector2.cell2, sheetnumber);
			  globalSpreadbox[sheetnumber].selector3.offset({ top: globalSpreadbox[sheetnumber].SY, left: globalSpreadbox[sheetnumber].SX });
	      }
	   }

	   if (globalSpreadbox[sheetnumber].resizerowboxDown != null)
	   {
	      var ro = globalSpreadbox[sheetnumber].rowshead[globalSpreadbox[sheetnumber].sizeableIndex];
	      var csize = ro.height() + globalSpreadbox[sheetnumber].sizeHztdiv;
	      if (csize < 10) csize = 10;
	      ro.height(csize);

	      var hg = ro.height() + 'px';
	      var hgr = ro.height() + 'px';

	      ro.find('.contentrowbox').css('height', hg);
	      ro.find('.contentrowbox').css('line-height', hg);

	      var rindex = parseInt(ro.attr('index'));
	      globalSpreadbox[sheetnumber].rowsline[rindex].css('height', hgr);
	      globalSpreadbox[sheetnumber].rowsline[rindex].css('line-height', hgr);

	      cellsr = globalSpreadbox[sheetnumber].cells[rindex - 1];
	      for (var i = 0; i < cellsr.length; i++)
	      {
	         cellsr[i].css('height', hgr);
	         cellsr[i].css('line-height', hgr);	         
	      }
	      
	      globalSpreadbox[sheetnumber].sizeHztdiv = 0;
	      globalSpreadbox[sheetnumber].updateCmpEditable(sheetnumber);
	      
	      if (globalSpreadbox[sheetnumber].selector2.cell1 != null)
	      {
			  globalSpreadbox[sheetnumber].positionSelector(globalSpreadbox[sheetnumber].selector2.cell1, sheetnumber);
			  globalSpreadbox[sheetnumber].positionSelection(globalSpreadbox[sheetnumber].selector2.cell1, globalSpreadbox[sheetnumber].selector2.cell2, sheetnumber);
			  globalSpreadbox[sheetnumber].selector3.offset({ top: globalSpreadbox[sheetnumber].SY, left: globalSpreadbox[sheetnumber].SX });
	      }
	   }

	   globalSpreadbox[sheetnumber].resizecolumnboxDown = null;
	   globalSpreadbox[sheetnumber].resizerowboxDown = null;

	   globalSpreadbox[sheetnumber].sizeableVrtdiv.css('display', 'none');
	   globalSpreadbox[sheetnumber].sizeableHztdiv.css('display', 'none');

	   globalSpreadbox[sheetnumber].sheetMouseDown = false;

	   if (globalSpreadbox[sheetnumber].firstcell != null)
	   {
	      globalSpreadbox[sheetnumber].selector3.css('visibility', 'visible');
	      globalSpreadbox[sheetnumber].selector3.offset({ top: globalSpreadbox[sheetnumber].SY, left: globalSpreadbox[sheetnumber].SX });
	   }

	   if (globalSpreadbox[sheetnumber].selector2.css('visibility') !== 'hidden')
	   {
	      globalSpreadbox[sheetnumber].selector2.addClass('selector2_border');
	   }

	   globalSpreadbox[sheetnumber].selectHeaders(globalSpreadbox[sheetnumber].firstcell, globalSpreadbox[sheetnumber].secondcell, true, sheetnumber);

	   globalSpreadbox[sheetnumber].firstcell = null;
	}

	globalSpreadbox[sheetnumber].mousemove = function(e, sheetnumber) {

		globalSpreadbox[sheetnumber].sheetBarreLeft = false;
		globalSpreadbox[sheetnumber].sheetBarreTop = false;


		globalSpreadbox[sheetnumber].horizontalSlide = 0;
		if (e.pageX > $('#sheet_' + sheetnumber).offset().left + $('#sheet_' + sheetnumber).get()[0].clientWidth) { globalSpreadbox[sheetnumber].horizontalSlide = 1; }
		if (e.pageX < $('#sheet_' + sheetnumber).offset().left) { globalSpreadbox[sheetnumber].horizontalSlide = -1; }

		globalSpreadbox[sheetnumber].verticalSlide = 0;
		if (e.pageY > $('#sheet_' + sheetnumber).offset().top + $('#sheet_' + sheetnumber).get()[0].clientHeight) { globalSpreadbox[sheetnumber].verticalSlide = 1; }
		if (e.pageY < $('#sheet_' + sheetnumber).offset().top) { globalSpreadbox[sheetnumber].verticalSlide = -1; }



		var target = globalSpreadbox[sheetnumber].getCellFromCursor(e, sheetnumber);
		if (globalSpreadbox[sheetnumber].sheetMouseDown && globalSpreadbox[sheetnumber].resizecolumnboxDown != null)
		{
			var l = globalSpreadbox[sheetnumber].resizecolumnboxX + e.pageX - globalSpreadbox[sheetnumber].resizecolumnboxDown;
			if (globalSpreadbox[sheetnumber].horizontalSlide == 0)
			{
				var col = globalSpreadbox[sheetnumber].columnshead[globalSpreadbox[sheetnumber].sizeableIndex];
				globalSpreadbox[sheetnumber].sizeVrtdiv = e.pageX - globalSpreadbox[sheetnumber].resizecolumnboxDown;
				if (col.width() + globalSpreadbox[sheetnumber].sizeVrtdiv <= 10) return;
			
				globalSpreadbox[sheetnumber].sizeableVrtdiv.offset({ left: l });
			}
			return;
		}

		if (globalSpreadbox[sheetnumber].sheetMouseDown && globalSpreadbox[sheetnumber].resizerowboxDown != null)
		{
			var t = globalSpreadbox[sheetnumber].resizerowboxY + e.pageY - globalSpreadbox[sheetnumber].resizerowboxDown;
			if (globalSpreadbox[sheetnumber].verticalSlide == 0)
			{
				var ro = globalSpreadbox[sheetnumber].rowshead[globalSpreadbox[sheetnumber].sizeableIndex];
				globalSpreadbox[sheetnumber].sizeHztdiv = e.pageY - globalSpreadbox[sheetnumber].resizerowboxDown;
				if (ro.height() + globalSpreadbox[sheetnumber].sizeHztdiv <= 10) return;

				globalSpreadbox[sheetnumber].sizeableHztdiv.offset({ top: t });
			}
			return;
		}


		if (globalSpreadbox[sheetnumber].horizontalSlide != 0)
		{
			globalSpreadbox[sheetnumber].sheetBarreLeft = true;
			globalSpreadbox[sheetnumber].slideLeftToCell($(target), sheetnumber);
		}
		else
		{
			globalSpreadbox[sheetnumber].stopSlideLeft(sheetnumber);
		}


		if (globalSpreadbox[sheetnumber].verticalSlide != 0)
		{
			globalSpreadbox[sheetnumber].sheetBarreTop = true;
			globalSpreadbox[sheetnumber].slideTopToCell($(target), sheetnumber);
		}
		else
		{
			globalSpreadbox[sheetnumber].stopSlideTop(sheetnumber);
		}

		cell = $(target);
		if (!cell.hasClass('cell'))
		{
			globalSpreadbox[sheetnumber].selectHeaders(globalSpreadbox[sheetnumber].firstcell, globalSpreadbox[sheetnumber].secondcell, true, sheetnumber);
		}

		if (globalSpreadbox[sheetnumber].firstcell != null && cell.hasClass('cell'))
		{
			globalSpreadbox[sheetnumber].positionSelection(globalSpreadbox[sheetnumber].firstcell, cell, sheetnumber);
		}
		else if (target != null && target.id === "selector1_" + sheetnumber)
		{
			globalSpreadbox[sheetnumber].selector2.css('visibility', 'hidden');
		}
	}

	globalSpreadbox[sheetnumber].selectHeaders = function(cell1, cell2, force, sheetnumber)
	{
		if (cell1 == null || cell2 == null) return;

		if (!globalSpreadbox[sheetnumber].sheetBarreTop || force)
		{
			for (var i = 0; i < globalSpreadbox[sheetnumber].columnselected.length; i++)
			{
				globalSpreadbox[sheetnumber].columnselected[i].removeClass('columnselected');
			}
			globalSpreadbox[sheetnumber].columnselected = [];

			var c1 = parseInt(cell1.get()[0].column.attr('index'));
			var c2 = parseInt(cell2.get()[0].column.attr('index'));
			var mc1 = Math.min(c1, c2);
			var mc2 = Math.max(c1, c2);

			for (var i = mc1; i <= mc2; i++)
			{
				var c = globalSpreadbox[sheetnumber].columnshead[i];
				c.addClass('columnselected');
				globalSpreadbox[sheetnumber].columnselected.push(c);
			}
		}

		if (!globalSpreadbox[sheetnumber].sheetBarreLeft || force)
		{
			for (var i = 0; i < globalSpreadbox[sheetnumber].rowselected.length; i++)
			{
				globalSpreadbox[sheetnumber].rowselected[i].removeClass('rowselected');
			}
			globalSpreadbox[sheetnumber].rowselected = [];

			var r1 = parseInt(cell1.get()[0].row.attr('index'));
			var r2 = parseInt(cell2.get()[0].row.attr('index'));
			var mr1 = Math.min(r1, r2);
			var mr2 = Math.max(r1, r2);

			for (var i = mr1; i <= mr2; i++)
			{
				var r = globalSpreadbox[sheetnumber].rowshead[i];
				r.addClass('rowselected');
				globalSpreadbox[sheetnumber].rowselected.push(r);
			}
		}
	}

	// positionnement du selecteur multi-cellules
	// le positionnement se fait sur la base de la première cellule sélectionnée et de la dernière
	globalSpreadbox[sheetnumber].positionSelection = function(cell1, cell2, sheetnumber)
	{
		if (cell1 != null && cell2 != null)
		{
			globalSpreadbox[sheetnumber].selector2.cell1 = cell1;
			globalSpreadbox[sheetnumber].selector2.cell2 = cell2;
		
			globalSpreadbox[sheetnumber].secondcell = cell2;
			
			// ne pas oublier de sélectionner les entêtes des cellules sélectionnées (lignes et colonnes)
			globalSpreadbox[sheetnumber].selectHeaders(cell1, cell2, false, sheetnumber);

			// on détermine les positions en abcisses et ordonnées
			x1 = cell1.offset().left;
			x2 = x1 + cell1.width();
			x3 = cell2.offset().left;
			x4 = x3 + cell2.width();

			y1 = cell1.offset().top;
			y2 = y1 + cell1.height();
			y3 = cell2.offset().top;
			y4 = y3 + cell2.height();

			// on détermine les valeurs minimales et maximales des coordonnées
			// pour déduire la zone selectionnée à dessinner
			X = Math.min(x1, x3) - 1;
			Y = Math.min(y1, y3) - 1;
			W = Math.max(x2, x4) - X - 1;
			H = Math.max(y2, y4) - Y - 1;

			// il ne faut pas oublier de calculer les coordonnées du carré d'extension
			globalSpreadbox[sheetnumber].SY = Y + H - 2;
			globalSpreadbox[sheetnumber].SX = X + W - 3;

			// si les adresses des 2 cellules sont les mêmes, on abandonne l'opération
			if (cell1.attr('address') === cell2.attr('address'))
			{
				$('#selectedcell_' + sheetnumber).html(cell1.attr('addresscell'));
				// et surtout on s'assure que le rectangle de selection reste caché
				globalSpreadbox[sheetnumber].selector2.css('visibility', 'hidden');
				return;
			}
			
			var c1 = cell1.attr('addresscolumn');
			var r1 = cell1.attr('addressrow');

			var c2 = cell2.attr('addresscolumn');
			var r2 = cell2.attr('addressrow');
			
			if (x3 < x1)
			{
				c1 = cell2.attr('addresscolumn');
				c2 = cell1.attr('addresscolumn');
			}

			if (y3 < y1)
			{
				r1 = cell2.attr('addressrow');
				r2 = cell1.attr('addressrow');
			}

			$('#selectedcell_' + sheetnumber).html((c1+r1) + ':' + (c2+r2));

			// si le rectangle de selection est caché, on l'affiche
			if (globalSpreadbox[sheetnumber].selector2.css('visibility') === 'hidden')
			{
				globalSpreadbox[sheetnumber].selector2.css('visibility', 'visible');
			}

			// on fixe les dimensions du rectangle
			globalSpreadbox[sheetnumber].selector2.css('width', (W - 1 + 2) + 'px');
			globalSpreadbox[sheetnumber].selector2.css('height', (H + 2) + 'px');

			// on rattrape la hauteur qu'il consomme
			globalSpreadbox[sheetnumber].selector2.css('marginTop', '-' + (H + 2) + 'px');
			
			// enfin, on positionne le selecteur ou rectangle
			globalSpreadbox[sheetnumber].selector2.offset({ top: Y, left: X });
		}
	}

	// selection des cellules visibles
	globalSpreadbox[sheetnumber].getVisiblesCells = function(sheetnumber) {
	
		// on choisi aléatoirement un identifiant d'exécution unique
		var innersheetScrolled = getRandomInt(1000, 9999);
		globalSpreadbox[sheetnumber].sheetScrolled = innersheetScrolled;

		var rows = globalSpreadbox[sheetnumber].sheet.find('.row').get();
		var collectedJqueryRows = [];

		var tabFeuilleBody = globalSpreadbox[sheetnumber].tabfeuilleBody.get()[0];
		var functiondiv = globalSpreadbox[sheetnumber].functiondiv.get()[0];

		// dans un premier temps on collecte les lignes visibles
		for (var i = 0; i < rows.length; i++) {
		
			// si l'identifiant change parce qu'on est encore entrain de scroller l'exécution s'interromp
			if (innersheetScrolled != globalSpreadbox[sheetnumber].sheetScrolled) { return; }

			// on ne collecte que les lignes présentes dans la zone visible
			if ($(rows[i]).is_on_screen(globalSpreadbox[sheetnumber].sheet)) collectedJqueryRows.push($(rows[i]));
		}

		// dans un second temps, on parcoure chaque ligne visible pour déterminer les cellules visibles
		var collectedCells = [];
		for (var i = 0; i < collectedJqueryRows.length; i++) {
			var jrow = collectedJqueryRows[i];

			var cellsx = jrow.find('.cell').get();
			for (var c = 0; c < cellsx.length; c++) {

				// si l'identifiant change parce qu'on est encore entrain de scroller l'exécution s'interromp
				if (innersheetScrolled != globalSpreadbox[sheetnumber].sheetScrolled) { return; }

				// on ne collecte que les cellules présentes dans la zone visible
				if ($(cellsx[c]).is_on_screen(globalSpreadbox[sheetnumber].sheet)) collectedCells.push(cellsx[c]);
			}
		}
		
		globalSpreadbox[sheetnumber].visibleCells = collectedCells;
	}
}

// action exécutée après redimensionnement du body Extjs qui contient le #sheet
function resizeSpreadBox(sheetnumber)
{
	if (typeof globalSpreadbox[sheetnumber] === 'undefined') return;
	
	var parentBody = globalSpreadbox[sheetnumber].tabfeuilleBody;
	var parentWidth = parentBody.width() - 50;
	var parentHeight = parentBody.height() - 20 - globalSpreadbox[sheetnumber].functiondiv.get()[0].offsetHeight;
	
	// on redimensionne les entêtes (colonnes et lignes)
	$('#spreadbox_' + sheetnumber + ' #columnsbox_' + sheetnumber).width(parentWidth);
	$('#spreadbox_' + sheetnumber + ' #rowsbox_' + sheetnumber).height(parentHeight);
		
	// on redimensionne le contener
	$('#spreadbox_' + sheetnumber + ' #contener_' + sheetnumber).width(parentWidth);
	$('#spreadbox_' + sheetnumber + ' #contener_' + sheetnumber).height(parentHeight);	
	
	// on redimensionne le #sheet
	$('#spreadbox_' + sheetnumber + ' #sheet_' + sheetnumber).height(parentHeight);
	$('#spreadbox_' + sheetnumber + ' #sheet_' + sheetnumber).width(parentWidth);

	$('#functionvalue_' + sheetnumber).width(parentWidth - 193);
	globalSpreadbox[sheetnumber].functionEditorDiv.width(parentWidth - 193);
	globalSpreadbox[sheetnumber].functionEditorDiv.height(24);
	
	// on redimensionne les indicateurs de redimensionnement des cellules
	if (typeof globalSpreadbox[sheetnumber].sizeableVrtdiv !== 'undefined') globalSpreadbox[sheetnumber].sizeableVrtdiv.height(globalSpreadbox[sheetnumber].tabfeuilleBody.height() - globalSpreadbox[sheetnumber].functiondiv.get()[0].offsetHeight);
	if (typeof globalSpreadbox[sheetnumber].sizeableHztdiv !== 'undefined') globalSpreadbox[sheetnumber].sizeableHztdiv.width(globalSpreadbox[sheetnumber].tabfeuilleBody.width());
	
	// on actualise la liste de cellules visibles
	if (typeof globalSpreadbox[sheetnumber] !== 'undefined' && typeof globalSpreadbox[sheetnumber].getVisiblesCells !== 'undefined')
	{
		globalSpreadbox[sheetnumber].getVisiblesCells(sheetnumber);
	}
}

function startSpreadBox(sheetnumber)
{
	initSpreadBox(sheetnumber);
	
	globalSpreadbox[sheetnumber].addmatrix(100, 26, sheetnumber);
	globalSpreadbox[sheetnumber].getVisiblesCells(sheetnumber);
}
