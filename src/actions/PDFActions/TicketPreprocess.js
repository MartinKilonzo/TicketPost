/**
 * Extracts tickets which have errors to be later used for bug-hunting and to be processed manually.
 */

/* global addAnnot, addField, app, , color, deletePages, exportAsText, , extractPages, getPageNumWords, getPageNthWord, getPageNthWordQuads, movePage, newPage, removeField */
/* eslint no-console: ["error", { allow: ["println","show", "clear"] }] */

console.clear();
/**  CONSTRUCTORS **/

/**
 * Constructor: TicketData Objects take a set number of pages and a predefined list of
 * formats and act as a store for TicketData. Contains many powerful functions to perform on said data.
 *
 * @param {Int} pages             - The number of pages in the PDF
 * @param {Object[]} formats      - A list of fields, with each entry containing two RegExp objects:
                                    'string,' used to query the PDF, and
                                    'value,' used to query the string for a value to store'
 * @return {void}
 */
var TicketData = function TicketData(pages, formats) {
  this.pages = pages;
  this.formats = formats;
  this.queries = {};
  this.tickets = [];
  this.remove = [];
  for (var i = 0; i < this.pages; i++) {
    this.tickets[i] = {};
  }
};

/**
 * Setter: Creates a new data entry for querying and storing ticket data. Will
 * use preloaded templates if none are provided.
 *
 * @param {String} field          - The name of the field to add
 * @param {String} textString     - (Optional) The format of the string to query for
 * @param {String} dataString     - (Optional) The format of the data to query for
 * @return {void}
 */
TicketData.prototype.newData = function newData(field, textString, dataString) {
  var text = textString || this.formats[field].string;
  var value = dataString || this.formats[field].value;
  this.queries[field] = new TextId(text, value);
};

/**
 * Setter: Adds data to an existing data entry. Attempts to remove pages that have errors.
 *
 * @param {String} field          - The label under which the data will be stored
 * @param {Int} page              - The page to make the query
 * @return {void}
 */
TicketData.prototype.addData = function addData(field, page) {
  var data = this.queries[field].getValue(page);
  if (data) {
    this.tickets[page][field] = data.toString();
  } else {
    this.remove.push(page);
  }
};

/**
 * Method: Redacts data from the ticket.
 *
 * @param {String} field          - The label of the data to be redacted
 * @param {Int} page              - The page where the data is stored
 * @return {void}
 */
TicketData.prototype.redactData = function redactData(field, page) {
  this.tickets[page][field] = this.queries[field].redactValue(page);
};

/**
 * Method: Getter the data for the ticket on a given page.
 *
 * @param {Int} page              - The page from which to source the data
 * @return {Object}               - A Javascript object containing the data for the ticket on the given page
 *                                  Returns an empty object if no data exists or none has been querried.
 */
TicketData.prototype.getData = function getData(page) {
  var ret = {};
  for (var field in this.tickets[page]) {
    if (this.tickets[page][field]) {
      ret[field] = this.tickets[page][field];
    }
  }
  return ret;
};

/**
 * Getter: Exports the data for every ticket in the TicketData object to a text file.
 *
 * @return {void}
 */
TicketData.prototype.exportDataAsText = function exportDataAsText() {
  // Generate string
  var fields = [];
  for (var page = 0; page < this.pages; page++) {
    var data = ticketData.getData(page);
    var tempFieldName = 'ticket' + page;
    fields.push(tempFieldName);
    // add a temporary text field
    var dField = addField({
      cName: tempFieldName,
      cFieldType: 'text',
      nPageNum: 0,
      oCoords: [30, 30, 100, 20]
    });
    dField.value = '\\r' + data.date + '\t' + data.section + '\t' + data.row + '\t' + data.seat + '\t' + data.serial;
  }
  // export field name and value to defined file
  exportAsText({
    aFields: fields,
    cPath: './' + DOCUMENT_FILE_NAME.replace('.pdf', '') + '_data.txt'
  });
  // remove text field
  for (page = 0; page < fields.length; page++) {
    removeField(fields[page]);
  }
};

