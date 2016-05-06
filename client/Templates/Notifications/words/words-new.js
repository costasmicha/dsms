Template.WordsNew.onCreated(function () {
	let tmpl = this;


});


Template.WordsNew.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();

		let text = tmpl.$('textarea[name=text]').val();

		console.log(text);


		Meteor.call('words.insert', text);

		tmpl.find('form').reset();

		return false;
	}
});