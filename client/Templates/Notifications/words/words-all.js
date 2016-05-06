Template.WordsAll.onCreated(function () {
	let tmpl = this;

	tmpl.autorun(function() {
		tmpl.subscribe('words.all');
	});

});

Template.WordsAll.helpers({
	words() {
		return Words.find();
	}
});

Template.WordsAll.events({
	'click [data-action="showActions"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = '#' + this._id;
		tmpl.$(id).dimmer('toggle');
	},	
	'click [data-action="deleteWord"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('words.delete', id);
	},
	'click [data-action="selectedWord"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('words.toggleSelected', id, true);
	},
	'click [data-action="unSelectWord"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('words.toggleSelected', id, false);
	}
});