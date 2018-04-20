import React, { Component } from 'react';
import { getLatLongByCode } from './../data';
import AirportMarker from './AirportMarker';

class Map extends Component {
  handleAirportClick(e) {
    console.log(e.target);
  }

  render() {
    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)" />
          {this.props.routes.map(route => {
            const [srcLat, srcLong] = getLatLongByCode(route.src);
            const [destLat, destLong] = getLatLongByCode(route.dest);
            return (
              <g key={JSON.stringify(route) + 'MAP'}>
                <AirportMarker
                  code={route.src}
                  type="source"
                  cx={srcLong}
                  cy={srcLat}
                  onMapAirportClick={this.props.onMapAirportClick}
                />
                <AirportMarker
                  code={route.dest}
                  type="destination"
                  cx={destLong}
                  cy={destLat}
                  onMapAirportClick={this.props.onMapAirportClick}
                />
                <path d={`M${srcLong} ${srcLat} L ${destLong} ${destLat}`} />
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}

export default Map;