import React, { Component } from "react";

//  ========= COMPONENTS ======== //

import ChartAll from './ChartAll';
import PiechartAll from './PiechartAll';

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
        <ChartAll />
        <PiechartAll />
      </div>
      <div style={divOpacity} className="load"></div>
      </>
    )
  }
}
export default DashHome;
