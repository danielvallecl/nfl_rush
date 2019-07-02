/***
 * @App name: NFL Rush
 * @Component Name: DashHome.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import './Player.scss';

import React, { Component } from 'react';

class PlayerAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('../../nfl_data/rushing.json'),
      player: '',
      team: '',
      selected: '',
      sort_options: {
        rush_yds: false,
        lng_rush: false,
        rush_td: false,
        ascending: false,
      }
    }
    localStorage.setItem('player', '');
    localStorage.setItem('players', '');
    localStorage.setItem('count', 0);
  }

  componentWillMount() {
    let sort = '';
    if (this.state.sort_options['rush_yds'] === true) {
      sort = 'Yds';
    }
    if (this.state.sort_options['lng_rush'] === true) {
      sort = 'Lng';
    }
    if (this.state.sort_options['rush_td'] === true) {
      sort = 'TD';
    }
    const players_array = this.prepare_players(sort);
    localStorage.setItem('players_array', JSON.stringify(players_array));
  }

  prepare_players = (sort) => {
    let players_array = [...this.state.data];
    localStorage.setItem('number_of_players', players_array.length);
    switch (sort) {
      case 'Yds':
        players_array = players_array.sort(this.sortYds);
        break;
      case 'Lng':
        players_array = players_array.sort(this.sortLng);
        break;
      case 'TD':
        players_array = players_array.sort(this.sortTD);
        break;
      default:
      players_array = players_array.sort(this.sortPlayer);
    }
    return players_array;
  }

  sortPlayer = (a, b) => {
    return a.Player > b.Player ? 1 : b.Player > a.Player ? -1 : 0;
  }
  sortYds = (a, b) => {
    return a.Yds > b.Yds ? 1 : b.Yds > a.Yds ? -1 : 0;
  }
  sortLng = (a, b) => {
    return a.Lng > b.Lng ? 1 : b.Lng> a.Lng ? -1 : 0;
  }
  sortTD = (a, b) => {
    return a.TD > b.TD ? 1 : b.TD > a.TD ? -1 : 0;
  }

  onFormSubmit = () => {
    console.log("Submit Form");
  }

  onSortChange = (e) => {
    console.log( e.target.name );
  }

  handleOnSelect = (e) => {
    localStorage.setItem('player',e.target.options[e.target.selectedIndex].value );
    this.setState({player: e.target.options[e.target.selectedIndex].value});
    this.player_select();
  }

   player_select = () => {
     const data = [...this.state.data];
     let ok = false;
     let count = 0;
     const players ='';
     while (ok === false) {
       if(data[count].Player === localStorage.getItem('player')) {
         ok = true
         localStorage.setItem('players', data[count]);
         localStorage.setItem('count', count)
         this.setState({selected: players});
       }
       count++;
     }
   }

  clearForm = (e) => {
    console.log(e.target.value);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
  }

  render () {

    return (
      <>
      <div className="player-all dashboard-div">
        <div className="header">
          <p className="title">NFL - General Data</p>
        </div>
        <form className="form" action="#" onSubmit={this.onFormSubmit}>
        <div className="selection">
          <label className="label">
            Rushing yards
            <input
              className="check"
              type="checkbox"
              name="rush_yds"
              onChange={this.onSortChange}
              onClick={this.clearForm}
              value={this.state.sort_options['rush_yds']}
            />
          </label>
          <label className="label">
            Longest rush
            <input
              className="check"
              type="checkbox"
              name="lng_rush"
              onChange={this.onSortChange}
              onClick={this.clearForm}
              value={this.state.sort_options['lng_rush']}
            />
          </label>
          <label className="label">
            Total rushing TD
            <input
              className="check"
              type="checkbox"
              name="rush_td"
              onChange={this.onSortChange}
              onClick={this.clearForm}
              value={this.state.sort_options['rush_td']}
            />
          </label>
          <label className="label">
            Ascending
            <input
              className="check"
              type="checkbox"
              name="ascending"
              onChange={this.onSortChange}
              value={this.state.sort_options['ascending']}
            />
          </label>
          </div>
            <div id="list">
              <div className="table-div">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
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
      </div>
      </>
    )
  }
}

export default PlayerAll;
