app.factory("User", function() {
  var me = this;

  function User(id, firstName, lastName, email, password, address, city, country, zip) {
    me.id = id;
    me.firstName = firstName;
    me.lastName = lastName;
    me.email = email;
    me.password = password;
    me.address = address;
    me.city = city;
    me.country = country;
    me.zip = zip;

    return me;
  }

  return User;
});