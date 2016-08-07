'use strict';
const parsePDF = require('./parsePDF.js');
const getTicketData = require('./getTicketData.js');

let ProcessPDF = {
  parsePDF: parsePDF,
  getData: getTicketData
};

module.exports = ProcessPDF;
