app.factory("PaginationModel", function() {
    var me = this;

    function PaginationModel(actualValue, startValue) {
        me.actualValue = actualValue;
        me.startValue = startValue;
        return me;
    }

    return PaginationModel;
});