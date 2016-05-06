// Template.Customers.onRendered(function () {
// 	console.log('Customers rendered');
// });

Template.Customers.onCreated(function () {
	let tmpl = this;

	tmpl.autorun(function() {
		tmpl.subscribe('customers.all');
	});

});

Template.Customers.helpers({
	customersCount: () => Customers.find().count(),
	customers: () => Customers.find(),
	customersAllIndex: () => CustomersIndex ,
    inputAttributes: function () {
      return {'type': 'text', 'name': 'customer', 'placeholder': 'Search...'};
    }	
});


Template.Customers.events({
	'click [data-action="seed"]': function (evt,tmpl) {
		Meteor.call('dev.seed', (err,res) => {
			if (err) console.log(err);
			console.log(res);
		});
	}
});




















