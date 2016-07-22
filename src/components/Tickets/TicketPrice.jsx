import React from 'react';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

import InventoryQuery from '../StubHub/InventoryQuery.jsx';

class TicketPriceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.getPrice = this.getPrice.bind(this);
  }
  getPrice() {
    const state = this;
    let inventoryQuery = new InventoryQuery(this.state.eventData);
    //TODO: FIX 400 REQUESTS
    inventoryQuery.send().then(function success(result) {
      const averagePrice = '$' + Math.round(result.pricingSummary.averageTicketPrice * Math.pow(10, 2)) / 100;
      console.debug(averagePrice, result);
      state.setState({
        price: averagePrice,
        postStatus: 'success',
        popoverTitle: 'Our Suggested Price',
        popoverDescription: 'temp'
      }, function callback() {
        if (typeof this.props.callback !== 'undefined') {
          state.props.callback();
        }
      });
    }).catch(function error(err) {
      console.error('ERROR', err);
      state.setState({postStatus: 'danger', popoverTitle: 'Uh-Oh! We couldn\'t get a price:', popoverDescription: err.statusText});
    });
  }
  render() {
    const overlay = <Popover id="popover-positioned-right" placement="right" title={this.state.popoverTitle}>{this.state.popoverDescription}</Popover>;
    return (
      <OverlayTrigger trigger={['hover', 'focus']} delay={200} placement="right" overlay={overlay}>
        <Button bsStyle={this.state.postStatus} onClick={this.getPrice} block>{this.state.price}</Button>
      </OverlayTrigger>
    );
  }
}

TicketPriceComponent.defaultProps = {
  price: '$250.00',
  status: 'default',
  popoverTitle: 'Description',
  popoverDescription: 'The suggested price per ticket.'
};

export default TicketPriceComponent;
