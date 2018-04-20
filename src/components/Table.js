import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 0
    };

    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handlePrevClick() {
    this.setState((prevState) => {
      return { currPage: prevState.currPage - 1 };
    });
  }

  handleNextClick() {
    this.setState((prevState) => {
      return { currPage: prevState.currPage + 1 };
    });
  }

  render() {
    const col1 = this.props.columns[0];
    const col2 = this.props.columns[1];
    const col3 = this.props.columns[2];

    const startIdx = this.state.currPage * this.props.perPage;
    const endIdx = (this.state.currPage + 1) * this.props.perPage;
    const rowsToDisplay = this.props.rows.slice(startIdx, endIdx);

    return (
      <div>
        <table className="routes-table">
          <thead>
            <tr>
              <th>{col1.name}</th>
              <th>{col2.name}</th>
              <th>{col3.name}</th>
            </tr>
          </thead>
          <tbody>
            {rowsToDisplay.map(route => {
              return (
                <tr key={JSON.stringify(route)}>
                  <td>{this.props.format(col1.property, route[col1.property])}</td>
                  <td>{this.props.format(col2.property, route[col2.property])}</td>
                  <td>{this.props.format(col3.property, route[col3.property])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <p>Showing {startIdx + 1}-{endIdx} of {this.props.rows.length} routes</p>
          <p>
            <button
              onClick={this.handlePrevClick}
              disabled={this.state.currPage === 0}
            >Previous Page</button>
            <button
              onClick={this.handleNextClick}
              disabled={endIdx === this.props.rows.length}
            >Next Page</button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;