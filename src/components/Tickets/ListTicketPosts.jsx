import React from 'react';

import TicketPost from './TicketPost';

import {Col, Button, ButtonGroup, Row} from 'react-bootstrap';

class ListTicketPostsComponent extends React.Component {
  constructor(props) {
    super(props);
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
    return (
      <div className="container">
        <Row>
          <Col xs={4} xsOffset={4}>
            <ButtonGroup justified style={btnGrpStyle}>
              <Button bsStyle="success" style={buttonStyle}>Accepted</Button>
              <Button bsStyle="warning" style={buttonStyle}>Warnings</Button>
              <Button bsStyle="danger" style={buttonStyle}>Errors</Button>
            </ButtonGroup>
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
