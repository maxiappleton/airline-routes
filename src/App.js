import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

import data, { getAirportByCode, getAirlineById } from './data';
import Map from './components/Map';
import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all',
      airport: 'all'
    };

    this.handleAirlineSelect = this.handleAirlineSelect.bind(this);
    this.handleAirportSelect = this.handleAirportSelect.bind(this);
    this.handleSelectResetClick = this.handleSelectResetClick.bind(this);
    this.handleMapAirportClick = this.handleMapAirportClick.bind(this);
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value);
    }
  };

  handleAirlineSelect(e) {
    this.setState({ airline: e.target.value });
  }

  handleAirportSelect(e) {
    this.setState({ airport: e.target.value });
  }

  handleSelectResetClick() {
    this.setState({ airline: 'all', airport: 'all' });
  }

  handleMapAirportClick(code) {
    this.setState({ airport: code });
  }

  filterRoutes() {
    if (this.state.airline === 'all' && this.state.airport === 'all') {
      return data.routes;
    } else if (this.state.airline === 'all') {
      return data.routes.filter(route => {
        return route.src === this.state.airport || route.dest === this.state.airport;
      });
    } else if (this.state.airport === 'all') {
      return data.routes.filter(route => {
        return route.airline === Number(this.state.airline);
      });
    } else {
      return data.routes.filter(route => {
        return route.airline === Number(this.state.airline) && (route.src === this.state.airport || route.dest === this.state.airport);
      });
    }
  }

  filterAirlines() {
    if (this.state.airport === 'all') {
      return data.airlines;
    } else {
      const possibleRoutes = data.routes.filter(route => {
        return route.src === this.state.airport || route.dest === this.state.airport;
      });

      const airlineIds = possibleRoutes.map(route => route.airline);
      const uniqAirlineIds = _.uniq(airlineIds);

      return data.airlines.filter(airline => {
        return uniqAirlineIds.includes(airline.id);
      });
    }
  }

  filterAirports() {
    if (this.state.airline === 'all') {
      return data.airports;
    } else {
      const possibleRoutes = data.routes.filter(route => {
        return route.airline === Number(this.state.airline);
      });

      const airportCodes = [];
      possibleRoutes.forEach(route => airportCodes.push(route.src, route.dest));
      const uniqAirportCodes = _.uniq(airportCodes);

      return data.airports.filter(airport => {
        return uniqAirportCodes.includes(airport.code);
      });
    }
  }

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const filteredRoutes = this.filterRoutes();
    const filteredAirlines = this.filterAirlines();
    const filteredAirports = this.filterAirports();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map
            routes={filteredRoutes}
            onMapAirportClick={this.handleMapAirportClick}
          />
          <p>(Hover over airport for name, click to filter)</p>
          <div className="selection-area">
            Show routes on
            <Select
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.handleAirlineSelect}
            />
            flying into or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.handleAirportSelect}
            />
            <button onClick={this.handleSelectResetClick}>Show All Routes</button>
          </div>
          <Table
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;