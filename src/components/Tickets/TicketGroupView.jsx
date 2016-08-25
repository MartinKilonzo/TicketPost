import React from 'react';
import {Col, Button, ButtonGroup, Row} from 'react-bootstrap';

import TicketPost from './TicketPost.jsx';
import TicketGroupMenu from './TicketGroupMenu.jsx'
import colors from '../Home/colors.jsx';

class TicketGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDate: props.filterDate,
      filterEvent: props.filterEvent
    };
    this.resetFilter = this.resetFilter.bind(this);
    this.setTicketFilter = this.setTicketFilter.bind(this);
  }
  resetFilter() {
    this.setState({filterEvent: '', filterDate: ''});
  }
  setTicketFilter(ticketPost, event) {
    this.setState({filterEvent: ticketPost.event.Name, filterDate: ticketPost.date});
  }
  render() {
    //TODO: Fix first ticketpost being listed last --> sort tickets client side or via API
    const props = this.props;
    const colStyle = {
      textAlign: 'center'
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
          <TicketGroupMenu setFilter={this.setTicketFilter} resetFilter={this.resetFilter} ticketPosts={this.props.ticketPosts}></TicketGroupMenu>
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

TicketGroupView.defaultProps = {
  ticketPosts: [],
  filterDate: '',
  filterEvent: ''
};

export default TicketGroupView;
