Ext.define('Quiz.view.Viewport', {
    extend   : 'Ext.container.Viewport',
    layout   : 'border',
    requires : ['Quiz.view.menu.Menu'],
    items    : [{
        xtype    : 'menu',
        renderTo : Ext.getBody(),
    }] 
});
