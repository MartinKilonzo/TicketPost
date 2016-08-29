'use strict';
const sortData = require('./mergeSort.js');

// const DataFormats = require('./DataFormats/DataFormats');

let getTicketData = (PDFDataList, venueDataList) => {
  return new Promise((resolve, reject) => {
    // const format = DataFormats[ticketTypes.venue][ticketTypes.ticketEvent];
    try {
      // SEARCH FOR DATA //
      let result = [];
      for (var pdf in PDFDataList) {
        console.log(`\t Processing File ${ pdf } of ${ PDFDataList.length}`);
        result[pdf] = [];
        let ticketSet = PDFDataList[pdf];
        for (var ticket in ticketSet) {
          // Get format, edits and flag data from events API
          const format = venueDataList[pdf][ticket].venueData.format;
          const edits = venueDataList[pdf][ticket].venueData.edits;
          const flags = venueDataList[pdf][ticket].venueData.flags;
          // Initialization of variables
          result[pdf][ticket] = {};
          let dataHeaders = {};
          let dataValues = {};
          for (var field in format) {
            dataHeaders[field] = [];
            dataValues[field] = [];
          }
          //Sort by text size
          let sortedText = sortData(ticketSet[ticket], 'descending', comparator, ['R', '0', 'TS', '1']);
          // Search text for features found in format
          sortedText.forEach(textField => {
            const text = decodeURIComponent(textField.R[0].T);
            // Look for the big headers that match fields in the ticket
            for (var data in format) {
              const header = format[data].label;
              const value = format[data].value;
              if (text.match(header)) dataHeaders[data].push(textField);
              if (text.match(value)) dataValues[data].push(textField);
            }

            // Also look for flagged attributes that are important to the ticket
            for (var flag in flags) {
              const flagText = flags[flag].label;
              if (text.match(flagText)) result[pdf][ticket][flag] = true;
            }
          });
          // Pick the value closest to the large header text as the correct value
          for (var field in dataValues) {
            let minDistance = Number.POSITIVE_INFINITY;
            const header = dataHeaders[field][0];
            let matchedValue;
            dataValues[field].forEach(value => {
              const distance = getDistance(header, value);
              if (distance < minDistance) {
                matchedValue = decodeURIComponent(value.R[0].T);
                minDistance = distance;
              }
            });
            result[pdf][ticket][field] = matchedValue;
            if (!result[pdf]) console.log(pdf, result[pdf]);
          }
          // END SEARCH FOR DATA //

          // ADD MISC DATA //
          //Finally, check to see if any flags have been found in order to set the false flags:
          for (var flag in flags) {
            if (!result[pdf][ticket][flag]) result[pdf][ticket][flag] = false;
          }

          // And, add the venue and the event data to the ticket
          result[pdf][ticket].venue = venueDataList[pdf][ticket].venue;
          // END ADD MISC DATA //

          // CLEAN DATA //
          // Apply finishing touches
          edits(result[pdf][ticket]);
          // Check to make sure all fields have data
          // TODO: Compare headers of various sizes when no close match is found
          // TODO: make sure all data is formatted correctly
          for (var data in format) {
            const dataType = typeof dataValues[data][0];
            if (dataType === 'undefined' || dataType.length === 0) {
              reject({
                message: 'Error: Cannot find: \'' + data + '\'.'
              });
            } else if (data === 'date') {
              const dateStr = result[pdf][ticket][data].slice(-3);
              if (!dateStr.match(/\s[A-Z]{2}/gi)) {
                result[pdf][ticket][data] = result[pdf][ticket][data].slice(0, -2) + ' ' + result[pdf][ticket][data].slice(-2);
              }
            }
          }
          // END CLEAN DATA //
        }
      }
      // result.forEach(file => {
      //   console.log(file);
      // })
      resolve({
        message: 'success',
        data: result
      });
    } catch (e) {
      reject({
        message: 'Sorry! That event is not supported just yet.',
        data: e
      });
    }
  });
}

let getDistance = (start, end) => {
  return Math.sqrt((end.x - start.x) * (end.x - start.x) + (end.y - start.y) * (end.y - start.y));
};

let comparator = (val1, val2) => {
  if (val1 >= val2) return true;
  return false;
}

module.exports = getTicketData;
