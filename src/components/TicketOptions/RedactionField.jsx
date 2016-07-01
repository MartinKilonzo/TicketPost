import React from 'react';
import {FormGroup, Col, InputGroup, FormControl} from 'react-bootstrap';

import ToRedact from './ToRedact.jsx';

class RedactionFormFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      validationState: props.validationState
    };
    this.toRedact = this.toRedact.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  toRedact(value) {
    this.setState({
      toRedact: value
    }, function() {
      this.props.updateForm({
        value: this.state.value,
        validationState: this.validate()
      }, this.props.controlId);
    }.bind(this));
  }
  handleChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    this.setState({
      value: value
    }, function callback() {
      this.props.updateForm({
        value: value,
        validationState: this.validate()
      }, field);
    }.bind(this));
  }
  validate() {
    // If checked,
    if (this.state.toRedact) {
      // If there is no text, warn the user
      if (!this.state.value) {
        return 'warning';
      } else { // Elseif cases here can be used for 'error' flags for more advanced validation
        return 'success';
      }
    } else if (this.state.value) { // If not checked and there is text
      return 'warning';
    } else { // If unchecked and no text
      return 'success';
    }
  }
  render() {
    return (
      <FormGroup controlId={this.props.controlId} validationState={this.validate()}>
        <Col sm={2} className="formLabel">
          <b>Redaction</b>
        </Col>
        <Col sm={10}>
          <InputGroup>
            <InputGroup.Addon>
              <ToRedact controlId='toRedact' updateForm={this.props.updateForm} updateField={this.toRedact}></ToRedact>
            </InputGroup.Addon>
            <FormControl type="text" placeholder="Text to Redact" value={this.state[this.props.controlId]} onChange={this.handleChange} disabled={!this.state.toRedact}/>
            <FormControl.Feedback></FormControl.Feedback>
          </InputGroup>
        </Col>
      </FormGroup>
    );
  }
}

RedactionFormFieldComponent.defaultProps = {
  redact: '',
  validationState: 'success',
  toRedact: false
};

export default RedactionFormFieldComponent;
