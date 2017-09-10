app.factory("User", function() {
  var me = this;

  function User(firstName, lastName, email, password, address, city, country, zip) {
    me.firstName = firstName;
    me.lastName = lastName;
    me.email = email;
    me.password = password;
    me.address = address;
    me.city = city;
    me.country = country;
    me.zip = zip;
  }

  return User;
});