import React from 'react';
import {Button} from 'react-bootstrap';

import Date from './Date.jsx';

class TicketFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setFilter(ticketPost, event) {
    const setFilterEvent = new CustomEvent('setTicketGroupFilter', {
      detail: {
        filterEvent: ticketPost.event.Name,
        filterDate: ticketPost.date
      }
    });
    window.dispatchEvent(setFilterEvent);
  }
  render() {
    const styles = {
      btnGrpStyle: {
        marginBottom: '20px'
      },
      postGroupsButtonStyle: {
        whiteSpace: 'normal'
      }
    };
    return (
      <div>
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
              <Button key={key} onClick={setTicketFilter} style={styles.postGroupsButtonStyle} vertical block>
                {ticketPost.event.Name}
                <Date date={ticketPost.date}></Date>
              </Button>
            );
          }
        })}
      </div>
    );
  }
}

TicketFilterComponent.defaultProps = {};

export default TicketFilterComponent;
