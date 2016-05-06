Meteor.users.helpers({
  fullName: function () {
    return this.profile.first + ' ' + this.profile.last;
  },
  mail: function() {
  	return this.emails[0].address;
  }
});


if (Meteor.isServer) {

  Meteor.methods({

    'user.update': function(options) {
      //options include first, last, phone, email
      options = options || {};

      check(options.first, String);
      check(options.last, String);
      check(options.phone, String);
      check(options.email, String);

      var loggedInUser = Meteor.user();

      return Meteor.users.update({_id: this.userId}, {$set: {
        "emails.0.address": options.email,
        "profile.first": options.first,
        "profile.last": options.last,
        "profile.phone": options.phone
      }});

    },
    'users.create': function(opts) {
      check(opts.first, String);
      check(opts.last, String);
      check(opts.phone, String);
      check(opts.email, String);    

      const pass = Meteor.settings.SUPERPASSME;
      const role = ['admin'];

      var id = Accounts.createUser({
        email: opts.email,
        password: pass,
        profile: { 
          first: opts.first,
          last: opts.last,
          phone: opts.phone
        }
      });

      Roles.addUsersToRoles(id, role);

    },  

    'user.update.from': function(name) {
      check(name, String);

      const MinOneMaxEleven = Match.Where(function (x) {
        check(x, String);
        return x.length > 1 && x.length < 12;
      });

      const AlphaNumeric = Match.Where(function(str){
        check(str, String);
        var regexp = /^[a-z0-9]+$/i;
        return regexp.test(str);
      });

      check(name, MinOneMaxEleven);    
      check(name, AlphaNumeric);    

      // var loggedInUser = Meteor.user();

      return Meteor.users.update({_id: this.userId}, {$set: {
        "profile.smsFromName": name
      }})

    },

    'makeAdmin': function (id) {

      check(id, String);

      Roles.addUsersToRoles(id, ['admin']);

    },
    'removeAdmin': function (id) {

      check(id, String);

      Roles.setUserRoles(id, []);

    },
    'deleteUser': function (id) {

      check(id, String);

      Meteor.users.remove({_id: id});

    }


   
  });

}



if (Meteor.isServer) {

  Meteor.users.deny({
    update: function() {
      return true;
    }
  });

}


























