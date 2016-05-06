Template.CustomerDetail.onCreated(function() {
	let tmpl = this;
	tmpl.EventsCount = new ReactiveVar;

	let id = FlowRouter.getParam('_id');

	tmpl.autorun(function() {
		tmpl.subscribe('customer.detail', id);
	});
});

Template.CustomerDetail.onRendered(function() {
	let tmpl = this;
	let id = FlowRouter.getParam('_id');
	Meteor.call('getTotalAppointments', id, function (err, result) {
		if (err) console.log(err);
		console.log(result);
		tmpl.EventsCount.set(result);
	});
});

Template.CustomerDetail.helpers({
	customer() {
		return Customers.findOne({});
	},
	nextEvent() {
		return Events.findOne({});
	},
	eventsCount() {
		return Template.instance().EventsCount.get();
	}
});

Template.CustomerDetail.events({
	'click [data-action="delete"]': function (evt,tmpl) {
		evt.preventDefault();
		Meteor.call('customers.delete',this._id, function(err, result) {
			if (err) console.log(err);

			FlowRouter.go('customers.all');
		})
	}
});