/***
 * @App name: NFL Rush
 * @Component Name: DashHome.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from "react";

//  ========= COMPONENTS ======== //

import PlayerAll from './PlayerAll';

//  ========= CSS ======== //

import "./Dashboard.scss";

class DashHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: 1,
    }
  }

  render() {
    //let data = [10, 20, 30, 40, 50];
    const divOpacity = {
			opacity: this.state.opacity,
		};

    return (
      <>
      <div className="dashboard-container">
        <PlayerAll />
      </div>
      <div style={divOpacity} className="load"></div>
      </>
    )
  }
}
export default DashHome;
