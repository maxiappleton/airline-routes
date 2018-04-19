import React, { Component } from 'react';
import './App.css';

import data, { getAirportByCode, getAirlineById } from './data';
import Table from './components/Table';

class App extends Component {

  formatValue = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value);
    } else {
      return getAirportByCode(value);
    }
  };

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table" columns={columns} rows={data.routes} format={this.formatValue} />
        </section>
      </div>
    );
  }
}

export default App;