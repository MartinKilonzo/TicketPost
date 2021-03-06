'use strict';

const router = require('express').Router();
const multer = require('multer');

const processPDF = require('./fileProcessing/processPDF.js');

//TODO: Configure limit parameters
// const pdfLimits = multer.limits({
//   fileSize: 20 * 1024 * 1024
// });
const pdfStorage = multer.memoryStorage();
// const pdfStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './server/routes/fileProcessing/storage/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.pdf')
//   }
// });
const pdfFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') cb(null, false);
  if (file.size > 20 * 1024 * 1024) cb(null, false);
  cb(null, true);
};
const upload = multer({
  // limits: pdfLimits,
  storage: pdfStorage,
  fileFilter: pdfFilter
});

router.get('/', (req, res) => {
  res.send({
    message: 'woo'
  });
});
router.get('/Events', (req, res) => {
  let response;
  try {
    const events = require('./formats/venues.js');
    response = {
      message: 'success',
      data: eventList.listEvents()
    };
  } catch (e) {
    response = {
      message: e
    };
    res.status(error.status || 500);
  } finally {
    res.send(response);
  }
});

router.post('/PDFProcessing', upload.any(), (req, res) => {
  // let ticketType = JSON.parse(req.body.ticketType);
  console.log('Beginning File Parsing...');
  processPDF.parsePDF(req.files)
    .then(result => {
      console.log('Finished File Parsing.');
      console.log('Searching for Ticket Types...');
      return processPDF.getEventData(result.data);
    })
    .then(result => {
      console.log('Finished Search.');
      console.log('Beginning Data Extraction...');
      return processPDF.getData(result.data.files, result.data.venueData);
    })
    .then(data => {
      console.log('Finished Data Extraction.');
      console.log('sending results!');
      res.send(data);
    })
    .catch(error => {
      console.log('err', error);
      res.status(error.status || 500).send(error);
    });
});

router.post('/Test/ParsePDF', upload.any(), (req, res) => {
  let ticketType = {}; //req.body.ticketType;
  ticketType = {
    venue: 'Rogers Centre',
    ticketEvent: 'Blue Jays'
  };
  for (var field in ticketType) {
    ticketType[field] = ticketType[field].replace(' ', '');
  }
  console.log('Beginning File Parsing...');
  processPDF.parsePDF(req.files)
    .then(result => {
      console.log('Finished File Parsing.');
      console.log('Beginning Data Extraction...');
      res.send(result);
    })
    .catch(error => {
      console.log('err', error);
      res.status(error.status || 500).send(error);
    });
});

router.post('/Test/GetData', upload.any(), (req, res) => {
  let ticketType = {}; //req.body.ticketType;
  ticketType = {
    venue: 'Rogers Centre',
    ticketEvent: 'Blue Jays'
  };
  for (var field in ticketType) {
    ticketType[field] = ticketType[field].replace(' ', '');
  }
  console.log('Beginning File Parsing...');
  processPDF.parsePDF(req.files)
    .then(result => {
      console.log('Finished File Parsing.');
      console.log('Beginning Data Extraction...');
      return processPDF.getData(result.data, ticketType);
    })
    .then(data => {
      console.log('Finished Data Extraction.');
      console.log('sending results!');
      res.send(data);
    })
    .catch(error => {
      console.log('err', error);
      res.status(error.status || 500).send(error);
    });
});

module.exports = router;
