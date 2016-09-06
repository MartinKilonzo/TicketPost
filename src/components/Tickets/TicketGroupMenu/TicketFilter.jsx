import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

import DateComponent from '../Date.jsx';

class TicketFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }
  setFilter(ticketGroup, event) {
    const setFilterEvent = new CustomEvent('setTicketGroupFilter', {
      detail: {
        filterEvent: ticketGroup.event.Name,
        filterDate: ticketGroup.date
      }
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(ticketGroup.date);
    date = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
    this.setState({title: ticketGroup.event.Name + '\n' + date});
    window.dispatchEvent(setFilterEvent);
  }
  render() {
    const styles = {
      dropdownMenu: {
        marginLeft: '12px',
        marginRight: '12px',
        whiteSpace: 'normal'
      },
      btnGrpStyle: {
        marginBottom: '20px'
      },
      postGroupsButtonStyle: {
        whiteSpace: 'normal'
      }
    };
    return (
      <DropdownButton style={styles.dropdownMenu} title={this.state.title} id="filterByEventMenu">
        {this.props.ticketGroups.map((ticketGroup, key) => {
          let comparableticketGroup;
          if (key < this.props.ticketGroups.length - 1) {
            // If this element is the last element (or only), compare it to the previous element instead of the next one
            comparableticketGroup = this.props.ticketGroups[key + 1];
          } else {
            // To prevent index out of bounds error
            comparableticketGroup = this.props.ticketGroups[key - 1];
          }
          // If its the last ticketGroup, or one in the list and the date or the event doesnt match the next ticketGroup, create a filter for this grouping of ticketGroups:
          if (key === this.props.ticketGroups.length - 1 || ticketGroup.date !== comparableticketGroup.date || ticketGroup.event.Name !== comparableticketGroup.event.Name) {
            // Bind the ticketGroup data to the function:
            let setTicketFilter = this.setFilter.bind(this, ticketGroup);
            return (
              <MenuItem key={key} onClick={setTicketFilter} style={styles.postGroupsButtonStyle} vertical block>
                {ticketGroup.event.Name}
                <DateComponent date={ticketGroup.date}></DateComponent>
              </MenuItem>
            );
          }
        })}
      </DropdownButton>
    );
  }
}

TicketFilterComponent.defaultProps = {
  title: 'Events'
};

export default TicketFilterComponent;
