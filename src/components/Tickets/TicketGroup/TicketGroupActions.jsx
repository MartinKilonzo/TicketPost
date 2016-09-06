import React from 'react';

import PostTicket from './TicketGroupActions/PostTickets.jsx';
import PriceTickets from './TicketGroupActions/PriceTickets.jsx';
import UploadTicket from './TicketGroupActions/UploadTickets.jsx';

class TicketGroupActionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitTickets = this.submitTickets.bind(this);
  }
  submitTickets() {
    console.log('Posted: ', this.state);
  }
  render() {
    const style = {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
      postion: 'relative',
      height: '10%',
      width: '100%'
    };
    return (
      <div style={style}>
        <PostTicket {...this.props} callback={this.submitTickets}></PostTicket>
        <PriceTickets eventData={this.props.event} section={this.props.section}></PriceTickets>
        <UploadTicket {...this.props}></UploadTicket>
      </div>
    );
  }
}

TicketGroupActionsComponent.defaultProps = {};

export default TicketGroupActionsComponent;
