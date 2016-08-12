// import {enc} from 'crypto-js';

import {host} from './Authentication.jsx';
// let generateAuthToken = function generateAuthToken() {
//   return 'Bearer ' + token;
// };

let getURI = function getURI(endpoint, query) {
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
  return endpoint + '?' + queryURI;
}

//TODO: Create object for user actions, which use user tokens
let generateUserToken = function generateUserToken(key, secret) {
  return 'Bearer ' + enc.Base64.stringify(key + ':' + secret);
};

let Query = function(requestType, endpoint, query, progressListener) {
  this.query = query;
  this.endpoint = endpoint;
  this.uri = host + this.endpoint;
  // this.authToken = generateAuthToken(key, secret);
  this.send = function send() {
    let xhrOptions = {
      uri: this.uri,
      query: this.query,
      progressListener: progressListener
    };
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.addEventListener('load', xhrOptions.progressListener);
      xhr.open(requestType, xhrOptions.uri, false);
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onload = function onLoad() {
        if (this.status == 429) {
          return reject({status: this.status, statusText: 'Request limit reached.'})
        }
        const response = JSON.parse(this.response);
        if (this.status == 200) { // If the response is good and the request is ready,
          return resolve(response);
        } else { // Otherwise, error
          return reject({status: this.status, statusText: response.message, statusObject: response});
        }
      };
      if (typeof xhrOptions.query !== 'undefined') {
        xhr.send(xhrOptions.query);
      } else {
        xhr.send();
      }
    });
  }.bind(this);
};

let TicketAPI = {
  Query: Query,
  getURI: getURI
};

export default TicketAPI;
