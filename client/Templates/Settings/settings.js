Template.Settings.onCreated(function () {
	let tmpl = this;

	tmpl.autorun(function() {
		tmpl.subscribe('users');
	});

});

Template.Settings.helpers({
	user: function() {
		return Meteor.user();
	},
	people: function() {
		return Meteor.users.find();
	}	
});

Template.Settings.events({
	'submit form#sender': function (evt, tmpl) {
		evt.preventDefault();

		let fromName = tmpl.find('input[name=fromName]').value;

		const MinOneMaxEleven = Match.Where(function (x) {
			check(x, String);
			return x.length > 1 && x.length < 12;
		});

		const AlphaNumeric = Match.Where(function(str){
			check(str, String);
			var regexp = /^[a-z0-9]+$/i;
			return regexp.test(str);
		});


		let isCorrectLength = Match.test(fromName, MinOneMaxEleven);
		let isCorrectType = Match.test(fromName, AlphaNumeric);


		console.log(isCorrectLength);
		console.log(isCorrectType);

		if (isCorrectLength && isCorrectType) {
			Meteor.call('user.update.from', fromName);
		} else {
			alert("Check the rules please");
		}


	},
	'click [data-action="makeAdmin"]': function(evt,tmpl) {
		evt.preventDefault();
		var user = this._id;
		Meteor.call('makeAdmin', user);
	},
	'click [data-action="removeAdmin"]': function(evt,tmpl) {
		evt.preventDefault();
		var user = this._id;
		Meteor.call('removeAdmin', user);
	},
	'click [data-action="deleteUser"]': function(evt,tmpl) {
		evt.preventDefault();
		var user = this._id;
		Meteor.call('deleteUser', user);
	}	
});

