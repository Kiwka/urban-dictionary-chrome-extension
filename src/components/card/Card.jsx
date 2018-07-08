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
      <header className="Card_Header">{card.word}</header>
      <div className="Card_Definition">{card.definition}</div>
      <div className="Card_Footer">Read more: <a href={card.permalink}>{card.permalink}</a></div>
    </article>));
  }
}

export default Card;
