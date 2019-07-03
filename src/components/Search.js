/***
 * @App name: NFL Rush
 * @Component Name: Search.js
 * @author: Daniel Valle
 * @version: 1.0
 */

import React, { Component } from 'react';
import './Search.scss';
import home from '../images/nfl.png';


class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: sessionStorage.getItem('search'),
      data: [],
      isLoading: false,
      loading: false,
      opacity: 1,
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
  }

  componentDidMount() {
		setTimeout(() => {
  		this.setState({opacity: 0}) // the show/hide functions are passed as props
  	}
		, 1000);
	}

  async componentWillMount() {
    const search = sessionStorage.getItem('search');
    this.setState({ search });
  }

  render() {
    const divOpacity = {
			opacity: this.state.opacity,
		};

    return(
      <>
      <div className= "container ">
        <h4 style={{color: 'navy'}}>Search = {sessionStorage.getItem('search')}</h4>
        <div style={divOpacity} className="load"></div>
      </div>
      </>
    )
  }
}

export default Search;
