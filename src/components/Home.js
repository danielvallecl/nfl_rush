/***
 * @App name: NFL Rush
 * @Component Name: Home.js
 * @author: Daniel Valle
 * @version: 1.0
 */

 import React, { Component } from "react";

 // ======== COMPONENTS ======== //

 import DashHome from "./dashboard/DashHome";
 import DashPlayer from "./dashboard/DashPlayer";

// ======== CSS ======== //

 import "./Home.scss";

 class Home extends Component {

   render() {

     return (
       <React.Fragment>
           <DashboardHome />
       </React.Fragment>
     );
   }
 }

 export default Home;