/**
 * Getter: Returns the data for the ticket on a given page.
 *
 * @param {String} field          - The feild from which the instances are saught
 * @param {String} instanceType   - The type (redactions or extractions) of the instance
 * @return {Int}                  - The number of instances for the given field and type
 */
TicketData.prototype.getInstances = function getInstances(field, instanceType) {
  return this.queries[field].instances[instanceType];
};

/**
 * Method: Uses MergeSort to sort the tickets of a PDF file in ascending order of:
 * Date > Section > Row > Seat.
 *
 * @return {void}
 */
TicketData.prototype.sortTickets = function sortTickets() {
  var temp = [];
  var pageIndexes = [];
  for (var i = 0; i < this.tickets.length; i++) {
    temp[i] = {
      page: i,
      ticket: this.tickets[i]
    };
    pageIndexes[i] = i;
  }
  var sorted = mergeSort(temp);
  for (i = 0; i < sorted.length; i++) {
    var sortedPage = sorted[i];
    var page = pageIndexes[sortedPage.page];
    try {
      movePage(page);
      for (var j = 0; j < pageIndexes.length; j++) {
        if (pageIndexes[j] > page) {
          pageIndexes[j]--;
        }
      }
      pageIndexes[sortedPage.page] = this.pages - 1;
      this.tickets[i] = sorted[i].ticket;
    } catch (e) {
      app.alert('Failed to Move File:\n' + e + '\n' + ticketToString(sortedPage.ticket) + '\n' + sortedPage.page);
    }
  }
};

/**
 * Helper Method: Returns a formatted string of at tickets contents using its
 * Date, Section, Row, and Seat.
 *
 * @param {Object} ticket         - A Javascript object containing the fields date, section, row, and seat as Strings
 * @return {String}               - A formatted string using an Object's date, section, row, and seat fields
 */
var ticketToString = function printTicket(ticket) {
  return ticket.date + ' ' + ticket.section + ' ' + ticket.row + ' ' + ticket.seat;
};

/**
 * Helper Method: Preforms the merging and requests the sorting from a helper function
 * to execute MergeSort on a set of Ticekts.
 *
 * @param {Object[]} list         - An (unsorted) list of Tickets
 * @return {Object[]} list        - A sorted list of Tickets
 */
var mergeSort = function mergeSort(list) {
  if (list.length < 2) {
    return list;
  }
  var leftList = mergeSort(list.slice(0, (list.length + 1) / 2));
  var rightList = mergeSort(list.slice((list.length + 1) / 2, list.length));
  return mergeLists(leftList, rightList);
};

/**
 * Helper Method: Preforms the sorting at the request of mergeSort(list)
 * to execute MergeSort on a set of Ticekts.
 *
 * @param {Object[]} leftList     - An (unsorted) list of Tickets
 * @param {Object[]} rightList    - An (unsorted) list of Tickets
 * @return {Object[]} list        - A sorted, merged list containing Tickets from both lists
 */
var mergeLists = function mergeLists(leftList, rightList) {
  var ret = [];
  var l = 0;
  var r = 0;
  while (l < leftList.length && r < rightList.length) {
    var lDate = leftList[l].ticket.date;
    var rDate = rightList[r].ticket.date;
    if (!lDate.charAt(lDate.length - 3).match(/\s/)) lDate = lDate.slice(0, -2) + ' ' + lDate.slice(-2);
    if (!rDate.charAt(rDate.length - 3).match(/\s/)) rDate = rDate.slice(0, -2) + ' ' + rDate.slice(-2);
    lDate = new Date(lDate);
    rDate = new Date(rDate);
    if (lDate < rDate) {
      ret.push(leftList[l++]);
    } else if (lDate > rDate) {
      ret.push(rightList[r++]);
    } else {
      var lSection = parseInt(leftList[l].ticket.section.match(/\d{1,3}/), 10);
      var rSection = parseInt(rightList[r].ticket.section.match(/\d{1,3}/), 10);
      if (lSection < rSection) {
        ret.push(leftList[l++]);
      } else if (lSection > rSection) {
        ret.push(rightList[r++]);
      } else {
        lSection = leftList[l].ticket.section.slice(3);
        rSection = rightList[r].ticket.section.slice(3);
        if (lSection < rSection) {
          ret.push(leftList[l++]);
        } else if (lSection > rSection) {
          ret.push(rightList[r++]);
        } else {
          var lRow = parseInt(leftList[l].ticket.row, 10);
          var rRow = parseInt(rightList[r].ticket.row, 10);
          if (lRow < rRow) {
            ret.push(leftList[l++]);
          } else if (lRow > rRow) {
            ret.push(rightList[r++]);
          } else {
            var lSeat = parseInt(leftList[l].ticket.seat, 10);
            var rSeat = parseInt(rightList[r].ticket.seat, 10);
            if (lSeat < rSeat) {
              ret.push(leftList[l++]);
            } else if (lSeat > rSeat) {
              ret.push(rightList[r++]);
            } else {
              if (DEBUG) {
                console.println('Duplicate?');
                return;
              } else {
                app.alert('Duplicate?');
              }
            }
          }
        }
      }
    }
  }
  while (l < leftList.length) {
    ret.push(leftList[l++]);
  }
  while (r < rightList.length) {
    ret.push(rightList[r++]);
  }
  return ret;
};

