import React from 'react';

import Date from './Date.jsx';
import {PostQuery} from '../TicketUtils/TicketUtils.jsx';

import {Button} from 'react-bootstrap';

class TicketPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.data.event,
      eventName: props.data.eventName,
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
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  postTickets() {
    console.debug('Posting:', this.state);
    let postQuery = new PostQuery(this.state);
    let httpEvent = new XMLHttpRequest();
    httpEvent.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText).Items[0];
        console.debug(response);
      }
    };
    httpEvent.open('POST', postQuery.uri, true);
    httpEvent.setRequestHeader('Accept', 'application/json');
    httpEvent.setRequestHeader('Content-Type', 'text/plain');
    httpEvent.setRequestHeader('X-Signature', postQuery.signature);
    httpEvent.setRequestHeader('X-Token', postQuery.token);
    httpEvent.setRequestHeader('X-API-Version', postQuery.version);
    httpEvent.send();
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
            Event: {ticketPost.eventName}<br/>
            Code: {ticketPost.event}<br/>
            File: {ticketPost.fileName}<br/>
            Seats:<br/> {tickets}
          </div>}
        </Button>
        <Button bsStyle="success" onClick={this.postTickets} block>Post Set</Button>
      </div>
    );
  }
}

TicketPostComponent.defaultProps = {
  showMoreDetails: false
};

export default TicketPostComponent;
