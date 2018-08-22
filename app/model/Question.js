Ext.define('Quiz.model.Question', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idquestion', type: 'int'},
		{name: 'title', type: 'string'}, 
		{name: 'type', type: 'string'},
		{name: 'quiz_idquiz', type: 'int'}
	],
	idProperty: 'idquestion'
});