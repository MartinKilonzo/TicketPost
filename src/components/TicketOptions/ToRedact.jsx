import React from 'react';
import {input} from 'react-bootstrap';

class ToRedactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      validationState: props.validationState
    };
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    const field = event.target.id;
    const newVal = !this.state.value;
    this.setState({
      value: newVal
    }, function callback() {
      this.props.updateField(newVal);
      this.props.updateForm({
        value: newVal,
        validationState: this.validate()
      }, field);
    }.bind(this));
  }
  validate() {
    return this.state.validationState;
  }
  render() {
    return (<input id={this.props.controlId} type="checkbox" onChange={this.handleChange} checked={this.state.value}/>);
  }
}

ToRedactComponent.defaultProps = {
  validationState: 'success'
};

export default ToRedactComponent;
