import React from 'react';

import PageHeader from '../Home/PageHeader.jsx';
import TicketGroupMenu from './TicketGroupMenu.jsx'
import ListTicketGroups from './ListTicketGroups.jsx';
import colors from '../Home/colors.jsx';

class TicketGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //TODO: Fix first ticketGroup being listed last --> sort tickets client side or via API
    const styles = {
      wrapper: {
        position: 'absolute',
        top: 0,
        backgroundColor: colors.white
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
