import React from 'react';

import TicketPost from './TicketPost';

import {Col} from 'react-bootstrap';

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
        {props.ticketPosts.map(function map(ticketPost, key) {
          return (
            <Col xs={4} key={key} style={colStyle}>
              <TicketPost data={ticketPost} key={key} saveChanges={props.modifyTicketPost}></TicketPost>
            </Col>
          );
        })}
      </div>
    );
  }
}

ListTicketPostsComponent.defaultProps = {
  ticketPosts: []
};

export default ListTicketPostsComponent;
