import {HmacSHA256, enc} from 'crypto-js';

import {host, token, secret, version} from './Authentication.jsx'

let generateSignature = function generateSignature(pathAndQuery) {
  return HmacSHA256(decodeURI(pathAndQuery), secret).toString(enc.Base64);
};

let Query = function(requestType, product, query) {
  this.query = query;
  this.product = product;
  this.uri = host + this.product;
  this.signature = generateSignature(this.product);
  this.token = token;
  this.version = version;
  this.send = function send() {
    let xhrOptions = {
      uri: this.uri,
      signature: this.signature,
      token: this.token,
      version: this.version,
      query: this.query
    };
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(requestType, xhrOptions.uri, false);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('X-Signature', xhrOptions.signature);
      xhr.setRequestHeader('X-Token', xhrOptions.token);
      xhr.setRequestHeader('X-API-Version', xhrOptions.version);
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

let TicketUtils = {
  Query: Query
};

export default TicketUtils;
