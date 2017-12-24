app.factory('Location', function() {
  var me = this;

  function Location(name, address, googleMapUrl, latitude, longitude) {
    me.name = name;
    me.address = address;
    me.googleMapUrl = googleMapUrl;
    me.latitude = latitude;
    me.longitude = longitude;

    return me;
  }

  return Location;
});