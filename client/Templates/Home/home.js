Template.Home.onCreated( () => {
	console.log("on created home");
})

Template.Home.onRendered( () => {
	FlowRouter.redirect('/customers');
})

Template.Home.helpers({
	user() {
		return Meteor.user();
	}
});