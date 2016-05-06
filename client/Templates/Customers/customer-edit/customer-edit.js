Template.CustomerEdit.onCreated(function() {
	console.log('customer detail');

	let tmpl = this;
	let id = FlowRouter.getParam('_id');

	tmpl.autorun(function() {
		tmpl.subscribe('customer.detail', id);
	});
});

Template.CustomerEdit.helpers({
	customer: function () {
		return Customers.findOne({});
	}
});