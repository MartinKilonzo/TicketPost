import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Introduction from './Home/Introduction.jsx';
import TicketOptions from './TicketOptions/TicketOptions.jsx';
import FileProcessing from './FileProcessing/FileProcessing.jsx';

class RouteComponent extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={Introduction}/>
          <Route path="fileProcessing" component={FileProcessing}>
            <Route path="form" component={TicketOptions}></Route>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default RouteComponent;
