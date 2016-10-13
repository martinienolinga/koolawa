Ext.require(["*"]);Ext.onReady(function(){var a=[];for(i=1;i<=32;i++){a.push({value:"color"+i,text:"Couleur "+i,color:"x-cal-"+i+"-ad"})}var b=Ext.create("Ext.data.Store",{fields:["value","text","color"],data:a});Ext.define("Totem.ux.color.Combo",{extend:"Ext.form.field.ComboBox",alias:"widget.ux_colorcombo",colorField:"color",displayField:"text",valueField:"color",tpl:Ext.create("Ext.XTemplate",'<tpl for=".">','<div class="x-boundlist-item">','<span class="{color} color-box-icon"></span>{text}',"</div>","</tpl>"),fieldSubTpl:['<div class="{hiddenDataCls}" role="presentation"></div>',"<div>",'<span id="{id}color" class="{[this.getColor(values)]} color-box-icon" style="float: left; position: absolute; margin: 0px 2px 2px 3px;"></span>','<input id="{id}" type="{type}" {inputAttrTpl} class="fieldCls" {typeCls} {editableCls} autocomplete="off"','<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>','style="border:none; display:none;"/>','<span id="{id}span" style="margin-left: 23px;">','<tpl if="value">{[Ext.util.Format.htmlEncode(values.value)]}</tpl>',"</span>","</div>",{compiled:true,disableFormats:true,getColor:function(c){var d=this;var e=b.findRecord("text",c.value);return e.get("color")}}],initComponent:function(){var c=this;c.store=b;this.callParent(arguments);c.on("change",function(d,f){var e=c.getStore().findRecord(c.valueField,c.value);$("#"+c.inputId+"color").attr("class",e.get(c.colorField)+" color-box-icon");$("#"+c.inputId+"span").html(e.get(c.displayField))})}});Ext.define("Totem.ux.view.GroupingList",{extend:"Ext.view.View",alias:"widget.groupinlist",requires:["Ext.layout.component.BoundList","Ext.toolbar.Paging"],pageSize:0,autoScroll:true,baseCls:Ext.baseCSSPrefix+"boundlist",listItemCls:"",shadow:false,trackOver:true,refreshed:0,ariaRole:"listbox",componentLayout:"boundlist",renderTpl:['<div class="list-ct"></div>'],initComponent:function(){var f=this;var e=f.baseCls;var g=e+"-item";f.itemCls=g;f.selectedItemCls=e+"-selected";f.overItemCls=e+"-item-over";f.itemSelector="."+g;if(f.floating){f.addCls(e+"-floating")}var c=['<ul class="ul-x-combobox">','<tpl for=".">'];var h=1;if(Ext.isArray(f.groupField)){h=f.groupField.length;for(var d=0;d<f.groupField.length;d++){c.push("<tpl if=\"xindex == 1 || parent[xindex - 2]['"+f.groupField[d]+"'] != values['"+f.groupField[d]+"']\">",'<li class="x-combo-list-group" style="padding-left:'+(d*16)+'px;">{[values["'+f.groupField[d]+'"]]}</li>',"</tpl>")}}else{c.push("<tpl if=\"xindex == 1 || parent[xindex - 2]['"+f.groupField+"'] != values['"+f.groupField+"']\">",'<li class="x-combo-list-group">{[values["'+f.groupField+'"]]}</li>',"</tpl>")}c.push('<li role="option" class="'+g+'" style="padding-left:'+(h*16)+'px;">{[values["'+f.displayField+'"]]}</li>',"</tpl>","</ul>");f.tpl=Ext.create("Ext.XTemplate",c);if(f.pageSize){f.pagingToolbar=f.createPagingToolbar()}f.callParent();Ext.applyIf(f.renderSelectors,{listEl:".list-ct"})},createPagingToolbar:function(){return Ext.widget("pagingtoolbar",{pageSize:this.pageSize,store:this.store,border:false})},onRender:function(){var d=this;var c=d.pagingToolbar;d.callParent(arguments);if(c){c.render(d.el)}},bindStore:function(c,d){var f=this;var e=f.pagingToolbar;f.callParent(arguments);if(e){e.bindStore(c,d)}},getTargetEl:function(){return this.listEl||this.el},getInnerTpl:function(c){return"{"+c+"}"},refresh:function(){var c=this;c.callParent();if(c.isVisible()){c.refreshed++;c.doComponentLayout();c.refreshed--}},initAria:function(){this.callParent();var c=this.getSelectionModel();var e=c.getSelectionMode();var d=this.getActionEl();if(e!=="SINGLE"){d.dom.setAttribute("aria-multiselectable",true)}},onDestroy:function(){Ext.destroyMembers(this,"pagingToolbar","listEl");this.callParent()}});Ext.define("Totem.ux.form.GroupingComboBox",{extend:"Ext.form.field.ComboBox",requires:["Totem.ux.view.GroupingList"],alias:["widget.groupingcombobox","widget.groupingcombo"],initComponent:function(){var e=this;if(!e.displayTpl){var f=[],c='<tpl for=".">{0}</tpl>';if(Ext.isArray(e.groupField)){for(var d=0;d<e.groupField.length;d++){f.push('{[values["'+e.groupField[d]+'"]]}')}}else{f.push('{[values["'+e.groupField+'"]]}')}f.push('{[values["'+e.displayField+'"]]}');e.displayTpl=Ext.String.format(c,f.join(this.displaySeparator||" "))}e.callParent()},createPicker:function(){var e=this,c,f=Ext.baseCSSPrefix+"menu",d=Ext.apply({selModel:{mode:e.multiSelect?"SIMPLE":"SINGLE"},floating:true,hidden:true,ownerCt:e.ownerCt,cls:e.el.up("."+f)?f:"",store:e.store,groupField:e.groupField,displayField:e.displayField,focusOnToFront:false,pageSize:e.pageSize},e.listConfig,e.defaultListConfig);c=e.picker=Ext.create("Totem.ux.view.GroupingList",d);e.mon(c,{itemclick:e.onItemClick,refresh:e.onListRefresh,scope:e});e.mon(c.getSelectionModel(),"selectionchange",e.onListSelectionChange,e);return c}})});