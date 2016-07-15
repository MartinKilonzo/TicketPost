import React from 'react';
import {Button} from 'react-bootstrap';

import InventoryQuery from '../StubHub/InventoryQuery.jsx';

class TicketPriceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: props.eventData
    };
    this.getPrice = this.getPrice.bind(this);
  }
  getPrice() {
    const state = this;
    let inventoryQuery = new InventoryQuery(this.state.eventData);
    //TODO: FIX 400 REQUESTS
    inventoryQuery.send()
    .then(function success(result) {
      let listings = result;
      const averagePrice = listings.pricingsummary.averageTicketPrice
      console.debug(averagePrice, listings);
      state.setState({postStatus: 'success'});
    }).catch(function error(err) {
      console.error('ERROR', err);
      state.setState({postStatus: 'danger'});
    });
  }
  render() {
    return (
      <div>
        <Button bsStyle={this.state.postStatus} onClick={this.getPrice} block>{this.state.price}</Button>
      </div>
    );
  }
}

TicketPriceComponent.defaultProps = {};

export default TicketPriceComponent;
