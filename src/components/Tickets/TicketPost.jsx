import React from 'react';
import {Button} from 'react-bootstrap';

import Date from './Date.jsx';
import PostQuery from '../TicketUtils/PostQuery.jsx';
import FileQuery from '../TicketUtils/FileQuery.jsx';

class TicketPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.data.event,
      date: props.data.date,
      section: props.data.section,
      row: props.data.row,
      start: props.data.start,
      count: props.data.count,
      tickets: props.data.tickets,
      fileName: props.data.fileName,
      file: props.data.file,
      showMoreDetails: props.showMoreDetails
    };
    this.changeView = this.changeView.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.postTickets = this.postTickets.bind(this);
    this.uploadTickets = this.uploadTickets.bind(this);
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  postTickets() {
    let postQuery = new PostQuery(this.state);
    const state = this;
    let getResponse = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        if (response.Status === 'Failure') {
          console.error(response.Messages[0].Description);
          //TODO: Alert user that upload failed
        } else {
          state.setState({itemId: response.Data.Items[0][0].POItemId
          });
          state.uploadTickets(); //TODO: CHECK IF THIS WORKS
        }
      }
    };
    let httpPost = new XMLHttpRequest();
    httpPost.onreadystatechange = getResponse;
    httpPost.open('POST', postQuery.uri, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');
    httpPost.setRequestHeader('X-Signature', postQuery.signature);
    httpPost.setRequestHeader('X-Token', postQuery.token);
    httpPost.setRequestHeader('X-API-Version', postQuery.version);
    httpPost.send(JSON.stringify(postQuery.query));
  }
  uploadTickets() {
    const ticketPost = this.state;
    let fileQuery = new FileQuery(ticketPost);
    let fileLoadsRemaining = ticketPost.count;
    let getResponse = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        if (response.Status === 'Failure') {
          console.error(response.Messages[0].Description);
          //TODO: Alert user that upload failed
        }
        //TODO: Alert user that upload succeeded
      }
    };
    ticketPost.tickets.forEach(function loadFile(ticket) {
      let fileReader = new FileReader();
      fileReader.onload = function() {
        const file = event.target.result.slice('data:application/pdf;base64,'.length);
        fileQuery.addFile(ticket.seat, file);
        console.debug(ticket.file.name);
        fileLoadsRemaining--;
        if (fileLoadsRemaining <= 0) {
          let httpFile = new XMLHttpRequest();
          httpFile.onreadystatechange = getResponse;
          httpFile.open('POST', fileQuery.uri, true);
          httpFile.setRequestHeader('Content-Type', 'application/json');
          httpFile.setRequestHeader('X-Signature', fileQuery.signature);
          httpFile.setRequestHeader('X-Token', fileQuery.token);
          httpFile.setRequestHeader('X-API-Version', fileQuery.version);
          httpFile.send(JSON.stringify(fileQuery.query));
        }
      };
      fileReader.readAsDataURL(ticket.file);
    });
  }
  saveChanges(newTicketPost) {
    this.props.saveChanges(this.props.ticketPost, newTicketPost);
  }
  render() {
    const ticketStyle = {
      whiteSpace: 'normal'
    };
    const ticketPost = this.state;
    let tickets = ticketPost.start;
    for (var i = 1; i < ticketPost.count; i++) {
      tickets += ', ' + (ticketPost.start + i);
    }
    //TODO: Add another button for refreshing event data if fail, and use as alternate to current
    return (
      <div>
        <Button bsStyle="default" onClick={this.changeView} block>
          {!this.state.showMoreDetails && <div style={ticketStyle}>
            Toronto Blue Jays<br/>
            <Date date={ticketPost.date}></Date>
            Section: {ticketPost.section}<br/>
            Row: {ticketPost.row}<br/>
            Count: {ticketPost.count}<br/>
          </div>}
          {this.state.showMoreDetails && <div style={ticketStyle}>
            Event: {ticketPost.event.Name}<br/>
            Code: {ticketPost.event.EventId}<br/>
            File: {ticketPost.fileName}<br/>
            Seats:<br/> {tickets}
          </div>}
        </Button>
        <Button bsStyle="success" onClick={this.postTickets} block>Post Set</Button>
        <Button bsStyle="success" onClick={this.uploadTickets} block>Upload Set</Button>
      </div>
    );
  }
}

TicketPostComponent.defaultProps = {
  showMoreDetails: false
};

export default TicketPostComponent;
