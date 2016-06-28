import React from 'react';

let appLogo = require('../images/TicketPostLogo.png');

class IntroductionComponent extends React.Component {
  render() {
    const imageStyle = {
    };
    return (
      <div className="index">
        <a href="#/fileProcessing"><img style={imageStyle} src={appLogo} alt="Yeoman Generator"/></a>
      </div>
    );
  }
}

export default IntroductionComponent;
