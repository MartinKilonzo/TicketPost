'use strict';
const parsePDF = require('./parsePDF.js');
const getEventData = require('./getEventData.js');
const getTicketData = require('./getTicketData.js');

let ProcessPDF = {
  parsePDF: parsePDF,
  getEventData: getEventData,
  getData: getTicketData
};

module.exports = ProcessPDF;
