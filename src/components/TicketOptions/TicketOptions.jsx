import React from 'react';

import OptionsForm from './OptionsForm.jsx';

class TicketOptions extends React.Component {
  render() {
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>Ticket Options</h2>
          </div>
        </div>
        <OptionsForm/>
      </div>
    );
  }
}

TicketOptions.defaultProps = {};

export default TicketOptions;
