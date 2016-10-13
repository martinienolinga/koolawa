function workspace_control_init_panelk()
{
	Ext.define('Koolawa.ux.Panel', {
		extend: 'Ext.panel.Panel',
		alias: 'widget.panelk',
		
		layout: 'border',
		bodyBorder: false,
		defaults: {
			collapsible: false,
			split: false,
		},

		scroll: 'none', // none, vertical, horizontal, both, auto, vertical-auto, horizontal-auto
		
		extras: [],

		centerPanel: {},
		
		initComponent: function() {
            var me = this;
            
            var itemsPanel = me.items;
            var htmlPanel = me.html;
            
            me.items = [];
            me.html = '';

			var center = Ext.widget('panel', {
				border: false,
				region: 'center',
				cls: 'xscrollbar-center',
				
				updateScrolling: function()
				{
					if (typeof east !== 'undefined')
					{
						var translateEast = east.getTranslate();
						east.setTranslate(translateEast);
						
						if (center.scrollingUp)
						{
							east.setTranslate(translateEast - 5);
						}

						if (center.scrollingDown)
						{
							east.setTranslate(translateEast + 5);
						}
					}
					
					if (typeof southcenter !== 'undefined')
					{
						var translateSouthcenter = southcenter.getTranslate();
						southcenter.setTranslate(translateSouthcenter);

						if (center.scrollingLeft)
						{
							southcenter.setTranslate(translateSouthcenter - 5);
						}

						if (center.scrollingRight)
						{
							southcenter.setTranslate(translateSouthcenter + 5);
						}
					}
				},

				updateSizes: function()
				{
					if (me.scroll === 'none') return;
				
					var centerDom = center.getEl().dom;
					var centerBody = $('#' + centerDom.id + '-body');
					var centerInnerCt = $('#' + centerDom.id + '-innerCt');


					if (me.scroll === 'both' || me.scroll === 'auto' || me.scroll === 'vertical' || me.scroll === 'vertical-auto')
					{
						var hc = $(centerDom).height();
						var ho = centerInnerCt.height();
				
						if (typeof east !== 'undefined')
						{
							var eastJq = $(east.getEl().dom);
					
							var idD = eastJq.find('.xscrollbar-drag').get()[0].id;
							var idT = eastJq.find('.xscrollbar-track').get()[0].id;
					
							var ht = $('#' + idT).height();

							var hd = Math.round(hc * ht / ho);
						
							if (hd > ht) hd = ht;
					
							Ext.getCmp(idD).setHeight(hd);

							if (me.scroll === 'auto' || me.scroll === 'vertical-auto')
							{
								if (ht == hd) 
								{
									east.destroy();
									if (typeof southeast !== 'undefined') southeast.destroy();
							
									southeast = undefined;
									east = undefined;
								}
							}
						}
						else if (hc < ho)
						{
							if (typeof east === 'undefined')
							{
								east = center.createEast();
							
								if ((typeof south !== 'undefined') && (typeof southeast === 'undefined'))
								{
									southeast = center.createSouthEast();
									south.add(southeast);
								}
						
								me.add(east);
							}
						}
					}
					
					
					if (me.scroll === 'both' || me.scroll === 'auto' || me.scroll === 'horizontal' || me.scroll === 'horizontal-auto')
					{
						var wc = $(centerDom).width();
						var wo = centerInnerCt.width();	
					
						if (typeof southcenter !== 'undefined')
						{
							var southcenterJq = $(southcenter.getEl().dom);
					
							var idD = southcenterJq.find('.xscrollbar-drag').get()[0].id;
							var idT = southcenterJq.find('.xscrollbar-track').get()[0].id;
					
							var wt = $('#' + idT).width();
							var wd = Math.round(wc * wt / wo);

							if (wd > wt) wd = wt;
					
							Ext.getCmp(idD).setWidth(wd);

							if (me.scroll === 'auto' || me.scroll === 'horizontal-auto')
							{
								if (wt == wd)
								{ 
									southcenter.destroy();
									if (typeof southeast !== 'undefined') southeast.destroy();
									south.destroy();
							
									south = undefined;
									southcenter = undefined;
									southeast = undefined;
								}
							}
						}
						else if (wc < wo)
						{
							if (typeof south === 'undefined')
							{
								southcenter = center.createSouthCenter();
								southeast = center.createSouthEast();
								south = center.createSouth();
						
								me.add(south);
							}
						}
					}
				},
				
				listeners: {
					'afterrender': function(panel)
					{
						center.scrollingUp = false;
						center.scrollingDown = false;

						var inter = setInterval(function() {
							if ($(center.getEl().dom).height() != 0)
							{
								center.updateSizes();
								center.updateScrolling();
							}
						}, 50);
						
						$(panel.getEl().dom).on('mousewheel', function(e)
						{
							if (e.deltaY == 1)
							{
								var translateEast = east.getTranslate();
								east.setTranslate(translateEast - 50);
							}
							
							if (e.deltaY == -1)
							{
								var translateEast = east.getTranslate();
								east.setTranslate(translateEast + 50);
							} 
						});
					},
				},
				
				items: itemsPanel,
				html: htmlPanel,
			});

			if (me.scroll === 'vertical' || me.scroll === 'both' || me.scroll === 'vertical-auto' || me.scroll === 'auto')
			{
				center.createEast = function()
				{
					var arrowUp = Ext.widget('panel', {
						cls: 'xscrollbar-item xscrollbar-arrow',
						region: 'north', 
						width: 16,
						height: 16,
						
						margin: '0 0 2 0',
					
						listeners: {
							'render': function(panel)
							{
								panel.body.on('mousedown', function()
								{
									center.scrollingUp = true;
								});
							}
						}
					});
					
					var arrowDown = Ext.widget('panel', { 
						cls: 'xscrollbar-item xscrollbar-arrow',
						region: 'south', 
						width: 16,
						height: 16,
						
						margin: '2 0 0 0',
					
						listeners: {
							'render': function(panel)
							{
								panel.body.on('mousedown', function()
								{
									center.scrollingDown = true;
								});
							}
						}
					});
					
					var scroller = Ext.widget('panel', { 
						cls: 'xscrollbar-item xscrollbar-track',
						region: 'center',
						
						listeners: {
							'render': function(panel)
							{
								panel.body.on('click', function(e)
								{
									if ($('#' + e.target.id).parent().parent().get()[0].id === panel.body.id)
									{
										var newY = east.getTranslateByScrollbar() + e.pageY - east.panelJs.offset().top - east.panelJs.height() / 2;
										
										east.setTranslateByScrollbar(newY);
									}
								});
							}
						},
						
						items: [
							{
								cls: 'xscrollbar-item xscrollbar-drag',
								width: 16,
								height: 16,

								listeners: {
									'render': function(panel)
									{
										panel.dragging = false;
										var panelJs = $(panel.getEl().dom);
										east.panelJs = panelJs;
									
										var track = panel.up('panel');
										var trackJs = $(track.getEl().dom);
										east.trackJs = trackJs;
									
										var centerDom = center.getEl().dom;
										var centerBody = $('#' + centerDom.id + '-body');
										var centerInner = $('#' + centerDom.id + '-innerCt');
									
										var inter = setInterval(function() {
											if ($(center.getEl().dom).height() != 0)
											{
												clearInterval(inter);
												var diff = Math.round(centerBody.scrollTop() * trackJs.height() / centerInner.height());
												panelJs.css('transform', 'translate(0, ' + diff + 'px)');
											}
										}, 50);
									

										panel.body.on('mousedown', function(e)
										{
											panel.dragging = true;
											panel.pageY = e.pageY;
											panel.scrollY = east.getTranslateByScrollbar();
										});

										$(document).on('mouseup', function(e) {
											panel.dragging = false;

											center.scrollingUp = false;
											center.scrollingDown = false;
										});

										$(document).on('mousemove', function(e) {
											if (panel.dragging)
											{
												var diff = panel.scrollY + e.pageY - panel.pageY;
											
												east.setTranslateByScrollbar(diff);
											}
										});
									}
								}
							}
						]
					});
				
					var scrollbar = Ext.widget('panel', {
						border: false,
						width: 20,
						region: 'east',
						cls: 'xscrollbar',

						layout: 'border',
						bodyBorder: false,
						defaults: {
							collapsible: false,
							split: false,
						},
					
						setTranslate: function(value)
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							var centerInner = $('#' + centerDom.id + '-innerCt');

							if (value + centerBody.height() > centerInner.height()) value = (centerInner.height() - centerBody.height());
							if (value < 0) value = 0;

							centerBody.scrollTop(value);
							east.panelJs.css('transform', 'translate(0, ' + (Math.round(value * east.trackJs.height() / centerInner.height())) + 'px)');
						},
						
						setTranslateByScrollbar: function(value)
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							var centerInner = $('#' + centerDom.id + '-innerCt');

							if (value + east.panelJs.height() > east.trackJs.height()) value = (east.trackJs.height() - east.panelJs.height());
							if (value < 0) value = 0;

							east.panelJs.css('transform', 'translate(0, ' + value + 'px)');
							centerBody.scrollTop(Math.round(value * centerInner.height() / east.trackJs.height()));
						},

						getTranslate: function()
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							
							return centerBody.scrollTop();
						},
						
						getTranslateByScrollbar: function()
						{
							var transform = east.panelJs.css('transform');
							if (transform !== 'none')
							{
								return parseInt(transform.split(', ')[5].split(')')[0]);
							}
							return 0;
						},

						
						items: []
					});
					
					scrollbar.add(arrowUp);
					
					if (typeof me.extras !== 'undefined')
					{
						$.each(me.extras, function(index, value)
						{
							if (value.position === 'begin' && value.region === 'east')
							{
								var extrabutton = Ext.widget('panel', {
									cls: 'xscrollbar-item xscrollbar-extrabutton' + ((typeof value.cls !== 'undefined')?value.cls:''),
									region: 'north',
									width: 16,
									height: 16,
						
									margin: '0 0 2 0',
									
									listeners: {
										'render': function(button)
										{
											if (typeof value.tooltip !== 'undefined') $('#' + button.id).attr('title', value.tooltip);
											$(document).tooltip();
										}
									}
								});
								
								if (typeof value.listeners !== 'undefined') extrabutton.setListeners(value.listeners);
								
								scrollbar.add(extrabutton);
							}
						});
					}
					
					scrollbar.add(scroller);
					
					if (typeof me.extras !== 'undefined')
					{
						$.each(me.extras, function(index, value)
						{
							if (value.position === 'end' && value.region === 'east')
							{
								var extrabutton = Ext.widget('panel', {
									cls: 'xscrollbar-item xscrollbar-extrabutton' + ((typeof value.cls !== 'undefined')?value.cls:''),
									region: 'south',
									width: 16,
									height: 16,
						
									margin: '2 0 0 0',
									
									listeners: {
										'render': function(button)
										{
											if (typeof value.tooltip !== 'undefined') $('#' + button.id).attr('title', value.tooltip);
											$(document).tooltip();
										}
									}
								});
								
								if (typeof value.listeners !== 'undefined') extrabutton.setListeners(value.listeners);
								
								scrollbar.add(extrabutton);
							}
						});
					}
					
					scrollbar.add(arrowDown);
					
					return scrollbar;
				}
				
				var east = center.createEast();
			}

			if (me.scroll === 'horizontal' || me.scroll === 'both' || me.scroll === 'horizontal-auto' || me.scroll === 'auto')
			{
				center.createSouthCenter = function()
				{
					var arrowLeft = Ext.widget('panel', { 
						cls: 'xscrollbar-item xscrollbar-arrow',
						region: 'west', 
						width: 16,
						height: 16,
						
						margin: '0 2 0 0',
					
						listeners: {
							'render': function(panel)
							{
								panel.body.on('mousedown', function()
								{
									center.scrollingLeft = true;
								});
							}
						}
					});
					
					var arrowRight = Ext.widget('panel', { 
						cls: 'xscrollbar-item xscrollbar-arrow',
						region: 'east', 
						width: 16,
						height: 16,
						
						margin: '0 0 0 2',
					
						listeners: {
							'render': function(panel)
							{
								panel.body.on('mousedown', function()
								{
									center.scrollingRight = true;
								});
							}
						}
					});
					
					var scroller = Ext.widget('panel', {
						cls: 'xscrollbar-item xscrollbar-track',
						region: 'center',
						
						listeners: {
							'render': function(panel)
							{
								panel.body.on('click', function(e)
								{
									if ($('#' + e.target.id).parent().parent().get()[0].id === panel.body.id)
									{
										var newX = southcenter.getTranslateByScrollbar() + e.pageX - southcenter.panelJs.offset().left - southcenter.panelJs.width() / 2;
										
										southcenter.setTranslateByScrollbar(newX);
									}
								});
							}
						},
						
						items: [
							{
								cls: 'xscrollbar-item xscrollbar-drag',
								width: 16,
								height: 16,
					
								listeners: {
									'render': function(panel)
									{
										panel.dragging = false;
										var panelJs = $(panel.getEl().dom);
										southcenter.panelJs = panelJs;
									
										var track = panel.up('panel');
										var trackJs = $(track.getEl().dom);
										southcenter.trackJs = trackJs;
									
										var centerDom = center.getEl().dom;
										var centerBody = $('#' + centerDom.id + '-body');
										var centerInner = $('#' + centerDom.id + '-innerCt');
									
										var inter = setInterval(function() {
											if ($(center.getEl().dom).width() != 0)
											{
												clearInterval(inter);
												var diff = Math.round(centerBody.scrollLeft() * trackJs.width() / centerInner.width());
												panelJs.css('transform', 'translate(' + diff + 'px, 0)');
											}
										}, 50);

										panel.body.on('mousedown', function(e)
										{
											panel.dragging = true;
											panel.pageX = e.pageX;
											panel.scrollX = southcenter.getTranslateByScrollbar();
										});

										$(document).on('mouseup', function(e) {
											panel.dragging = false;

											center.scrollingLeft = false;
											center.scrollingRight = false;
										});

										$(document).on('mousemove', function(e) {
											if (panel.dragging)
											{
												var diff = panel.scrollX + e.pageX - panel.pageX;

												southcenter.setTranslateByScrollbar(diff);
											}
										});
									}
								}
							}
						]
					});
				
					var scrollbar = Ext.widget('panel', {
						border: false,
						region: 'center',
						cls: 'xscrollbar',

						layout: 'border',
						bodyBorder: false,
						defaults: {
							collapsible: false,
							split: false,
						},

						setTranslate: function(value)
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							var centerInner = $('#' + centerDom.id + '-innerCt');

							if (value + centerBody.width() > centerInner.width()) value = (centerInner.width() - centerBody.width());
							if (value < 0) value = 0;

							centerBody.scrollLeft(value);
							southcenter.panelJs.css('transform', 'translate(' + Math.round(value * southcenter.trackJs.width() / centerInner.width()) + 'px, 0)');
						},
						
						setTranslateByScrollbar: function(value)
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							var centerInner = $('#' + centerDom.id + '-innerCt');

							if (value + southcenter.panelJs.width() > southcenter.trackJs.width()) value = (southcenter.trackJs.width() - southcenter.panelJs.width());
							if (value < 0) value = 0;

							southcenter.panelJs.css('transform', 'translate(' + value + 'px, 0)');
							centerBody.scrollLeft(Math.round(value * centerInner.width() / southcenter.trackJs.width()));
						},
									
						getTranslate: function()
						{
							var centerDom = center.getEl().dom;
							var centerBody = $('#' + centerDom.id + '-body');
							
							return centerBody.scrollLeft();
						},
						
						getTranslateByScrollbar: function()
						{
							var transform = southcenter.panelJs.css('transform');
							if (transform !== 'none')
							{
								return parseInt(transform.split(', ')[4]);
							}
							return 0;
						},

						items: []
					});
					
					scrollbar.add(arrowLeft);
					
					if (typeof me.extras !== 'undefined')
					{
						$.each(me.extras, function(index, value)
						{
							if (value.position === 'begin' && value.region === 'south')
							{
								var extrabutton = Ext.widget('panel', {
									cls: 'xscrollbar-item xscrollbar-extrabutton' + ((typeof value.cls !== 'undefined')?value.cls:''),
									region: 'west',
									width: 16,
									height: 16,
									
									margin: '0 2 0 0',
									
									listeners: {
										'render': function(button)
										{
											if (typeof value.tooltip !== 'undefined') $('#' + button.id).attr('title', value.tooltip);
											$(document).tooltip();
										}
									}
								});
								
								if (typeof value.listeners !== 'undefined') extrabutton.setListeners(value.listeners);
								
								scrollbar.add(extrabutton);
							}
						});
					}
					
					scrollbar.add(scroller);
					
					if (typeof me.extras !== 'undefined')
					{
						$.each(me.extras, function(index, value)
						{
							if (value.position === 'end' && value.region === 'south')
							{
								var extrabutton = Ext.widget('panel', {
									cls: 'xscrollbar-item xscrollbar-extrabutton' + ((typeof value.cls !== 'undefined')?value.cls:''),
									region: 'east',
									width: 16,
									height: 16,
						
									margin: '0 0 0 2',
									
									listeners: {
										'render': function(button)
										{
											if (typeof value.tooltip !== 'undefined') $('#' + button.id).attr('title', value.tooltip);
											$(document).tooltip();
										}
									}
								});
								
								if (typeof value.listeners !== 'undefined') extrabutton.setListeners(value.listeners);
								
								scrollbar.add(extrabutton);
							}
						});
					}
					
					scrollbar.add(arrowRight);
					
					return scrollbar;
				};

				var southcenter = center.createSouthCenter();
				


				center.createSouthEast = function()
				{
					if (typeof east === 'undefined')
					{
						return undefined;
					}
					else
					{
						return Ext.widget('panel', {
							border: false,
							width: 20,
							region: 'east',
							cls: 'xscrollbar',
							
							listeners: {
								'render': function(panel)
								{
									panel.body.on('mousedown', function(e)
									{
										panel.dragging = true;
										panel.pageX = e.pageX;
										panel.pageY = e.pageY;
										panel.scrollX = southcenter.getTranslateByScrollbar();
										panel.scrollY = east.getTranslateByScrollbar();
									});

									$(document).on('mouseup', function(e) {
										panel.dragging = false;

										center.scrollingLeft = false;
										center.scrollingRight = false;
										
										center.scrollingUp = false;
										center.scrollingDown = false;
									});

									$(document).on('mousemove', function(e) {
										if (panel.dragging)
										{
											var diffx = panel.scrollX + e.pageX - panel.pageX;
											var diffy = panel.scrollY + e.pageY - panel.pageY;

											southcenter.setTranslateByScrollbar(diffx);
											east.setTranslateByScrollbar(diffy);
										}
									});
								}
							},
						});
					}
				};
				
				var southeast = center.createSouthEast();



				center.createSouth = function() 
				{
					return Ext.widget('panel', {
						border: false,
						height: 20,
						region: 'south',
				
						layout: 'border',
						bodyBorder: false,
						defaults: {
							collapsible: false,
							split: false,
						},

						items: [southcenter, southeast],
					});
				};
				
				var south = center.createSouth();
			}

			me.items.push(center);
			if (me.scroll === 'vertical' || me.scroll === 'both' || me.scroll === 'vertical-auto' || me.scroll === 'auto') me.items.push(east);
			if (me.scroll === 'horizontal' || me.scroll === 'both' || me.scroll === 'horizontal-auto' || me.scroll === 'auto') me.items.push(south);
		 
			me.callParent();
        },
        
	});

}

