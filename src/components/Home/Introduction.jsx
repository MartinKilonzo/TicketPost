import React from 'react';
import {Link} from 'react-router';
import {Button, Col} from 'react-bootstrap';

import IntroductionSequence from './IntroductionSequence.jsx';

class IntroductionComponent extends React.Component {
  //TODO: Proptypes for components
  constructor(props) {
    super(props);
    this.state = {
      colors: {
        base: '#393e41',
        dark: '#d3d0cb',
        light: '#e7e5df',
        accent: '#44bba4',
        highlight: '#e7bb41',
        white: '#FFFCFC',
        offwhite: '#FFFDF7'
      }
    };
  }
  render() {
    const colors = this.state.colors;
    const topPixels = 0;
    const indexStyle = {
      position: 'absolute',
      top: topPixels + 'px',
      height: `calc(100vh - ${topPixels}px)`,
      width: '100vw',
      padding: '15px 0',
      textAlign: 'center',
      background: colors.white
    }
    const menuStyle = {};
    const menuButtonStyle = {
      height: '65px',
      width: '50%',
      borderRadius: 0,
      borderColor: colors.base,
      borderWidth: '2px',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
      fontSize: '16pt'
    };
    const buttonTextStyle = {
      color: colors.base
    };
    return (
      <div style={indexStyle}>
        <IntroductionSequence colors={colors}></IntroductionSequence>
        <Col xs={6} xsOffset={3} style={menuStyle}>
          <Link to="/fileProcessing">
            <Button style={menuButtonStyle}>
              <span style={buttonTextStyle}>
                Start
              </span>
            </Button>
          </Link>
        </Col>
      </div>
    );
  }
}

export default IntroductionComponent;
