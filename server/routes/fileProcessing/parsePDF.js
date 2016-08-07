'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

let parsePDF = (fileList) => {
  return new Promise((resolve, reject) => {
    let fileDataList = [];
    for (var file in fileList) {
      parse(fileList, fileList[file], fileDataList, resolve, reject);
    }
  });
};

let parse = (fileList, file, dataList, resolve, reject) => {
  let pdfParser = new PDFParser();
  pdfParser.on('pdfParser_dataError', errData => reject({messsage: errData.parserError}));
  pdfParser.on('pdfParser_dataReady', pdfData => {
    // Save only the textual data
    let textData = [];
    for (var page in pdfData.formImage.Pages) {
      textData.push(pdfData.formImage.Pages[page].Texts)
    }
    const fileIndex = file.fieldname.replace('file', '');
    dataList[fileIndex] = textData;
    // When the last file is reached, send the text data for processing
    if (dataList.length === fileList.length) {
      resolve({message: 'success', data: dataList});
    }
  });
  pdfParser.parseBuffer(file.buffer);
};

module.exports = parsePDF;
