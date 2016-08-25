import React from 'react';
import {Col, Button, ButtonGroup, Row} from 'react-bootstrap';

import TicketGroupMenu from './TicketGroupMenu.jsx'
import ListTicketGroups from './ListTicketGroups.jsx';
import colors from '../Home/colors.jsx';

class TicketGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //TODO: Fix first ticketpost being listed last --> sort tickets client side or via API
    return (
      <div>
        <div className="index">
          <div className="notice">
            <h2>Ticket Groups</h2>
          </div>
        </div>
        <Col xs={3}>
          <TicketGroupMenu setFilter={this.setTicketFilter} resetFilter={this.resetFilter} ticketPosts={this.props.ticketPosts}></TicketGroupMenu>
        </Col>
        <Col xs={9}>
          <ListTicketGroups ticketPosts={this.props.ticketPosts}></ListTicketGroups>
        </Col>
      </div>
    );
  }
}

TicketGroupView.defaultProps = {
  ticketPosts: []
};

export default TicketGroupView;
