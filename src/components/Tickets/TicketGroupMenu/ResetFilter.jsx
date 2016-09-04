import React from 'react';
import {Button} from 'react-bootstrap';

class ResetFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  resetFilter() {
    const resetFilterEvent = new CustomEvent('setTicketGroupFilter', {
      detail: {
        filterEvent: '',
        filterDate: ''
      }
    });
    window.dispatchEvent(resetFilterEvent);
  }
  render() {
    return (
      <Button onClick={this.resetFilter}>Show All</Button>
    );
  }
}

ResetFilterComponent.defaultProps = {};

export default ResetFilterComponent;
