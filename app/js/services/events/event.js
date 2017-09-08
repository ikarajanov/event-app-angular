app.factory("Event", function() {
  var me = this;

  function Event(id, name, owner, location,
                 numberOfPeopleAttending, category, coverPhoto,
                 description, startTime, endTime, isCanceled) {

    me.id = id;
    me.name = name;
    me.owner = owner;
    me.location = location;
    me.numberOfPeopleAttending = numberOfPeopleAttending;
    me.category = category;
    me.coverPhoto = coverPhoto;
    me.description = description;
    me.startTime = startTime;
    me.endTime = endTime;
    me.isCanceled = isCanceled;
  }

  return Event;
});