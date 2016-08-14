'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

let parsePDF = (fileList) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    let fileDataList = [];
    for (var file in fileList) {
      console.log(`\t Processing File ${ file } of ${ fileList.length}`);
      promises.push(parse(fileList[file]));
    }
    Promise.all(promises)
    .then(results => {
      results.forEach(file => {
        fileDataList[file.index] = file.data;
      })
      resolve({message: 'success', data: fileDataList});
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
        const texts = pdfData.formImage.Pages[page].Texts;
        if (texts.length === 0) reject({status: 400, message: 'Invalid PDF.'});
        textData.push(texts)
      }
      const fileIndex = file.fieldname.replace('file', '');
      resolve({index: fileIndex, data: textData});
      // When the last file is reached, send the text data for processing
    });
    pdfParser.parseBuffer(file.buffer);
  });
};

module.exports = parsePDF;