/**
 * Method: Removes any pages that have been marked as having undefined data so as to
 * prevent errors when processing or when posting to the API.
 *
 * @return {void}
 * @throws alerts for failed page extractions or failed page deletions.
 */
TicketData.prototype.removeErrors = function removeErrors() {
  var lastPage = this.pages + 1;
  while (this.remove.length > 0) {
    var page = this.remove.pop();
    if (page < lastPage) {
      try {
        extractPages({
          nStart: page,
          cPath: '../Error/.ERROR - ' + DOCUMENT_FILE_NAME + ' - page - ' + page + '.pdf'
        });
        // If there is only one page left in the original document, insert a blank page
        // so that the last page can be removed.
        if (this.pages === 1) {
          newPage(1);
        }
        try {
          deletePages(page);
          this.pages--;
        } catch (e) {
          app.alert('Failed to remove page: ' + page + ', as it cannot be processed.\nPlease manually remove it and restart the procedure.\nError:\n' + e);
        }
      } catch (e) {
        app.alert('Failed to save File:\n' + e, 0);
      } finally {
        lastPage = page;
      }
    }
  }
};

/**
 * Method: Status. Compares a ticket against another to see if it belongs to a new ticket grouping.
 *
 * @param {Int} page              - The page referring to the ticket
 * @return {Boolean}              - True if the ticket belongs to a new ticket group; False otherwise
 */
TicketData.prototype.isNewTicketGroup = function isNewTicketGroup(page) {
  if (page) {
    // If the prev page does not exist (ie. is beyond the total pages), then this is the end of the ticket group
    if (page === this.pages - 1) {
      return true;
    }
    var prevPage = page - 1;
    // If there is a different row, then this page marks the end of a ticket group
    var currRow = this.tickets[page].row;
    var prevRow = this.tickets[prevPage].row;
    if (currRow !== prevRow) {
      return true;
    }
    // If there is a different section, then this page marks the end of a ticket group
    var currSection = this.tickets[page].section;
    var prevSection = this.tickets[prevPage].section;
    if (currSection !== prevSection) {
      return true;
    }

    // If there is a different date, then this page marks the end of a ticket group
    var currDate = this.tickets[page].date;
    var prevDate = this.tickets[prevPage].date;
    if (currDate !== prevDate) {
      return true;
    }
  }
  return false;
};

/**
 * Constructor: TextId Objects take a Regular Expression Sequence input and query the
 * document for instances of that sequence.
 *
 * @param {RegExp} regExpText         - The RegExp pattern that matches the text pattern to find
 * @param {RegExp} regExpValidation   - The RegExp pattern that matches the value to extract
 * @return {void}
 */
var TextId = function TextId(regExpText, regExpValidation) {
  this.text = regExpText; // The RegExp pattern that matches the text pattern to find
  this.validation = regExpValidation; // The RegExp pattern that matches the value to extract
  this.page = 0; // The number of pages in the document
  this.textIds = []; // The list containing the indexes of all processed instances of regExpText
  this.instances = {
    redactions: 0,
    extractions: 0
  }; // A counter that keeps track of the number of operatios performed
  this.getText(this.page); // Call made to populate this.textIds for the first page
};

