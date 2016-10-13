function symfony(action, entity, controller, args, func) {
    Ext.Ajax.request({
        //url: '/ajax/' + controller + '/' + action + entity,
        url: _request_scheme + '://' + _http_host + _script_name + '/ajax/' + controller + '/' + action + entity,
        method: 'POST',
        params: {
            args: JSON.stringify(args)
        },

        success: function(response) {
            var objet = JSON.parse(response.responseText);

            if (objet.message !== undefined && objet.message.error !== '')
            {
                Ext.MessageBox.show({
                    title:'Koolawa',
                    msg: objet.message.error,
                    buttons: Ext.MessageBox.OK,
                    iconCls: 'icon-error'
                });

                if (objet.message.block !== undefined && objet.message.block)
                {
                    return;
                }
            }

            func(objet);
        }
    });
}

