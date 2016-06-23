import React from 'react';

import {Button, Col} from 'react-bootstrap';

class TextFileProcessingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.fileText,
      tickets: props.tickets
    };
    this.parseTextFile = this.parseTextFile.bind(this);
    this.parseTextFile();
  }
  parseTextFile() {
    const file = this.props.file;
    let Ticket = function Ticket(date, section, row, seat, serial) {
      this.date = date,
      this.section = section,
      this.row = row,
      this.seat = seat,
      this.serial = serial
    };
    if (FileReader) {
      var reader = new FileReader();
      reader.onload = function(event) {
        console.debug('Got the File:\n' +
          'File: ' + file.name + '\n' + 'Date: ' + file.lastModifiedDate + '\n' + 'Type: ' + file.type + '\n' + 'Size: ' + file.size / 1000 + 'kb\n');
        const text = event.target.result;
        let ticketData = [];
        // Iterate through the text file
        for (let iText = 0; iText < text.length; iText++) {
          let char = text[iText];
          // When a '""' is found, it marks the beginning of a ticket's data
          if (char === '\"') {
            let data = [];
            let iData = 0;
            // Each '"' is followed by '\r', so we set the offset to 3 characters
            iText += 3;
            let ticketString = '';
            // Keep iterating through the string until we reach another '"', which marks the end of a ticket's data
            do {
              // While iterating, store the data, which is conveniently tab deliminated:
              char = text[iText];
              // If char is a tab, then the end of a data field has been reached, so store it
              if (char === '\t' || char === '\"') {
                data[iData++] = ticketString;
                ticketString = '';
              } else {
                ticketString += char;
              }
              iText++;
            } while (char !== '\"' && iText < text.length);
            ticketData.push(new Ticket(data[0], data[1], data[2], data[3], data[4]));
          }
        }
        // Save the ticket data
        this.props.saveTicketData(ticketData);
      }.bind(this);
      reader.readAsText(file);
    } else {
      alert('Broweser too old!')
    }
  }
  render() {
    let buttonStyle = {
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
            <Button bsStyle="default" bsSize="large" onClick={this.parseTextFile} block>Process File</Button>
          </Col>
        </div>
      </div>
    );
  }
}

TextFileProcessingComponent.defaultProps = {};

export default TextFileProcessingComponent;
