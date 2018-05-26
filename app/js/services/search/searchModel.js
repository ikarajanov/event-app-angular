app.factory("SearchModel", function() {
    var me = this;

    function SearchModel(userId, category, location, range) {
        me.userId = userId;
        me.category = category;
        me.location = location;
        me.range = range;
        return me;
    }

    return SearchModel;
});