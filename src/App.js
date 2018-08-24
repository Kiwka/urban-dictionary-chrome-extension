import React, { Component } from 'react';
import './App.css';
import Card from './components/card/Card';
import Search from './components/search/Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateTerm = this.updateTerm.bind(this);
  }

  state = {
    term: '',
  }

  updateTerm(term) {
    this.setState({term});
  }

  render() {
    return (
      <div className="App">
        <Search updateTerm={this.updateTerm}/>
        <Card term={this.state.term}/>
      </div>
    );
  }
}

export default App;
