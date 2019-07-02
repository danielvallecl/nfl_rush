/***
 * @App name: NFL Rush
 * @Component Name: Team.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from 'react';

import './Teams.scss';

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: require('../../nfl_data/rushing.json'),
      player: '',
      teams: [],
      selected: '',
    };

    localStorage.setItem('team', '');
    localStorage.setItem('teams', []);
    localStorage.setItem('count_teams', 0);
  }

  componentWillMount() {
    const teams_array = this.prepare_teams();
    localStorage.setItem('teams', JSON.stringify(teams_array));
  }

  prepare_teams = () => {
    const data = [...this.state.data];
    let teams_array = [];
    teams_array.push(data[0].Team);
    for (let i = 0; i < data.length; i++) {
     let found = false;
     for (let j = 0; j < teams_array.length; j++){
        if (data[i].Team === teams_array[j]) {
          found = true;
          break;
        }
      }
      if (found !== true) {
        teams_array.push(data[i].Team);
      }
    }
    localStorage.setItem('number_of_teams', teams_array.length);
    return teams_array.sort();
  }

  handleOnSelect = (e) => {
    localStorage.setItem('team',e.target.options[e.target.selectedIndex].value);
    this.setState({team: e.target.options[e.target.selectedIndex].value});
    this.team_select();
  }

   team_select = () => {
     const data = [...this.state.data];
     let count = 0;
     const team_members =[];
     while (count < data.length) {
       if(data[count].Team === localStorage.getItem('team')) {
         team_members.push(data[count]);
       }
       count++;
     }
     localStorage.setItem('count_teams', team_members.length);
     localStorage.setItem('team_members', JSON.stringify(team_members));
   }

  clearForm = (e) => {
    this.setState({team: ''});
    this.setState({player: ''});
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="teams-div dashboard-div">
          <div className="header">
          <p>Team Data</p>
          </div>
          <form className="text-center" action="#">
            <select className="sel" id="team" onChange={this.handleOnSelect}>
            <option value=''>{'Choose Team'}</option>
            {JSON.parse(localStorage.getItem('teams')).map((team, key) => {
              return <option key={key} value={team}>{team}</option>
            })}
            </select>
          </form>
          <div id="list">
          {localStorage.getItem('count_teams') !== '0' ?
          <div className="table-div">
            <table className="table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Number of Players</th>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{localStorage.getItem('team')}</td>
                  <td>{localStorage.getItem('count_teams')}</td>
                  {JSON.parse(localStorage.getItem('team_members')).map((team, key) => {
                    return <small><li key={key}>{ team.Player }</li></small>
                  })}
                </tr>
              </tbody>
            </table>
            </div>
          : null
        }
          </div>
      </div>
      </div>
    )
  }
}

export default Teams;
