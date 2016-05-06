Meteor.methods({

  sendMessageToPerson: function(opts) {

    const outgoingMessage = opts.text;
    const user = opts.customer;

    let person = Customers.findOne({_id: user});
    let number = person.tel;

    var sender = Meteor.user().profile.smsFromName;

    var response = Async.runSync(function(done) {
      MyUtils.sendSMSAsync(sender, number, outgoingMessage, done);
    });

    console.log(response.result);

    return response.result;

  },

  sendMessageToAll: function(opts) {
		let text = opts.text;

		if (opts.isAll) {


      let totalCustomers = Customers.find().count();
      let countSuccessfull = 0;

      var sender = Meteor.user().profile.smsFromName;

			Customers.find().forEach(function(c) {
        let outgoingMessage = MyUtils.replaceKeyword(text,'#name', c.firstname);
        // MyUtils.sendSMS(c.tel, outgoingMessage);
        var response = Async.runSync(function(done) {
          MyUtils.sendSMSAsync(sender, c.tel, outgoingMessage, done);
        });

        let out = response.result.outcome;
        console.log(out);
        if (out) countSuccessfull += 1;

        console.log(countSuccessfull)        

			})

      console.log('countSuccessfull AFTR: ' + countSuccessfull)
      //return sms send to successfully / total
      return "SMS send successfully to " + countSuccessfull + "of " + totalCustomers;

		} else {


      let totalCustomers = Customers.find({notifications: true}).count();
      console.log('totalCustomers: ' + totalCustomers)
      let countSuccessfull = 0;
      console.log('countSuccessfull: ' + countSuccessfull)


      var sender = Meteor.user().profile.smsFromName;

			Customers.find({notifications: true}).forEach(function(c) {
        let outgoingMessage = MyUtils.replaceKeyword(text,'#name', c.firstname);

        var response = Async.runSync(function(done) {
          MyUtils.sendSMSAsync(sender, c.tel, outgoingMessage, done);
        });

        let out = response.result.outcome;
        console.log(out);
        if (out) countSuccessfull += 1;

        console.log(countSuccessfull)

			})

      console.log('countSuccessfull AFTR: ' + countSuccessfull)

      return "SMS send successfully to " + countSuccessfull;



    } //esle
	
  },

  sendMessageToMulti: function(opts) {
    let text = opts.text;
    let customersIds = opts.customers.split(',');

    console.log(customersIds);

    let customers = Customers.find({ _id: { $in: customersIds } });
    let totalCustomers = customers.count();
    let countSuccessfull = 0;

    console.log(totalCustomers)

    var sender = Meteor.user().profile.smsFromName;

    customers.forEach(function(c) {
      let outgoingMessage = MyUtils.replaceKeyword(text,'#name', c.firstname);
      var response = Async.runSync(function(done) {
        MyUtils.sendSMSAsync(sender, c.tel, outgoingMessage, done);
      });

      let out = response.result.outcome;
      console.log(out);
      if (out) countSuccessfull += 1;

      console.log(countSuccessfull)        

    })

    console.log('countSuccessfull AFTR: ' + countSuccessfull)
    //return sms send to successfully / total
    return "SMS send successfully to " + countSuccessfull + "of " + totalCustomers;

  
  },  

  // sendMessageForTomorrow() {

  //   let Wordtext = Words.findOne({selected: true}).text;
  //   let text = Wordtext || '#name αύριο έχετε ραντεβού στις #date.'

  //   let evts = MyUtils.tomorrowEvents();
  //   let sender = Meteor.user().profile.smsFromName;

  //   evts.forEach(function (e) {
  //     let mydate = moment(e.startAt).format('HH:mm');
  //     let replaceDateText = MyUtils.replaceKeyword(text,'#date', mydate);
  //     let replaceNameText = MyUtils.replaceKeyword(replaceDateText,'#name', e.getCustomer().firstname);
  //     let outgoingMessage = replaceNameText;

  //     MyUtils.sendSMSAsync(sender, e.getCustomer().tel, outgoingMessage);
  //   });

  // },

  // FakeSendMessageForTomorrow() {

  //   let Wordtext = Words.findOne({selected: true}).text;
  //   let text = Wordtext || '#name αύριο έχετε ραντεβού στις #date.'    

  //   let evts = MyUtils.tomorrowEvents();

  //   evts.forEach(function (e) {
  //     let mydate = moment(e.startAt).format('HH:mm');
  //     let replaceDateText = MyUtils.replaceKeyword(text,'#date', mydate);
  //     let replaceNameText = MyUtils.replaceKeyword(replaceDateText,'#name', e.getCustomer().firstname);
  //     let outgoingMessage = replaceNameText;

  //     MyUtils.sendFakeSMS(e.getCustomer().tel, outgoingMessage);
  //   });
    
  // }  


}) //meths



//  **** 

Meteor.methods({
  'sms': function (number, outgoingMessage) {

    let baseUrl = 'https://api.twilio.com/2010-04-01/Accounts/'
    let SMSURI = '/Messages';
    // let From  = Meteor.settings.TWILIO_NUMBER;
    let From  = 'GiannisDiet';
    HTTP.call("POST", baseUrl + Meteor.settings.TWILIO_ACCOUNT_SID + SMSURI, {
        params: {
          From: From,
          To: number,
          Body: outgoingMessage
        },
        auth: Meteor.settings.TWILIO_ACCOUNT_SID + ':' + Meteor.settings.TWILIO_AUTH_TOKEN
      },
      function (error) {
        if (error) {
          console.log(error);
        } else {
          let success = {outcome: true, number: number, message: 'SMS sent successfully.'};
          return success;
        }
      }
    );



  }//sms
})














































