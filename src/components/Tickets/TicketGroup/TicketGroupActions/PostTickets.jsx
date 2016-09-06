import React from 'react';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

import PostQuery from '../../../TicketUtils/PostQuery.jsx';
import colors from '../../../Home/colors.jsx';

class PostTicketComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.postTickets = this.postTickets.bind(this);
    // this.postTickets();
  }
  postTickets() {
    let postQuery = new PostQuery(this.state);
    postQuery.send().then(result => {
      if (result.Status === 'Failure') {
        const description = result.Messages[0].Description;
        if (description === 'Ticket Group Already Exists With Same Seats.') {
          console.warn(description);
          this.setState({
            status: 'warning',
            popoverTitle: 'Warning',
            popoverDescription: description
          }, function callback() {
            if (typeof this.props.callback !== 'undefined') {
              this.props.callback();
            }
          });
        } else {
          throw new Error(description);
        }
      } else {
        console.debug(result);
        this.setState({status: 'success', popoverTitle: 'Ticket Posted Successfully!', popoverDescription: result.Message, itemId: result.Data.Items[0][0].POItemId
        }, function callback() {
          if (typeof this.props.callback !== 'undefined') {
            this.props.callback();
          }
        });
      }
    }).catch(err => {
      console.error('ERROR', err);
      this.setState({status: 'danger', popoverTitle: 'Failed to Create a Listing', popoverDescription: err.statusText.Message});
    });
  }
  render() {
    const style = {
      width: '33%',
      padding: '6px 0 6px 0',
      border: 'none',
      borderRadius: 0,
      color: colors.base,
      backgroundColor: colors.accent
    };
    const overlay = <Popover id="popover-positioned-top" placement="top" title={this.state.popoverTitle}>{this.state.popoverDescription}</Popover>;
    return (
      <OverlayTrigger trigger={['hover', 'focus']} delay={200} placement="top" overlay={overlay}>
        <Button style={style} bsStyle={this.state.status} onClick={this.postTickets} block>Post Set</Button>
      </OverlayTrigger>
    );
  }
}

PostTicketComponent.defaultProps = {
  status: 'default',
  popoverTitle: 'Description',
  popoverDescription: 'Create a ticket listing on TicketUtils.'
};

export default PostTicketComponent;
