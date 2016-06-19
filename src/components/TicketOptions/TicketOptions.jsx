import React from 'react';

import OptionsForm from './OptionsForm.jsx';
import Update from 'react-addons-update';

class TicketOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inData: props.inData
    };
    this.saveForm = this.saveForm.bind(this);
  }
  saveForm(data) {
    const newState = Update(this.state, {
      inData: {$set: data}
    });
    this.setState(newState);
  }
  render() {
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>Ticket Options</h2>
          </div>
        </div>
        <OptionsForm {...this.props} saveForm={this.saveForm}/>
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
