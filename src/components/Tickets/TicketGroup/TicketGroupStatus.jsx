import React from 'react';

import DateComponent from '../Date.jsx';

class TicketGroupStatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      postion: 'relative',
      height: '60%',
      width: '100%',
      padding: '15px 15px 15px 15px',
      fontSize: '1.25em'
    };
    return (
      <div style={style}>
        <span>
          {this.props.event.Name}<br/>
          <DateComponent date={this.props.date}></DateComponent>
        </span>
      </div>
    );
  }
}

TicketGroupStatusComponent.defaultProps = {};

export default TicketGroupStatusComponent;
