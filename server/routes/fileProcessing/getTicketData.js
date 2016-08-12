'use strict';
const sortData = require('./mergeSort.js');

// const DataFormats = require('./DataFormats/DataFormats');

let getTicketData = (PDFDataList, ticketType) => {
  return new Promise((resolve, reject) => {
    // const format = DataFormats[ticketType.venue][ticketType.ticketEvent];
    try {
      const format = require('./DataFormats/Venues/' + ticketType.venue + '/' + ticketType.ticketEvent + '.js');
      let result = [];
      for (var pdf in PDFDataList) {
        console.log('\t Processing File %s of %s', pdf, PDFDataList.length);
        result[pdf] = [];
        let ticketSet = PDFDataList[pdf];
        for (var ticket in ticketSet) {
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
          // TODO: Compare headers of various sizes when no close match is found
          // Check to make sure all fields have data
          for (var data in format) {
            if (typeof dataValues[data] === 'undefined') reject({
              message: 'Error: Missing Field Data \'' + data + '.\''
            });
          }
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
