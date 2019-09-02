import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './MovieList/MovieList';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (

      <Router>
        <div className="App">
          <Header />
        </div>

        <Route path='/' exact component={Home} />
        <Route path='/details' component={Details} />
        <Route path='/edit' component={Edit} />
        <div>
          <Footer />
        </div>
      </Router >
    );
  }
}

export default App;
