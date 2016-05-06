Meteor.startup(function() {
  AutoForm.setDefaultTemplate("semanticUI");
  // T9n.setLanguage('el');

	sAlert.config({
		effect: 'stackslide',
		position: 'top-right',
		timeout: 5000,
		html: false,
		onRouteClose: false,
		stack: {
			spacing: 10,
			limit: 3
		},
		offset: 10,
		beep: false
	});

});

