/**
 * React Component intended to communicate PDF processing status to the user (processing is done via server API)
 */
import React from 'react';
import {Button, Col} from 'react-bootstrap';

import PDFQuery from './PDFQuery.jsx';

class PDFProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.file
    };
    this.processPDFs = this.processPDFs.bind(this);
  }
  componentWillMount() {
    this.processPDFs();
  }
  processPDFs() {
    const fileList = this.state.files;
    //TODO Send each file individually
    let promises = [];
    for (var iFile = 0; iFile < fileList.length; iFile++) {
      let file = fileList[iFile];
      promises.push(new PDFQuery(file).send());
    }
    Promise.all(promises).then((result) => {
      console.debug(result);
    }).catch((error) => {
      console.error('Oh No!', error);
    });
  }
  render() {
    const buttonStyle = {
      position: 'relative',
      height: 'auto',
      width: '100%',
      margin: 'auto',
      paddingBottom: '15px',
      display: 'block'
    }
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>File Processing</h2>
          </div>
        </div>
        <div className="container" style={buttonStyle}>
          <Col xs={2} smOffset={5}>
            <Button bsStyle="default" bsSize="large" onClick={this.processPDFs} block>Process PDFs</Button>
          </Col>
        </div>
      </div>
    );
  }
}

PDFProcessingComponent.defaultProps = {};

export default PDFProcessingComponent;
