import TicketAPI from './TicketAPI.jsx';

let PDFQuery = function PDFQuery(fileList, ticketType, listener) {
  let query = new FormData();
  for (var i = 0; i < fileList.length; i++) {
    query.append('file' + i, fileList[i]);
  }
  query.append('ticketType', JSON.stringify(ticketType));
  const endpoint = '/PDFProcessing';
  return new TicketAPI.Query('POST', endpoint, query, listener);
};

export default PDFQuery;
