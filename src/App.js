import React, { Component } from 'react';
import './App.css';

import data, { getAirportByCode, getAirlineById } from './data';
import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all'
    };

    this.handleAirlineSelect = this.handleAirlineSelect.bind(this);
    this.filterRoutes = this.filterRoutes.bind(this);
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

  // const routes = [
  //   { "airline": 24, "src": "DFW", "dest": "XNA" },

  filterRoutes() {
    if (this.state.airline === 'all') {
      return data.routes;
    } else {
      return data.routes.filter(route => {
        return route.airline === Number(this.state.airline);
      });
    }
  }

  filterAirlines() {
    return data.airlines;
  }

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const filteredRoutes = this.filterRoutes();
    const filteredAirlines = this.filterAirlines();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.airline}
            onSelect={this.handleAirlineSelect}
          />
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