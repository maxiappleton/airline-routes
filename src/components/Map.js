import React, { Component } from 'react';
import { getLatLongByCode } from './../data';

class Map extends Component {
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
                <circle className="source" cx={srcLong} cy={srcLat}>
                  <title></title>
                </circle>
                <circle className="destination" cx={destLong} cy={destLat}>
                  <title></title>
                </circle>
                <path d={`M${srcLong} ${srcLat} L ${destLong} ${destLat}`} />
              </g>
            );
          })}
          {/* for each route */}
          {/*  */}
          {/* end route */}

        </g>
      </svg>
    );
  }
}

export default Map;