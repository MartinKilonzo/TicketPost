import StubHub from './StubHubAPI';
import EventQuery from './EventQuery.jsx';

let InventoryQuery = function InventoryQuery(eventData) {
  this.send = function send() {
    return new Promise(function(resolve, reject) {
      let eventQuery = new EventQuery(eventData);
      eventQuery.send().then(function success(result){
        if (result.numFound > 10) {
          //TODO: Find workaround for using date in the request
          throw new Error('Too many results!');
        }
        let matchingEvent;
        result.events.forEach(function findEvent(eventResult) {
          if (eventResult.eventDateLocal.match(eventData.Date)) {
            matchingEvent = eventResult;
          }
        });
        if (typeof matchingEvent === 'undefined') {
          throw new Error('Event cannot be found.');
        }
        let query = {
          eventid: matchingEvent.id,
          zonestats: true,
          sectionstats: true,
          pricingstats: true,
        }
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
        const endpoint = '/search/inventory/v1';
        queryURI = endpoint + '?' + queryURI;
        console.debug(queryURI);
        resolve(new StubHub.Query('GET', queryURI).send());
      }).catch(function error(err) {
        reject(err);
      });
    });
  };
};

export default InventoryQuery;
