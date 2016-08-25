import React from 'react';
import {Button} from 'react-bootstrap';

import ResetFilter from './ResetFilter.jsx';
import StatusFilter from './StatusFilter.jsx';
import TicketFilter from './TicketFilter.jsx';

class TicketGroupMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const styles = {
      btnGrpStyle: {
        marginBottom: '20px'
      },
      postGroupsButtonStyle: {
        whiteSpace: 'normal'
      }
    };
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
