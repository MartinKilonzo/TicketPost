'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

let processPDF = (file) => {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser();
      try {
        console.log(file);
        pdfParser.parseBuffer(file);
        console.log('win');
        return resolve('success');
      } catch (e) {
        reject(e);
      }
    // req.busboy.on('file', (fieldName, file, fileName, encoding, mimetype) => {
    //   console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    //   console.log('hooray x2');
    // });
  });
};

module.exports = processPDF;
