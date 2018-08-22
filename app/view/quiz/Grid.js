Ext.define('Quiz.view.quiz.Grid' ,{
    extend   : 'Ext.window.Window',
    alias    : 'widget.quizgrid',   
    title    : 'Quiz',
    layout   : 'fit',
    autoShow : true,
    width    : 500,
    height   : 300,
    modal    : true, 

    initComponent: function() {       

        this.items = [{
            xtype      : 'grid',
            store      : 'Quiz',
            viewConfig : {
                preserveScrollOnRefresh : true,
            },            
            columns: [{
                header    : "ID",
                dataIndex : 'idquiz',
                width     : 50
            },{
                header    : "Titulo",
                flex      : 1,
                dataIndex : 'title'
            }]
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text    : 'Adicionar',
                action  : 'btnAddQuiz'
            },{
                text    : 'Editar',
                action  : 'btnEditQuiz'
            },{
                text    : 'Excluir',
                action  : 'btnDelQuiz'
            }]
        }];
        
        this.callParent(arguments);
    }
});