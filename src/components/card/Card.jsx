import React from 'react';
import './Card.css';

class Card extends React.Component {
  state = {
    cards: []
  }
  componentDidMount() {
    fetch('http://api.urbandictionary.com/v0/random')
    .then(res => res.json())
    .then(data => this.setState({cards: data.list}));
  }
  render() {
    const {cards} = this.state;
    if (!this.state.cards || !cards.length) {
        return (<div>Loading...</div>);
    }

    return this.state.cards.map(card => (<article className="Card">
      <header>{card.word}</header>
      <div>{card.definition}</div>
      <a href={card.permalink}>{card.permalink}</a>
    </article>));
  }
}

export default Card;
