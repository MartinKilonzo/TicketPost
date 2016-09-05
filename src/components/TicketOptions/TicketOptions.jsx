import React from 'react';
import Update from 'react-addons-update';

import PageHeader from '../Home/PageHeader.jsx';
import OptionsForm from './OptionsForm.jsx';
import colors from '../Home/colors.jsx';

class TicketOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inData: props.inData,
      saveForm: props.saveForm
    };
  }
  render() {
    const styles = {
      wrapper: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        backgroundColor: colors.white
      }
    };
    return (
      <div style={styles.wrapper}>
        <PageHeader color={colors.base} align="left">Upload Tickets</PageHeader>
        <OptionsForm {...this.props}/>
      </div>
    );
  }
}

TicketOptions.defaultProps = {};

export default TicketOptions;
