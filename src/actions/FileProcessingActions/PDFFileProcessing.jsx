/**
 * React Component intended to communicate PDF processing status to the user (processing is done via server API)
 */
import React from 'react';
import {Button, Col} from 'react-bootstrap';

import PDFQuery from './PDFQuery.jsx';
import tPDFQuery from './Test/TestPDFQuery.jsx';

class PDFProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Send event and vanue data to the API
    this.state = {
      files: props.file
    };
    this.processPDFs = this.processPDFs.bind(this);
    this.testParse = this.testParse.bind(this);
  }
  componentWillMount() {
    this.processPDFs();
  }
  processPDFsAsChunks() {
    const fileList = this.state.files;
    let fileListChunk = [];
    let temp = [];
    for (var i = 0; i < fileList.length; i++) {
      temp.push(fileList[i]);
      // If this is the tenth element (9 used, since arrays are zero-based) in the sublist, or the last file, save the sublist to the list of sublists, and reset it:
      if ((i > 0 && i % 9 === 0) || i === fileList.length - 1) {
        fileListChunk.push(temp);
        temp = [];
      }
    }
    let promises = [];
    fileListChunk.forEach(chunk => {
      promises.push(new PDFQuery(chunk).send());
    });

    Promise.all(promises).then(results => {
      console.debug(results);
      let data = [];
      let fileNumber = 0;
      results.forEach(chunk => {
        chunk.data.forEach(file => {
          file.forEach(ticket => {
            ticket.file = this.state.files[fileNumber];
            data.push(ticket);
          });
          fileNumber++;
        });
      });
      //TODO: Assign each file to each set of data, keeping in mind some files contain multiple tickets
    }).catch(error => {
      console.error('Oh No!', error);
    });
    this.props.saveTicketData(data);
  }
  testParse() {
    const fileList = this.state.files;
    let pdfQuery = new tPDFQuery(fileList, (response) => {
      console.log('progress?', response, this);
    });
    pdfQuery.send().then((result) => {
      console.debug(result);
      //TODO: Assign each file to each set of data, keeping in mind some files contain multiple tickets
      let data = [];
      let fileNumber = 0;
      result.data.forEach(file => {
        file.forEach(ticket => {
          ticket.file = this.state.files[fileNumber];
          data.push(ticket);
        });
        fileNumber++;
      });
    }).catch((error) => {
      console.error('Oh No!', error);
    });
  }
  processPDFs() {
    const fileList = this.state.files;
    let pdfQuery = new PDFQuery(fileList, (response) => {
      console.log('progress?', response, this);
    });
    let tickets = [];
    pdfQuery.send().then((result) => {
      // console.debug('From API:', result);
      //TODO: Assign each file to each set of data, keeping in mind some files contain multiple tickets
      let fileNumber = 0;
      result.data.forEach(file => {
        file.forEach(ticket => {
          ticket.file = this.state.files[fileNumber];
          tickets.push(ticket);
        });
        fileNumber++;
      });
    }).catch((error) => {
      console.error('Oh No!', error);
    }).then(() => { // Finally, save the ticket data
      // console.debug('Tickets', tickets);
      this.props.saveTicketData(tickets);
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
          <Col xs={2} smOffset={5}>
            <Button bsStyle="default" bsSize="large" onClick={this.testParse} block>Test Parse</Button>
          </Col>
        </div>
      </div>
    );
  }
}

PDFProcessingComponent.defaultProps = {};

export default PDFProcessingComponent;
