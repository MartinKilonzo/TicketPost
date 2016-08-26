'use strict';

let eventList = {
  air_canada_centre: {
    hockey_hall_of_fame: require('./DataFormats/Venues/air_canada_centre/hockey_hall_of_fame.js'),
    flags: require('./DataFormats/Venues/air_canada_centre/flags.js')
  },
  rogers_centre: {
    blue_jays: require('./DataFormats/Venues/rogers_centre/blue_jays.js'),
    flags: require('./DataFormats/Venues/rogers_centre/flags.js')
  }
};

let Events = {
  eventList: eventList
};

Events.getEvent = function(ticketType) {
  let ret = {
    format: this.eventList[ticketType.ticketVenue][ticketType.ticketEvent],
    flags: this.eventList[ticketType.ticketVenue].flags
  };
  return ret;
};

Events.listEvents = function() {
  let ret = [];
  for (var venue in this.eventList) {
    let events = [];
    for (var event in this.eventList[venue]) {
      if (event !== 'flags') events.push(event);
    }
    ret.push({
      name: venue,
      events: events
    });
  }
  return ret;
};

module.exports = Events;
