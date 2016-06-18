require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Route from './Route.jsx';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Route/>
        <Footer/>
      </div>
    );
  }
}

Main.defaultProps = {
};

export default Main;
