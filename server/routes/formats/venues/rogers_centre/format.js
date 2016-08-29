'use strict';

var TICKET_DATA = {
  section: {
    label: /Section/ig,
    value: /\d{3}[A-Z]{1,2}/
  },
  row: {
    label: /Row/ig,
    value: /\d{1,3}/
  },

  seat: {
    label: /Seat/ig,
    value: /\d{1,3}/
  },
  date: {
    label: /[A-Z]{3}\s[A-Z]{3,4}\s\d{1,2}[,]?\s\d{4}\s\d{1,2}\:\d{2}[\s]?[A-Z]{2}/i,
    value: /[A-Z]{3}\s[A-Z]{3,4}\s\d{1,2}[,]?\s\d{4}\s\d{1,2}\:\d{2}[\s]?[A-Z]{2}/i
  },
  serial: {
    label: /\d{4}\s\d{4}\s\d{4}/,
    value: /\d{4}\s\d{4}\s\d{4}/
  }
};

let TICKET_FLAGS = {
  noVideo: {
    label: /No Video/ig
  }
};


let edits = function(ticket) {
};

module.exports = {
  format: TICKET_DATA,
  flags: TICKET_FLAGS,
  edits: edits
};
