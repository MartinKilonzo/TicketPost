import React from 'react';

import colors from '../../../Home/colors.jsx';

class TicketCountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
      fontSize: '3.5em',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
      color: colors.highlight
    };
    return (
      <div style={style}>
        {this.props.count}
      </div>
    );
  }
}

TicketCountComponent.defaultProps = {};

export default TicketCountComponent;
