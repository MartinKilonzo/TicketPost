import React from 'react';
import {DropdownButton, MenuItem, Col, FormGroup, FormControl} from 'react-bootstrap';

import EventsQuery from '../../actions/FileProcessingActions/EventsQuery.jsx';
import colors from '../Home/colors.jsx'

class EventFieldComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: props.venues,
      events: props.events,
      venuesTitle: props.venuesTitle,
      eventsTitle: props.eventsTitle
    };

    this.setEvent = this.setEvent.bind(this);
    this.setVenue = this.setVenue.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    this.getEvents();
  }
  camelToTitleCase(str) {
    let ret = '';
    for (var i = 0; i < str.length; i++) {
      let char = str[i];
      if (i === 0) { // If it is the first character, append it, capitalized
        ret += char.toUpperCase();
      } else if (char === '_') { // Otherwise, if it is an underscore, replace it with an empty space and the following letter, capitalized
        ret += ' ' + str[i++ + 1].toUpperCase();
      } else { // Otherwise, the character is not special, so append it
        ret += char;
      }
    }
    return ret;
  }
  setEvent(ticketEvent) {
    this.setState({
      ticketEvent: ticketEvent,
      eventsTitle: this.camelToTitleCase(ticketEvent)
    }, () => {
      const ticketType = {
        value: {
          ticketVenue: this.state.ticketVenue,
          ticketEvent: this.state.ticketEvent
        },
        validationState: this.validate()
      }
      this.props.updateForm(ticketType, 'ticketType');
    });
  }
  setVenue(ticketVenue) {
    this.setState({
      events: ticketVenue.events,
      ticketVenue: ticketVenue.name,
      ticketEvent: undefined,
      eventsTitle: 'Events',
      venuesTitle: this.camelToTitleCase(ticketVenue.name)
    });
  }
  getEvents() {
    new EventsQuery().send().then(result => {
      this.setState({venues: result.data});
    }).catch(error => {
      console.error(error);
    });
  }
  validate() {
    // If there are missing fields, warn the user
    if (!this.state.ticketVenue || !this.state.ticketEvent) {
      return 'error';
    } else { // Otherwise, we're good
      //TODO: Text Validation
      return 'success';
    }
  }
  render() {
    const styles = {
      form: {
        display: 'inherit',
        alignItems: 'inherit',
        position: 'inherit',
        height: '100%',
        width: '100%',
        margin: '0 0 0 0'
      },
      label: {
        textAlign: 'left',
        color: colors.base,
        lineHeight: '18px',
        fontWeight: 300
      },
      dropdownMenu: {
        borderRadius: 0,
        textAlign: 'center',
        color: colors.base
      }
    };
    return (
      <FormGroup style={styles.form} controlId={this.props.controlId} validationState={this.validate()}>
        <Col sm={2} className="formLabel">
          <h4 style={styles.label}>Events</h4>
        </Col>
        <Col sm={4}>
          <DropdownButton style={styles.dropdownMenu} title={this.state.venuesTitle} id="venuesDropdown">
            {this.state.venues.map((ticketVenue, key) => {
              const setVenue = this.setVenue.bind(this, ticketVenue);
              return <MenuItem key={key} eventKey={key} onClick={setVenue}>{this.camelToTitleCase(ticketVenue.name)}</MenuItem>
            })}
          </DropdownButton>
        </Col>
        <Col sm={4}>
          {this.state.events && <DropdownButton style={styles.dropdownMenu} title={this.state.eventsTitle} id="eventsDropdown">
            {this.state.events.map((ticketEvent, key) => {
              const setEvent = this.setEvent.bind(this, ticketEvent);
              return <MenuItem key={key} eventKey={key} onClick={setEvent}>{this.camelToTitleCase(ticketEvent)}</MenuItem>
            })}
          </DropdownButton>}
        </Col>
        <FormControl.Feedback></FormControl.Feedback>
      </FormGroup>
    );
  }
}

EventFieldComponent.defaultProps = {
  venues: [],
  events: [],
  venuesTitle: 'Venues',
  eventsTitle: 'Events'
};

export default EventFieldComponent;
