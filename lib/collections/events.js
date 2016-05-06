Events = new Mongo.Collection("events");

Events.attachSchema(new SimpleSchema({
  customer: {
    type: String, // Customers _id
    optional: true
  },  
  startAt: {
    type: Date,
    optional: true
  },
  duration: {
    type: String,
    optional: true
  },  
  type: {
    type: String,
    optional: true
  },
  canceled: {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }  
}));

Events.helpers({
  getCustomer: function () {
    var customer = Customers.findOne({_id:this.customer});
    return customer;
  }  
});

Events.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.canceled = false;
});

if (Meteor.isServer) {
  Events.allow({
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

    'events.insert'(opts) {
      console.log(opts);
      return Events.insert(opts);
    },
    'events.delete'(id) {
      console.log(id);
      return Events.remove({_id: id});
    },
    'events.toggleCanceled'(id, bool) {
      console.log(id);
      check(id, String);
      check(bool, Boolean);
      return Events.update({_id: id}, {$set: {canceled: bool}});
    }
  });

}



















