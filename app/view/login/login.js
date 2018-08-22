Ext.create('Ext.window.Window', {  
    alias     : 'widget.loginform',
    layout    : 'fit',
    autoShow  : true,
    width     : 300,
    modal     : true,   
    resizable : false,
    header    : false,
    style     : 'padding: 0; border-width: 0;',
    items     : [{
        xtype  : 'form',      
        layout : 'anchor',
        border   : false,
        items  : [{        
            xtype      : 'textfield',
            name       : 'user',
            blankText  : 'Preencha este campo com seu Usuário.',
            emptyText  :' Usuário',
            flex       : 1,
            id         :'user',
            itemId     :'user',
            anchor     : '100%',
            margin     : '5 5 5 5',
            allowBlank : false
        },{
            xtype      : 'textfield',
            emptyText  :' Senha',
            name       : 'password',
            itemId     : 'password',
            flex       : 1,      
            margin     : '5 5 5 5',
            anchor     : '100%',
            inputType  : 'password',
            blankText  : 'Preencha este campo com sua Senha',        
            allowBlank : false
        },{                          
            xtype    : 'button',
            text     : 'Entrar',
            id       : 'login',
            flex     : 1, 
            anchor   : '100%',
            disabled : true,
            formBind : true, 
            margin   : '5 5 5 5',
            handler  : function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    var values = form.getValues();
                    Ext.Ajax.request({
                        url: 'php/login.php',
                        params: {
                            user     : values.user,
                            password : values.password
                        },
                        success: function(response) { 
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                location.reload();
                            }
                            else {
                                Ext.Msg.alert('Atenção', 'Usuário ou senha incorretos. Tente novamente')
                            }
                        },
                        failure: function() {                                                    
                            Ext.Msg.alert('Atenção', 'Não foi possivel validar suas informações. Tente novamente mais tarde.')
                        }
                    });
                }
            }
        }] 
    }]  
});