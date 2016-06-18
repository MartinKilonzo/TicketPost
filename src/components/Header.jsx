import React from 'react';

import {Button} from 'react-bootstrap';

class ReloadingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  handleClick() {
    this.setState({isLoading: true});
    setTimeout(function() {
      this.setState({isLoading: false})
    }.bind(this), 2000);
  }
  isLoading() {
    return this.state.isLoading;
  }
  render() {
    let isLoading = this.state.isLoading;
    return (
      <Button bsStyle="primary" disabled={isLoading} onClick={!isLoading
        ? this.handleClick
        : null}>{!isLoading ? 'Reload' : 'Reloading...'}</Button>
    );
  }
}

class HeaderComponent extends React.Component {
  render() {
    return (
      null
    )
  }
}

export default HeaderComponent;
