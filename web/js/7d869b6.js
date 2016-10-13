Ext.onReady(function(){

    var site = (window.location.href.indexOf("admin") > -1)?"./admin/":"./";

    var formListener = {
        specialkey: function (field, e) {
            if (e.getKey() === e.ENTER) {
                fnLoginForm(loginForm);
            }
        }
    };

    var loginForm = Ext.create('Ext.form.Panel',{
        url: site + "login_check",
        renderTo: myWin,
        //frame: true,
        id: 'loginform',
        cls: 'my-form-class',
        defaults: {
            labelWidth: 150,
        },

        bodyStyle: 'padding: 10px 10px 0 10px;',
        standardSubmit: true,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Compte',
            name: '_username',
            allowBlank: false,
            value: $('#_last_username').val(),
            listeners: formListener,
        },{
            xtype: 'textfield',
            inputType: 'password',
            fieldLabel: 'Mot de passe',
            name: '_password',
            allowBlank: false,
            listeners: formListener,
        },{
            xtype: 'checkbox',
            fieldLabel: 'Se souvenir de moi',
            name: '_remember_me',
            checked: false,
            listeners: formListener,
        },{
            xtype: 'hidden',
            name: '_csrf_token',
            value: $('#csrf_token').val(),
        }],
        buttons: [{
            id: 'lf.btn.login',
            text: 'Se connecter',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
                fnLoginForm(loginForm);
            }
        },{
            id: 'lf.btn.reset',
            text: 'Reinitialiser',
            handler: function() {
                fnResetForm(loginForm);
            }
        }]
    });

    var error_message = $('#_error_message').val();
    if (error_message)
    {
        loginForm.title = error_message;
    }

    var myWin = Ext.create('Ext.Window',{
        title: 'Koolawa : Connexion',
        height: null,
        width: 400,
        closable: false,
        items : [ loginForm ]
    });

    myWin.show();
 
});

//Submit login and handler response
function fnLoginForm(theForm)
{
    theForm.getForm().submit({
        success: function(form, action) {
            Ext.Msg.alert('Success', 'Login Successful!', function(btn, text) {
                if (btn == 'ok') {
                    window.location = homeUrl;
                }
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Warning', action.result.errorMessage);
        }
    });
} //end fnLoginForm

function fnResetForm(theForm)
{
    theForm.getForm().reset();
} //end fnResetForm


function symfony(action, entity, controller, args, func) {
    Ext.Ajax.request({
        url: './ajax/' + controller + '/' + action + entity,
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

