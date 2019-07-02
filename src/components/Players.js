/***
 * @App name: NFL Rush
 * @Component Name: Players.js
 * @author: Daniel Valle
 * @version: 1.0
 */

 import React, { Component } from "react";

// ======== COMPONENTS ======== //

import DashPlayer from "./dashboard/DashPlayer";

import "./Home.scss";

class Players extends Component {

  render() {

    return (
      <React.Fragment>
        <DashPlayer />
      </React.Fragment>
    );
  }
}

export default Players;
