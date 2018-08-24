import React, { Component } from 'react';
import './App.css';
import Card from './components/card/Card';
import Search from './components/search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <Card />
      </div>
    );
  }
}

export default App;
