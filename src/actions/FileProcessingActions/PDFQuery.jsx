import TicketAPI from './TicketAPI.jsx';

let PDFQuery = function PDFQuery(fileList) {
  const endpoint = '/api';
  return new TicketAPI.Query('GET', endpoint, fileList);
};

export default PDFQuery;
