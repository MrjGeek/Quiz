Ext.define('Quiz.model.Answer', {
	extend : 'Ext.data.Model',
	fields : [
		{name: 'idanswer', type: 'int'},
		{name: 'is_correct', type: 'string'}, 
		{name: 'title', type: 'string'},
		{name: 'question_idquestion', type: 'int'}
	],
	idProperty: 'idquestion'
});