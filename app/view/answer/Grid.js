Ext.define('Quiz.view.answer.Grid' ,{
    extend     : 'Ext.grid.Panel',
    alias      : 'widget.answergrid',   
    store      : 'Answer',
    height     : 300,
    flex       : 1,
    width      : '100%',
    viewConfig : {
        preserveScrollOnRefresh : true,
    },     

    initComponent: function() {       

        this.columns = [{
            header    : "ID",
            dataIndex : 'idanswer',
            width     : 50
        },{
            header    : "Resposta",
            flex      : 1,
            dataIndex : 'title'
        },{
            header    : "Correta",
            dataIndex : 'is_correct'
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text    : 'Adicionar',
                action  : 'btnAddAnswer'
            },{
                text    : 'Editar',
                action  : 'btnEditAnswer'
            },{
                text    : 'Excluir',
                action  : 'btnDelAnswer'
            }]
        }];
        
        this.callParent(arguments);
    }
});