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
          zoneidlist: eventData.zoneidlist,
          sectionidlist: eventData.sectionidlist,
          zonestats: true,
          sectionstats: true
          // pricingsummary: true
        }
        const endpoint = '/search/inventory/v1';
        let queryURI = StubHub.getURI(endpoint, query);
        // let results = [];
        // new StubHub.Query('GET', queryURI).send()
        // .then(function success(result) {
        //   const listingsToFetch = results.rows;
        //   results = result.listing;
        //   let remaningListings = result.totalListings - listingsToFetch;
        //   let promises = [];
        //   query.start = listingsToFetch;
        //   while (query.start < remaningListings) {
        //     queryURI = StubHub.getURI(endpoint, query);
        //     console.debug(query.start, remaningListings);
        //     // promises.push(new StubHub.Query('GET', queryURI).send());
        //     query.start += listingsToFetch;
        //   }
        // });
        resolve(new StubHub.Query('GET', queryURI).send());
      }).catch(function error(err) {
        reject(err);
      });
    });
  };
};

export default InventoryQuery;
