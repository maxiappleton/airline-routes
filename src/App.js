import React, { Component } from 'react';
import './App.css';

import data, { getAirportByCode, getAirlineById } from './data';

// import Table from './components/Table';

class App extends Component {
  render() {
    const sampleRoutes = data.routes.slice(0, 10);

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>
            <tbody>
              {sampleRoutes.map(route => {
                return (
                  <tr key={JSON.stringify(route)}>
                    <td>{getAirlineById(route.airline)}</td>
                    <td>{getAirportByCode(route.src)}</td>
                    <td>{getAirportByCode(route.dest)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;