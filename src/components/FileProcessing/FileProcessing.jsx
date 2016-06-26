import React from 'react';

import TicketOptions from '../TicketOptions/TicketOptions.jsx'
import TextFileProcessing from '../../actions/FileProcessingActions/TextFileProcessing.jsx';
import ListTicketPosts from '../Tickets/ListTicketPosts.jsx';
import EventQuery from '../TicketUtils/EventQuery.jsx';

// TODO: Loading bar
// TODO: Status report
// TODO: Seperate components for each status for more in-depth details and edits

class fileProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: props.fileText,
      filePDF: props.filePDf,
      toRedact: props.toRedact,
      redact: props.redact,
      toRedactOrderNumber: props.toRedactOrderNumber,
      showForm: props.showForm,
      showFileProcessing: props.showFileProcessing,
      ticketPosts: props.ticketPosts
    };
    this.saveForm = this.saveForm.bind(this);
    this.saveTicketData = this.saveTicketData.bind(this);
    this.cleanTicketData = this.cleanTicketData.bind(this);
    this.createTicketGroups = this.createTicketGroups.bind(this);
  }
  /**
   * Method: Saves form field data (excepting files) to State, and changes the view to view the new data.
   *
   * @param {Object} data                   - The form data to save
   */
  saveForm(data) {
    // Create a new state object and load it with the form data
    let newState = {
      fileText: data.fileText[0],
      filePDF: data.filePDF,
      toRedact: data.toRedact,
      redact: data.redact,
      toRedactOrderNumber: data.toRedactOrderNumber
    };
    // Save the new state
    this.setState(newState);
    // Change the view to hide the form and show the newly saved data
    this.state.showForm = false;
    this.state.showFileProcessing = true;
  }
  /**
   * Method: Sanitizes and parses file data to create clean Ticket objects.
   *
   * @param {Ticket[]} data                 - The data derived from an input text file parded into Ticket Objects
   */
  cleanTicketData(data) {
    //TODO: Add getter and setters for each field...
    let files = this.state.filePDF;
    // For each data object (ie Ticket),
    data.forEach(function forEach(ticket) {
      // Load the name of the corresponding PDF file holding its ticket
      // Of the form MM[MMM] D[D] YYYY {Section} {Row} {Seat}.pdf
      ticket.fileName = ticket.date.replace(',', '').match(/[a-z]{2,5}\s\d{1,2}\s\d{4}/i) + ' ' + ticket.section + ' ' + ticket.row + ' ' + ticket.seat + '.pdf';
      // Use that file name to find the corresponding PDF given as from input
      for (let iFile = 0; iFile < files.length; iFile++) {
        let file = files[iFile];
        // If there is a match, assign it
        if (ticket.fileName === file.name) {
          ticket.file = file;
          break;
        }
      }
      // Otherwise, alert the user that they mave have a missing or incorrectly named file
      if (!ticket.file) {
        // TODO: Include return to form button on alert (Forced?)
        alert('Error matching ' + ticket.fileName + ' to a given PDF file\nPlease check that all files have are correct.');
      }
      ticket.date = new Date(ticket.date).toISOString(); // Conver the date per ISO 8601 formatting to be used in the TicketUtils API
      ticket.sectionNumber = parseInt(ticket.section); // Parse the section for comparisons
      ticket.section = ticket.section; // Save the section to be used in the TicketUtils API (Redundant, but for readability purposes)
      ticket.row = parseInt(ticket.row); // Parse the row for comparisons
      ticket.seat = parseInt(ticket.seat); // Parse the seat for comparisons
      ticket.serial = parseInt(ticket.serial.replace(/\s/g, '')); // Parse the serial for comparisons, removing the space that may partition it beforehand
    });
  }
  /**
   * Method: Creates ticket groupings out of the Tickets.
   *
   * @param {Ticket[]} data                 - The cleaned data in the form of Ticket Objects
   */
  createTicketGroups(data) {
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
    };
    // Group the tickets
    let ticketList = [];
    let ticketPosts = [];
    // Go through each ticket, ordered in ascending order beforehand,
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
    ticketPosts.forEach(function getEvent(ticketPost) {
      let eventQuery = new EventQuery(ticketPost.date, ticketPost.venue);
      let loadEvents = function() {
        if (this.readyState == 4 && this.status == 200) { // If the response is good and the request is ready,
          const response = JSON.parse(this.responseText).Items[0];
          ticketPost.event = response; // Save the returned event data
        } //TODO: else error case
      };
      let httpEvent = new XMLHttpRequest();
      httpEvent.onreadystatechange = loadEvents;
      httpEvent.open('GET', eventQuery.uri, false);
      httpEvent.setRequestHeader('Accept', 'application/json');
      httpEvent.setRequestHeader('Content-Type', 'text/plain');
      httpEvent.setRequestHeader('X-Signature', eventQuery.signature);
      httpEvent.setRequestHeader('X-Token', eventQuery.token);
      httpEvent.setRequestHeader('X-API-Version', eventQuery.version);
      httpEvent.send();
    });
    console.debug(ticketPosts);
    //TODO: Wait for all event calls to be returned before saving state (Asynchronous check)
    this.setState({ticketPosts: ticketPosts}); // Save the newly generated TicketPosts to the state
  }
  /**
   * Method: Handoff function that cleans parsed text file data (now TicketObjects), groups them, and saves the result.
   *
   * @param {Ticket[]} data                 - The dirty data in the form of Ticket Objects (parsed from an input file)
   */
  saveTicketData(data) {
    this.cleanTicketData(data); // Prepare the data for processing
    this.createTicketGroups(data); // Reorganize that data into groups
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
        {this.state.showFileProcessing && <TextFileProcessing file={this.state.fileText} saveTicketData={this.saveTicketData}></TextFileProcessing>}
        <ListTicketPosts ticketPosts={ticketPosts} modifyTicketPost={this.modifyTicketPost}></ListTicketPosts>
      </div>
    );
  }
}

fileProcessingComponent.defaultProps = {
  showForm: true,
  showFileProcessing: false,
  ticketPosts: []
};

export default fileProcessingComponent;
