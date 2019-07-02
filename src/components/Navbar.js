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
          <Link to="/home" className="nav-link">
            <img className="img-fluid logo" id='1' src= {logo} alt="NFL link Logo"/>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end nav-col" id="navbarSupportedContent">

            <Link to="/about" className="nav-link btn btn-link ">About
            </Link>
            <Link to="/players" className="nav-link btn btn-link">Players
            </Link>
              <React.Fragment>
                <form className="form-inline" onSubmit={this.handleOnSubmit}>
                <button
                  className="btn btn-link my-2 my-sm-0"
                  style={{backgroundColor: 'white', WebkitAppearance: 'none'}}
                  id="submit"
                  type="submit">
                  <i className="fas fa-search"></i>
                </button>
                  <input
                    className="form-control mr-sm-2"
                    name="search"
                    type="search"
                    value = {search}
                    onChange={this.handleOnChange}
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </React.Fragment>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Navbar);
