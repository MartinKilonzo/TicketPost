'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

let parsePDF = (fileList) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    let fileDataList = [];
    for (var file in fileList) {
      console.log('\t Processing File %s of %s', file, fileList.length);
      promises.push(parse(fileList[file]));
    }
    Promise.all(promises)
    .then(result => {
      result.forEach(file => {
        fileDataList[file.index] = file.data;
      })
      resolve({message: 'succes', data: fileDataList});
    })
    .catch(error => {
      reject(error);
    });
  });
};

let parse = file => {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataError', errData => reject({
      messsage: errData.parserError
    }));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      // Save only the textual data
      let textData = [];
      for (var page in pdfData.formImage.Pages) {
        textData.push(pdfData.formImage.Pages[page].Texts)
      }
      const fileIndex = file.fieldname.replace('file', '');
      resolve({index: fileIndex, data: textData});
      // When the last file is reached, send the text data for processing
    });
    pdfParser.parseBuffer(file.buffer);
  });
};

module.exports = parsePDF;
