import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: require('../../nfl_data/rushing.json'),
      player: '',
      team: '',
      selected: '',
    }
    localStorage.setItem('player', '');
    localStorage.setItem('players', '');
    localStorage.setItem('count', 0);
  }

  componentWillMount() {
    const players_array = this.prepare_players();
    localStorage.setItem('players_array', JSON.stringify(players_array));
  }

  prepare_players = () => {
    const data = [...this.state.data];
    let players_array = [];
    players_array.push(data[0].Player);
    for (let i = 0; i < data.length; i++) {
     let found = false;
     for (let j = 0; j < players_array.length; j++){
        if (data[i].Player === players_array[j]) {
          found = true;
          break;
        }
      }
      if (found !== true) {
        players_array.push(data[i].Player);
      }
    }
    localStorage.setItem('number_of_players', players_array.length);
    return players_array.sort();
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
  this.setState({team: ''});
  this.setState({player: ''});
}

onChange = (e) => {
  this.setState({[e.target.name]: e.target.value });
}

  render () {

  const data = [...this.state.data];
    return (
      <>
      <div className="player dashboard-div">
        <div className="header">
          <p>NFL - General Data</p>
          <form action="#">
            <select className="sel" id="player" onChange={this.handleOnSelect}>
            <option value=''>{'NFL-Player'}</option>
            {JSON.parse(localStorage.getItem('players_array')).map((player, key) => {
              return <option key={key} value={player}>{player}</option>
            })}
            </select>
          </form>
          <div id="list">
          {localStorage.getItem('count') !== '0' ?
          <table>
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
              <tr>
                <td>{ data[localStorage.getItem('count')]['Player'] }</td>
                <td>{ data[localStorage.getItem('count')]['Team'] }</td>
                <td>{ data[localStorage.getItem('count')]['Pos'] }</td>
                <td>{ data[localStorage.getItem('count')]['Att'] }</td>
                <td>{ data[localStorage.getItem('count')]['Att/G'] }</td>
                <td>{ data[localStorage.getItem('count')]['Yds'] }</td>
                <td>{ data[localStorage.getItem('count')]['Avg'] }</td>
                <td>{ data[localStorage.getItem('count')]['Yds/G'] }</td>
                <td>{ data[localStorage.getItem('count')]['TD'] }</td>
                <td>{ data[localStorage.getItem('count')]['Lng'] }</td>
                <td>{ data[localStorage.getItem('count')]['1st'] }</td>
                <td>{ data[localStorage.getItem('count')]['1st%'] }</td>
                <td>{ data[localStorage.getItem('count')]['20+'] }</td>
                <td>{ data[localStorage.getItem('count')]['40+'] }</td>
                <td>{ data[localStorage.getItem('count')]['FUM'] }</td>
              </tr>
            </tbody>
          </table>

          : null
          }
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default Player;
