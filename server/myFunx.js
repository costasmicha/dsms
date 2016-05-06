MyUtils = {};


// *** make methods here ***

let tomorrowCustomers = function () {
	let now = moment();
	//add one day to go to tomorrow
	let tomorrow = moment(now).add(1, 'days');
	// tomorrow starts
	let tomorrowStarts = moment(tomorrow).startOf('day');
	//tomorrow ends
	let tomorrowEnds = moment(tomorrow).endOf('day');

	let start = new Date(tomorrowStarts);
	let end = new Date(tomorrowEnds);

	let evts = Events.find({startAt: { $gt: start, $lt: end } }).fetch();

	var customersIds = Events.find({startAt: { $gt: start, $lt: end } })
						.map(function (evt) {
							return evt.customer; 
						});

	let customers = Customers.find({ _id: { $in: customersIds }, notifications: true }).fetch();

	return customers;	
}

let tomorrowEvents = function () {
	let now = moment();
	//add one day to go to tomorrow
	let tomorrow = moment(now).add(1, 'days');
	// tomorrow starts
	let tomorrowStarts = moment(tomorrow).startOf('day');
	//tomorrow ends
	let tomorrowEnds = moment(tomorrow).endOf('day');

	let start = new Date(tomorrowStarts);
	let end = new Date(tomorrowEnds);

	let evts = Events.find({startAt: { $gt: start, $lt: end } }).fetch();

	return evts;
	
}

let replaceKeyword = function (text, keyword, replacement) {
  if (s.include(text, keyword)) {
    return s.replaceAll(text, keyword, replacement);
  } else {
    return text
  }
}



let sendSMS = function (number, outgoingMessage) {
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
      	// console.log(success);
      	return success;
      }
    }
  );
}

let sendSMSPromise = function (number, outgoingMessage) {
  let baseUrl = 'https://api.twilio.com/2010-04-01/Accounts/'
  let SMSURI = '/Messages';
  let From  = 'GiannisDiet';

  console.log("began running")
  let promise = new Promise(function (resolve, reject) { 
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
          // console.log(error);
          reject(error);
        } else {
          let success = {outcome: true, message: 'SMS sent successfully.'}
          // console.log(success);
          resolve(success);
        }
      }
    );
  });

  return promise;
  // return Promise.await(promise);
}



let sendFakeSMS = function (number, outgoingMessage) {
  // Meteor.sleep(750);
	// console.log("I will send SMS to number: " + number);
	// console.log("SMS text is: " + outgoingMessage)
  let success = {outcome: true, number: number, message: 'SMS sent successfully.'};
  return success;
}




let sendFakeSMSPromise = function (number, outgoingMessage) {
    console.log("began running")
    let promise = new Promise((resolve)=>
      setTimeout(()=>{
        console.log("done running")
        console.log("I will send SMS to number: " + number);
        console.log("SMS text is: " + outgoingMessage)
        let success = {outcome: true, message: 'SMS sent successfully.'}
        resolve(success)
      }, 2500))
    return Promise.await(promise);
}


let fsms = function (number, outgoingMessage,done) {


  setTimeout(function() {

    let success = {outcome: true, number: number, message: 'SMS sent successfully.'};

    done(null, success);

  }, 100)


}
MyUtils.fsms = fsms;


const sendSMSAsync = function (sender , number, outgoingMessage, done) {

  const baseUrl = 'https://api.twilio.com/2010-04-01/Accounts/'
  const SMSURI = '/Messages';
  // let From  = Meteor.settings.TWILIO_NUMBER;
  const From = sender;

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
        let fail = {outcome: false, number: number, message: 'Error sending SMS'};
        done(error, fail)
      } else {
        let success = {outcome: true, number: number, message: 'SMS sent successfully.'};
        done(null, success);        
      }
    }
  );

}
MyUtils.sendSMSAsync = sendSMSAsync;

// *** make exports here ***

MyUtils.replaceKeyword = replaceKeyword;
MyUtils.tomorrowCustomers = tomorrowCustomers;
MyUtils.tomorrowEvents = tomorrowEvents;
MyUtils.sendSMS = sendSMS;
MyUtils.sendSMSPromise = sendSMSPromise;
MyUtils.sendFakeSMS = sendFakeSMS;
MyUtils.sendFakeSMSPromise = sendFakeSMSPromise;




























