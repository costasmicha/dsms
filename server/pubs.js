Meteor.publish(null, function () { 
  return Meteor.roles.find({})
});

Meteor.publish('customers.all', function () {
  if (this.userId || Roles.userIsInRole(this.userId,['admin'])) {
	return Customers.find({});
  } else {
    this.ready();
  }	
});

Meteor.publish('customer.detail', function (id) {
	let lastEvent = Events.find({customer: id}, {sort: {startAt: -1}, limit: 1});
	return [ Customers.find({_id: id}), lastEvent ]
});

Meteor.publish('users',function() {
  if (this.userId) {
	 return Meteor.users.find({},{fields: { profile: 1, roles: 1} });
  } else {
    this.ready();
  }
});


Meteor.publish('events.all', function (day) {
	let startOfday = moment(day).startOf('day');
	let thisday = new Date(startOfday);

	let startOfnextday = moment(thisday).add(1, 'days').startOf('day');
	let nextday = new Date(startOfnextday);

	// console.log(thisday);
	// console.log(nextday);

	return [ Events.find({startAt: { $gte: thisday, $lt: nextday } }), Customers.find({}) ];
});


Meteor.publish('tasks.all', function () {
	return Tasks.find({});
});

Meteor.publish('task.detail', function (id) {
	return Tasks.find({_id: id});
});


Meteor.publish('customers.tomorrow', function () {

	let now = moment();
	//add one day to go to tomorrow
	let tomorrow = moment(now).add(1, 'days');
	// tomorrow starts
	let tomorrowStarts = moment(tomorrow).startOf('day');
	//tomorrow ends
	let tomorrowEnds = moment(tomorrow).endOf('day');

	let start = new Date(tomorrowStarts);
	let end = new Date(tomorrowEnds);

	let evts = Events.find({startAt: { $gt: start, $lt: end } }).fetch();

	// console.log(evts);

	var customersIds = Events.find({ startAt: { $gt: start, $lt: end } })
											.map(function (evt) { return evt.customer; });


	// console.log(customersIds);

	let customersCursor = Customers.find({_id: { $in: customersIds }})

	// console.log(customers);

	return customersCursor;


});

Meteor.publish('words.all', function () {
	return Words.find({});
});


// Meteor.publish('settings.from', function () {
// 	return From.find({}, {fields: { name: 1} } );
// });

































