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
    return (
      <>
      <div className="dashboard-container">
        <PlayerAll />
      </div>
      <div className="load"></div>
      </>
    )
  }
}
export default DashHome;
