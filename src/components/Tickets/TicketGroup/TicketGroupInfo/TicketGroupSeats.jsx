import React from 'react';

import TicketGroupData from './TicketGroupData.jsx';

class TicketGroupSeatsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const styles = {
      single: {
        fontSize: '1.2em'
      },
      many: {
        fontSize: '0.75em',
        lineHeight: '1em'
      },
      seatSplitter: {
        fontSize: '0.7em'
      }
    };
    return (
      <TicketGroupData {...this.props}>
        {this.props.count <= 1 && <div style={styles.single}>
          <span>{this.props.tickets[0].seat}</span>
        </div>}
        {this.props.count > 1 && <div style={styles.many}>
          <span>{this.props.tickets[0].seat}</span>
          <br/>
          <span style={styles.seatSplitter}>to</span>
          <br/>
          <span>{this.props.tickets[this.props.tickets.length - 1].seat}</span>
        </div>}
      </TicketGroupData>
    );
  }
}

TicketGroupSeatsComponent.defaultProps = {};

export default TicketGroupSeatsComponent;
