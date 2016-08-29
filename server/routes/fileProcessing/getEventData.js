'use strict';
const venueList = require('../formats/venues.js');

/**
 * Method: Converts an underscore-delimited string to a space delimited string.
 *
 * @param {String}str             - The string to convert
 * @return {String}               - The same string delimited with spaces instead of underscores
 */
let underscoreToTitleCase = str => {
  if (typeof str !== 'string') throw new Error('Input must be a string');
  let ret = '';
  for (var i = 0; i < str.length; i++) {
    const char = str[i];
    if (i === 0) {  // If its the first character, capitalize it and append it
      ret += char.toUpperCase();
    } else if (char === '_') {  // Otherwise, if the character is an underscore, replace it with a space and append it
      ret += ' ';
    } else if (ret[i - 1] === ' ') {  // Otherwise, if previous character in the return string is a space, append the current character, capitalized
      ret += char.toUpperCase();
    } else {  // Otherwise, append the character
      ret += char;
    }
  }
  return ret;
};

/**
 * Main Method: Searches through the textfields of a list of pdfs to find a matching (supported) venue to use to define the format/structure of future data queries of that ticket.
 *
 * @param PDFDataList[PDFData]    - An array containing JSON representations of PDFs
 */
let findEvent = (PDFDataList) => {
  return new Promise((resolve, reject) => {
    // Get the list of available venues
    const venues = venueList.venues;
    // Query each PDF in PDFDataList for an appropriate event type
    let venueDataList = [];
    // Search for each tickets event
    for (var pdf in PDFDataList) {
      venueDataList[pdf] = [];
      for (var page in PDFDataList[pdf]) {
        let ticket = PDFDataList[pdf][page];

        // Search the text to find both the venue and the event
        let ticketVenue;
        var i = 0;
        while ((typeof ticketVenue === 'undefined') && i < ticket.length) {
          const text = decodeURIComponent(ticket[i].R[0].T);
          // Find the venue
          for (var venue in venues) {
            const venueName = underscoreToTitleCase(venue);
            if (text.match(new RegExp(venueName, 'ig'))) {
              ticketVenue = venues[venue];
              ticketVenue.name = venueName;
              break;
            }
          }
          i++;
        }
        // If a venue was not found, and all text results have been exhausted, reject the ticket
        if (typeof ticketVenue === 'undefined') reject({
          message: 'Cannot find ticket venue.'
        });
        // Remove events field:
        let meta = {};
        for (var field in ticketVenue) {
          if (field !== 'venueData') meta[field] = ticketVenue[field];
        }
        // Otherwise, add the venue and event data to the list
        venueDataList[pdf][page] = ({
          venueData: ticketVenue.venueData,
          venue: meta
        });
      }
    }
    // If venue and event data was found for all tickets, resolve the result
    resolve({
      message: 'success',
      data: {
        venueData: venueDataList,
        files: PDFDataList
      }
    });
  });
};

module.exports = findEvent;
