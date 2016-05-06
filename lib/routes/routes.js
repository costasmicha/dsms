FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render( 'public', { yield: 'Home' } );
	}	
});


//authenticated

FlowRouter.route('/profile', {
	name: 'profile',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'Profile' } );
	}	
});

FlowRouter.route('/settings', {
	name: 'settings',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'Settings' } );
	}	
});

FlowRouter.route('/csv-instructions', {
	name: 'csv',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'CsvInstructions' } );
	}	
});

// FlowRouter.route('/more', {
// 	name: 'more',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'More' } );
// 	}	
// });

FlowRouter.route('/customers', {
	name: 'customers.all',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'Customers' } );
	}	
})

FlowRouter.route('/customers/new', {
	name: 'customers.new',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'CustomersNew' } );
	}	
})

// FlowRouter.route('/customers/csv', {
// 	name: 'customers.csv',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'CustomersCsv' } );
// 	}	
// })

FlowRouter.route('/customers/:_id', {
	name: 'customer.detail',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'CustomerDetail' } );
	}	
})

FlowRouter.route('/customers/:_id/edit', {
	name: 'customer.edit',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'CustomerEdit' } );
	}	
})


// FlowRouter.route('/events', {
// 	name: 'events.all',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'EventsAll' } );
// 	}	
// })

// FlowRouter.route('/events/new', {
// 	name: 'events.new',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'EventsNew' } );
// 	}	
// });


// FlowRouter.route('/notifications', {
// 	name: 'notifications.tomorrow',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'Tomorrow' } );
// 	}	
// });

// FlowRouter.route('/notifications/jobs', {
// 	name: 'notifications.jobs',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'NotificationsJobs' } );
// 	}	
// });

// FlowRouter.route('/notifications/jobs/new', {
// 	name: 'notifications.jobs.new',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'NotificationsJobsNew' } );
// 	}
// })

// FlowRouter.route('/notifications/jobs/:_id/edit', {
// 	name: 'notifications.jobs.edit',
// 	triggersEnter: [AccountsTemplates.ensureSignedIn],
// 	action() {
// 		BlazeLayout.render( 'default', { yield: 'NotificationsJobsEdit' } );
// 	}	
// })

FlowRouter.route('/messages', {
	name: 'messages.one',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'MessagesOne' } );
	}	
});

FlowRouter.route('/messages/all', {
	name: 'messages.all',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'MessagesAll' } );
	}	
});

FlowRouter.route('/messages/multi', {
	name: 'messages.multi',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'MessagesMulti' } );
	}	
});


FlowRouter.route('/words', {
	name: 'words.all',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'WordsAll' } );
	}	
})

FlowRouter.route('/words/new', {
	name: 'words.new',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'WordsNew' } );
	}	
});

FlowRouter.route('/users/new', {
	name: 'users.new',
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	action() {
		BlazeLayout.render( 'default', { yield: 'UsersNew' } );
	}	
})






















