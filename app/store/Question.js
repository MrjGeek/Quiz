Ext.define('Quiz.store.Question', {
    extend: 'Ext.data.Store',
    model: 'Quiz.model.Question',    
    proxy: {
        type   : 'rest',
        url    : 'php/question.php',
        reader : {
            type            : 'json',
            root            : 'question',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'question',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Questão '+obj.action+'da com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Questão!');               
            }
        }
    }      
});