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
    //this.postTickets();
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  postTickets() {
    const state = this;
    let postQuery = new PostQuery(this.state);
    postQuery.send().then(function success(result) {
      if (result.Status === 'Failure') {
        const description = result.Messages[0].Description;
        if (description === 'Ticket Group Already Exists With Same Seats.') {
          console.warn(description);
          state.setState({postStatus: 'warning'});
        } else {
          throw new Error(description);
        }
      } else {
        state.setState({postStatus: 'success'});
        state.setState({itemId: result.Data.Items[0][0].POItemId
        }, function callback() {
          //state.uploadTickets();
        });
      }
    }).catch(function error(err) {
      console.error('ERROR', err);
      state.setState({postStatus: 'danger'});
    });
  }
  uploadTickets() {
    const state = this;
    const ticketPost = this.state;
    let promises = [];
    ticketPost.tickets.forEach(function loadFile(ticket) {
      promises.push(new Promise(function(resolve, reject) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(ticket.file);
        fileReader.onload = function() {
          return resolve(event.target.result);
        }
        fileReader.onerror = function() {
          return reject(event.target.result);
        }
      }));
    });
    Promise.all(promises).then(function success(results) {
      let files = [];
      results.forEach(function uploadFile(file, key) {
        files.push({
          Seat: ticketPost.tickets[key].seat,
          File: file.slice('data:application/pdf;base64,'.length)
        });
      });
      let postQuery = new FileQuery(ticketPost.itemId, files);
      return postQuery.send();
    }).then(function success() {
      state.setState({uploadStatus: 'success'});
    }).catch(function error(err) {
      console.error('ERROR', err);
      state.setState({uploadStatus: 'danger'});
      //TODO: Alert the user outside of the console, perhaps popovers
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
    let tickets = ticketPost.tickets[0].seat.toString();
    for (var i = 1; i < ticketPost.count; i++) {
      tickets += ', ' + ticketPost.tickets[i].seat.toString();
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
            Seats:<br/>{tickets}
          </div>}
        </Button>
        <Button bsStyle={ticketPost.postStatus} onClick={this.postTickets} block>Post Set</Button>
        <Button bsStyle={ticketPost.uploadStatus} onClick={this.uploadTickets} block>Upload Set</Button>
      </div>
    );
  }
}

TicketPostComponent.defaultProps = {
  showMoreDetails: false,
  postStatus: 'info',
  uploadStatus: 'info'
};

export default TicketPostComponent;
