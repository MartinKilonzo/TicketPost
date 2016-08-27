'use strict';
const events = require('../events/events.js');

/**
 * Method: Converts an underscore-delimited string to a space delimited string.
 *
 * @param {String}str             - The string to convert
 * @return {String}               - The same string delimited with spaces instead of underscores
 */
let underscoreToString = str => {
  if (typeof str !== 'string') throw new Error('Input must be a string');
  let ret = '';
  for (var char of str) {
    if (char === '_') ret += ' ';
    else ret += char;
  }
  return ret;
};

/**
 * Main Method: Searches through the textfields of a list of pdfs to find a matching (supported) venue and event combination, to use to define the formats of future data queries of that ticket.
 *
 * @param PDFDataList[PDFData]    - An array containing JSON representations of PDFs
 */
let findEvent = (PDFDataList) => {
  return new Promise((resolve, reject) => {
    // Get the list of available venues and assoiated events
    const eventList = events.listEvents();
    // Query each PDF in PDFDataList for an appropriate event type
    let typeList = [];
    // Search for each tickets event
    for (var pdf in PDFDataList) {
      typeList[pdf] = [];
      for (var page in PDFDataList[pdf]) {
        let ticket = PDFDataList[pdf][page];

        // Search the text to find both the venue and the event
        let ticketVenue;
        let ticketEvent;
        var i = 0;
        while ((typeof ticketVenue === 'undefined' || typeof ticketEvent === 'undefined') && i < ticket.length) {
          const text = decodeURIComponent(ticket[i].R[0].T);
          if (typeof ticketVenue !== 'undefined') { // If we have a venue, search for events that belong to it
            for (var venueEvent in ticketVenue.events) {
              if (text.match(new RegExp(underscoreToString(venueEvent), 'ig'))) {
                ticketEvent = venueEvent;
                break;
              }
            }
          } else { // Otherwise, find the venue first
            for (var venue in eventList) {
              if (text.match(new RegExp(underscoreToString(venue), 'ig'))) {
                ticketVenue = eventList[venue];
                break;
              }
            }
          }
          i++;
        }
        // If a venue was not found, and all text results have been exhausted, reject the ticket
        if (typeof ticketVenue === 'undefined') reject({
          message: 'Cannot find ticket venue.'
        });
        // If an event was not found, and all text results have been exhausted, reject the ticket
        if (typeof ticketEvent === 'undefined') reject({
          message: 'Cannot find ticket event.'
        });
        // Remove events field:
        let tmp = {};
        for (var field in ticketVenue) {
          if (field !== 'events') tmp[field] = ticketVenue[field];
        }
        // Otherwise, add the venue and event data to the list
        typeList[pdf][page] = ({
          ticketVenue: tmp,
          ticketEvent: ticketEvent
        });
      }
    }
    // If venue and event data was found for all tickets, resolve the result
    resolve({
      message: 'success',
      data: {
        ticketTypes: typeList,
        files: PDFDataList
      }
    });
  });
};

module.exports = findEvent;
