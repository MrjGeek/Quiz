Ext.define('Quiz.controller.Quiz', {
    extend: 'Ext.app.Controller',
    stores: ['Quiz', 'Question', 'Answer'],
    init: function() {
        this.control({
            'quizgrid button[action=btnAddQuiz]': {
                click: this.addQuiz
            },  
            'quizgrid button[action=btnEditQuiz]': {
                click: this.editQuiz
            },  
            'quizgrid button[action=btnDelQuiz]': {
                click: this.delQuiz
            },                          
            'quizform button[action=btnSaveQuiz]': {
                click: this.saveQuiz
            },    
            //-------------------------------------
            'questiongrid button[action=btnAddQuestion]': {
                click: this.addQuestion
            }, 
            'questiongrid button[action=btnEditQuestion]': {
                click: this.editQuestion
            }, 
            'questiongrid button[action=btnDelQuestion]': {
                click: this.delQuestion
            },                         
            'questionform button[action=btnSaveQuestion]': {
                click: this.saveQuestion
            },  
            //-------------------------------------
            'answergrid button[action=btnAddAnswer]': {
                click: this.addAnswer
            }, 
            'answergrid button[action=btnEditAnswer]': {
                click: this.editAnswer
            }, 
            'answergrid button[action=btnDelAnswer]': {
                click: this.delAnswer
            },                         
            'answerform button[action=btnSaveAnswer]': {
                click: this.saveAnswer
            },       
                                                                                    
        });
    },

    addQuiz: function() {
        Ext.create('Quiz.view.quiz.Formulario').show();
        this.getQuestionStore().loadData([],false);     
    },

    editQuiz: function() {
        var grid   = Ext.ComponentQuery.query('quizgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Quiz.view.quiz.Formulario').show();
            win.down('form').loadRecord(record[0]);
            Ext.ComponentQuery.query('quizform #questionfset')[0].setVisible(true);
            Ext.ComponentQuery.query('quizform #btnSaveQuiz')[0].setText('Salvar');
            this.getQuestionStore().load({
                params: {
                    quiz_idquiz: record[0].data.idquiz
                }
            });
            win.center();
        }
    },

    delQuiz: function () {
        var grid   = Ext.ComponentQuery.query('quizgrid')[0].down('grid');
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }      
        else {
            Ext.Msg.show({
                title   : 'Confirmação',
                msg     : 'Tem certeza que deseja deletar o registro selecionado?',
                buttons : Ext.Msg.YESNO,
                icon    : Ext.MessageBox.QUESTION,
                scope   : this,
                width   : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getQuizStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    saveQuiz: function(button) {
        var win           = button.up('window');
        var form          = win.down('form');        
        var values        = form.getValues();
        var store         = this.getQuizStore();

        if (values.idquiz > 0) {
            var record = store.findRecord('idquiz', values.idquiz, 0, false, true, true);
            record.set(values);
        }
        else {
            var record = Ext.create('Quiz.model.Quiz');
            record.set(values);
            store.add(record);          
        }            

        store.sync({
            success: function() {                           
                idquiz = parseInt(store.getProxy().getReader().rawData.quiz.idquiz); 
                if (values.idquiz == 0) {
                    Ext.ComponentQuery.query('quizform #idquiz')[0].setValue(idquiz);
                    Ext.ComponentQuery.query('quizform #questionfset')[0].setVisible(true);
                    Ext.ComponentQuery.query('quizform #btnSaveQuiz')[0].setText('Salvar');
                    win.center();
                }
                store.load();
            }
        });    

        if (values.idquiz > 0) {
            win.close();
        }
    },

    addQuestion: function() {
        var idquiz = Ext.ComponentQuery.query('quizform #idquiz')[0].getValue();
        Ext.create('Quiz.view.question.Formulario').show();
        Ext.ComponentQuery.query('questionform #quiz_idquiz')[0].setValue(idquiz);
        this.getAnswerStore().loadData([],false);         
    },

    editQuestion: function() {
        var grid   = Ext.ComponentQuery.query('questiongrid')[0];
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Quiz.view.question.Formulario').show();
            win.down('form').loadRecord(record[0]);
            Ext.ComponentQuery.query('questionform #answerfset')[0].setVisible(true);
            Ext.ComponentQuery.query('questionform #btnSaveQuestion')[0].setText('Salvar');
            this.getAnswerStore().load({
                params: {
                    question_idquestion: record[0].data.idquestion
                }
            });
            win.center();
        }
    },

    delQuestion: function () {
        var grid   = Ext.ComponentQuery.query('questiongrid')[0];
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }      
        else {
            Ext.Msg.show({
                title   : 'Confirmação',
                msg     : 'Tem certeza que deseja deletar o registro selecionado?',
                buttons : Ext.Msg.YESNO,
                icon    : Ext.MessageBox.QUESTION,
                scope   : this,
                width   : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getQuestionStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },


    saveQuestion: function(button) {
        var win         = button.up('window');
        var form        = win.down('form');        
        var values      = form.getValues();
        var store       = this.getQuestionStore();

        if (values.idquestion > 0) {
            var record = store.findRecord('idquestion', values.idquestion, 0, false, true, true);
            record.set(values);
        }
        else {
            var record = Ext.create('Quiz.model.Question');
            record.set(values);
            store.add(record);          
        }            

        store.sync({
            success: function() {                           
                idquestion = parseInt(store.getProxy().getReader().rawData.question.idquestion); 
                if (values.idquestion == 0) {
                    Ext.ComponentQuery.query('questionform #idquestion')[0].setValue(idquestion);
                    Ext.ComponentQuery.query('questionform #answerfset')[0].setVisible(true);
                    Ext.ComponentQuery.query('questionform #btnSaveQuestion')[0].setText('Salvar');
                    win.center();
                }
                store.load({
                    params: {
                        quiz_idquiz: values.quiz_idquiz
                    }
                });
            }
        });    

        if (values.idquestion > 0) {
            win.close();
        }
    },    

    addAnswer: function() {
        var idquestion = Ext.ComponentQuery.query('questionform #idquestion')[0].getValue();
        Ext.create('Quiz.view.answer.Formulario').show();
        Ext.ComponentQuery.query('answerform #question_idquestion')[0].setValue(idquestion); 
    },

    editAnswer: function() {
        var grid   = Ext.ComponentQuery.query('answergrid')[0];
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }
        else {
            var win = Ext.create('Quiz.view.answer.Formulario').show();
            win.down('form').loadRecord(record[0]);
        }
    },

    delAnswer: function () {
        var grid   = Ext.ComponentQuery.query('answergrid')[0];
        var record = grid.getSelectionModel().getSelection(); 

        if (record.length === 0) {
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }      
        else {
            Ext.Msg.show({
                title   : 'Confirmação',
                msg     : 'Tem certeza que deseja deletar o registro selecionado?',
                buttons : Ext.Msg.YESNO,
                icon    : Ext.MessageBox.QUESTION,
                scope   : this,
                width   : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getAnswerStore();
                        store.remove(record);      
                        store.sync();
                    }
                }
            });
        }
    },

    saveAnswer: function(button) {
        var win    = button.up('window');
        var form   = win.down('form');        
        var record = form.getRecord();
        var values = form.getValues();
        var store  = this.getAnswerStore();

        if (values.idanswer > 0) {           
            record.set(values);
        }
        else {
            record = Ext.create('Quiz.model.Answer');
            record.set(values);
            store.add(record);          
        }            

        store.sync();    
        win.close();        
    },      
});