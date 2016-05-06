Template.registerHelper('summarize', function(string) {
  var len = 100;
  return string.length > len ? string.substring(0,len).concat('...') : string;
});

Template.registerHelper('GreenOrRed', function (bool) {
  return bool ? 'green' : 'red';
});

Template.registerHelper('isAdmin', function (id) {
  check(id, String);
  return Roles.userIsInRole(id, ['admin']);
});


Template.registerHelper('mod', function(number) {
  let base = 4
  if (number > 0) {
    return number % base;
  } else {
    return number
  }
});



Template.registerHelper('ifNowThenActive', function (now,day) {
  let n = moment(now);
  let d = moment(day);
  return n.isSame(d, 'day') ? 'active' : '';
});

Template.registerHelper('formatdate',function(timestamp){
  if(moment && timestamp){
    return moment(timestamp).format('DD MMM YYYY');
  } else{
    return timestamp;
  }
});

Template.registerHelper('fulldate',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('dddd, DD MMM, hh:mm a');
  } else{
    return datetime;
  }
});

Template.registerHelper('day',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('dddd, DD MMM');
  } else{
    return datetime;
  }
});

Template.registerHelper('day3',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('ddd');
  } else{
    return datetime;
  }
});

Template.registerHelper('dayNum',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('DD');
  } else{
    return datetime;
  }
});

Template.registerHelper('week',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('DD MMM');
  } else{
    return datetime;
  }
});

Template.registerHelper('time',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('hh:mm a');
  } else{
    return datetime;
  }
});

Template.registerHelper('time24',function(datetime){
  if(moment && datetime){
    return moment(datetime).format('HH:mm');
  } else{
    return datetime;
  }
});

Template.registerHelper('timeago',function(datetime){
  if(moment && datetime){
    return moment(datetime).fromNow();
  } else{
    return datetime;
  }
});

Template.registerHelper('niceName',function(id) {
	if (id) {
		var user = Meteor.users.findOne({_id:id});
	} else {
		var user = Meteor.user();
	}
	if (user) {
		if (typeof user.profile != 'undefined' && user.profile.first && user.profile.last) {
			return user.profile.first + ' ' + user.profile.last;
		} else {
			return user.emails[0].address;
		}
	} else {
		return 'anonymous';
	}
});
