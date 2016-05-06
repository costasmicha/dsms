// Call SyncedCron.nextScheduledAtDate(jobName) to find the date that the job
// referenced by jobName will run next.

// Call SyncedCron.remove(jobName) to remove and stop running the job referenced by jobName.

// Call SyncedCron.stop() to remove and stop all jobs.

// Call SyncedCron.pause() to stop all jobs without removing them. The existing jobs can be rescheduled (i.e. restarted) with SyncedCron.start().

// SyncedCron uses a collection called cronHistory to syncronize between processes. This also serves as a useful log of when jobs ran along with their output or error. A sample item looks like:

// { _id: 'wdYLPBZp5zzbwdfYj',
//   intendedAt: Sun Apr 13 2014 17:34:00 GMT-0700 (MST),
//   finishedAt: Sun Apr 13 2014 17:34:01 GMT-0700 (MST),
//   name: 'Crunch some important numbers for the marketing department',
//   startedAt: Sun Apr 13 2014 17:34:00 GMT-0700 (MST),
//   result: '1982 numbers crunched'
// }


// SyncedCron.config({
//   // Log job run details to console
//   log: true,

//   // Use a custom logger function (defaults to Meteor's logging package)
//   logger: null,

//   // Name of collection to use for synchronisation and logging
//   collectionName: 'cronHistory'
// });


// AddJob = function (jobName, recurrence, method) {

//   SyncedCron.add({
//       name: jobName,
//       schedule: function(parser) {
//         return parser.text(recurrence); // parser is a later.parse object
//       },
//       job: function() {
//         Meteor.call(method);
//       }
//   });

// };























