import React, { Component } from 'react';
import { getAirportByCode } from './../data';

class AirportMarker extends Component {
  constructor(props) {
    super(props);
    this.handleMapAirportClick = this.handleMapAirportClick.bind(this);
  }

  handleMapAirportClick() {
    this.props.onMapAirportClick(this.props.code);
  }

  render() {
    return (
      <circle
        className={this.props.type}
        cx={this.props.cx}
        cy={this.props.cy}
        onClick={this.handleMapAirportClick}
      >
        <title>{getAirportByCode(this.props.code)}</title>
      </circle>
    );
  }
}

export default AirportMarker;