import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class IntroductionComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <a href="#/form"><img src={yeomanImage} alt="Yeoman Generator"/></a>
        <div className="notice">
          Please <code>click on the above image</code> to get started!
        </div>
      </div>
    );
  }
}

export default IntroductionComponent;
