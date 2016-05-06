Template.NotificationsJobsEdit.onCreated(function() {
	console.log('customer detail');

	let tmpl = this;
	let id = FlowRouter.getParam('_id');

	tmpl.autorun(function() {
		tmpl.subscribe('task.detail', id);
	});
});

Template.NotificationsJobsEdit.helpers({
	task: function () {
		return Tasks.findOne({});
	}
});