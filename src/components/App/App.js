import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Home from './Home/Home';
import Details from '../Details/Details';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/details' component={Details} />
      <div className="App">
        <h1>Movies</h1>
        <p>Empty Page</p>
      </div>
      </Router >
    );
  }
}

export default App;
