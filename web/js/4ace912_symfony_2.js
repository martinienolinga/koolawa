function symfony(e,b,a,c,d){Ext.Ajax.request({url:_request_scheme+"://"+_http_host+_script_name+"/ajax/"+a+"/"+e+b,method:"POST",params:{args:JSON.stringify(c)},success:function(g){var f=JSON.parse(g.responseText);if(f.message!==undefined&&f.message.error!==""){Ext.MessageBox.show({title:"Koolawa",msg:f.message.error,buttons:Ext.MessageBox.OK,iconCls:"icon-error"});if(f.message.block!==undefined&&f.message.block){return}}d(f)}})};