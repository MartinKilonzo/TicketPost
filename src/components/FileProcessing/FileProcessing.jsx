import React from 'react';

import TicketOptions from '../TicketOptions/TicketOptions.jsx'
import TextFileProcessing from '../../actions/FileProcessingActions/TextFileProcessing.jsx';
import PDFFileProcessing from '../../actions/FileProcessingActions/PDFFileProcessing.jsx';
import ListTicketPosts from '../Tickets/ListTicketPosts.jsx';
import EventQuery from '../TicketUtils/EventQuery.jsx';

// TODO: Loading bar
// TODO: Status report
// TODO: Seperate components for each status for more in-depth details and edits

class fileProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: props.fileText, // File{} referencing a text file containing Ticket data
      filePDF: props.filePDf, // FileList{} referencing the list of Tickets in the form of PDFs
      toRedact: props.toRedact, // String of the text to redact from the tickets (Non-functional)
      redact: props.redact, // Boolean indicating whether or not a redaction of the above should be perform (Non-functional)
      toRedactOrderNumber: props.toRedactOrderNumber, //Boolean indicating whether or not a redaction of the order number should be perform (Non-functional)
      showForm: props.showForm, // Boolean representing whether or not to show the form view
      showPDFFileProcessing: props.showPDFFileProcessing, // Boolean representing whether or not to show ticket processing details
      showPDFFileProcessing: props.showPDFFileProcessing, // Boolean representing whether or not to show PDF processing details
      ticketPosts: props.ticketPosts // TicketPost[Ticket] generated from the input data to be posted to the TicketUtils API
    };
    this.saveForm = this.saveForm.bind(this);
    this.saveTicketData = this.saveTicketData.bind(this);
    this.createTicketGroups = this.createTicketGroups.bind(this);
    this.createTicketGroups = this.createTicketGroups.bind(this);
    this.sortTickets = this.sortTickets.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.mergeLists = this.mergeLists.bind(this);
  }
  /**
   * Method: Saves form field data (excepting files) to State, and changes the view to view the new data.
   *
   * @param {Object} data                   - The form data to save
   */
  saveForm(data) {
    // Create a new state object and load it with the form data
    let newState = {
      filePDF: data.filePDF,
      toRedact: data.toRedact,
      redact: data.redact,
      toRedactOrderNumber: data.toRedactOrderNumber
    };
    // Save the new state
    this.setState(newState, () => {
      // Change the view to hide the form and show the newly saved data
      this.setState({showForm: false, showPDFFileProcessing: true, showTickets: false});
    });
  }
  /**
   * Wrapper: Uses mergeSort to sort the tickets.
   *
   * @param {Ticket[]} data                 - The ticket data to sort
   * @return                                - Ticket[] containing the sorted data
   */
  sortTickets(data) {
    return this.mergeSort(data);
  }
  /**
   * Helper Method: Preforms the merging and requests the sorting from a helper function
   * to execute MergeSort on a set of Ticekts.
   *
   * @param {Ticket[]} list                 - An (unsorted) list of Tickets
   * @return {Ticket[]} list                - A sorted list of Tickets
   */
  mergeSort(list) {
    if (list.length < 2) {
      return list;
    }
    var leftList = this.mergeSort(list.slice(0, (list.length + 1) / 2));
    var rightList = this.mergeSort(list.slice((list.length + 1) / 2, list.length));
    return this.mergeLists(leftList, rightList);
  }
  /**
   * Helper Method: Preforms the sorting at the request of mergeSort(list).
   *
   * @param {Ticket[]} leftList             - An (unsorted) list of Tickets
   * @param {Ticket[]} rightList            - An (unsorted) list of Tickets
   * @return {Ticket[]} list                - A sorted, merged list containing Tickets from both lists
   */
  mergeLists(leftList, rightList) {
    var ret = [];
    var l = 0;
    var r = 0;
    while (l < leftList.length && r < rightList.length) {
      var lDate = leftList[l].date;
      var rDate = rightList[r].date;
      if (!lDate.charAt(lDate.length - 3).match(/\s/))
        lDate = lDate.slice(0, -2) + ' ' + lDate.slice(-2);
      if (!rDate.charAt(rDate.length - 3).match(/\s/))
        rDate = rDate.slice(0, -2) + ' ' + rDate.slice(-2);
      lDate = new Date(lDate);
      rDate = new Date(rDate);
      if (lDate < rDate) {
        ret.push(leftList[l++]);
      } else if (lDate > rDate) {
        ret.push(rightList[r++]);
      } else {
        var lSection = parseInt(leftList[l].section.match(/\d{1,3}/), 10);
        var rSection = parseInt(rightList[r].section.match(/\d{1,3}/), 10);
        if (lSection < rSection) {
          ret.push(leftList[l++]);
        } else if (lSection > rSection) {
          ret.push(rightList[r++]);
        } else {
          lSection = leftList[l].section.slice(3);
          rSection = rightList[r].section.slice(3);
          if (lSection < rSection) {
            ret.push(leftList[l++]);
          } else if (lSection > rSection) {
            ret.push(rightList[r++]);
          } else {
            var lRow = parseInt(leftList[l].row, 10);
            var rRow = parseInt(rightList[r].row, 10);
            if (lRow < rRow) {
              ret.push(leftList[l++]);
            } else if (lRow > rRow) {
              ret.push(rightList[r++]);
            } else {
              var lSeat = parseInt(leftList[l].seat, 10);
              var rSeat = parseInt(rightList[r].seat, 10);
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
   * Method: Transforms ticket data into ticket objects.
   *
   * @param {Ticket[]} data                 - The data derived from an input text file parded into Ticket Objects
   */
  createTickets(data) {
    let Ticket = function Ticket(data) {
      this.file = data.file; // (Redundant, but for readability purposes)
      //TODO:Check if date is before today and warn the user of that
      this.dateString = data.date;
      this.date = new Date(data.date).toISOString(); // Convert the date per ISO 8601 formatting to be used in the TicketUtils API
      this.sectionNumber = parseInt(data.section); // Parse the section for comparisons
      this.section = data.section; // Save the section to be used in the TicketUtils API (Redundant, but for readability purposes)
      this.row = parseInt(data.row); // Parse the row for comparisons
      this.seat = parseInt(data.seat); // Parse the seat for comparisons
      this.serial = parseInt(data.serial.replace(/\s/g, '')); // Parse the serial for comparisons, removing the space that may partition it beforehand
      this.flags = {
        obstructedView: data.obstructedView,
        firstRowOfSection: this.row === 1
          ? true
          : false
      }
    };
    //TODO: Add getter and setters for each field
    let tickets = [];
    // For each data object (ie Ticket),
    data.forEach(ticketData => {
      tickets.push(new Ticket(ticketData));
    });
    this.setState({
      tickets: this.sortTickets(tickets)
    }, () => {
      this.createTicketGroups(this.state.tickets);
    });
  }
  /**
   * Method: Creates ticket groupings out of the Tickets.
   *
   * @param {Ticket[]} data                 - The cleaned data in the form of Ticket Objects
   */
  createTicketGroups(data) {
    console.log(data);
    // Define the constructor for TicketPosts
    let TicketPost = function TicketPost(ticketGroup) {
      this.date = ticketGroup[0].date;
      this.section = ticketGroup[0].section;
      this.row = ticketGroup[0].row;
      this.start = ticketGroup[0].seat;
      this.count = ticketGroup.length;
      this.tickets = ticketGroup;
      this.venue = {
        name: 'Rogers Centre',
        country: 'CA',
        state: 'ON',
        city: 'Toronto'
      };
      this.flags = {};
      ticketGroup.forEach(ticket => {
        for (var flag in ticket.flags) {
          if (ticket.flags[flag])
            this.flags[flag] = ticket.flags[flag];
          }
        });
    };
    // Group the tickets
    let ticketList = [];
    let ticketPosts = [];
    // Go through each ticket, ordered in ascending order beforehand,
    //TODO: Split tickets by flags
    for (var iTicket = 0; iTicket < data.length - 1; iTicket++) {
      let ticket = data[iTicket];
      let nextTicket = data[iTicket + 1];
      ticketList.push(ticket); // Add the current ticket to the list
      if (iTicket + 1 === data.length - 1) { // If the current ticket is the last one,
        ticketList.push(nextTicket); //  It marks the end of a ticket grouping, so add it to the list
        ticketPosts.push(new TicketPost(ticketList)); // And add the list to the list of TicketPost
        ticketList = []; // And then empty the list (Redundant?)
      } else if (ticket.date !== nextTicket.date) { // Otherwise if the dates on the tickets don't match, then it marks the end of a ticket grouping
        ticketPosts.push(new TicketPost(ticketList)); // So add the grouping to the list of TicketPosts
        ticketList = []; // And then empty the list
      } else if (ticket.section !== nextTicket.section) { // Otherwise if the sections on the tickets don't match, then it marks the end of a ticket grouping
        ticketPosts.push(new TicketPost(ticketList)); // So add the grouping to the list of TicketPosts
        ticketList = []; // And then empty the list
      } else if (ticket.row !== nextTicket.row) { // Otherwise if the rows on the tickets don't match, then it marks the end of a ticket grouping
        ticketPosts.push(new TicketPost(ticketList)); // So add the grouping to the list of TicketPosts
        ticketList = []; // And then empty the list
      } else if (nextTicket.seat - ticket.seat !== 1) { // Otherwise if the seats are not incrementally ascending, then it marks the end of a ticket grouping
        ticketPosts.push(new TicketPost(ticketList)); // So add the grouping to the list of TicketPosts
        ticketList = []; // And then empty the list
      } // Otherwise, if it made it this far, it belongs in the same group
    }
    //Query the API for event data
    // TODO: Refactor into seperate function, passed via props into TicketPost to allow for refreshed data
    // Use the previous data to generate queryies for each TicketPost to ensure it corresponds with an event on the TicketUtils API
    let promises = [];
    ticketPosts.forEach(function getEvent(ticketPost) {
      promises.push(new EventQuery(ticketPost.date, ticketPost.venue).send());
    });
    Promise.all(promises).then(results => {
      results.forEach(function saveEvent(result, key) {
        ticketPosts[key].event = result.Items[0];
      });
      console.log(ticketPosts);
      this.setState({
        ticketPosts: ticketPosts
      }, () => {
        // Change the view to hide the form and show the newly created ticket groups
        this.setState({showForm: false, showPDFFileProcessing: false, showTickets: true});
      }); // Save the newly generated TicketPosts to the state
    }).catch(function error(err) {
      console.error('ERROR', err);
      //TODO: Alert user about error (color ticketPost red); create error components for ticketpost and use those (dimmed with error message)
    });
  }
  /**
   * Method: Handoff function that cleans parsed text file data (now TicketObjects), groups them, and saves the result.
   *
   * @param {Ticket[]} data                 - The dirty data in the form of Ticket Objects (parsed from an input file)
   */
  saveTicketData(data) {
    this.createTickets(data); // Create the tickets and ticket groups
  }
  modifyTicketPost(newTicketPost) {
    //TODO: PLACEHOLDER - Modify tickets
    console.debug('Modified: ', newTicketPost);
  }
  postTicket(ticket) {
    //TODO: PLACEHOLDER - Post ticket
    console.debug('Posting: ', ticket);
  }
  //TODO: PLACEHOLDER - Post all tickets
  postAllTickets() {
    this.state.ticketPost.forEach(function forEach(ticket) {
      this.postTicket(ticket);
    });
  }
  render() {
    let ticketPosts = this.state.ticketPosts;
    return (
      <div>
        {this.state.showForm && <TicketOptions saveForm={this.saveForm}></TicketOptions>}
        {this.state.showPDFFileProcessing && <PDFFileProcessing file={this.state.filePDF} saveTicketData={this.saveTicketData}></PDFFileProcessing>}
        {this.state.showTickets && <ListTicketPosts ticketPosts={ticketPosts} modifyTicketPost={this.modifyTicketPost}></ListTicketPosts>}
      </div>
    );
  }
}

fileProcessingComponent.defaultProps = {
  showForm: true,
  showPDFFileProcessing: false,
  showTickets: false,
  ticketPosts: []
};

export default fileProcessingComponent;
