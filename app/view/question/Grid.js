Ext.define('Quiz.view.question.Grid' ,{
    extend     : 'Ext.grid.Panel',
    alias      : 'widget.questiongrid',   
    store      : 'Question',
    height     : 300,
    flex       : 1,
    width      : '100%',
    viewConfig : {
        preserveScrollOnRefresh : true,
    },     

    initComponent: function() {       

        this.columns = [{
            header    : "ID",
            dataIndex : 'idquestion',
            width     : 50
        },{
            header    : "Questão",
            flex      : 1,
            dataIndex : 'title'
        },{
            header    : "Tipo",
            dataIndex : 'type'
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text    : 'Adicionar',
                action  : 'btnAddQuestion'
            },{
                text    : 'Editar',
                action  : 'btnEditQuestion'
            },{
                text    : 'Excluir',
                action  : 'btnDelQuestion'
            }]
        }];
        
        this.callParent(arguments);
    }
});