import React from 'react';

import TicketOptions from '../TicketOptions/TicketOptions.jsx'
import TextFileProcessing from '../../actions/FileProcessingActions/TextFileProcessing.jsx';

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
      showFileProcessing: props.showFileProcessing
    };
    this.saveForm = this.saveForm.bind(this);
    this.saveTicketData = this.saveTicketData.bind(this);
  }
  saveForm(data) {
    let newState = {
      fileText: data.fileText[0],
      filePDF: data.filePDf,
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
      ticket.date = new Date(ticket.date).toISOString();
      ticket.section = parseInt(ticket.section.match(/\d{1,3}/));
      ticket.row = parseInt(ticket.row);
      ticket.seat = parseInt(ticket.seat);
      ticket.serial = parseInt(ticket.serial.replace(/\s/g, ''));
    });
  }
  createTicketGroups(data) {
    let TicketPost = function TicketPost(ticketGroup) {
      this.date = ticketGroup[0].date;
      this.section = ticketGroup[0].section;
      this.row = ticketGroup[0].row;
      this.start = ticketGroup[0].seat;
      this.size = ticketGroup.length;
      this.tickets = ticketGroup;
    };
    let temp = [];
    let ticketPosts = [];
    console.debug(data);
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
      } else if (ticket.section !== nextTicket.section) {
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      } else if (ticket.row !== nextTicket.row) {
        ticketPosts.push(new TicketPost(temp));
        temp = [];
      }
    }
    console.debug(ticketPosts);
  }
  saveTicketData(data) {
    this.cleanTicketData(data);
    this.setState({ticketData: data});
    // Reorganize the tickets into ticket groups
    this.createTicketGroups(data);
  }
  render() {
    return (
      <div>
        {this.state.showForm && <TicketOptions saveForm={this.saveForm}></TicketOptions>}
        {this.state.showFileProcessing && <TextFileProcessing file={this.state.fileText} saveTicketData={this.saveTicketData}></TextFileProcessing>}
      </div>
    );
  }
}

fileProcessingComponent.defaultProps = {
  showForm: true,
  showFileProcessing: false
};

export default fileProcessingComponent;
