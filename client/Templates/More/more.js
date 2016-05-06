Template.More.events({
  'click [data-action="logout"]' : function(evt,tmpl) {
  	evt.preventDefault();
    AccountsTemplates.logout();
  }
});