// Meteor.methods({
//   'getTotalAppointments'(id) {
//     check(id, String);
//     let evtCount = Events.find({customer: id}).count();

//     return evtCount;
//   },

//   'getTomorrowCustomers'() {

//   	let now = moment();
//   	//add one day to go to tomorrow
//   	let tomorrow = moment(now).add(1, 'days');
//   	// tomorrow starts
//   	let tomorrowStarts = moment(tomorrow).startOf('day');
//   	//tomorrow ends
//   	let tomorrowEnds = moment(tomorrow).endOf('day');

//   	let start = new Date(tomorrowStarts);
//   	let end = new Date(tomorrowEnds);

//   	let evts = Events.find({startAt: { $gt: start, $lt: end } }).fetch();

//   	console.log(evts);

//   	var customersIds = Events.find({startAt: { $gt: start, $lt: end } })
// 												.map(function (evt) {
// 													return evt.customer; 
// 												});


// 		console.log(customersIds);

// 		let customers = Customers.find({_id: { $in: customersIds }}).fetch();

// 		console.log(customers);

//   	return customers;

//   },

//   'getNextRun': function (jobName) {
//     check(jobName, String);

//     var next = SyncedCron.nextScheduledAtDate(jobName);

//     return next;
//   },

//  'tasks.addJob': function(jobName, recurrence, method) {

//     var jobExists = Tasks.findOne({jobName: jobName});

//     if (jobExists) {
//       console.log("already exists");
//       throw new Meteor.Error("job-exists", "Job Already Exists!");
//     } else {
//       console.log("job don't exist");

//       // add a cron job that calls
//       AddJob(jobName, recurrence, method);
//       // save it to Tasks collection
//       Tasks.insert({
//         jobName: jobName,
//         recurrence: recurrence,
//         method: method
//       });     
//   	}
//  	}



// });





Meteor.methods({
	'dev.seed'() {
	  if (Customers.find().count() === 0) {
	    var cs = JSON.parse(Assets.getText('customersData.json'));

	    _.each(cs,function(c) {
	      Customers.insert(c);
	    });

	    console.log("Seeded cs");
	  }		
	}
})







































