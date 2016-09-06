import React from 'react';

import TicketCount from './TicketGroupInfo/TicketCount.jsx';
import TicketGroupData from './TicketGroupInfo/TicketGroupData.jsx';
import TicketGroupSeats from './TicketGroupInfo/TicketGroupSeats.jsx';
import colors from '../../Home/colors.jsx';

class TicketGroupInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const flags = () => {
      let str = '';
      for (var flag in ticketGroup.flags) {
        str += flag + '\n'
      }
      return str.slice(0, str.length - 1);
    };
    const styles = {
      wrapper: {
        postion: 'relative',
        display: 'flex',
        height: '30%',
        width: '100%',
        backgroundColor: colors.base
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
    return (
      <div style={styles.wrapper}>
        <TicketCount {...this.props}></TicketCount>
        <div style={styles.ticketInfo}>
          <div style={styles.ticketInfoWrapper}>
            <div style={styles.infoWrapper}>
              <TicketGroupData>{this.props.section}</TicketGroupData>
              <TicketGroupData>{this.props.row}</TicketGroupData>
              <TicketGroupSeats {...this.props}></TicketGroupSeats>
            </div>
            <div style={styles.labelWrapper}>
              <InfoLabel>Section</InfoLabel>
              <InfoLabel>Row</InfoLabel>
              <InfoLabel>Seat</InfoLabel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TicketGroupInfoComponent.defaultProps = {};

class InfoLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = {
      width: '33%',
      fontSize: '0.75em'
    };
    return (
      <div style={style}>{this.props.children}</div>
    );
  }
}

InfoLabel.defaultProps = {};

export default TicketGroupInfoComponent;
