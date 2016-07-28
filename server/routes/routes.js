var appRouter = app => {
  app.get('/', (req, res) => {
    res.send({text: 'no'});
  });
  app.get('/PDFProcessing', (req, res) => {
    if (typeof req.query.pdfs !== 'undefined') {
      res.send(req.query.pdfs);
    } else {
      res.send('Missing PDFs.');
    }
  });
};

module.exports = appRouter;
