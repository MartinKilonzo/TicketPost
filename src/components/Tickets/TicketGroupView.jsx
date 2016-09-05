import React from 'react';

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
    const styles = {
      wrapper: {
        
      }
    };
    return (
      <div style={styles.wrapper}>
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
