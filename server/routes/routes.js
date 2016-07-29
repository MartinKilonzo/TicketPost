var appRouter = app => {
  app.get('/', (req, res) => {
    res.send({result: 'woo'});
  });
  app.get('/api', (req, res) => {
    res.send({result: 'soo'});
  });
  app.get('/PDFProcessing', (req, res) => {
    res.send(req.files);
    if (typeof req.query.pdfs !== 'undefined') {
      res.send(req.query.pdfs);
    } else {
      res.send('Missing PDFs.');
    }
  });
};

module.exports = appRouter;
