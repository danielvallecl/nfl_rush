// ======= DEPENDENCIES =======

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ======= COMPONENTS =======

import Component404 from './components/Component404';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Teams from './components/Teams';
import Players from './components/Players';
import Search from './components/Search';

// ======= CSS =======

import './App.scss';

// ======= COMPONENT =======

function App() {
  return (
    <Router >
      <div className="">
      <Navbar />
        <Switch>
          <Route exact path="/" component= {Home} />
          <Route path="/home" component= {Home} />
          <Route path="/about" component={About} />
          <Route path="/teams" component={Teams} />
          <Route path="/players" component={Players} />
          <Route path="/search" component={Search} />
          <Route path='*' component={Component404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
