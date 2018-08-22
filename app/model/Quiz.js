Ext.define('Quiz.model.Quiz', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idquiz', type: 'int'},
		{name: 'title', type: 'string'}
	],
	idProperty: 'idquiz'
});