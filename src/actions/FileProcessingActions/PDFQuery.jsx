import TicketAPI from './TicketAPI.jsx';

let PDFQuery = function PDFQuery(fileList) {
  let query = new FormData();
  for (var i = 0; i < fileList.length; i++) {
    query.append('file' + i, fileList[i]);
  }
  for (var item of query.values()) {
    console.debug(item);
  }
  const endpoint = '/PDFProcessing';
  return new TicketAPI.Query('POST', endpoint, query);
};

export default PDFQuery;
