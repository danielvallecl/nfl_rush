/***
 * @App name: NFL Rush
 * @Component Name: PlayerAll.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from 'react';

class PlayerAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('../nfl_data/rushing.json'),
      number_of_players: 0,
      selected: '',
      Player: true,
      Yds: false,
      Lng: false,
      TD: false,
      ascending: true,
      save: false,
    };

    localStorage.setItem('player', '');
    localStorage.setItem('players', '');
    localStorage.setItem('count', 0);
    localStorage.setItem('active', 'Player');
    localStorage.setItem('change', false);
    localStorage.setItem('asc', false);
    localStorage.setItem('save', true);
    localStorage.setItem('itensPerPage', 9);
    localStorage.setItem('page', 0);
    localStorage.setItem('last', 0);
  }

  shouldComponentUpdate() {
    if (localStorage.getItem('change') === 'true') {
      localStorage.setItem('change', false);
      return true;
    }
    return false;
  }

  componentWillUpdate() {
    // Prepare players_array sorted by 'active' field to be presented in every page but the first
    const players_array = this.prepare_players(localStorage.getItem('active'));
    // Call pagination with sorted array, page number to be presented and number of itens per page
    const page_array = this.paginate(players_array, parseInt(localStorage.getItem('page')), parseInt(localStorage.getItem('itensPerPage')));
    // Store partial array into localStorage
    localStorage.setItem('players_array', JSON.stringify(page_array));
  }

  componentWillMount() {
    // Prepare players_array sorted by 'active' field to be presented in the first page
    const players_array = this.prepare_players(localStorage.getItem('active'));
    // Define number of lines of the file for pagination calculation
    this.setState({number_of_players: players_array.length});
    // Calculate last page for pagination
    localStorage.setItem('last', Math.floor(players_array.length / parseInt(localStorage.getItem('itensPerPage'))));
    // Call pagination with sorted array, page number to be presented and number of itens per page
    const page_array = this.paginate(players_array, localStorage.getItem('page'), localStorage.getItem('itensPerPage'));
    // Store partial array into localStorage
    localStorage.setItem('players_array', JSON.stringify(page_array));
  }

  // Input - Array of Players, page number and Itens per page_array
  // Returns a slice of the original array
  paginate = (array, page, items_per_page) => {
    return array.slice(page * items_per_page, ((page + 1) * items_per_page - 1));
  }

  // Input - sort - Field of the JSON file to be sorted
  // Return a sorted array by the selected action
  prepare_players = (sort) => {
    // Original JSON file
    let players_array = [...this.state.data];
    switch (sort) {
      case 'Yds':
        if (localStorage.getItem('asc') === 'false') {
          players_array = this.sortByField(players_array, ['Yds'], true);
        } else {
          players_array = this.sortByField(players_array, ['Yds'], false);
        }
        break;
      case 'Lng':
        if (localStorage.getItem('asc') === 'false') {
          players_array = this.sortByField(players_array, ['Lng'], true);
        } else {
          players_array = this.sortByField(players_array, ['Lng'], false);
        }
        break;
      case 'TD':
        if (localStorage.getItem('asc') === 'false') {
          players_array = this.sortByField(players_array, ['TD'], true);
        } else {
          players_array = this.sortByField(players_array, ['TD'], false);
        }
        break;
      case 'Player':
        if (localStorage.getItem('asc') === 'false') {
          players_array = this.sortByField(players_array, ['Player'], true);
        } else {
          players_array = this.sortByField(players_array, ['Player'], false);
        }
        break;
      default:
        players_array = this.sortByField(players_array, ['Player'], true);
    }
    if (localStorage.getItem('save') === 'false'){
      this.saveCsv(players_array);
    }
    return players_array;
  }

  // Input - Original JSON array, Sort key and ascending or descending
  // Return A sorted array by sort key ascending or descending
  sortByField = (array, keys, asc) => {
    if (asc === true) {
      return array.sort(function (a, b) {
          var r = 0;
          keys.some(function (k) { return r = a[k] > b[k] ? 1 : b[k] > a[k] ? -1 : 0; });
          return r;
      });
    } else {
      return array.sort(function (a, b) {
          var r = 0;
          keys.some(function (k) { return r = a[k] < b[k] ? 1 : b[k] < a[k] ? -1 : 0; });
          return r;
      });
    }
  }

  // Input - Sorted array json
  // return - Saved CSV file based on sorted array
  saveCsv = (array) => {
    let first = false;
    let csvContent = "data:text/csv;charset=utf-8,";

    array.map((row) => {
      Object.entries(row).map((item) => {
        if (first !== false) {
          csvContent += item[1] + ',';
        } else {
          csvContent += item[0] + ',';
        }
      })
      first = true;
      csvContent = csvContent.replace(/.$/,"\r\n");
    })

    let encoded = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", localStorage.getItem('active'));
    document.body.appendChild(link);
    link.click();
  }


  // Handlers of checkbox and radio buttons

  // Handles all radio buttons responsible for sorting view option
  onSortChange = (e) => {
    // Clear all radio buttons
    this.setState({Player: false});
    this.setState({Yds: false});
    this.setState({Lng: false});
    this.setState({TD: false});
    // Check the selected one
    this.setState({[e.target.name]: !this.state[e.target.name]});
    // Informs shouldComponentUpdate to Update component
    localStorage.setItem('change', true);
    localStorage.setItem('active', e.target.name);
  }

  // Handles checkboxes - ascending and save options
  onCheckChange = (e) => {
    // Informs shouldComponentUpdate to Update component
    localStorage.setItem('change', true);
    if (e.target.name === 'ascending'){
      this.setState({ascending: !this.state.ascending});
      localStorage.setItem('asc', e.target.value);
      return
    }
    this.setState({save: !this.state.save});
    localStorage.setItem('save', e.target.value);
  }

  // Handles Pagination of the selected option
  handlePageClick = (e) => {
    if (e.target.id === "P") {
      if (localStorage.getItem('page') >= 1) {
        localStorage.setItem('page', parseInt(localStorage.getItem('page')) - 1)
      }
    } else if (e.target.id === 'N'){
      localStorage.setItem('page', parseInt(localStorage.getItem('page')) + 1)
    } else if (e.target.id === 'L'){
      localStorage.setItem('page', parseInt(localStorage.getItem('last')));
    } else {
      localStorage.setItem('page', 0)
    }
    // Informs shouldComponentUpdate to Update component
    localStorage.setItem('change', true);
  }

  render () {
    return (
      <>
      <div className="grid-container players-container">
        <div className="players-div div-shadow">
          <div className="header">
            <h1>NFL Data</h1>
            <h6>Page: {parseInt(localStorage.getItem('page')) + 1}</h6>
          </div>
          <form action="#">
          <div className="menu">
          <label className="label">
            Player
            <input
              className="check"
              type="radio"
              name="Player"
              onChange={this.onSortChange}
              checked={this.state.Player}
              value={this.state.Player}
            />
          </label>
            <label className="label">
              Rushing yards
              <input
                className="check"
                type="radio"
                name="Yds"
                onChange={this.onSortChange}
                checked={this.state.Yds}
                value={this.state.Yds}
              />
            </label>
            <label className="label">
              Longest rush
              <input
                className="check"
                type="radio"
                name="Lng"
                onChange={this.onSortChange}
                checked={this.state.Lng}
                value={this.state.Lng}
              />
            </label>
            <label className="label">
              Total rushing TD
              <input
                className="check"
                type="radio"
                name="TD"
                onChange={this.onSortChange}
                checked={this.state.TD}
                value={this.state.TD}
              />
            </label>
            <label className="label">
              {this.state.ascending? 'Ascending' : 'Descending'}
              <input
                className="check"
                type="checkbox"
                name="ascending"
                onChange={this.onCheckChange}
                defaultChecked={this.state.ascending}
                value={this.state.ascending}
              />
            </label>
            <div className="outerDivFull" >
              Save CSV
              <div className="switchToggle">
                  <input
                  type="checkbox"
                  id="switch"
                  name="save"
                  onChange={this.onCheckChange}
                  defaultChecked={this.state.save}
                  value={this.state.save}
                  />
                  <label for="switch">Save</label>
              </div>
            </div>
            </div>
            <div id="list">
              <div className="table-div">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{paddingRight: '15vh'}}>Name</th>
                      <th>Team</th>
                      <th>Pos</th>
                      <th>Att</th>
                      <th>Att/G</th>
                      <th>Yds</th>
                      <th>Avg</th>
                      <th>Yds/G</th>
                      <th>TD</th>
                      <th>Lng</th>
                      <th>1st</th>
                      <th>1st%</th>
                      <th>20+</th>
                      <th>40+</th>
                      <th>FUM</th>
                    </tr>
                  </thead>
                  <tbody>
                  {JSON.parse(localStorage.getItem('players_array')).map((player, key) => {
                    return(
                    <tr key={key}>
                      <td>{ player['Player'] }</td>
                      <td>{ player['Team'] }</td>
                      <td>{ player['Pos'] }</td>
                      <td>{ player['Att'] }</td>
                      <td>{ player['Att/G'] }</td>
                      <td>{ player['Yds'] }</td>
                      <td>{ player['Avg'] }</td>
                      <td>{ player['Yds/G'] }</td>
                      <td>{ player['TD'] }</td>
                      <td>{ player['Lng'] }</td>
                      <td>{ player['1st'] }</td>
                      <td>{ player['1st%'] }</td>
                      <td>{ player['20+'] }</td>
                      <td>{ player['40+'] }</td>
                      <td>{ player['FUM'] }</td>
                    </tr>
                  )})}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          <div className="page" aria-label="Page navigation example">
            <ul className="pagination">
              <small><li className="page-item"><a className="page-link" id="P" onClick={this.handlePageClick} href="#">Previous</a></li></small>
              <small><li className="page-item"><a className="page-link" id="1" onClick={this.handlePageClick} href="#">1</a></li></small>...
              <small><li className="page-item"><a className="page-link" id="L" onClick={this.handlePageClick} href="#">{parseInt(localStorage.getItem('last')) + 1}</a></li></small>
              <small><li className="page-item"><a className="page-link" id="N" onClick={this.handlePageClick} href="#">Next</a></li></small>
           </ul>
          </div>
      </div>
      </div>
      </>
    )
  }
}

export default PlayerAll;
