import TicketUtils from './TicketUtils.jsx';

let EventQuery = function EventQuery(date, venue) {
  let query = {
    Page: 1,
    ItemsPerPage: 100,
    OrderBy: 0,
    VenueId: undefined,
    Name: undefined,
    VenueName: venue.name,
    FromEventDate: undefined,
    ToEventDate: undefined,
    EventDate: date,
    CategoryId: undefined,
    PerformerId: undefined,
    Country: venue.country,
    State: venue.state,
    City: venue.city,
    ZipCode: undefined,
    Latitude: undefined,
    Longitude: undefined,
    UpdatedSince: undefined,
    EventType: undefined,
    TBA: undefined
  };
  const queryProduct = '/POS/Events?';
  let queryURI = '';
  for (var field in query) {
    if (typeof query[field] !== 'undefined') {
      // If the query string exists (length > 0), then append the ampersand
      if (queryURI.length) {
        queryURI += '&';
      }
      // Append the query to the query string
      queryURI += [field] + '=' + encodeURI(query[field]);
    }
  }
  queryURI = queryProduct + queryURI;

  return new TicketUtils.Query('GET', queryURI); // TODO: Check if JSON or plain text
};

export default EventQuery;
