const router = require('express').Router();
const processPDF = require('./fileProcessing/processPDF.js');

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

router.post('/PDFProcessing', (req, res) => {
  processPDF(req.body)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('err', error);
      res.status(500).send(error);
    });
});

module.exports = router;
