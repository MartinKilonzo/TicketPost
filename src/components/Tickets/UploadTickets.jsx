import React from 'react';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

import FileQuery from '../TicketUtils/FileQuery.jsx';
import colors from '../Home/colors.jsx';

class UploadTicketComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.uploadTickets = this.uploadTickets.bind(this);
  }
  uploadTickets() {
    const state = this;
    const ticketPost = this.state;
    console.debug(this.state);
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
          Seat: ticketPost.tickets[key].seat.toString(),
          File: file.slice('data:application/pdf;base64,'.length)
        });
      });
      let fileQuery = new FileQuery(ticketPost.itemId, files);
      return fileQuery.send();
    }).then(function success(result) {
      console.debug(result);
      const description = result.Messages[0].Description;
      state.setState({
        status: 'success',
        popoverTitle: 'Ticket Uploaded Successfully!',
        popoverDescription: description
      }, function callback() {
        this.props.callback();
      });
    }).catch(function error(err) {
      console.error('ERROR', err);
      state.setState({status: 'danger', popoverTitle: 'Failed to Upload', popoverDescription: err.statusText.Message});
      //TODO: Alert the user outside of the console, perhaps popovers
    });
  }
  render() {
    const style = {
      width: '34%',
      padding: '6px 0 6px 0',
      border: 'none',
      borderRadius: 0,
      color: colors.base,
      backgroundColor: colors.accent
    };
    const overlay = <Popover id="popover-positioned-right" placement="right" title={this.state.popoverTitle}>{this.state.popoverDescription}</Popover>;
    return (
      <OverlayTrigger trigger={['hover', 'focus']} delay={200} placement="right" overlay={overlay}>
        <Button style={style} bsStyle={this.state.status} onClick={this.uploadTickets} block>Upload Set</Button>
      </OverlayTrigger>
    );
  }
}

UploadTicketComponent.defaultProps = {
  status: 'default',
  popoverTitle: 'Description',
  popoverDescription: 'Upload PDFs of ticket to TicketUtils.'
};

export default UploadTicketComponent;
