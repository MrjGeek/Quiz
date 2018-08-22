Ext.define('QuizModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idquiz', type: 'int'},
        {name: 'title', type: 'string'}
    ]
});

var Quiz = Ext.create('Ext.data.Store', {
    model    : 'QuizModel',    
    autoLoad : true,
    proxy    : {
        type   : 'rest',
        url    : 'php/quiz.php',
        reader : {
            type            : 'json',
            root            : 'quiz',
            successProperty : 'success'
        }
    }   
});


Ext.create('Ext.window.Window', {  
    alias     : 'widget.main',
    layout    : 'fit',
    autoShow  : true,
    maximized : true,
    modal     : true,   
    resizable : false,
    header    : false,
    closable  : false,
    style     : 'padding: 0; border-width: 0;',
    items     : [{
        xtype      : 'grid',
        store      : Quiz,
        anchor     : '100%',
        flex       : 1,        
        width      : '100%',   
        viewConfig : {
            preserveScrollOnRefresh : true,
        },            
        columns: [{
            header    : "ID",
            dataIndex : 'idquiz',
            width    : 50
        },{
            header    : "Titulo",
            width     : '100%',
            dataIndex : 'title',
            width    : 500
        },{
            header : "Responder",
            xtype  :'actioncolumn',
            align  : 'center',
            width    : 100,
            items  : [{
                icon    : 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Edit-16.png',
                tooltip : 'Responder',
                handler : function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var win = Ext.create('Ext.window.Window', { 
                        modal : true,  
                        width : 600, 
                        title : 'Quiz código: '+rec.data.idquiz,
                        items : [{
                            xtype  : 'form',      
                            layout : 'anchor',
                            url    : 'php/saveAnswersUser.php',
                            items  : [{
                                xtype             : 'textfield',
                                fieldLabel        : 'Nome:',
                                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                                allowBlank        : false,
                                name              : 'name',
                                itemId            : 'name',
                                anchor            : '100%',
                                margin            : '5 5 5 5'                       
                            },{
                                xtype             : 'textfield',
                                fieldLabel        : 'E-mail:',
                                afterLabelTextTpl : '<span style="color:red;font-weight:bold" data-qtip="Obrigatório">*</span>',
                                allowBlank        : false,
                                name              : 'email',
                                itemId            : 'email',
                                anchor            : '100%',
                                margin            : '5 5 5 5'      
                            },{                        
                                xtype  : 'textfield',
                                name   : 'hourquizbegin',
                                itemId : 'hourquizbegin',
                                anchor : '100%',
                                hidden : true,
                                margin : '5 5 5 5'                       
                            },{
                                xtype  : 'textfield',
                                name   : 'datequizbegin',
                                itemId : 'datequizbegin',
                                anchor : '100%',
                                hidden : true,
                                margin : '5 5 5 5'                                      
                            }],                            
                            buttons: [{
                                text   : 'Terminar',
                                itemId : 'btnFinish',
                                hidden : true,
                                listeners: {
                                    click: function (button) {
                                        var win  = button.up('window');
                                        var form = win.down('form');
                                        form.submit({
                                            success: function (form, action) {
                                               Ext.Msg.alert('Atenção', 'Você acertou '+action.result.correct+' questões');                      
                                               win.close();                          
                                            }
                                        });
                                    }
                                }
                            },{
                                text     : 'Começar',
                                disabled : true,
                                formBind : true,
                                listeners: {
                                    click: function (button) {
                                        var box = Ext.MessageBox.wait('Buscando Questões', 'Aguarde');

                                        Ext.Ajax.request({
                                            url    : 'php/searchQuestions.php',
                                            method : 'post',
                                            params : {
                                                idquiz: rec.data.idquiz
                                            },
                                            success: function (response) {
                                                var resposta = Ext.JSON.decode(response.responseText);                   
                                                var win  = button.up('window');
                                                var form = win.down('form');
                                                var hourquizbegin = resposta.hourquizbegin;
                                                var datequizbegin = resposta.datequizbegin;

                                                for (q = 0; q < resposta.question.length; q++) {
                                                    if (resposta.question[q].type == 'multi') {
                                                        var respostas = [];

                                                        for (a = 0; a < resposta.question[q].answer.length; a++) {
                                                            respostas[a] =  { 
                                                                boxLabel: resposta.question[q].answer[a].title, 
                                                                name: 'rb_'+resposta.question[q].idquestion, 
                                                                inputValue: resposta.question[q].answer[a].idanswer 
                                                            };
                                                        }

                                                        var txt  = Ext.create('Ext.form.RadioGroup', { 
                                                            fieldLabel : resposta.question[q].title,
                                                            labelAlign : 'top',
                                                            flex       : 1,
                                                            width      : '100%',
                                                            margin     : '5 5 5 5',
                                                            vertical   : true,
                                                            columns    : 1,
                                                            items      : respostas,
                                                            name       : resposta.question[q].idquestion
                                                        }); 
                                                    }
                                                    else {
                                                        var txt  = Ext.create('Ext.form.field.Text', { 
                                                            fieldLabel : resposta.question[q].title,
                                                            labelAlign : 'top',
                                                            flex       : 1,
                                                            width      : '100%',
                                                            margin     : '5 5 5 5',
                                                            name       : resposta.question[q].idquestion
                                                        });                                                        
                                                    }
                                                    form.add(txt);
                                                }

                                                
                                                win.down('#btnFinish').setVisible(true);
                                                win.down('#name').setVisible(false);
                                                win.down('#email').setVisible(false);
                                                win.down('#hourquizbegin').setValue(hourquizbegin);
                                                win.down('#datequizbegin').setValue(datequizbegin);
                                                button.setVisible(false);
                                                win.center();

                                                box.hide();
                                            },
                                            failure: function () {
                                                alert('Tente mais tarde!');
                                                box.hide();
                                            }
                                        });
                                    }
                                }
                            }]
                        }]
                    });
                    win.show();
                }
            }]        
        }],
        dockedItems:[{
            xtype: 'toolbar',
            items: ['->',{
                text    : 'Área Restrita',
                listeners: {
                    click: function() {
                        window.location = 'login.php';
                    }
                }
            }]
        }]
    }]  
});