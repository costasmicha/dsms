Template.EventsNew.onRendered(function () {
	console.log('EventsNew rendered');
});

Template.EventsNew.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	// format: "DD/MM/YYYY, hh:mm a",
    	stepping: 10, //time step
    });
});

Template.EventsNew.onRendered(function() {
    this.$('.ui.dropdown').dropdown({});
});

Template.EventsNew.onCreated(function () {
	let tmpl = this;

	// tmpl.autorun(function() {
		tmpl.subscribe('customers.all');
	// });

});

Template.EventsNew.helpers({
	customers() {
		return Customers.find().fetch();
	},
	appointmentTypes() {
		return ["πρώτο ραντεβού", "λυπομέτρηση", "ραντεβού"];
	},
	durationOptions() {
		return ["μισή ώρα", "1 ώρα", "20΄", "40΄"];
	}
});

Template.EventsNew.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();

		let customer = tmpl.$('#customer').val();
		let type = tmpl.$('#appointmentTypes').val();
		let duration = tmpl.$('#duration').val();
		let start = tmpl.$('input[name=start]').val();
		let startDate = new Date(start);

		let opts = {
			customer: customer,
			type: type,
			duration : duration,
			startAt: startDate
		}

		Meteor.call('events.insert', opts);

		tmpl.find('form').reset();

		return false;
	}
});




















