import React from 'react';
import {FormGroup, Col, FormControl, HelpBlock} from 'react-bootstrap';

class FileFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    const field = event.target.id;
    let newVal = event.target.value;
    if (typeof newVal !== 'undefined') {
      newVal = event.target.files;
      this.setState({
        value: newVal
      }, function callback() {
        this.props.updateForm({
          value: newVal,
          validationState: this.validate()
        }, field);
      }.bind(this));
    }
  }
  validate() {
    const files = this.state.value;
    // If there are no files, the form is inavalid
    if (!this.state.value) {
      return 'error';
    }
    // Cycle through the list and check that each file is valid
    for (var iFile = 0; iFile < files.length; iFile++) {
      let file = files[iFile];
      // If a file exists,
      if (file) {
        // Check to make sure it is a proper file
        if (file.type === this.props.accept) {
          // If this is the case, the form is valid
          // TODO: better validation for files
          return 'success';

        } else { // Otherwise, the form is invalid
          return 'error';
        }
      } else { // Otherwise, no file is present so form is invalid
        return 'error';
      }
    }
    // If all files pass, then the form is valid
    return 'success';
  }
  render() {
    return (
      <FormGroup controlId={this.props.controlId} accept={this.props.accept} validationState={this.validate()}>
        <Col sm={2} className="formLabel">
          <b>{this.props.label}</b>
        </Col>
        <Col sm={10}>
          <FormControl type="file" onChange={this.handleChange} multiple={this.props.multiple}/>
          <HelpBlock>{this.props.helpText}</HelpBlock>
          <FormControl.Feedback></FormControl.Feedback>
        </Col>
      </FormGroup>
    );
  }
}

FileFieldComponent.defaultProps = {};

export default FileFieldComponent;
