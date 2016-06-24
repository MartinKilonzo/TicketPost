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
    this.createTicketGroups = this.createTicketGroups.bind(this);
  }
  saveForm(data) {
    let newState = {
      fileText: data.fileText[0],
      filePDF: data.filePDF,
      toRedact: data.toRedact,
      redact: data.redact,
      toRedactOrderNumber: data.toRedactOrderNumber
    };
    this.setState(newState);
    this.state.showForm = false;
    this.state.showFileProcessing = true;
  }
  cleanTicketData(data) {
    data.forEach(function forEach(ticket) {
      ticket.fileName = ticket.date.replace(',', '').match(/[a-z]{2,5}\s\d{1,2}\s\d{4}/i) + ' ' + ticket.section + ' ' + ticket.row;
      ticket.date = new Date(ticket.date).toISOString();
      ticket.sectionNUmber = parseInt(ticket.section);
      ticket.section = ticket.section;
      ticket.row = parseInt(ticket.row);
      ticket.seat = parseInt(ticket.seat);
      ticket.serial = parseInt(ticket.serial.replace(/\s/g, ''));
    });
  }
  createTicketGroups(data) {
    let files = this.state.filePDF;
    // Add loaded information
    let TicketPost = function TicketPost(ticketGroup) {
      this.date = ticketGroup[0].date;
      this.section = ticketGroup[0].section;
      this.row = ticketGroup[0].row;
      this.start = ticketGroup[0].seat;
      this.count = ticketGroup.length;
      this.tickets = ticketGroup;
      this.fileName = ticketGroup[0].fileName;
      if (this.count === 1) {
        this.fileName += ' ' + this.start;
      }
      this.fileName += '.pdf';
      for (let iFile = 0; iFile < files.length; iFile++) {
        let file = files[iFile];
        if (this.fileName === file.name) {
          this.file = file;
        }
      }
      if (!this.file) {
        alert('Error matching ' + this.fileName + ' to a given PDF file\nPlease check that all files have are correct.');
      }
      this.venue = {
        name: 'Rogers Centre',
        country: 'CA',
        state: 'ON',
        city: 'Toronto'
      };
    };
    // Group the tickets
    let temp = [];
    let ticketPosts = [];
    for (var iTicket = 0; iTicket < data.length - 1; iTicket++) {
      let ticket = data[iTicket];
      let nextTicket = data[iTicket + 1];
      temp.push(ticket);
      if (iTicket + 1 === data.length - 1) {
        temp.push(nextTicket);
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      } else if (ticket.date !== nextTicket.date) {
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      } else if (ticket.sectionNumber !== nextTicket.sectionNumber) {
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      } else if (ticket.row !== nextTicket.row) {
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      }
    }
    //Query the API for event data
    // TODO: Refactor into seperate function, passed via props into TicketPost to allow for refreshed data
    ticketPosts.forEach(function getEvent(ticketPost) {
      let eventQuery = new EventQuery(ticketPost.date, ticketPost.venue);
      let loadEvents = function() {
        if (this.readyState == 4 && this.status == 200) {
          const response = JSON.parse(this.responseText).Items[0];
          ticketPost.event = response;
          console.debug(response);
        }
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
    this.setState({ticketPosts: ticketPosts});
  }
  saveTicketData(data) {
    this.cleanTicketData(data);
    // this.setState({tickets: data});
    // Reorganize the tickets into ticket groups
    this.createTicketGroups(data);
  }
  modifyTicketPost(newTicketPost) {
    //TODO: PLACEHOLDER - Modify tickets
    console.debug('Modified: ', newTicketPost);
  }
  postTicket(ticket) {
    //TODO: PLACEHOLDER - Post ticket
    console.debug('Posting: ', ticket);
  }
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
