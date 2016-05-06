Template.MessagesAll.onRendered(function () {
	console.log('MessagesAll');
	this.$('.ui.radio.checkbox').checkbox();
})


Template.MessagesAll.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();

		let isAll = tmpl.$('input#all').is(":checked");
		let text = tmpl.$('textarea[name=text]').val();

		console.log(isAll);

		let opts = {
			all: isAll,
			text: text
		}

		console.log(opts)

		Meteor.call('sendMessageToAll', opts, function (err, result) {
			if (err) sAlert.error(err, {});
			sAlert.success(result, {});			
		});

		tmpl.find('form').reset();

		return false;
	}
});