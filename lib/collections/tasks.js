Tasks = new Mongo.Collection('tasks');

Tasks.attachSchema(new SimpleSchema({
  jobName: {
    type: String,
    optional: false,
    unique: true,
    allowedValues: ['SMS', 'getTomorrowCustomers', 'fakeSMS'],
    autoform: {
      options: [
        {label: "SMS", value: "SMS"},
        {label: "test, fake sms", value: "fakeSMS"},
        {label: "test, tomorrow customers", value: "getTomorrowCustomers"}
      ]
    }
  },  
  recurrence: {
    type: String,
    optional: false,
    allowedValues: ['every 30 minutes', 'at 20:00 am', 'at 19:00 am'],
    autoform: {
      options: [
        {label: "κάθε μέρα στις 20:00 μμ", value: "at 20:00 am"},
        {label: "κάθε μέρα στις 19:00 μμ", value: "at 19:00 am"},
        {label: "test, κάθε 30 λεπτά", value: "every 30 minutes"}
      ]
    }
  },
  method: {
    type: String,
    optional: false,
    allowedValues: ['sendMessageForTomorrow', 'getTomorrowCustomers', 'FakeSendMessageForTomorrow'],
    autoform: {
      options: [
        {label: "sms", value: "sendMessageForTomorrow"},
        {label: "test, fake sms", value: "FakeSendMessageForTomorrow"},
        {label: "test, tomorrow customers", value: "getTomorrowCustomers"}
      ]
    }
  }
}));

Tasks.after.update(function (userId, doc, fieldNames, modifier, options) {
  let job = doc.jobName;
  let recur = doc.recurrence;
  let meth = doc.method;

  //remove the job running with this jobName
  SyncedCron.remove(job);

  //add new job with the new recurrence and the old name
  AddJob(job, recur, meth);

}, { fetchPrevious: false });

Tasks.after.insert(function (userId, doc) {
  let job = doc.jobName;
  let recur = doc.recurrence;
  let meth = doc.method;

  //add new job with the new recurrence and the old name
  AddJob(job, recur, meth);  
});

Tasks.before.remove(function (userId, doc) {
  let job = doc.jobName;

  //remove the job running with this jobName
  SyncedCron.remove(job);

});

if (Meteor.isServer) {

  Meteor.methods({
    'tasks.delete'(id) {
      return Tasks.remove({_id: id});
    }    
  });

}

if (Meteor.isServer) {
  Tasks.allow({
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

  // Tasks.deny({
  //   insert: function (userId, doc) {
  //     return true;
  //   },

  //   update: function (userId, doc, fieldNames, modifier) {
  //     return true;
  //   },

  //   remove: function (userId, doc) {
  //     return true;
  //   }
  // });
}