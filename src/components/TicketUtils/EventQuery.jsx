import TicketUtils from './TicketUtils.jsx';

let EventQuery = function EventQuery(date, venue) {
  this.Page = 1;
  this.ItemsPerPage = 100;
  this.OrderBy = 0;
  this.VenueId = undefined;
  this.Name = undefined;
  this.VenueName = venue.name;
  this.FromEventDate = undefined;
  this.ToEventDate = undefined;
  this.EventDate = date;
  this.CategoryId = undefined;
  this.PerformerId = undefined;
  this.Country = venue.country;
  this.State = venue.state;
  this.City = venue.city;
  this.ZipCode = undefined;
  this.Latitude = undefined;
  this.Longitude = undefined;
  this.UpdatedSince = undefined;
  this.EventType = undefined;
  this.TBA = undefined;
  const queryProduct = '/POS/Events?';
  let queryURI = '';
  for (var field in this) {
    if (typeof this[field] !== 'undefined') {
      // If the query string is defined (length > 0), then append the ampersand
      if (queryURI.length) {
        queryURI += '&';
      }
      // Append the query to the query string
      queryURI += [field] + '=' + encodeURI(this[field]);
    }
  }
  queryURI = queryProduct + queryURI;

  this.uri = TicketUtils.API_HOST + queryURI;
  this.signature = TicketUtils.generateSignature(queryURI);
  this.token = TicketUtils.AUTH_TOKEN;
  this.version = TicketUtils.API_VERSION;
};

export default EventQuery;
