import React from 'react';
import {Button} from 'react-bootstrap';

import ResetFilter from './TicketGroupMenu/ResetFilter.jsx';
import StatusFilter from './TicketGroupMenu/StatusFilter.jsx';
import TicketFilter from './TicketGroupMenu/TicketFilter.jsx';

class TicketGroupMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ResetFilter></ResetFilter>
        <StatusFilter></StatusFilter>
        <TicketFilter ticketGroups={this.props.ticketGroups}></TicketFilter>
      </div>
    );
  }
}

TicketGroupMenuComponent.defaultProps = {
  ticketPosts: []
};

export default TicketGroupMenuComponent;
