Ext.define('Quiz.view.question.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.questionform',
    title    : 'Quiz',
    layout   : 'fit',
    autoShow : true,
    width    : 400,
    modal    : true,  
    requires : ['Quiz.view.answer.Grid'], 

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idquestion',
                fieldLabel : 'idquestion',
                itemId     : 'idquestion',
                hidden     : true
            },{
                xtype      : 'textfield',
                name       : 'quiz_idquiz',
                fieldLabel : 'quiz_idquiz',
                itemId     : 'quiz_idquiz',
                hidden     : true
            },{                
                xtype             : 'textfield',
                fieldLabel        : 'Questão:',
                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank        : false,
                name              : 'title',
                anchor            : '100%',
                labelWidth        : 60,
                margin            : '5 5 5 5'
            },{
                xtype  : 'container',
                layout : 'hbox',
                margin : '5 5 5 5',
                items  : [{
                    xtype      : 'radio',
                    name       : 'type',
                    inputValue : 'multi',
                    fieldLabel : 'Multipla Escolha',
                    margin     : '0 10 0 0',
                    value      : true
                },{
                    xtype      : 'radio',
                    name       : 'type',
                    inputValue : 'single',
                    fieldLabel : 'Escolha Unica',
                    margin     : '0 0 0 10'
                }]
            },{
                xtype  : 'fieldset',
                title  : 'Respostas',
                itemId : 'answerfset',
                margin : '5 5 5 5',
                hidden : true,
                items  : [{
                    xtype  : 'answergrid'
                }]
            }],
            buttons: [{
                text     : 'Salvar e Prosseguir',
                disabled : true,
                formBind : true,
                action   : 'btnSaveQuestion',
                itemId   : 'btnSaveQuestion'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
