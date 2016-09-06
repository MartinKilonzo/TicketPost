import React from 'react';

class TicketGroupDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      width: '33%'
    };
    return (
      <span style={style}>{this.props.children}</span>
    );
  }
}

TicketGroupDataComponent.defaultProps = {};

export default TicketGroupDataComponent;