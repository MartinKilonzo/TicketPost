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
  setFilter(ticketPost, event) {
    const setFilterEvent = new CustomEvent('setTicketGroupFilter', {
      detail: {
        filterEvent: ticketPost.event.Name,
        filterDate: ticketPost.date
      }
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(ticketPost.date);
    date = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
    this.setState({title: ticketPost.event.Name + '\n' + date});
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
        {this.props.ticketGroups.map((ticketPost, key) => {
          let comparableTicketPost;
          if (key < this.props.ticketGroups.length - 1) {
            // If this element is the last element (or only), compare it to the previous element instead of the next one
            comparableTicketPost = this.props.ticketGroups[key + 1];
          } else {
            // To prevent index out of bounds error
            comparableTicketPost = this.props.ticketGroups[key - 1];
          }
          // If its the last ticketPost, or one in the list and the date or the event doesnt match the next ticketPost, create a filter for this grouping of ticketGroups:
          if (key === this.props.ticketGroups.length - 1 || ticketPost.date !== comparableTicketPost.date || ticketPost.event.Name !== comparableTicketPost.event.Name) {
            // Bind the ticketPost data to the function:
            let setTicketFilter = this.setFilter.bind(this, ticketPost);
            return (
              <MenuItem key={key} onClick={setTicketFilter} style={styles.postGroupsButtonStyle} vertical block>
                {ticketPost.event.Name}
                <DateComponent date={ticketPost.date}></DateComponent>
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
