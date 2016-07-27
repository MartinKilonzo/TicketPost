/**
 * React Component intended to communicate PDF processing status to the user (processing is done via server API)
 */
import React from 'react';

class PDFProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.filePDF
    };
    this.processPDFs = this.processPDFs.bind(this);
  }
  processPDFs() {
    console.debug(this.state.files);
  }
  render() {
    return (
      null
    );
  }
}

PDFProcessingComponent.defaultProps = {};

export default PDFProcessingComponent;
