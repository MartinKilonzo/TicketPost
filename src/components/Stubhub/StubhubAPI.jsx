import {enc} from 'crypto-js';

import {token, key, secret, host} from './Authentication.jsx';

let generateAuthToken = function generateAuthToken() {
  return 'Bearer ' + token;
};

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
          return reject({status: this.status, statusText: response});
        }
      };
      xhr.send(JSON.stringify(xhrOptions.query) || void 0);
    });
  }.bind(this);
};

let StubHub = {
  Query: Query
};

export default StubHub;
