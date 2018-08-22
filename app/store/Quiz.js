Ext.define('Quiz.store.Quiz', {
    extend: 'Ext.data.Store',
    model: 'Quiz.model.Quiz',    
    proxy: {
        type   : 'rest',
        url    : 'php/quiz.php',
        reader : {
            type            : 'json',
            root            : 'quiz',
            successProperty : 'success'
        },
        writer: {
            type            : 'json',
            root            : 'quiz',
            writeAllFields  : true,
            encode          : true,
            successProperty : 'success'
        }
    },
    listeners: {        
        write: function(proxy, operation){
            var obj = Ext.decode(operation.response.responseText);                       
            if (obj.success) {
                Ext.Msg.alert('Sucesso!', 'Quiz '+obj.action+'do com Sucesso!');                
            }
            else {
                Ext.Msg.alert('Erro', 'Problema ao '+obj.action+'r Quiz!');               
            }
        }
    }    
});