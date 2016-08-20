import React from 'react';

import TicketPost from './TicketPost';
import Date from './Date.jsx';

import {Col, Button, ButtonGroup, Row} from 'react-bootstrap';

class ListTicketPostsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDate: props.filterDate,
      filterEvent: props.filterEvent
    };
    this.resetFilters = this.resetFilters.bind(this);
    this.setTicketFilter = this.setTicketFilter.bind(this);
  }
  resetFilters() {
    this.setState({filterEvent: '', filterDate: ''});
  }
  setTicketFilter(ticketPost, event) {
    this.setState({filterEvent: ticketPost.event.Name, filterDate: ticketPost.date});
  }
  render() {
    //TODO: Fix first ticketpost being listed last
    const props = this.props;
    const colStyle = {
      textAlign: 'center'
    }
    const buttonStyle = {
      width: '33%',
      paddingTop: '10px',
      paddingLeft: '4%',
      paddingBottom: '10px',
      textAlign: 'center'
    }
    const btnGrpStyle = {
      marginBottom: '20px'
    }
    const postGroupsButtonStyle = {
      whiteSpace: 'normal'
    };
    const component = this;
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>Ticket Groups</h2>
          </div>
        </div>
        <Col xs={3}>
          <Row>
            <Col md={6} mdOffset={3}>
              <ButtonGroup justified style={btnGrpStyle}>
                <Button bsStyle="success" style={buttonStyle}>Accepted</Button>
                <Button bsStyle="warning" style={buttonStyle}>Warnings</Button>
                <Button bsStyle="danger" style={buttonStyle}>Errors</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Button onClick={this.resetFilters} vertical block>Show All</Button>
          </Row>
          <Row>
            {props.ticketPosts.map((ticketPost, key) => {
              let comparableTicketPost;
              if (key < this.props.ticketPosts.length - 1) {
                // If this element is the last element (or only), compare it to the previous element instead of the next one
                comparableTicketPost = this.props.ticketPosts[key + 1];
              }
              else {
                // To prevent index out of bounds error
                comparableTicketPost = this.props.ticketPosts[key - 1];
              }
              // If its the last ticketPost, or one in the list and the date or the event doesnt match the next ticketPost, create a filter for this grouping of ticketPosts:
              if (key === this.props.ticketPosts.length - 1 || ticketPost.date !== comparableTicketPost.date || ticketPost.event.Name !== comparableTicketPost.event.Name) {
                let setTicketFilter = component.setTicketFilter.bind(this, ticketPost);
                return (
                  <Button key={key} onClick={setTicketFilter} style={postGroupsButtonStyle} vertical block>
                    {ticketPost.event.Name}
                    <Date date={ticketPost.date}></Date>
                  </Button>
                );
              }
            })}
          </Row>
        </Col>
        <Col xs={9}>
          <Row>
            {props.ticketPosts.map(function map(ticketPost, key) {
              const filterEvent = component.state.filterEvent;
              const filterDate = component.state.filterDate;
              if ((filterEvent === '' && filterDate === '') || (ticketPost.event.Name === filterEvent && ticketPost.date === filterDate)) {
                return (
                  <Col xs={4} key={key} style={colStyle}>
                    <TicketPost data={ticketPost} key={key} saveChanges={props.modifyTicketPost}></TicketPost>
                  </Col>
                );
              }
            })}
          </Row>
        </Col>
      </div>
    );
  }
}

ListTicketPostsComponent.defaultProps = {
  ticketPosts: [],
  filterDate: '',
  filterEvent: ''
};

export default ListTicketPostsComponent;
