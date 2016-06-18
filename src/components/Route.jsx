import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Introduction from './Introduction.jsx';
import TicketOptions from './TicketOptions/TicketOptions.jsx';

class RouteComponent extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={Introduction}/>
          <Route path="form" component={TicketOptions}/>
        </Route>
      </Router>
    );
  }
}

export default RouteComponent;
