/***
 * @App name: NFL Rush
 * @Component Name: Navbar.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';

import logo from '../images/nfl.png';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
    sessionStorage.setItem('search', '');
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('search', this.state.search);
    this.setState({search: ''});
    this.props.history.push('/search');
  }

  handleOnChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {
    const { search } = this.state

    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-light p-0 navbar-right">
          <Link to="/home" className="navbar-brand">
            <img className="img-fluid logo" id='1' src= {logo} alt="NFL link Logo"/>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <Link to="/teams" className="nav-link btn btn-link">Teams
            </Link>
            <Link to="/player" className="nav-link btn btn-link">Players
            </Link>
            <Link to="/about" className="nav-link btn btn-link ">About
            </Link>
              <form className="form-inline" onSubmit={this.handleOnSubmit}>
                <input
                  className="form-control mr-sm-2"
                  name="search"
                  type="search"
                  value = {search}
                  onChange={this.handleOnChange}
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-link search-button"
                  id="submit"
                  type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Navbar);
