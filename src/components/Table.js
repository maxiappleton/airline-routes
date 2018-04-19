import React, { Component } from 'react';

class Table extends Component {
  render() {
    // const sampleRoutes = this.props.rows.slice(0, 10);

    return (
      <table className="routes-table">
        <thead>
          <tr>
            <th>{this.props.columns[0].name}</th>
            <th>{this.props.columns[1].name}</th>
            <th>{this.props.columns[2].name}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map(route => {
            return (
              <tr key={JSON.stringify(route)}>
                <td>{this.props.format(this.props.columns[0].property, route.airline)}</td>
                <td>{this.props.format(this.props.columns[1].property, route.src)}</td>
                <td>{this.props.format(this.props.columns[2].property, route.dest)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;