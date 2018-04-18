app.factory("User", function() {
  var me = this;

  function User(id, firstName, lastName, email, password, location) {
    me.id = id;
    me.firstName = firstName;
    me.lastName = lastName;
    me.email = email;
    me.password = password;
    me.location = location;

    return me;
  }

  return User;
});