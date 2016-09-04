import React from 'react';
import FontAwesome from 'react-fontawesome';

class StatusFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const styles = {
      buttonStyle: {
        width: '33%',
        paddingTop: '10px',
        paddingLeft: '4%',
        paddingBottom: '10px',
        textAlign: 'center'
      }
    };
    return (
      <div>
        <div>
          <FontAwesome name="circle-o"></FontAwesome> Accepted
        </div>
        <div>
          <FontAwesome name="circle-o"></FontAwesome> Warnings
        </div>
        <div>
          <FontAwesome name="circle-o"></FontAwesome> Errors
        </div>

      </div>
    );
  }
}

StatusFilterComponent.defaultProps = {};

export default StatusFilterComponent;

/*
<ButtonGroup justified style={styles.btnGrpStyle}>
  <Button bsStyle="success" style={styles.buttonStyle}>Accepted</Button>
  <Button bsStyle="warning" style={styles.buttonStyle}>Warnings</Button>
  <Button bsStyle="danger" style={styles.buttonStyle}>Errors</Button>
</ButtonGroup>
*/
