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
            {props.ticketPosts.map(function map(ticketPost, key) {
              if (key > 0) {
                const prevTicketPost = props.ticketPosts[key - 1];
                if (ticketPost.date !== prevTicketPost.date || ticketPost.event.Name !== prevTicketPost.event.Name) {
                  let setTicketFilter = component.setTicketFilter.bind(this, ticketPost);
                  return (
                    <Button key={key} onClick={setTicketFilter} style={postGroupsButtonStyle} vertical block>
                      {ticketPost.event.Name}
                      <Date date={ticketPost.date}></Date>
                    </Button>
                  );
                }
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
