import React, { Component } from 'react';
import Axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import SearchForm from './components/SearchForm.js';
import NavBar from './components/NavBar.js';
import Results from './components/Results.js';
import NotFound from './components/NotFound.js';
import apiKey from './config.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      image: {},
      apiKey: apiKey,
      isLoading: true,
      navigationList: {
        '/': 0,
        '/cats': 0,
        '/dogs': 1,
        '/computers': 2
      }
    };
  }

  componentDidMount() {
    this.timeInterval = setTimeout(this.fetchAllSearchImages, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  /**
   * Updates image state when page is changed
   *
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    const currentPath = this.props.location.pathname;

    if (currentPath !== prevProps.location.pathname) {
      const imageIndex = this.state.navigationList[currentPath];

      this.setState({ image: this.state.images[imageIndex] });
    }
  }

  /**
   * Requests Flickr search
   *
   * @param {string} query
   */
  requestFlickrSearch = (query) => {
    const requestURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1'`;

    return Axios.get(requestURL);
  }

  /**
   * Fetches Flickr search images for a single request
   * and updates image and isLoading state
   * 
   * @param {string} query
   */
  fetchSearchImage = (query) => {
    this.requestFlickrSearch(query)
      .then(response => {
        this.setState({
          image: response.data.photos.photo,
          isLoading: false
        });
      })
  }

  /**
   * Fetches Flickr search images for 3 requests
   */
  fetchAllSearchImages = () => {
    const allRequestURLs = ['cats', 'dogs', 'computers'].map(query => this.requestFlickrSearch(query));

    Promise.all(allRequestURLs)
      .then(response => {
        const images = [];

        response.forEach(data => {
          images.push(data.data.photos.photo);
        });
        this.setState({
          images: images,
          image: images[0],
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    return (
          <div className="container">

            {/* Search form */}
            <SearchForm onSearch={ this.fetchSearchImage } />

            {/* Navigation */}
            <NavBar />

            {/* Route */}
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="/cats" /> } />
              <Route path="/cats" render={ () => <Results images={this.state.image} isLoad={this.state.isLoading} onSearch={ this.fetchSearchImage } /> } />
              <Route path="/dogs" render={ () => <Results images={this.state.image} isLoad={this.state.isLoading} onSearch={ this.fetchSearchImage } /> } />
              <Route path="/computers" render={ () => <Results images={this.state.image} isLoad={this.state.isLoading} onSearch={ this.fetchSearchImage } /> } />
              <Route component={ NotFound } />
            </Switch>

          </div>
    );
  };
}

export default withRouter(props => <App {...props}/>);
