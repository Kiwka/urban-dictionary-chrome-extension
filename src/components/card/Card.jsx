import React from 'react';
import './Card.css';

class Card extends React.Component {
  state = {
    card: null
  }
  componentDidMount() {
    fetch('http://api.urbandictionary.com/v0/random')
    .then(res => res.json())
    .then(data => data.list.pop().word)
    .then(word =>
      fetch(`http://api.urbandictionary.com/v0/define?term=${word}`)
    )
    .then(res => res.json())
    .then(data => this.setState({card: data.list.pop()}));

  }
  render() {
    const {card} = this.state;
    if (!this.state.card) {
        return (<div>Loading...</div>);
    }

    return <article className="Card">
      <header className="Card_Header">{card.word}</header>
      <div className="Card_Definition">{card.definition}</div>
      <div className="Card_Footer"><strong>Read more:&nbsp;</strong><a href={card.permalink}>{card.permalink}</a></div>
    </article>;
  }
}

export default Card;
