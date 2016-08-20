import React from 'react';

import colors from '../Home/colors.jsx';

class FormFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.highlightField = this.highlightField.bind(this);
  }
  highlightField(event) {
    let parent = event.target;
    let target = parent;
    // Climb up the DOM until we reach the form element aka the parent of the desired formField div
    while (parent.id !== this.props.formId) {
      target = parent;
      parent = parent.parentElement;
    }
    const siblings = parent.childNodes;
    siblings.forEach((sibling) => {
      sibling.style.boxShadow = '0px 0px 2px ' + colors.dark;
    });
    target.style.boxShadow = '0px 0px 4px 2px' + colors.light;

  }
  render() {
    const fieldStyle = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      height: '100px',
      margin: '0px -15px 15px -15px',
      padding: '15px 15px 15px 15px',
      backgroundColor: 'white',
      boxShadow: '0px 0px 2px ' + colors.dark,
      fontFamily: 'Roboto, sans-serif'
    };
    return (
      <div style={fieldStyle} onClick={this.highlightField}>{this.props.children}</div>
    );
  }
}

FormFieldComponent.defaultProps = {};

export default FormFieldComponent;
