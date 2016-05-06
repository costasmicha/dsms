Template.Profile.onCreated(function () {
	console.log("Profile")
});

Template.Profile.helpers({
	user: function() {
		return Meteor.user();
	}
});

Template.Profile.events({
	'submit form': function(evt,tmpl) {
		evt.preventDefault();

		let first = tmpl.find('input[name=first]').value;
		let last = tmpl.find('input[name=last]').value;
		let phone = tmpl.find('input[name=phone]').value;
		let email = tmpl.find('input[name=email]').value;

		let opts = {
			first: first,
			last: last,
			phone: phone,
			email: email
		}

		Meteor.call('user.update', opts);

		// tmpl.find('form').reset();
	}
});