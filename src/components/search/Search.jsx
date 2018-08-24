import React from 'react';
import './Search.css';


class Search extends React.Component {
  render() {
    return <div className="Search_Holder">
      <input className="Search_Input" placeholder="Look up some term" />
      <button className="Search_Button" >Search</button>
    </div>;
  }
}

export default Search;
