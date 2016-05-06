Template.NotificationsJobs.onCreated(function () {
	let tmpl = this;
	tmpl.autorun(function() {
		tmpl.subscribe('tasks.all');
	});	
})


Template.NotificationsJobs.helpers({	
	tasks() {
		return Tasks.find();
	}
});

Template.NotificationsJobs.events({
	'click [data-action="showActions"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = '#' + this._id;
		tmpl.$(id).dimmer('toggle');
	},
	'click [data-action="deleteTask"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		Meteor.call('tasks.delete', id);
	},
	'click [data-action="getNextRun"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		let jobName = this.jobName
		Meteor.call('getNextRun', jobName, function (err, result) {
			if (err) console.log(err);
			alert(result);
		});
	}
});


	// 'click [data-action="getNextDayEvents"]': function (evt,tmpl) {
	// 	evt.preventDefault();

	// 	Meteor.call('getNextDayEvents', function(err, evts) {
	// 		if (err) console.log(err);

	// 		console.log(evts);
	// 		tmpl.tomorrowEvts.set('evts', evts);
	// 	});
	// },
	// 'click [data-action="addJob"]': function(evt,tmpl) {
	// 	evt.preventDefault();

	// 	let name = tmpl.$('input[name=name]').val();

	// 	console.log(name);
	// 	Meteor.call('addJob', name, function(err, result) {
	// 		if (err.error === "job-exists") {
	// 			alert("Job already added! If you want another job, choose different name");
	// 		}
	// 	});
	// }



















