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
        : null}>{!isLoading
          ? 'Reload'
          : 'Reloading...'}</Button>
    );
  }
}

class HeaderComponent extends React.Component {
  render() {
    const fontSize = 30;
    const margin = 56 - fontSize;
    const bannerStyle = {
      position: 'fixed',
      top: 0,
      width: '100vw',
      height: '56px',
      backgroundColor: 'black',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 100
    };
    const logoSpotStyle = {
      display: 'flex',
      position: 'absolute',
      height: '100%',
      marginLeft: '20px'
    };
    const logoStyle = {
      position: 'relative',
      marginTop: margin * 0.85 + '%',
      marginBottom: margin * 0.15 + '%',
      textAlign: 'left',
      fontSize: fontSize + 'px',
      color: 'white',
      lineHeight: fontSize + 'px',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 1
    };
    return (
      <nav style={bannerStyle}>
        <a href="#/">
          <div style={logoSpotStyle}>
            <span style={logoStyle}>ReadR</span>
          </div>
        </a>
      </nav>
    )
  }
}

export default HeaderComponent;
