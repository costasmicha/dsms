Template.header.onRendered(function() {
    this.$('.ui.floating.dropdown').dropdown({
    	debug: true
    });
});

Template.header.helpers({
	user() {
		return Meteor.user();
	}
});

Template.header.events({
  'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
  }
});
