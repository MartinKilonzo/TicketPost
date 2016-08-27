'use strict';

let eventList = {
  air_canada_centre: {
    country: 'CA',
    state: 'ON',
    city: 'Toronto',
    events: {
      world_cup_of_hockey: require('./DataFormats/Venues/air_canada_centre/world_cup_of_hockey.js'),
      flags: require('./DataFormats/Venues/air_canada_centre/flags.js')
    }
  },
  rogers_centre: {
    country: 'CA',
    state: 'ON',
    city: 'Toronto',
    events: {
      blue_jays: require('./DataFormats/Venues/rogers_centre/blue_jays.js'),
      flags: require('./DataFormats/Venues/rogers_centre/flags.js')
    }
  }
};

let EventList = {
  eventList: eventList
};

EventList.getEventData = function(ticketType) {
  return {
    eventData: this.eventList[ticketType.ticketVenue.name].events[ticketType.ticketEvent],
    flags: this.eventList[ticketType.ticketVenue.name].events.flags
  };
};

EventList.listEvents = function() {
  let ret = {};
  for (var venue in this.eventList) {
    let events = {};
    for (var event in this.eventList[venue].events) {
      if (event !== 'flags') events[event] = event;
    }
    ret[venue] = {
      name: venue,
      country: this.eventList[venue].country,
      state: this.eventList[venue].state,
      city: this.eventList[venue].city,
      events: events
    };
  }
  return ret;
};

module.exports = EventList;
