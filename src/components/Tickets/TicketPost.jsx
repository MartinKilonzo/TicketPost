import React from 'react';
import {Button} from 'react-bootstrap';

import Date from './Date.jsx';
import Price from '../tickets/TicketPrice.jsx';
import PostTicket from './PostTickets.jsx';
import UploadTicket from './UploadTickets.jsx';
//TODO: SHOW TICKET FLAGS
class TicketPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.state.showMoreDetails = props.showMoreDetails;
    this.changeView = this.changeView.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.submitTickets = this.submitTickets.bind(this);
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  submitTickets() {
    console.log('Posted: ', this.state);
  }
  saveChanges(newTicketPost) {
    this.props.saveChanges(this.props.ticketPost, newTicketPost);
  }
  render() {
    const ticketPost = this.state;
    const flags = () => {
      let str = '';
      for (var flag in ticketPost.flags) {
        str += flag + '\n'
      }
      return str.slice(0, str.length - 1);
    }
    const ticketStyle = {
      whiteSpace: 'normal'
    };
    let tickets = ticketPost.tickets[0].seat.toString();
    for (var i = 1; i < ticketPost.count; i++) {
      tickets += ', ' + ticketPost.tickets[i].seat.toString();
    }
    //TODO: Add another button for refreshing event data if fail, and use as alternate to current
    return (
      <div>
        <Button bsStyle="default" onClick={this.changeView} block>
          {!ticketPost.showMoreDetails && <div style={ticketStyle}>
            {ticketPost.event.Name}<br/>
            <Date date={ticketPost.date}></Date>
            Section: {ticketPost.section}<br/>
            Row: {ticketPost.row}<br/>
            Count: {ticketPost.count}<br/>
            Seats:<br/>{tickets}
          </div>}
          {ticketPost.showMoreDetails && <div style={ticketStyle}>
            Event: {ticketPost.event.Name}<br/>
            Code: {ticketPost.event.EventId}<br/>
          Flags: {flags()}
          </div>}
        </Button>
        <Price eventData={ticketPost.event} section={ticketPost.section}></Price>
        <PostTicket {...ticketPost} callback={this.submitTickets}></PostTicket>
        <UploadTicket {...ticketPost}></UploadTicket>
      </div>
    );
  }
}

TicketPostComponent.defaultProps = {
  showMoreDetails: false
};

export default TicketPostComponent;
