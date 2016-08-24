import React from 'react';
import {Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import Date from './Date.jsx';

class TicketGroupMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDate: props.filterDate,
      filterEvent: props.filterEvent
    };
  }
  render() {
    const styles = {
      buttonStyle: {
        width: '33%',
        paddingTop: '10px',
        paddingLeft: '4%',
        paddingBottom: '10px',
        textAlign: 'center'
      },
      btnGrpStyle: {
        marginBottom: '20px'
      },
      postGroupsButtonStyle: {
        whiteSpace: 'normal'
      }
    };
    return (
      <div>
        <Row>
          <Col md={6} mdOffset={3}>
            <ButtonGroup justified style={styles.btnGrpStyle}>
              <Button bsStyle="success" style={styles.buttonStyle}>Accepted</Button>
              <Button bsStyle="warning" style={styles.buttonStyle}>Warnings</Button>
              <Button bsStyle="danger" style={styles.buttonStyle}>Errors</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.props.resetFilter} vertical block>Show All</Button>
        </Row>
        <Row>
          {this.props.ticketPosts.map((ticketPost, key) => {
            let comparableTicketPost;
            if (key < this.props.ticketPosts.length - 1) {
              // If this element is the last element (or only), compare it to the previous element instead of the next one
              comparableTicketPost = this.props.ticketPosts[key + 1];
            } else {
              // To prevent index out of bounds error
              comparableTicketPost = this.props.ticketPosts[key - 1];
            }
            // If its the last ticketPost, or one in the list and the date or the event doesnt match the next ticketPost, create a filter for this grouping of ticketPosts:
            if (key === this.props.ticketPosts.length - 1 || ticketPost.date !== comparableTicketPost.date || ticketPost.event.Name !== comparableTicketPost.event.Name) {
              // Bind the ticketPost data to the function:
              let setTicketFilter = this.props.setFilter.bind(this, ticketPost);
              return (
                <Button key={key} onClick={setTicketFilter} style={styles.postGroupsButtonStyle} vertical block>
                  {ticketPost.event.Name}
                  <Date date={ticketPost.date}></Date>
                </Button>
              );
            }
          })}
        </Row>
      </div>
    );
  }
}

TicketGroupMenuComponent.defaultProps = {
  ticketPosts: [],
  filterDate: '',
  filterEvent: ''
};

export default TicketGroupMenuComponent;
