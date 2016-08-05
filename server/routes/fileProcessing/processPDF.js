'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

let processPDF = (fileList) => {
  return new Promise((resolve, reject) => {
    let data = [];
    for (var file in fileList) {
      let pdfParser = new PDFParser();
      pdfParser.on('pdfParser_dataError', errData => reject({message: errData.parserError}) );
      pdfParser.on('pdfParser_dataReady', pdfData => {
          data.push(pdfData.formImage.Pages);
          if(data.length === fileList.length) {
            resolve({message: 'success', data: data});
          }
      });
      pdfParser.parseBuffer(fileList[file].buffer);
    }
  });
};

module.exports = processPDF;
