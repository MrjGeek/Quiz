Ext.define('Quiz.store.Answer', {
    extend: 'Ext.data.Store',
    model: 'Quiz.model.Answer',    
    proxy: {
        type   : 'rest',
        url    : 'php/answer.php',
        reader : {
            type            : 'json',
            root            : 'answer',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'answer',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Resposta '+obj.action+'da com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Resposta!');               
            }
        }
    }      
});