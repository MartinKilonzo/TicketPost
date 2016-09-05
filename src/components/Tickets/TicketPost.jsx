import React from 'react';
import {Button} from 'react-bootstrap';

import DateComponent from './Date.jsx';
import Price from '../tickets/TicketPrice.jsx';
import PostTicket from './PostTickets.jsx';
import UploadTicket from './UploadTickets.jsx';
import colors from '../Home/colors.jsx';

//TODO: SHOW TICKET FLAGS
class TicketPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.state.showMoreDetails = props.showMoreDetails;
    this.changeView = this.changeView.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.submitTickets = this.submitTickets.bind(this);
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  submitTickets() {
    console.log('Posted: ', this.state);
  }
  saveChanges(newTicketPost) {
    this.props.saveChanges(this.props.ticketPost, newTicketPost);
  }
  render() {
    const ticketPost = this.state;
    const flags = () => {
      let str = '';
      for (var flag in ticketPost.flags) {
        str += flag + '\n'
      }
      return str.slice(0, str.length - 1);
    }
    let tickets = ticketPost.tickets[0].seat.toString();
    for (var i = 1; i < ticketPost.count; i++) {
      tickets += ', ' + ticketPost.tickets[i].seat.toString();
    }
    const ticketWidth = '250';
    const widthToHeightRatio = 1.4;
    const styles = {
      ticket: {
        height: ticketWidth * widthToHeightRatio,
        width: ticketWidth,
        border: '1px solid black',
        marginTop: '15px',
        marginBottom: '15px',
        marginLeft: '15px',
        marginRight: '15px',
        textAlign: 'center',
        fontFamily: 'Open Sans, sans-serif'
      },
      statusSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        postion: 'relative',
        height: '60%',
        width: '100%',
        fontSize: '1.25em'
      },
      actionSection: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        postion: 'relative',
        height: '10%',
        width: '100%'
      },
      infoSection: {
        postion: 'relative',
        display: 'flex',
        height: '30%',
        width: '100%',
        backgroundColor: colors.base
      },
      ticketCount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        fontSize: '3.5em',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: colors.highlight
      },
      ticketInfo: {
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        paddingRight: '15px',
        color: 'white'
      },
      ticketInfoWrapper: {
        display: 'block',
        width: '100%',
        fontSize: '1.2em'
      },
      infoWrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        height: '22%'
      },
      ticketSection: {
        display: 'flex',
        justifyContent: 'center',
        width: '33%'
      },
      ticketRow: {
        display: 'flex',
        justifyContent: 'center',
        width: '33%'
      },
      ticketSeats: {
        display: 'flex',
        justifyContent: 'center',
        width: '33%',
        fontSize: '0.75em',
        lineHeight: '1em'
      },
      labelWrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        height: '39%'
      },
      infoLabel: {
        width: '33%',
        fontSize: '0.75em'
      }
    };
    const ticketStyle = {
      whiteSpace: 'normal'
    };
    //TODO: Add another button for refreshing event data if fail, and use as alternate to current
    return (
      <div style={styles.ticket}>
        <div style={styles.statusSection}>
          <span>
            {ticketPost.event.Name}<br/>
            <DateComponent date={ticketPost.date}></DateComponent>
          </span>
        </div>
        <div style={styles.actionSection}>
          <PostTicket {...ticketPost} callback={this.submitTickets}></PostTicket>
          <Price eventData={ticketPost.event} section={ticketPost.section}></Price>
          <UploadTicket {...ticketPost}></UploadTicket>
        </div>
        <div style={styles.infoSection}>
          <div style={styles.ticketCount}>
            {ticketPost.count}
          </div>
          <div style={styles.ticketInfo}>
            <div style={styles.ticketInfoWrapper}>
              <div style={styles.infoWrapper}>
                <div style={styles.ticketSection}>{ticketPost.section}</div>
                <div style={styles.ticketRow}>{ticketPost.row}</div>
                <div style={styles.ticketSeats}>
                  <span>{ticketPost.tickets[0].seat}</span>
                  <br/>-<br/>
                  <span>{ticketPost.tickets[ticketPost.tickets.length - 1].seat}</span>
                </div>
              </div>
              <div style={styles.labelWrapper}>
                <div style={styles.infoLabel}>Section</div>
                <div style={styles.infoLabel}>Row</div>
                <div style={styles.infoLabel}>Seat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TicketPostComponent.defaultProps = {
  showMoreDetails: false
};

export default TicketPostComponent;
