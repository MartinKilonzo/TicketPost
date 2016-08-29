'use strict';

let venues = {
  air_canada_centre: {
    country: 'CA',
    state: 'ON',
    city: 'Toronto',
    venueData: require('./venues/air_canada_centre/format.js')
  },
  rogers_centre: {
    country: 'CA',
    state: 'ON',
    city: 'Toronto',
    venueData: require('./venues/rogers_centre/format.js')
  }
};

let VenueList = {
  venues: venues
};

VenueList.getVenueFormats = function(ticketType) {
  return {
    venueData: this.venueList[ticketType.ticketVenue.name].venueData,
    flags: this.venueList[ticketType.ticketVenue.name].flags
  };
};

VenueList.listVenues = function() {
  let ret = [];
  for (var venue in this.venues) {
    ret.push(venue);
  }
  return ret;
};

module.exports = VenueList;
