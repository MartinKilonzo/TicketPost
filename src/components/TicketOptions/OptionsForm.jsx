import React from 'react';
import Update from 'react-addons-update';
//TODO: SANITIZE INPUTS
import {Form, FormGroup, Button} from 'react-bootstrap';

import FormField from './FormField.jsx';
import RedactionField from './RedactionField.jsx';
import FileField from './FileField.jsx';
import colors from '../Home/colors.jsx';

class OptionsFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redact: props.redact,
      filePDF: props.filePDF
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
      if (typeof field === 'undefined' || field.validationState !== 'success') {
        //TODO: Warn user of error
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
      helpText: 'Maximum 20 Mb',
      label: 'Tickets'
    };
    const containerStyle = {
      maxWidth: '750px',
      backgroundColor: 'initial'
    };
    return (
      <div className="container" style={containerStyle}>
        <Form id={this.props.formId} horizontal onSubmit={this.submitForm}>
          <FormField formId={this.props.formId}>
            <RedactionField controlId='redact' updateForm={this.updateForm}></RedactionField>
          </FormField>
          <FormField formId={this.props.formId}>
            <FileField {...PDFField} updateForm={this.updateForm}></FileField>
          </FormField>
          <SubmitButton submit={this.submitForm}></SubmitButton>
        </Form>
      </div>
    );
  }
}

OptionsFormComponent.defaultProps = {
  redact: {
    value: '',
    validationState: 'success'
  },
  filePDF: undefined,
  fileText: undefined,
  formId: 'form'
};

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  highlightBtn(event) {
    const style = event.target.style;
    style.backgroundColor = colors.white;
    style.color = colors.highlight;
    style.boxShadow = '0px 3px 6px ' + colors.dark;
  }
  unHighlightBtn(event) {
    const style = event.target.style;
    style.backgroundColor = 'initial';
    style.color = colors.base;
    style.boxShadow = '0px 0px 2px ' + colors.dark;
  }
  render() {
    const styles = {
      form: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: '100px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 2px ' + colors.dark,
        fontFamily: 'Roboto, sans-serif'
      },
      submitBtnStyle: {
        height: '100%',
        border: 'none',
        borderRadius: 0,
        backgroundColor: 'initial'
      },
      labelStyle: {
        height: 0,
        marginTop: 0,
        color: 'inherit',
        backgroundColor: 'initial'
      }
    };
    return (
      <FormGroup style={styles.form} onMouseEnter={this.highlightBtn} onMouseLeave={this.unHighlightBtn}>
        <Button className="submitButton" style={styles.submitBtnStyle} type="submit" onClick={this.props.submit} block>
          <h4 style={styles.labelStyle}>Process</h4>
        </Button>
      </FormGroup>
    );
  }
}

SubmitButton.defaultProps = {};

export default OptionsFormComponent;
