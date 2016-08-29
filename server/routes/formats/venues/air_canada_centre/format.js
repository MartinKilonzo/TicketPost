'use strict';

var TICKET_DATA = {
  section: {
    label: /SECTION/ig,
    value: /\d{3}/
  },
  row: {
    label: /ROW/ig,
    value: /\d{1,3}/
  },

  seat: {
    label: /SEAT/ig,
    value: /\d{1,3}/
  },
  date: {
    label: /[A-Z]{6,9}\s[A-Z]{3,9}\s\d{1,2}[,]?\s\d{4}/i,
    value: /[A-Z]{6,9}\s[A-Z]{3,9}\s\d{1,2}[,]?\s\d{4}/i
  },
  time: {
    label: /\d{1,2}\:\d{2}[\s]?[A-Z]{2}/i,
    value: /\d{1,2}\:\d{2}[\s]?[A-Z]{2}/i
  },
  serial: {
    label: /\d{4}\s\d{4}\s\d{4}/,
    value: /\d{4}\s\d{4}\s\d{4}/
  }
  // orderNumber: {
  //   label: /\d{2}-\d{5}\s[A-z][A-z][A-z0-9]/,
  //   value: /\d{2}-\d{5}\s[A-z][A-z][A-z0-9]/
  // }
};

let TICKET_FLAGS = {
  noVideo: {
    label: /No Video/ig
  }
};

var edits = function(ticket) {
  // The date and time are found seperately, so combine time
  if (ticket.date.charAt(ticket.date.length - 3) === ' ') {
    ticket.date = ticket.date.slice(0, -3) + ticket.date.slice(-2);
  }
  ticket.date += ' ' + ticket.time;
};

module.exports = {
  format: TICKET_DATA,
  flags: TICKET_FLAGS,
  edits: edits
};
