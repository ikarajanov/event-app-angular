app.factory("LocationUtility", function(Location) {

    function createLocation(location) {

        if (location != null && location !== undefined) {
            var name = location.name;
            var address = location.formatted_address;
            var url = location.url;
            var lat = location.geometry.location.lat();
            var lng = location.geometry.location.lng();

            return Location(name, address, url, lat, lng);
        }

        return null;
    }

    return {
        createLocation: createLocation
    };
});