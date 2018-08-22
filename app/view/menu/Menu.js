Ext.define('Quiz.view.menu.Menu', {
	extend : 'Ext.container.Viewport',
	extend : 'Ext.toolbar.Toolbar',
	alias  : 'widget.menu',
	region : 'north',
	items  : [{ 
        xtype : 'button',
        text  : 'Quiz',
        menu  : Ext.create('Ext.menu.Menu',{
            items: [{
                text    : 'Quiz',
                action  : 'btnQuiz'
            },{
                text    : 'Relatório',
                action  : 'btnReport'
            }]
        })    	
    }]
});