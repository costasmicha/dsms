Template.EventsAll.onRendered(function () {
	console.log('EventsAll rendered');
});



Template.EventsAll.onCreated(function () {
	let tmpl = this;
	let m = moment();
	let n = [];

	tmpl.currentDay = new ReactiveVar(m);
	tmpl.weekStart = new ReactiveVar;
	tmpl.weekEnd = new ReactiveVar;

	tmpl.weekDays = new ReactiveDict();
	tmpl.weekDays.set('days', n);

	let setWeek = function (aMoment) {
		tmpl.weekStart.set(aMoment.clone().startOf('week'));
		tmpl.weekEnd.set(aMoment.clone().endOf('week'));
	}

	let setWeekDays = function (start, end) {
		let daysArray = [];
		let startingItr = moment(start);
		let nd = moment(end);
		while (startingItr.isBefore(nd)) {
			daysArray.push(new Date(startingItr));
			startingItr = moment(startingItr).add(1, 'days');
		}
		return daysArray;
	}

	tmpl.autorun(function() {
		setWeek(tmpl.currentDay.get());
		tmpl.weekDays.set('days', setWeekDays(tmpl.weekStart.get(), tmpl.weekEnd.get()));
	})

	tmpl.autorun(function() {
		let thisday = tmpl.currentDay.get();
		tmpl.subscribe('events.all', new Date(thisday));
	});

});

Template.EventsAll.helpers({
	// customers() {
	// 	return Customers.find().fetch();
	// },
	allevents() {
		return Events.find()
	},
	now() {
		return Template.instance().currentDay.get();
	},
	weekStart() { 
		return Template.instance().weekStart.get();
	},
	weekEnd() {
		return Template.instance().weekEnd.get();
	},
	weekDays() {
		return Template.instance().weekDays.get('days');
	}
});

Template.EventsAll.events({
	'click [data-action="nextDay"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.currentDay.set(tmpl.currentDay.get().add(1, 'days'));
	},
	'click [data-action="previousDay"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.currentDay.set(tmpl.currentDay.get().subtract(1, 'days'));
	},
	'click [data-action="nextWeek"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.currentDay.set(tmpl.currentDay.get().add(7, 'days'));
	},
	'click [data-action="previousWeek"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.currentDay.set(tmpl.currentDay.get().subtract(7, 'days'));
	},
	'click [data-action="goToThisDay"]': function (evt,tmpl) {
		evt.preventDefault();
		tmpl.currentDay.set(moment(this));
	},
	'click [data-action="showActions"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = '#' + this._id;
		tmpl.$(id).dimmer('toggle');
	},
	'click [data-action="deleteEvent"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('events.delete', id);
	},
	'click [data-action="cancelEvent"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('events.toggleCanceled', id, true);
	},
	'click [data-action="unCancelEvent"]': function (evt,tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		Meteor.call('events.toggleCanceled', id, false);
	}
});




















