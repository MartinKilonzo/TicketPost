import React from 'react';

import OptionsForm from './OptionsForm.jsx';
import Update from 'react-addons-update';

class TicketOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inData: props.inData,
      saveForm: props.saveForm
    };
  }
  render() {
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>Ticket Options</h2>
          </div>
        </div>
        <OptionsForm {...this.props}/>
      </div>
    );
  }
}

TicketOptions.defaultProps = {
  redact: undefined,
  toRedact: false,
  filePDF: undefined,
  fileText: undefined
};

export default TicketOptions;
