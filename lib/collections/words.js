Words = new Mongo.Collection('words');


Words.attachSchema(new SimpleSchema({
  text: {
    type: String, // message to send
    optional: false
  },
  selected: {
    type : Boolean,
    label: "Epilegmeno",
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

Words.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.selected = false;
});

if (Meteor.isServer) {

  Meteor.methods({

    'words.insert'(text) {
      check(text, String);

      console.log(text);

      return Words.insert({text: text, selected: false});
    },
    'words.delete'(id) {
      console.log(id);
      return Words.remove({_id: id});
    },
    'words.toggleSelected'(id, bool) {
      console.log(id);
      check(id, String);
      check(bool, Boolean);
      return Words.update({_id: id}, {$set: {selected: bool}});
    }    
  });

}

if (Meteor.isServer) {
  Words.allow({
    insert: function (userId, doc) {
      return Roles.userIsInRole(userId,['admin']);
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId,['admin']);
    },

    remove: function (userId, doc) {
      return Roles.userIsInRole(userId,['admin']);
    }
  });


}