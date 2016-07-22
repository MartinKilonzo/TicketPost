import {enc} from 'crypto-js';

import {token, key, secret, host} from './Authentication.jsx';

let generateAuthToken = function generateAuthToken() {
  return 'Bearer ' + token;
};

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

let Query = function(requestType, product, query) {
  this.query = query;
  this.product = product;
  this.uri = host + this.product;
  this.authToken = generateAuthToken(key, secret);
  this.send = function send() {
    let xhrOptions = {
      uri: this.uri,
      authToken: this.authToken,
      query: this.query
    };
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(requestType, xhrOptions.uri, false);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', xhrOptions.authToken);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onload = function onLoad() {
        if (this.status == 429) {
          return reject({status: this.status, statusText: 'Request limit reached.'})
        }
        const response = JSON.parse(this.response);
        if (this.status == 200) { // If the response is good and the request is ready,
          return resolve(response);
        } else { // Otherwise, error
          const responseMessage = response.errors.error[0].errorMessage;
          let statusText = '';
          for (var char = 0; char < responseMessage.length; char++) {
            if (responseMessage[char]=== ';') {
              statusText += '.';
              break;
            }
            statusText += responseMessage[char];
          }
          return reject({status: this.status, statusText: statusText, statusObject: response});
        }
      };
      xhr.send(JSON.stringify(xhrOptions.query) || void 0);
    });
  }.bind(this);
};

let StubHub = {
  Query: Query,
  getURI: getURI
};

export default StubHub;
