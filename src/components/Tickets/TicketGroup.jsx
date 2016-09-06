import React from 'react';
import {Button} from 'react-bootstrap';

import TicketGroupStatus from './TicketGroup/TicketGroupStatus.jsx';
import TicketGroupActions from './TicketGroup/TicketGroupActions.jsx';
import TicketGroupInfo from './TicketGroup/TicketGroupInfo.jsx';
import colors from '../Home/colors.jsx';

//TODO: SHOW TICKET FLAGS
class ticketGroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.state.showMoreDetails = props.showMoreDetails;
    this.changeView = this.changeView.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  changeView() {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails
    });
  }
  saveChanges(newticketGroup) {
    this.props.saveChanges(this.props.ticketGroup, newticketGroup);
  }
  render() {
    const ticketGroup = this.state;
    const ticketWidth = '250';
    const widthToHeightRatio = 1.4;
    const style = {
      height: ticketWidth * widthToHeightRatio,
      width: ticketWidth,
      marginTop: '15px',
      marginBottom: '15px',
      marginLeft: '15px',
      marginRight: '15px',
      backgroundColor: 'white',
      boxShadow: '0px 3px 6px ' + colors.dark,
      textAlign: 'center',
      fontFamily: 'Open Sans, sans-serif'
    };
    const ticketStyle = {
      whiteSpace: 'normal'
    };
    //TODO: Add another button for refreshing event data if fail, and use as alternate to current
    return (
      <div style={style}>
        <TicketGroupStatus {...ticketGroup}></TicketGroupStatus>
        <TicketGroupActions {...ticketGroup}></TicketGroupActions>
        <TicketGroupInfo {...ticketGroup}></TicketGroupInfo>
      </div>
    );
  }
}

ticketGroupComponent.defaultProps = {
  showMoreDetails: false
};

export default ticketGroupComponent;