/** FUNCTIONS AND METHODS **/

/**
 * Helper Method: Finds text in a PDF to redact given an input string, and returns its index.
 *
 * @param {int} page        - The page to search
 * @param {RegExp[]} text   - The text to find as an array of RegExp objects
 * @return {int[]}          - An array containing the indexes of the text
 */
var findTextOnPage = function findTextOnPage(page, text) {
  if (DEBUG) {
    console.println('---------- SEARCHING FOR TEXT ---------');
    console.println('searching for \"' + text + '\" ...');
  }
  var indexes = [];
  var pageWords = getPageNumWords(page);
  for (var i = 0, j = 0; i < pageWords; i++, j = 0) {
    // Seach for a match between the first part of the string and the text
    while (getPageNthWord(page, i + j, false).match(text[j])) {
      if (j === text.length - 1) {
        j = 0;
        while (j < text.length) {
          if (DEBUG) {
            // console.println('Index ' + (i + j) + ': ' + getPageNthWord(page, i + j));
          }
          indexes.push(i + j);
          j++;
        }
        if (DEBUG) {
          console.println('found \"' + text + '\" at ' + indexes);
          console.println('---------- END SEARCHING FOR TEXT ---------');
        }
        return indexes;
      }
      j++;
    }
  }
  if (DEBUG) {
    console.println('could not find \"' + text + '\".');
    console.println('---------- END SEARCHING FOR TEXT ---------');
  }
  return indexes;
};

/**
 * Method: Used to return the IDs (indexes) of the text matching the object's TextId.Text
 * field. Uses dynamic programming to determine if the index matches the previously found instance,
 * and if this fails, searches through the text for the sequence. Once found, the array of indexes
 * is stored in the object's TextId.textIds[page] field.
 *
 * @param {int} page               - The page in which to search
 * @param {RegExp} inputTextFormat - Optional. Field to override the object's TextId.text field for the search
 * @return {void}
 */
TextId.prototype.getText = function getText(page, inputTextFormat) {
  this.page = page;
  var textFormat = inputTextFormat;
  if (!textFormat) {
    textFormat = this.text;
  }
  var lastTextIds = this.textIds[page - 1];
  if (page > 0 && lastTextIds.length > 0 && getPageNumWords(page - 1) === getPageNumWords(page)) {
    //TODO: Check last find against both the value and the string (label)
    // If textIds are provided, test them against the text format provided, but only if they come from docs with the same word count:
    if (DEBUG) {
      console.println('Attempting to reuse word id for ' + this.text + ' ...');
    }
    // Use the previous page's indices to test the current pages indices for matches
    var i = 0;
    var str = '';
    while (getPageNthWord(page, lastTextIds[i], false).match(textFormat[i])) {
      str += getPageNthWord(page, lastTextIds[i], false);
      if (i === textFormat.length - 1) {
        if (DEBUG) {
          console.println('Test Success: ' + str + ' against ' + textFormat);
        }
        // Given a match, set the current page IDs to match the previous's
        this.textIds[page] = lastTextIds;
        return;
      }
      i++;
    }
    // Otherwise it failed. Fall through into the default case of searching for it manually
    if (DEBUG) {
      console.println('Test Failed on Page ' + (page - 1) + ' Against: ' + textFormat);
    }
  }
  // If the textId or textFormat were not provied, or the text did not match the textFormat, search for it manually and return its finidngs
  this.textIds[page] = findTextOnPage(page, this.text);
};

/**
 * Method: Primary method. Used to retrieve the value(s) from the document matching specific
 * criteria defined in the object's TextId.text and TextId.validation fields, given a specific page.
 *
 * @param {int} page            - The page from which to retrieve the value(s)
 * @return {String}{null}       - The string value from the document or null if the page is undefined or the value could not be found
 */
TextId.prototype.getValue = function getValue(page) {
  // If the page is undefined, return null
  if (page !== 0 && !page) {
    return null;
  }
  this.instances.extractions++;
  // If the text has not been found previously (ID has been saved), search for it
  if (!this.textIds[page]) {
    this.getText(page);
  }
  // Return the value
  return this.toString(page).match(this.validation);
};

