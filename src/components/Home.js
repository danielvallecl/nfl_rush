/***
 * @App name: NFL Rush
 * @Component Name: Home.js
 * @author: Daniel Valle
 * @version: 1.0
 */

 import React, { Component } from "react";

 // ======== COMPONENTS ======== //

 import PlayerAll from './PlayerAll';


 class Home extends Component {

   render() {

     return (
       <React.Fragment>
          <PlayerAll />
       </React.Fragment>
     );
   }
 }

 export default Home;
