/***
 * @App name: NFL Rush
 * @Component Name: About.js
 * @author: Daniel Valle
 * @version: 1.0
 */


import React from 'react';
import home from '../images/nfl.png';

const About = (props) => {

  return(
    <>
      <div>
      <hr></hr>
        <h1 className="center">This is the NFL about page.</h1>
        <p className="home-text ml-2 mr-2">
        The National Football League (NFL) is a professional American football
        league consisting of 32 teams, divided equally between the National
        Football Conference (NFC) and the American Football Conference (AFC).
        The NFL is one of the four major professional sports leagues in North
        America, and the highest professional level of American football in
        the world.[3] The NFL's 17-week regular season runs from early September
        to late December, with each team playing 16 games and having one bye
        week. Following the conclusion of the regular season, six teams from
        each conference (four division winners and two wild card teams) advance
        to the playoffs, a single-elimination tournament culminating in the
        Super Bowl, which is usually held in the first Sunday in February,
        and is played between the champions of the NFC and AFC.
        </p>
        <img className="home" src= {home} alt="NFL About page"/>
      </div>
    </>
  )
}

export default About;
