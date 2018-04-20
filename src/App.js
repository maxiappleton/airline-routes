import React, { Component } from 'react';
import './App.css';

import data, { getAirportByCode, getAirlineById } from './data';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all'
    };

    this.handleAirlineSelect = this.handleAirlineSelect.bind(this);
    this.filteredRoutes = this.filteredRoutes.bind(this);
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

  filteredRoutes() {
    if (this.state.airline === 'all') {
      return data.routes;
    } else {
      return data.routes.filter(route => {
        return route.airline === Number(this.state.airline);
      });
    }
  }

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const rows = this.filteredRoutes();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <select value={this.state.airline} onChange={this.handleAirlineSelect}>
            {data.airlines.map((airline) => {
              return <option key={airline.id} value={airline.id}>{airline.name}</option>
            })}
          </select>
          <Table columns={columns} rows={rows} format={this.formatValue} perPage={25} />
        </section>
      </div>
    );
  }
}

export default App;