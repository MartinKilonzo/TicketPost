import React from 'react';
import {FormGroup, Col, InputGroup, FormControl} from 'react-bootstrap';

import ToRedact from './ToRedact.jsx';
import colors from '../Home/colors.jsx';

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
      // If there is no text, warn the user
      if (!this.state.value) {
        return 'success';
      } else { // Elseif cases here can be used for 'error' flags for more advanced validation
        //TODO: Text Validation
        return 'success';
      }
  }
  render() {
    const styles = {
      form: {
        display: 'inherit',
        alignItems: 'inherit',
        position: 'inherit',
        height: '100%',
        width: '100%',
        margin: '0 0 0 0',
      },
      label: {
        textAlign: 'center',
        color: colors.base,
        lineHeight: '18px',
        fontWeight: 300
      },
      input: {
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        textAlign: 'center',
        color: colors.base,
        fontSize: '16pt',
        fontWeight: 300
      }
    }
    return (
      <FormGroup style={styles.form} controlId={this.props.controlId} validationState={this.validate()}>
        <Col sm={2} className="formLabel">
          <h4 style={styles.label}>Redaction</h4>
        </Col>
        <Col sm={8}>
          <FormControl style={styles.input} type="text" placeholder="Text to Redact" value={this.state[this.props.controlId]} onChange={this.handleChange}/>
        </Col>
        <FormControl.Feedback></FormControl.Feedback>
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
