import React from 'react';
import './Search.css';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onTermChange = this.onTermChange.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
  }

  state = {
    term: '',
  }

  updateTerm() {
    if (this.state.term) {
      this.props.updateTerm(this.state.term);
    }
  }

  onTermChange(e) {
    this.setState({
      term: e.currentTarget.value
    });
  }

  render() {
    return <div className="Search_Holder">
      <input className="Search_Input" placeholder="Look up some term" onChange={this.onTermChange} value={this.state.term}/>
      <button className="Search_Button" onClick={this.updateTerm}>Search</button>
    </div>;
  }
}

export default Search;
