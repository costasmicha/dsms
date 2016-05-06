Template.MessagesOne.onRendered(function () {
	this.$('.ui.dropdown').dropdown({});
})

Template.MessagesOne.helpers({
	customersIndex: () => CustomersIndex ,
    inputAttributesOld: function () {
      return {'type': 'text', 'name': 'customer'};
    },
    inputAttributes: function () {
      return {'type': 'hidden', 'name': 'customer', 'id':'customersFilter'};
    }
});

Template.MessagesOne.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();
		// let customer = tmpl.$('#customer').val();
		let text = tmpl.$('textarea[name=text]').val().trim();
		var customer = tmpl.$('#customersFilter').val();

		let opts = {
			customer: customer,
			text: text
		}
		console.log(opts)

		Meteor.call('sendMessageToPerson', opts, function (err, response) {
			// alert(response.message);
			if (err) sAlert.error('Error sending SMS.', {});
			sAlert.success('SMS sent successfully.', {});
		});

		tmpl.find('form').reset();
		return false;
	}
});