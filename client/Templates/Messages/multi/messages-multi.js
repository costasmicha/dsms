Template.MessagesMulti.onRendered(function () {
	console.log('MessagesMulti');
	this.$('.ui.dropdown').dropdown({});
	// this.$('.ui.radio.checkbox').checkbox();
})

Template.MessagesMulti.onCreated(function () {
	let tmpl = this;

	tmpl.autorun(function() {
		tmpl.subscribe('customers.all');
	});

});

Template.MessagesMulti.helpers({
	customers: () => Customers.find(),
	customersAllIndex: () => CustomersIndex ,
    inputAttributes: function () {
      return {'type': 'hidden', 'name': 'customer', 'id':'customersFilter', 'placeholder': 'Search...'};
    }	
});

Template.MessagesMulti.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();

		let customers = tmpl.$('#customersFilter').val();
		let text = tmpl.$('textarea[name=text]').val();

		let opts = {
			customers: customers,
			text: text
		}

		console.log(opts);

		Meteor.call('sendMessageToMulti', opts, function (err, result) {
			if (err) sAlert.error(err, {});
			sAlert.success(result, {});			
		});

		tmpl.find('form').reset();

		return false;
	}
});