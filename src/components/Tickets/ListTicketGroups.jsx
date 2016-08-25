import React from 'react';
import {Row, Col} from 'react-bootstrap';

import TicketPost from './TicketPost.jsx';

class ListTicketGroupsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDate: props.filterDate,
      filterEvent: props.filterEvent
    };
    this.setFilter = this.setFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }
  componentDidMount() {
    window.addEventListener('setTicketGroupFilter', this.setFilter);
  }
  componentWillUnmount() {
    window.removeEventListener('setTicketGroupFilter', this.setFilter);
  }
  setFilter(event) {
    const filterData = event.detail;
    this.setState({
      filterEvent: filterData.filterEvent,
      filterDate: filterData.filterDate
    });
  }
  render() {
    const styles = {
      colStyle: {
        textAlign: 'center'
      }
    };
    return (
      <Row>
        {this.props.ticketPosts.map((ticketPost, key) => {
          const filterEvent = this.state.filterEvent;
          const filterDate = this.state.filterDate;
          if ((filterEvent === '' && filterDate === '') || (ticketPost.event.Name === filterEvent && ticketPost.date === filterDate)) {
            return (
              <Col xs={4} key={key} style={styles.colStyle}>
                <TicketPost data={ticketPost} key={key} saveChanges={this.props.modifyTicketPost}></TicketPost>
              </Col>
            );
          }
        })}
      </Row>
    );
  }
}

ListTicketGroupsComponent.defaultProps = {
  ticketPosts: [],
  filterDate: '',
  filterEvent: ''
};

export default ListTicketGroupsComponent;
