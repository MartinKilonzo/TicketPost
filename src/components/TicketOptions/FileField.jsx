import React from 'react';
import {FormGroup, Col, FormControl, HelpBlock} from 'react-bootstrap';

import colors from '../Home/colors.jsx';

class FileFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSize: props.maxSize
    };
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
      }, () => {
        this.props.updateForm({
          value: newVal,
          validationState: this.validate()
        }, field);
      });
    }
  }
  validate() {
    const files = this.state.value;
    // If there are no files, the form is inavalid
    if (!this.state.value) {
      return 'error';
    }
    let totalSize = 0;
    // Cycle through the list and check that each file is valid
    for (var iFile = 0; iFile < files.length; iFile++) {
      let file = files[iFile];
      // If a file exists,
      if (file) {
        // Check to make sure it is a proper file
        if (file.type === this.props.accept) {
          // If this is the case, the form is valid
          // TODO: better validation for files
          totalSize += file.size;
          if (totalSize > this.state.maxSize) return 'error';
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
        marginTop: '5px',
        textAlign: 'center',
        color: colors.base,
        lineHeight: '18px',
        fontWeight: 300
      },
      input: {
        // display: 'none'
      },
      //TODO: Restyle the choose files button
      inputField: {
        display: 'none',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 4px ' + colors.dark,
        color: colors.dark,
        fontFamily: 'Roboto, sans-serif',
        cursor: 'pointer'
      },
      feedback: {

      }
    }
    return (
      <FormGroup style={styles.form} controlId={this.props.controlId} accept={this.props.accept} validationState={this.validate()}>
        <Col sm={2} className="formLabel">
          <h4 style={styles.label}>{this.props.label}</h4>
        </Col>
        <Col sm={10}>
          <label style={styles.inputField}>Choose PDFs</label>
          <FormControl style={styles.input} type="file" onChange={this.handleChange} multiple={this.props.multiple}/>
          <HelpBlock>{this.props.helpText}</HelpBlock>
        </Col>
        <FormControl.Feedback style={styles.feedback}></FormControl.Feedback>
      </FormGroup>
    );
  }
}

FileFieldComponent.defaultProps = {
  maxSize: 20 * 1024 * 1024
};

export default FileFieldComponent;
