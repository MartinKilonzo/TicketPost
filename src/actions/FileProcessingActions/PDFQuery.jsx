import TicketAPI from './TicketAPI.jsx';

let PDFQuery = function PDFQuery(eventData) {
  let query = {};
  let queryURI = '';
  for (var field in query) {
    if (typeof query[field] !== 'undefined') {
      // If the query string exists (length > 0), then append the ampersand
      if (queryURI.length) {
        queryURI += '&';
      }
      // Append the query to the query string
      queryURI += [field] + '=' + '"' + encodeURI(query[field]) + '"';
    }
  }
  const endpoint = '/';
  queryURI = endpoint + queryURI;
  return new TicketAPI.Query('GET', queryURI);
};

export default PDFQuery;
