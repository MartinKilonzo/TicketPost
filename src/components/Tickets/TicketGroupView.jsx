import React from 'react';
import {Col, Button, ButtonGroup, Row} from 'react-bootstrap';

import colors from '../Home/colors.jsx';
import PageHeader from '../Home/PageHeader.jsx';
import TicketGroupMenu from './TicketGroupMenu.jsx'
import ListTicketGroups from './ListTicketGroups.jsx';

class TicketGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //TODO: Fix first ticketpost being listed last --> sort tickets client side or via API
    return (
      <div>
        <PageHeader align='right'>Tickets</PageHeader>
        <TicketGroupMenu setFilter={this.setTicketFilter} resetFilter={this.resetFilter} ticketGroups={this.props.ticketGroups}></TicketGroupMenu>
        <ListTicketGroups ticketGroups={this.props.ticketGroups}></ListTicketGroups>
      </div>
    );
  }
}

TicketGroupView.defaultProps = {
  ticketGroups: []
};

export default TicketGroupView;
