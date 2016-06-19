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

class OptionsFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redact: props.redact,
      toRedact: props.toRedact,
      filePDF: props.filePDF,
      fileText: props.fileText
    };
    this.validateRedactionForm = this.validateRedactionForm.bind(this);
    this.validateFilePDFForm = this.validateFilePDFForm.bind(this);
    this.validateFileTextForm = this.validateFileTextForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  validateRedactionForm() {
    // If checked,
    if (this.state.toRedact) {
      // If there is no text, warn the user
      if (!this.state.redact) {
        return 'warning';
      } else { // Elseif cases here can be used for 'error' flags for more advanced validation
        return 'success';
      }
    } else if (this.state.redact) { // If not checked and there is text
      return 'warning';
    } else { // If unchecked and no text
      return 'success';
    }
  }
  validateRedactOrderNumberForm() {
    // Placeholder for tickets with orderNumbers
    return 'success';
  }
  validateFilePDFForm() {
    // TODO: better validation for .pdfs
    const files = this.state.filePDF;
    // If there are no files, the form is inavalid
    if (!this.state.filePDF) {
      return 'error';
    }
    // Cycle through the list and check that each file is valid
    for (var iFile = 0; iFile < files.length; iFile++) {
      let file = files[iFile];
      // If a file exists,
      if (file) {
        // Check to make sure it is a PDF
        if (file.type === 'application/pdf') {
          // If this is the case, the form is valid
          // TODO: better validation for .pdfs
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
  validateFileTextForm() {
    // TODO: better validation for .txts
    // If there is no file, the form is inavalid
    if (!this.state.fileText) {
      return 'error';
    }
    let file = this.state.fileText[0];
    // If a file exists,
    if (file) {
      // Check to make sure it is a text file
      if (file.type === 'text/plain') {
        // If this is the case, the form is valid
        // TODO: better validation for .txt
        return 'success';

      } else { // Otherwise, the form is invalid
        return 'error';
      }
    } else { // Otherwise, no file is present so form is invalid
      return 'error';
    }
  }
  displayTooltipMessage(event) {
    //TODO: DISPLAY TOOLTIP WARNING
    return event;
  }
  handleChange(event) {
    const field = event.target.id;
    let newVal = event.target.value;
    let newState;
    if (field.match(/file/i)) {
      if (newVal) {
        newVal = event.target.files;
        newState = {
          [field]: newVal
        };
        this.setState(newState);
      }
    } else {
      newState = {
        [field]: newVal
      };
      this.setState(newState);
    }
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
      //TODO: Reassign form values to state
      for (var field in this.state) {
        let newVal = document.getElementById(field);
        let newState;
        if (field.match(/file/i)) {
          if (newVal) {
            newVal = event.target.files;
            newState = {
              [field]: newVal
            };
            this.setState(newState);
          }
        } else {
          newState = {
            [field]: newVal
          };
          this.setState(newState);
        }
      }
      //TODO: Post form results
      this.props.saveForm(this.state);
    } else {}
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
                  <input id="toRedact" type="checkbox" onChange={this.toggleChange} checked={form.toRedact}/>
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
              <FormControl type="file" onChange={this.handleChange} multiple/>
              <HelpBlock>Upload Tickets as PDFs</HelpBlock>
              <FormControl.Feedback></FormControl.Feedback>
            </Col>
          </FormGroup>
          <FormGroup controlId="fileText" validationState={this.validateFileTextForm()}>
            <Col sm={2} className="formLabel">
              <b>Ticket Data</b>
            </Col>
            <Col sm={10}>
              <FormControl type="file" onChange={this.handleChange}/>
              <HelpBlock>Upload Ticket Data as a Text File</HelpBlock>
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

OptionsFormComponent.defaultProps = {
  redact: undefined,
  toRedact: true,
  filePDF: undefined,
  fileText: undefined
};

export default OptionsFormComponent;
