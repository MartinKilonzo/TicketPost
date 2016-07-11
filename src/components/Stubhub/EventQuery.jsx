import StubHub from './StubHubAPI.jsx';

let EventQuery = function EventQuery(eventData) {
  let query = {
    q: eventData.Name,
    city: eventData.Venue.City,
    state: eventData.Venue.State,
    country: eventData.Venue.Country
  }
  let queryURI = '';
  for (var field in query) {
    if (typeof query[field] !== 'undefined') {
      // If the query string exists (length > 0), then append the ampersand
      if (queryURI.length) {
        queryURI += '&';
      }
      // Append the query to the query string
      queryURI += [field] + '=' + '"' + encodeURI(query[field])+ '"';
    }
  }
  const endpoint = '/search/catalog/events/v3';
  queryURI = endpoint + '?' + queryURI;
  return new StubHub.Query('GET', queryURI);
};

export default EventQuery;
