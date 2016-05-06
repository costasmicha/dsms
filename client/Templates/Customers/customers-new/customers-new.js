PreviewCustomers = new Mongo.Collection('previewCustomers',{connection: null});

previewSchema = new SimpleSchema({
	firstname: {
		type: String,
		optional: true
	},
	lastname: {
		type: String,
		optional: true
	},
	tel: {
		type: String,
		optional: true
	},
	email: {
		type: String,
    	optional: true
	}	
})

PreviewCustomers.attachSchema(previewSchema);

Template.CustomersNew.onRendered(function() {
	console.log('new customers route here');
	this.$('.ui.checkbox').checkbox();
})

Template.CustomersNew.events({
	'submit form': function (evt,tmpl) {
		evt.preventDefault();

		let firstname = tmpl.$('input[name=firstname]').val();
		let lastname = tmpl.$('input[name=lastname]').val();
		let email = tmpl.$('input[name=email]').val();
		let tel = tmpl.$('input[name=tel]').val();
		let notifications = tmpl.$('.ui.checkbox').checkbox('is checked');

		let grTel = Phoneformat.formatE164('GR', tel);

		console.log(grTel);

		let opts = {
			firstname: firstname,
			lastname: lastname,
			tel: grTel,
			email: email,
			notifications: notifications
		}

		console.log(opts);
		Meteor.call('customers.insert', opts);

		tmpl.find('form').reset();

		return false;
	},
	'change #csv-file': function (evt,tmpl) {
		console.log("file input fired");
		var file = evt.target.files[0];
		var clocksArray;
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: function(results) {
				clocksArray = results.data;
				// console.log(clocksArray);
				console.log("length =======");
				console.log(clocksArray.length);
				_.each(clocksArray,function(c) {


					let obj = {
						firstname: c['First Name'],
						lastname: c['Last Name'],
						tel: c['Mobile Phone'],
						email: c['E-mail Address']
					}
					console.log(obj);

					PreviewCustomers.insert(obj);
				});
			}	
		});
	},
	'keyup input[name="previewFirstname"]': function (evt, tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		let value = evt.target.value;
		console.log(value);
		PreviewCustomers.update({_id: id}, {$set: {firstname: value}});
	},
	'keyup input[name="previewLastname"]': function (evt, tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		let value = evt.target.value;
		console.log(value);
		PreviewCustomers.update({_id: id}, {$set: {lastname: value}});
	},
	'keyup input[name="previewTel"]': function (evt, tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		let value = evt.target.value;
		console.log(value);
		PreviewCustomers.update({_id: id}, {$set: {tel: value}});
	},
	'keyup input[name="previewMail"]': function (evt, tmpl) {
		evt.preventDefault();
		let id = this._id;
		console.log(id);
		let value = evt.target.value;
		console.log(value);
		PreviewCustomers.update({_id: id}, {$set: {email: value}});
	},	
	'click [data-action="removePreview"]': function (evt, tmpl) {
		evt.preventDefault()
		let id = this._id;
		PreviewCustomers.remove({_id: id});
	},
	'click [data-action="addPreview"]': function (evt, tmpl) {
		evt.preventDefault()
		let daid = this._id;


		let opts = {
			firstname: this.firstname,
			lastname: this.lastname,
			tel: this.tel,
			email: this.email,
			notifications: true
		}

		console.log(opts)

		Meteor.call('customers.insert', opts, function (err, result) {
			if (err) console.log(err);
			PreviewCustomers.remove({_id: daid});
		});
	},	
	'click [data-action="addAllPreview"]': function (evt, tmpl) {
		evt.preventDefault()
		let previewArray = PreviewCustomers.find().fetch();
		previewArray.forEach(function(c) {
			console.log("c 3333333");
			console.log(c);
			console.log(c._id);

			let opts = {
				firstname: c.firstname,
				lastname: c.lastname,
				tel: c.tel,
				email: c.email,
				notifications: true
			}

			Meteor.call('customers.insert', opts, function (err, result) {
				if (err) console.log(err);
				PreviewCustomers.remove({_id: c._id});
			});


		})
	}	
});

Template.CustomersNew.helpers({
	previewCustomers: function () {
		return PreviewCustomers.find({});
	}
});