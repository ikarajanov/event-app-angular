app.factory("Event", function() {
  var me = this;

  function Event(id, name, owner, location,
                 numberOfPeopleAttending, category, coverPhoto,
                 description, startDate, startTime, endDate, endTime, isCanceled) {

    me.id = id;
    me.name = name;
    me.owner = owner;
    me.location = location;
    me.numberOfPeopleAttending = numberOfPeopleAttending;
    me.category = category;
    me.coverPhoto = coverPhoto;
    me.description = description;
    me.startDate = startDate;
    me.startTime = startTime;
    me.endDate = endDate;
    me.endTime = endTime;
    me.isCanceled = isCanceled;

    return me;
  }

  return Event;
});