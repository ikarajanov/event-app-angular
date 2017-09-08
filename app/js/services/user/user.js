app.factory("User", function() {
  var me = this;

  function User(email, password, address, city, country, zip) {
    me.email = email;
    me.password = password;
    me.address = address;
    me.city = city;
    me.country = country;
    me.zip = zip;
  }

  return User;
});