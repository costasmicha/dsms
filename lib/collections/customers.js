Customers = new Mongo.Collection("customers");

CustomersIndex = new EasySearch.Index({
  collection: Customers,
  fields: ['firstname', 'lastname'],
  // engine: new EasySearch.MongoDB()
  engine: new EasySearch.MongoTextIndex()
});


//add
Customers.attachSchema(new SimpleSchema({
	firstname: {
		type: String,
		label: "Όνομα",
		optional: false,
		max: 60
	},
  lastname: {
    type: String,
    label: "Επίθετο",
    optional: true,
    max: 60
  },
	tel: {
		type: String,
		label: "Τηλέφωνο",
		optional: true,
    unique: true,
		max: 14
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  notifications: {
    type : Boolean,
    label: "Notifications"
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }  
}));

Customers.helpers({
  fullname: function () {
    var firstandlast = this.firstname + " " + this.lastname;
    return firstandlast
  },
  notificationsState() {
    return this.notifications ? "yes" : "no";
  }
});

Customers.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
});

if (Meteor.isServer) {
  Customers.allow({
    insert: function (userId, doc) {
      return Roles.userIsInRole(userId,['admin']);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId,['admin']);;
    },

    remove: function (userId, doc) {
      return false;
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({

    'customers.insert'(opts) {
      console.log(opts);
      return Customers.insert(opts);
    },
    'customers.delete'(id) {
      console.log(id);
      return Customers.remove({_id: id});
    }

  });

}

// TabularTables = {};

// Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

// TabularTables.Customers = new Tabular.Table({
//   name: "CustomersList",
//   autoWidth: false,
//   responsive: true,
//   collection: Customers,
//   columns: [
//     {data: "fullname()", title: "Ονοματεπώνυμο/Υπόχρεος"},
//     {data: "tel", title: "Τηλέφωνο"},
//     {data: "email", title: "email"},
//     {data: "notificationsState()", title: "Notifications"}
//     // {tmpl: Meteor.isClient && Template.editClockBtn}
//   ],
//   extraFields: ['firstname', 'lastname', 'notifications'],
//   allow: function(userId) {
//     return userId || Roles.userIsInRole(userId,['admin']);
//   }
// });

