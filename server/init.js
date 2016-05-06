Meteor.startup(function () {

  //create first admin user 
  if (Meteor.users.find().count() == 0 ) {

    var users = [
      {
        first:"first",
        last: "last",
        email: Meteor.settings.SUPERMAILME,
        roles:['admin'],
        password: Meteor.settings.SUPERPASSME,
        smsFromName: Meteor.settings.DEFAULT_FROM
      }
    ];


    _.each(users, function (user) {
      var id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { 
          first: user.first,
          last: user.last,
          smsFromName: user.smsFromName
        }
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
    });

    console.log("Seeded admins");
  }

  Customers._ensureIndex({
    "firstname": "text",
    "lastname": "text"
  });  


  // If no tasks insert a default
  // if (Tasks.find().count() == 0) {

  //   let FAKEjobName = 'fakeSMS';
  //   let FAKErecurrence = 'every 30 minutes';
  //   let FAKEmeth = 'FakeSendMessageForTomorrow'

  //   Tasks.insert({
  //     jobName: FAKEjobName,
  //     recurrence : FAKErecurrence,
  //     method: FAKEmeth
  //   });

  //   console.log("Created default FAKE Task : fakeSMS");

  //   let jobName = 'SMS';
  //   let recurrence = 'at 20:00 am';
  //   let meth = 'sendMessageForTomorrow'

  //   Tasks.insert({
  //     jobName: jobName,
  //     recurrence : recurrence,
  //     method: meth
  //   });

  //   console.log("Created default Task : SMS");    

  // }



  // // Find Jobs and start SyncedCron
  // if (Tasks.find().count() !== 0) {
  //   console.log("found tasks and added them to cron jobs!")
  //   Tasks.find().forEach(function (task) {
  //     AddJob(task.jobName, task.recurrence, task.method);
  //   });
  // }

  // SyncedCron.start();


});
