/**
 * Method: Creates a string using the text found from the document using the object's
 * TextId.text field, given a specific page.
 *
 * @param {int} page      - The page from which to retrieve the text for the string
 * @return {String}       - The string created from the text
 */
TextId.prototype.toString = function toString(page) {
  var str = '';
  var p = page >= 0 ? page : this.page;
  this.textIds[page].forEach(function forEach(word) {
    str += getPageNthWord(p, word, false);
  }, this);
  return str;
};

/**
 * Method: Redacts text given a page and a text number by creating a redaction annotation.
 *
 * @param {int} page - The page number where the text appears
 * @returns {void}
 */
TextId.prototype.redactValue = function redactValue(page) {
  this.textIds[page].forEach(function forEach(word) {
    // Create the redaction annoation given the input page and text index:
    addAnnot({
      type: 'Redact',
      page: page,
      quads: getPageNthWordQuads(page, word),
      alignment: 1, // Center alignment
      strokeColor: color.white,
      fillColor: color.white
    });
    this.instances.redactions++;
  }, this);
};

/** END FUNCTIONS AND METHODS **/


/** MAIN **/

//  DEFINITIONS //
var PAGES = this.numPages; // The number of PAGES in the PDF
var DEBUG = false;
var DOCUMENT_FILE_NAME = this.documentFileName;

// TODO: FLAG FOR DIFFERENT TICKET TYPES
var TICKET_DATA = {
  section: {
    string: [/ection:/i, /\d{3}[A-Z]?/],
    value: /\d{3}[A-Z]?/
  },
  row: {
    string: [/Row:/i, /\d{1,3}/],
    value: /\d{1,3}/
  },

  seat: {
    string: [/Seat:/i, /\d{1,3}/],
    value: /\d{1,3}/
  },
  date: {
    string: [/(Mon\s|Tue\s|Wed\s|Thu\s|Fri\s|Sat\s|Sun\s)/i, /[A-Z]{3,4}/i, /\d{1,2}[,]?/, /\d{4}/, /\d{1,2}:/, /\d{2}(am|pm)?/, /(am|pm)?/i],
    value: /[A-Z]{3}\s[A-Z]{3,4}\s\d{1,2}[,]?\s\d{4}\s\d{1,2}\:\d{2}[\s]?[A-Z]{2}/i
  },
  serial: {
    string: [/\d{4}/, /\d{4}/, /\d{4}/],
    value: /\d{4}\s\d{4}\s\d{4}/
  },
  orderNumber: {
    string: [/\d{2}-/, /\d{5}/, /[A-z][A-z][A-z0-9]/],
    value: /\d{2}-\d{5}\s[A-z][A-z][A-z0-9]/
  }
};
//  END DEFINITIONS //
if (DEBUG) {
  console.clear();
  console.show();
}
// INITIALIZATION
var ticketData = new TicketData(PAGES, TICKET_DATA);
ticketData.newData('section');
ticketData.newData('row');
ticketData.newData('seat');
ticketData.newData('date');
ticketData.newData('serial');
for (var page = 0; page < PAGES; page++) {
  // Find the text and save it
  ticketData.addData('section', page);
  ticketData.addData('row', page);
  ticketData.addData('seat', page);
  ticketData.addData('date', page);
  ticketData.addData('serial', page);
}
ticketData.removeErrors();
PAGES = this.numPages;
if (PAGES >= 1 || getPageNumWords(0) > 0) {
  var ticketData = new TicketData(PAGES, TICKET_DATA);
  ticketData.newData('section');
  ticketData.newData('row');
  ticketData.newData('seat');
  ticketData.newData('date');
  ticketData.newData('serial');
  ticketData.newData('orderNumber');

  for (var page = 0; page < PAGES; page++) {
    // Find the text and save it
    ticketData.addData('section', page);
    ticketData.addData('row', page);
    ticketData.addData('seat', page);
    ticketData.addData('date', page);
    ticketData.addData('serial', page);
    ticketData.addData('orderNumber', page);
  }
  ticketData.sortTickets();
}
