import React from 'react';
import {Row, Col} from 'react-bootstrap';

import TicketGroup from './TicketGroup.jsx';

class ListTicketGroupsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDate: props.filterDate,
      filterEvent: props.filterEvent,
      ticketGroupCount: 0
    };
    this.setFilter = this.setFilter.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
  }
  componentDidMount() {
    window.addEventListener('setTicketGroupFilter', this.setFilter);
  }
  componentWillUnmount() {
    window.removeEventListener('setTicketGroupFilter', this.setFilter);
  }
  setFilter(event) {
    const filterData = event.detail;
    this.setState({filterEvent: filterData.filterEvent, filterDate: filterData.filterDate, ticketGroupCount: 0});
  }
  increaseCount() {
    this.setState({
      ticketGroupCount: this.state.ticketGroupCount + 1
    });
  }
  render() {
    const styles = {
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '15px',
        paddingRight: '15px'
      }
    };
    return (
      <div style={styles.wrapper}>
        {this.props.ticketGroups.map((ticketGroup, key) => {
          const filterEvent = this.state.filterEvent;
          const filterDate = this.state.filterDate;
          if ((filterEvent === '' && filterDate === '') || (ticketGroup.event.Name === filterEvent && ticketGroup.date === filterDate)) {
            return (
              <TicketGroup data={ticketGroup} key={key} saveChanges={this.props.modifyTicketGroup}></TicketGroup>
            );
          }
        })}
      </div>
    );
  }
}

ListTicketGroupsComponent.defaultProps = {
  ticketGroups: [],
  filterDate: '',
  filterEvent: ''
};

export default ListTicketGroupsComponent;
