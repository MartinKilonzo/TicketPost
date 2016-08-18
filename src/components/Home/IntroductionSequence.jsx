import React from 'react';
import animate from 'react-addons-css-transition-group';

import {Button} from 'react-bootstrap';

import MenuButton from './MenuButton.jsx';

class IntroductionSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeWrapper = this.resizeWrapper.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeWrapper);
    const wrapper = document.getElementById('buttonWrapper');
    this.resizeWrapper(wrapper);
    wrapper.style.visibility = 'visible';
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWrapper);
  }
  resizeWrapper(element) {
    element.style.width =  document.getElementById('logo').offsetWidth + 'px';
  }
  render() {
    //TODO: User toggle for disableing the sequence near bottom corner
    const colors = this.props.colors;
    const styles = {
      background: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: colors.white
      },
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '40vh',
      },
      logo: {
        color: colors.dark, // Transition from dark to base
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '56pt',
        fontWeight: 100,
        lineHeight: '56pt'
      },
      buttonWrapper: {
        visibility: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '12pt',
        fontWeight: 100,
        cursor: 'pointer',
        userSelect: 'none'
      }
    };

    return (
      <div style={styles.background}>
        <div style={styles.wrapper}>
          <span id="logo" style={styles.logo}>ReadR</span>
          <div id="buttonWrapper" style={styles.buttonWrapper}>
            <MenuButton to="/fileProcessing" {...this.props}>Log In</MenuButton>
            <MenuButton to="/fileProcessing" {...this.props}>Sign Up</MenuButton>
          </div>
        </div>
      </div>
    );
  }
}

IntroductionSequence.defaultProps = {};

export default IntroductionSequence;
