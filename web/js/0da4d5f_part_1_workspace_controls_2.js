
Ext.require(['*']);
Ext.onReady(function() {
	
	var datacouleur = [];
	for (i = 1; i <= 32; i++)
	{
	    datacouleur.push({
	        value: 'color' + i,
	        text: 'Couleur ' + i,
	        color: 'x-cal-' + i + '-ad'
	    });
	}

	var storecouleur = Ext.create('Ext.data.Store', {
	    fields: ['value', 'text', 'color'],
	    data: datacouleur
	});
	
	
	Ext.define('Totem.ux.color.Combo', {
        extend: 'Ext.form.field.ComboBox',
        alias: 'widget.ux_colorcombo',

        colorField: 'color',
        displayField: 'text',
        valueField: 'color',

        tpl : Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item">',
            '<span class="{color} color-box-icon"></span>{text}',
            '</div>',
            '</tpl>'
        ),

		fieldSubTpl : [
		    '<div class="{hiddenDataCls}" role="presentation"></div>',
		    '<div>',
		    '<span id="{id}color" class="{[this.getColor(values)]} color-box-icon" style="float: left; position: absolute; margin: 0px 2px 2px 3px;"></span>',
		
		    '<input id="{id}" type="{type}" {inputAttrTpl} class="fieldCls" {typeCls} {editableCls} autocomplete="off"',
		    '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
		    'style="border:none; display:none;"/>',
		    
		    '<span id="{id}span" style="margin-left: 23px;">',
		    '<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',
		    '</span>',
		    
		    '</div>',
		    {
		        compiled: true,
		        disableFormats: true,
		        
		        getColor: function(values) {
		        	var me  = this;
		        	var data = storecouleur.findRecord('text', values.value);
		        	return data.get('color');
		        },
		    }
		],

		initComponent: function() {
			var me = this;
			
			me.store = storecouleur;
			this.callParent(arguments);
			
			me.on('change',
				function(element, newValue) {
				 	var data = me.getStore().findRecord(me.valueField, me.value);
				 	$('#' + me.inputId + 'color').attr('class', data.get(me.colorField) + ' color-box-icon');
					$('#' + me.inputId + 'span').html(data.get(me.displayField));
				}
			);
		},
    });

    Ext.define('Totem.ux.view.GroupingList', {
        extend: 'Ext.view.View',
        alias: 'widget.groupinlist',
        requires: ['Ext.layout.component.BoundList', 'Ext.toolbar.Paging'],
    
        pageSize: 0,
    
        autoScroll: true,
        baseCls: Ext.baseCSSPrefix + 'boundlist',
        listItemCls: '',
        shadow: false,
        trackOver: true,
        refreshed: 0,

        ariaRole: 'listbox',

        componentLayout: 'boundlist',

        renderTpl: ['<div class="list-ct"></div>'],

        initComponent: function() {
            var me = this;
            var baseCls = me.baseCls;
            var itemCls = baseCls + '-item';

            me.itemCls = itemCls;
            me.selectedItemCls = baseCls + '-selected';
            me.overItemCls = baseCls + '-item-over';
            me.itemSelector = "." + itemCls;

            if (me.floating) {
                me.addCls(baseCls + '-floating');
            }
        
            var tpl = [
                '<ul class="ul-x-combobox">',
                    '<tpl for=".">'
            ];
        
            var padding = 1;
        
            if (Ext.isArray(me.groupField)) {           
                padding = me.groupField.length;         
                for (var i = 0; i < me.groupField.length; i++) {                
                    tpl.push(
                        '<tpl if="xindex == 1 || parent[xindex - 2][\'' + me.groupField[i] + '\'] != values[\'' + me.groupField[i] + '\']">',
                            '<li class="x-combo-list-group" style="padding-left:' + (i * 16) + 'px;">{[values["' + me.groupField[i] + '"]]}</li>',
                        '</tpl>'
                    );
                }
            }        
            else {          
                tpl.push(
                    '<tpl if="xindex == 1 || parent[xindex - 2][\'' + me.groupField + '\'] != values[\'' + me.groupField + '\']">',
                        '<li class="x-combo-list-group">{[values["' + me.groupField + '"]]}</li>',
                    '</tpl>'
                );
            }

            tpl.push(
                    '<li role="option" class="' + itemCls + '" style="padding-left:' + (padding * 16) + 'px;">{[values["' + me.displayField + '"]]}</li>',
                    '</tpl>',
                '</ul>'
            );
        
            me.tpl = Ext.create('Ext.XTemplate', tpl);

            if (me.pageSize) {
                me.pagingToolbar = me.createPagingToolbar();
            }

            me.callParent();

            Ext.applyIf(me.renderSelectors, {
                listEl: '.list-ct'
            });
        },

        createPagingToolbar: function() {
            return Ext.widget('pagingtoolbar', {
                pageSize: this.pageSize,
                store: this.store,
                border: false
            });
        },

        onRender: function() {
            var me = this;
            var toolbar = me.pagingToolbar;

            me.callParent(arguments);
            if (toolbar) {
                toolbar.render(me.el);
            }
        },

        bindStore : function(store, initial) {
            var me = this;
            var toolbar = me.pagingToolbar;

            me.callParent(arguments);
            if (toolbar) {
                toolbar.bindStore(store, initial);
            }
        },

        getTargetEl: function() {
            return this.listEl || this.el;
        },

        getInnerTpl: function(displayField) {
            return '{' + displayField + '}';
        },

        refresh: function() {
            var me = this;

            me.callParent();
            if (me.isVisible()) {
                me.refreshed++;
                me.doComponentLayout();
                me.refreshed--;
            }
        },
    
        initAria: function() {
            this.callParent();
        
            var selModel = this.getSelectionModel();
            var mode     = selModel.getSelectionMode();
            var actionEl = this.getActionEl();
        
            if (mode !== 'SINGLE') {
                actionEl.dom.setAttribute('aria-multiselectable', true);
            }
        },

        onDestroy: function() {
            Ext.destroyMembers(this, 'pagingToolbar', 'listEl');
            this.callParent();
        }
    });


    Ext.define('Totem.ux.form.GroupingComboBox', {
        extend: 'Ext.form.field.ComboBox',
        requires: ['Totem.ux.view.GroupingList'],
        alias: ['widget.groupingcombobox', 'widget.groupingcombo'],

        initComponent: function() {
            var me = this;

            if (!me.displayTpl) {
                var display = [],
                    tpl = '<tpl for=".">{0}</tpl>';
                if (Ext.isArray(me.groupField)) {
                    for (var i = 0; i < me.groupField.length; i++) {
                        display.push('{[values["' + me.groupField[i] + '"]]}');
                    }
                }
                else {
                    display.push('{[values["' + me.groupField + '"]]}');
                }
                display.push('{[values["' + me.displayField + '"]]}');
                me.displayTpl = Ext.String.format(tpl, display.join(this.displaySeparator || ' '));
            }
            me.callParent();
        },

        createPicker: function() {
            var me = this,
                picker,
                menuCls = Ext.baseCSSPrefix + 'menu',
                opts = Ext.apply({
                    selModel: {
                        mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                    },
                    floating: true,
                    hidden: true,
                    ownerCt: me.ownerCt,
                    cls: me.el.up('.' + menuCls) ? menuCls : '',
                    store: me.store,
                    groupField: me.groupField,
                    displayField: me.displayField,
                    focusOnToFront: false,
                    pageSize: me.pageSize
                }, me.listConfig, me.defaultListConfig);

            //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
            picker = me.picker = Ext.create('Totem.ux.view.GroupingList', opts);

            me.mon(picker, {
                itemclick: me.onItemClick,
                refresh: me.onListRefresh,
                scope: me
            });

            me.mon(picker.getSelectionModel(), 'selectionchange', me.onListSelectionChange, me);

            return picker;
        }
    });

});
