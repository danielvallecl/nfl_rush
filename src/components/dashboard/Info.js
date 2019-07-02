/***
 * @App name: NFL Rush
 * @Component Name: Info.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import './Info.scss';

import React, { Component } from 'react'

class Info extends Component {

  render () {
    return(
      <div className= {`dashboard-div info-div ${ this.props.name }`}>
        <div className="info-name">
          {this.props.name.toUpperCase()}
        </div>
        <div className="info-data">
          {this.props.data}
        </div>
        <div className="info">
        </div>
      </div>
    )
  }
}

export default Info;
