/***
 * @App name: NFL Rush
 * @Component Name: DashHome.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from "react";

//  ========= COMPONENTS ======== //

import Player from './Player';
import Team from './Team';

//  ========= CSS ======== //

import "./Dashboard.scss";

class DashPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: 1,
    }
  }

  render() {

    let data = [10, 20, 30, 40, 50];
    const divOpacity = {
			opacity: this.state.opacity,
		};

    return (
      <>
      <div className="dashboard-container">
        <Player />
        <Team />
        <section className="div-grid">
          <Info name="Players" data={ localStorage.getItem('number_of_players') }/>
          <Info name="TDs" data={ data[1] } />
          <Info name="Atts" data={ data[2] } />
          <Info name="Teams" data={ localStorage.getItem('number_of_teams') }/>
          <Info name="activity" data={ data[4] }/>
        </section>
      </div>
      <div style={divOpacity} className="load"></div>
      </>
    )
  }
}
export default DashPlayer;
