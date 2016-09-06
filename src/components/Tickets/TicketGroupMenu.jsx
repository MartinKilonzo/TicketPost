import React from 'react';
import {Button} from 'react-bootstrap';

import ResetFilter from './TicketGroupMenu/ResetFilter.jsx';
import StatusFilter from './TicketGroupMenu/StatusFilter.jsx';
import TicketFilter from './TicketGroupMenu/TicketFilter.jsx';
import TicketCounter from './TicketGroupMenu/TicketCounter.jsx';

class TicketGroupMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        marginLeft: '20px',
        marginRight: '20px'
      },
      innerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    };
    return (
      <div style={styles.wrapper}>
        <div style={styles.innerWrapper}>
          <ResetFilter></ResetFilter>
          <StatusFilter></StatusFilter>
        </div>
        <TicketFilter ticketGroups={this.props.ticketGroups}></TicketFilter>
        <TicketCounter></TicketCounter>
      </div>
    );
  }
}

TicketGroupMenuComponent.defaultProps = {
  ticketGroups: []
};

export default TicketGroupMenuComponent;
