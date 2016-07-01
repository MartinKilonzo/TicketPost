import React from 'react';

import TicketPost from './TicketPost';

import {Col, Button, Row} from 'react-bootstrap';

class ListTicketPostsComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const colStyle = {
      textAlign: 'center'
    }
    return (
      <div className="container">
        <Row>
          <Col xs={2} offset={3}>
            <Button bsStyle="success">Accepted</Button>
          </Col>
          <Col xs={2}>
            <Button bsStyle="warning">Warnings</Button>
          </Col>
          <Col xs={2}>
            <Button bsStyle="danger">Errors</Button>
          </Col>
        </Row>
        <Row>
          {props.ticketPosts.map(function map(ticketPost, key) {
            return (
              <Col xs={4} key={key} style={colStyle}>
                <TicketPost data={ticketPost} key={key} saveChanges={props.modifyTicketPost}></TicketPost>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

ListTicketPostsComponent.defaultProps = {
  ticketPosts: []
};

export default ListTicketPostsComponent;
