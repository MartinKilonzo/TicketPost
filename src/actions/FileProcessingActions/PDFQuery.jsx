import TicketAPI from './TicketAPI.jsx';

let PDFQuery = function PDFQuery(fileList) {
  const endpoint = '/PDFProcessing';
  return new TicketAPI.Query('POST', endpoint, fileList);
};

export default PDFQuery;
