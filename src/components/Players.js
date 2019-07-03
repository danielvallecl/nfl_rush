/***
 * @App name: NFL Rush
 * @Component Name: Players.js
 * @author: Daniel Valle
 * @version: 1.0
 */

 import React, { Component } from "react";

// ======== COMPONENTS ======== //

import Player from "./Player";

import "./Home.scss";

class Players extends Component {

  render() {

    return (
      <React.Fragment>
        <Player />
      </React.Fragment>
    );
  }
}

export default Players;
