import React from 'react';
//TODO: SANITIZE INPUTS
import {
  Form,
  FormControl,
  FormGroup,
  Button,
  Col,
  HelpBlock,
  InputGroup
} from 'react-bootstrap';
import update from 'react-addons-update';

class OptionsFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redact: '',
      toRedact: true,
      filePDF: [],
      fileText: ''
    };
    this.validateRedactionForm = this.validateRedactionForm.bind(this);
    this.validateFilePDFForm = this.validateFilePDFForm.bind(this);
    this.validateFileTextForm = this.validateFileTextForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  validateRedactionForm() {
    if (this.state.toRedact) {
      if (!this.state.redact) {
        return 'warning';
      } else { // Elseif cases here can be used for 'error' flags for more advanced validation
        return 'success';
      }
    } else if (this.state.redact) {
      return 'warning';
    } else {
      return 'success';
    }
  }
  validateRedactOrderNumberForm() {
    // Placeholder for tickets with orderNumbers
    return 'success';
  }
  validateFilePDFForm() {
    // TODO: better validation for .pdfs
    console.debug(this.state.filePDF);
    // If there are no files, the form is inavalid
    if (this.state.filePDF.length === 0) {
      return 'error';
    }
    // Cycle through the list and check that each file is valid
    this.state.filePDF.forEach(function forEach(file) {
      // If a file exists,
      if (file) {
        // Get the extension of the file name and check that it is a PDF
        if (file.slice(file.length - 4) !== '.pdf') {
          // If this is not the case, the form is invalid
          return 'error';
        } else {
          // otherwise, the form is valid
          // TODO: better validation for .pdfs
        }
      } else { // Otherwise, no file is present so form is invalid
        return 'error';
      }
    });
    // If all files pass, then the form is valid
    return 'success';
  }
  validateFileTextForm() {
    // TODO: better validation for .txts
    console.debug(this.state.fileText);
    // If a file exists,
    if (this.state.fileText) {
      // Get the extension of the file name and check that it is a PDF
      if (this.state.fileText.slice(this.state.fileText.length - 4) !== '.txt') {
        // If this is not the case, the form is invalid
        return 'error';
      } else {
        // otherwise, the form is valid
        // TODO: better validation for .txts
        return 'success';
      }
    } else { // Otherwise, no file is present so form is invalid
      return 'error';
    }
  }
  displayTooltipMessage(event) {
    //TODO: DISPLAY TOOLTIP WARNING
  }
  handleChange(event) {
    const field = event.target.id;
    const value = event.target.value;
    // console.debug(field, value);
    if (field === 'filePDF') {
      if (value) {
        let newState = update(this.state[field], {$push: [value]})
        this.setState({[field]: newState});
      }
    } else {
      this.setState({[field]: value});
    }
    // console.debug(this.state[field]);
  }
  toggleChange(event) {
    const field = event.target.id;
    this.setState({
      [field]: !this.state[field]
    });
  }
  submitForm() {
    var validateRedact = this.validateRedactionForm() === 'success'
      ? true
      : false;
    var validateOrderNumber = this.validateRedactOrderNumberForm() === 'success'
      ? true
      : false;
    var validatePDF = this.validateFilePDFForm() === 'success'
      ? true
      : false;
    var validateText = this.validateFileTextForm() === 'success'
      ? true
      : false;
    if (validateRedact && validateOrderNumber && validatePDF && validateText) {
      console.info('Submitted');
      //TODO: Reassign form values to state
      //TODO: Post form results
    } else {
      console.info('Error in Form.');
    }
  }
  render() {
    let form = this.state;
    return (
      <div className="container">
        <Form horizontal onSubmit={this.submitForm}>
          <FormGroup controlId="redact" validationState={this.validateRedactionForm()}>
            <Col sm={2} className="formLabel">
              <b>Redaction</b>
            </Col>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Addon>
                  <input id="toRedact" type="checkbox" onChange={this.toggleChange} defaultChecked/>
                </InputGroup.Addon>
                <FormControl type="text" placeholder="Text to Redact" value={form.redact} onChange={this.handleChange}/>
                <FormControl.Feedback></FormControl.Feedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup controlId="filePDF" validationState={this.validateFilePDFForm()}>
            <Col sm={2} className="formLabel">
              <b>Tickets</b>
            </Col>
            <Col sm={10}>
              <FormControl type="file" value={form.filePDF} onChange={this.handleChange} multiple/>
              <HelpBlock>Upload Tickets as PDFs</HelpBlock>
              <FormControl.Feedback></FormControl.Feedback>
            </Col>
          </FormGroup>
          <FormGroup controlId="fileText" validationState={this.validateFileTextForm()}>
            <Col sm={2} className="formLabel">
              <b>Ticket Data</b>
            </Col>
            <Col sm={10}>
              <FormControl type="file" value={form.fileText} onChange={this.handleChange}/>
              <HelpBlock>Upload Ticket Data as Text File</HelpBlock>
              <FormControl.Feedback></FormControl.Feedback>
            </Col>
          </FormGroup>
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

OptionsFormComponent.defaultProps = {};

export default OptionsFormComponent;
