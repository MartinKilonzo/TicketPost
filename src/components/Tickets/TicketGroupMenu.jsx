import React from 'react';
import {Button} from 'react-bootstrap';

import StatusFilter from './StatusFilter.jsx';
import TicketFilter from './TicketFilter.jsx';

class TicketGroupMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  resetFilter(event, ticketPost) {
    const resetFilterEvent = new CustomEvent('setTicketGroupFilter', {
      detail: {
        filterEvent: '',
        filterDate: ''
      }
    });
    window.dispatchEvent(resetFilterEvent);
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
        <Button onClick={this.resetFilter}>Show All</Button>
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
