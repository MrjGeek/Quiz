Ext.define('Quiz.view.answer.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.answerform',
    title    : 'Quiz',
    layout   : 'fit',
    autoShow : true,
    width    : 400,
    modal    : true,  

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idanswer',
                fieldLabel : 'idanswer',
                itemId     : 'idanswer',
                hidden     : true
            },{
                xtype      : 'textfield',
                name       : 'question_idquestion',
                fieldLabel : 'question_idquestion',
                itemId     : 'question_idquestion',
                hidden     : true
            },{                
                xtype             : 'textfield',
                fieldLabel        : 'Resposta:',
                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank        : false,
                name              : 'title',
                anchor            : '100%',
                labelWidth        : 60,
                margin            : '5 5 5 5'
            },{
                xtype          : 'checkbox',
                inputValue     : 't',
                uncheckedValue : 'f',
                name           : 'is_correct',
                fieldLabel     : 'Resposta Correta:',
            }],
            buttons: [{
                text     : 'Salvar',
                disabled : true,
                formBind : true,
                action   : 'btnSaveAnswer',
                itemId   : 'btnSaveAnswer'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
