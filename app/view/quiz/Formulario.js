Ext.define('Quiz.view.quiz.Formulario', {
    extend   : 'Ext.window.Window',
    alias    : 'widget.quizform',
    title    : 'Quiz',
    layout   : 'fit',
    autoShow : true,
    width    : 400,
    modal    : true,  
    requires : ['Quiz.view.question.Grid'], 

    initComponent: function() {

        this.items = [{
            xtype  : 'form',      
            layout : 'anchor',
            items  : [{
                xtype      : 'textfield',
                name       : 'idquiz',
                fieldLabel : 'idquiz',
                itemId     : 'idquiz',
                hidden     : true
            },{
                xtype             : 'textfield',
                fieldLabel        : 'Titulo:',
                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                allowBlank        : false,
                name              : 'title',
                anchor            : '100%',
                labelWidth        : 60,
                margin            : '5 5 5 5'                                                
            },{
                xtype  : 'fieldset',
                title  : 'Questões',
                itemId : 'questionfset',
                margin : '5 5 5 5',
                hidden : true,
                items  : [{
                    xtype  : 'questiongrid'
                }]
            }],
            buttons: [{
                text     : 'Salvar e Prosseguir',
                disabled : true,
                formBind : true,
                action   : 'btnSaveQuiz',
                itemId   : 'btnSaveQuiz'
            },{
                text    : 'Cancelar',
                scope   : this,
                handler : this.close
            }]
        }];
        this.callParent(arguments);
    }
});
