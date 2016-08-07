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
router.get('/api', (req, res) => {
  res.send({
    message: 'soo'
  });
});

router.post('/PDFProcessing', upload.any(), (req, res) => {
  let ticketType = {};//req.body.ticketType;
  ticketType = {venue: 'Rogers Centre', ticketEvent: 'Blue Jays'};
  for (var field in ticketType) {
    ticketType[field] = ticketType[field].replace(' ', '');
  }
  console.log(ticketType);
  processPDF.parsePDF(req.files)
    .then(result => {
      return processPDF.getData(result.data, ticketType);
    })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log('err', error);
      res.status(500).send(error);
    });
});

module.exports = router;
