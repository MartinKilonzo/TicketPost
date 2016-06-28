import React from 'react';
import Update from 'react-addons-update';
//TODO: SANITIZE INPUTS
import {
  Form,
  FormControl,
  FormGroup,
  Button,
  Col,
  HelpBlock
} from 'react-bootstrap';

import RedactionField from './RedactionField.jsx';
import FileField from './FileField.jsx';

class OptionsFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redact: props.redact,
      toRedact: props.toRedact,
      filePDF: props.filePDF,
      fileText: props.fileText
    };
    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }
  displayTooltipMessage(event) {
    //TODO: DISPLAY TOOLTIP WARNING
    console.debug(event.target);
    return event;
  }
  updateForm(newVal, field) {
    let newState = Update(this.state, {
      [field]: {
        $set: newVal
      }
    });
    this.setState(newState);
  }
  submitForm(event) {
    event.preventDefault();
    let formData = {};
    for (var fieldName in this.state) {
      let field = this.state[fieldName];
      if (typeof field === 'undefined' || !field.validationState) {
        return;
      }
      formData[fieldName] = field.value;
    }
    this.props.saveForm(formData);
  }
  render() {
    const PDFField = {
      controlId: 'filePDF',
      accept: 'application/pdf',
      multiple: true,
      helpText: 'Upload Tickets as PDFs',
      label: 'Tickets'
    };
    const textField = {
      controlId: 'fileText',
      accept: 'text/plain',
      multiple: false,
      helpText: 'Upload Ticket Data as a Text File',
      label: 'Ticket Data'
    };
    return (
      <div className="container">
        <Form horizontal onSubmit={this.submitForm}>
          <RedactionField controlId='redact' updateForm={this.updateForm}></RedactionField>
          <FileField {...PDFField} updateForm={this.updateForm}></FileField>
          <FileField {...textField} updateForm={this.updateForm}></FileField>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Process
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

OptionsFormComponent.defaultProps = {
  redact: undefined,
  toRedact: true,
  filePDF: undefined,
  fileText: undefined
};

export default OptionsFormComponent;
