import React, { Component } from 'react';
import Axios from 'axios';
import { Route, Switch } from 'react-router-dom';
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
      apiKey: apiKey,
      isLoading: true,
      previousPath: '/'
    };
  }

  componentDidMount() {
    this.timeInterval = setTimeout(this.performSearch, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  componentDidUpdate(prevProps) {
    const currentPath = this.props.location.pathname;
    if (currentPath !== prevProps.location.pathname) {
      this.performSearch(currentPath.replace(/\//, ''));
    }
  }

  performSearch = (query='sunsets') => {
    const requestURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1'`;

    Axios.get(requestURL)
      .then(response => {
        this.setState({
          images: response.data.photos ? response.data.photos.photo : [],
          isLoading: false
        });
      }).catch(function(error) {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
          <div className="container">

            <SearchForm onSearch={ this.performSearch } />

            <NavBar />

            <Switch>
              <Route exact path="/" render={ () => <Results images={this.state.images} isLoad={this.state.isLoading} /> } />
              <Route path="/cats" render={ () => <Results images={this.state.images} isLoad={this.state.isLoading} onSearch={ this.performSearch } /> } />
              <Route path="/dogs" render={ () => <Results images={this.state.images} isLoad={this.state.isLoading} onSearch={ this.performSearch } /> } />
              <Route path="/computers" render={ () => <Results images={this.state.images} isLoad={this.state.isLoading} onSearch={ this.performSearch } /> } />
              <Route component={ NotFound } />
            </Switch>

          </div>
    );
  };
}

export default withRouter(props => <App {...props}/>);
