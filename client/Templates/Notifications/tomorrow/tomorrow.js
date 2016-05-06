Template.Tomorrow.onRendered(function() {
	console.log("Tomorrow");	
})

Template.Tomorrow.onCreated(function() {
	let tmpl = this;

	tmpl.autorun(function() {
		tmpl.subscribe('customers.tomorrow');
	});	
	
})



Template.Tomorrow.helpers({
	customers() {
		return Customers.find();
	}
});

Template.Tomorrow.events({
	'click [data-action="sendSMS"]': function (evt,tmpl) {
		Meteor.call('sendMessageForTomorrow', function (error, result) {});
	}
});



