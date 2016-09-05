import React from 'react';
import Update from 'react-addons-update';
import {Button, Popover, OverlayTrigger} from 'react-bootstrap';

import InventoryQuery from '../StubHub/InventoryQuery.jsx';
import colors from '../Home/colors.jsx';

class TicketPriceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.getPrice = this.getPrice.bind(this);
    this.findSectionId = this.findSectionId.bind(this);
    this.saveSectionId = this.saveSectionId.bind(this);
  }
  getPrice() {
    const state = this;
    console.debug(this.state.eventData);
    let inventoryQuery = new InventoryQuery(this.state.eventData);
    //TODO: FIX 400 REQUESTS
    inventoryQuery.send().then(function success(result) {
      const averagePrice = '$' + Math.round(result.pricingSummary.averageTicketPrice * Math.pow(10, 2)) / 100;
      console.debug(averagePrice, result);
      const listings = result.section_stats;
      state.saveSectionId(listings);
      state.setState({
        price: averagePrice,
        postStatus: 'success',
        popoverTitle: 'Our Suggested Price',
        popoverDescription: 'Based on the current market prices found on StubHub.com, we recommend this per-ticket price.'
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
  findSectionId(listings) {
    let matches = [];
    let section = {
      number: this.state.section.match(/\d{3}/)[0],
      zone: this.state.section.match(/[A-Z]{1}/)[0]
    };
    for (var i = 0; i < listings.length; i++) {
      let listing = listings[i];
      if (listing.sectionName.match(section.number)) {
        matches.push(listing);
      }
    }
    if (matches.length === 0) {
      throw new Error({statusText: 'Section ID Not Found.'});
    } else if (matches.length > 1) {
      for (var j = 0; j < matches.length; j++) {
        let listing = matches[j];
        if (listing.sectionName.match(section.zone)) {
          matches = [listing];
          break;
        }
      }
    }
    return matches[0];
  }
  saveSectionId(listings) {
    const sectionId = this.findSectionId(listings).sectionId;
    let newState = {
      eventData: Update(this.state.eventData, {
        $merge: {
          sectionId: sectionId
        }
      })
    };
    this.setState(newState, function() {
      console.debug(this.state.eventData);
    });
  }
  render() {
    const style = {
      width: '33%',
      padding: '6px 0 6px 0',
      border: 'none',
      borderRadius: 0,
      color: colors.base,
      backgroundColor: colors.accent
    };
    const overlay = <Popover id="popover-positioned-right" placement="right" title={this.state.popoverTitle}>{this.state.popoverDescription}</Popover>;
    return (
      <OverlayTrigger trigger={['hover', 'focus']} delay={200} placement="right" overlay={overlay}>
        <Button style={style} bsStyle={this.state.postStatus} onClick={this.getPrice} block>{this.state.price}</Button>
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
