import TicketAPI from './TicketAPI.jsx';

let EventsQuery = function EventsQuery() {
  const endpoint = '/Events';
  return new TicketAPI.Query('GET', endpoint);
};

export default EventsQuery;
