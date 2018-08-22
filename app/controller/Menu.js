Ext.define('Quiz.controller.Menu', {
    extend: 'Ext.app.Controller',
    stores: ['Quiz'],
    init: function() {
        this.control({
            'menu menuitem[action=btnQuiz]': {
                click: this.openQuiz
            },  
            'menu menuitem[action=btnReport]': {
                click: this.openReport
            }                                                            
        });
    },

    openQuiz: function() {
        Ext.create('Quiz.view.quiz.Grid').show();
        this.getQuizStore().load();
    },

    openReport: function() {
        alert('abrir Relatorios');
    }
});