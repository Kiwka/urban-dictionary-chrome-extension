// Word of the day http://api.urbandictionary.com/v0/words_of_the_day
// http://api.urbandictionary.com/v0/define?defid=${defid}http://api.urbandictionary.com/v0/define?defid=${defid}
// http://api.urbandictionary.com/v0/define?term=${word}
// https://www.urbandictionary.com/define.php?term=Noman

import React from 'react';
import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.nextDefinition = this.nextDefinition.bind(this);
    this.previousDefintion = this.previousDefintion.bind(this);
    this.showRandom = this.showRandom.bind(this);
  }

  state = {
    index: 0,
    cards: [],
    noResult: false,
  }

  componentDidMount() {
    fetch('http://api.urbandictionary.com/v0/random')
    .then(res => res.json())
    .then(data => data.list.pop())
    .then(({word}) =>
      fetch(`http://api.urbandictionary.com/v0/define?term=${word}`)
    )
    .then(res => res.json())
    .then(data => this.setState({index: 1, cards: data.list}));

  }

  componentDidUpdate(prevProps) {
    const {term} = this.props;
    if (this.props.term !== prevProps.term) {
      fetch(`http://api.urbandictionary.com/v0/define?term=${term}`)
      .then(res => res.json())
      .then(data => this.setState(data.list.length ? {index: 1, cards: data.list} : {noResult: true}));
    }
  }

  nextDefinition() {
    this.setState(state => ({index: state.index + 1}));
  }

  previousDefintion() {
    this.setState(state => ({index: state.index - 1}));
  }

  showRandom() {
    this.setState({
      noResult: false,
    })
  }

  render() {
    const {index, cards, noResult} = this.state;
    const {term} = this.props;
    if (!index) {
        return (<div>Loading...</div>);
    }

    if (noResult) {
      return <div className="NoResult">There is no explanation for term <span className="NoResult_Term">{term}</span>. Do you want to
         <button className="NoResult_Button" onClick={this.showRandom}>go back to last word</button>?</div>
    }

    const card = cards[index - 1];

    return <article className="Card">
      <header className="Card_Header">{card.word}</header>
      <div className="Card_Definition" dangerouslySetInnerHTML={{__html:replaceLinks(card.definition)}}></div>
      <div className="Card_Example" dangerouslySetInnerHTML={{__html:replaceLinks(card.example)}}></div>
      <section className="Card_Controls">
        <div>
          <div className="Card_ThumbUp">
            {ThumbUp}<span className="Card_Thumb_Text">{card['thumbs_up']}</span>
          </div>
          <div className="Card_ThumbDown">
            {ThumbDown}<span className="Card_Thumb_Text">{card['thumbs_down']}</span>
          </div>
        </div>
        <div>
          {(index - 1) > 0 ? <button className="Card_IndexUp" onClick={this.previousDefintion}></button>: null}
          {(cards.length - index) > 0 ? <button className="Card_IndexDown" onClick={this.nextDefinition}></button> : null}
        </div>
      </section>
      <div className="Card_Footer"><strong>Read more:&nbsp;</strong><a href={card.permalink}>{card.permalink}</a></div>
    </article>;
  }
}

const replaceLinks = (text) => text.replace(/\[([a-zA-Z]|\s)+\]/g, item =>  {
  const term = item.substring(1, item.length-1);
  return `<a href="https://www.urbandictionary.com/define.php?term=${term}">${term}</a>`;
});

const ThumbUp = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><path d="M34 15.3c0-1.9-1.4-3.4-3.1-3.4h-9.7l1.5-7.8v-.5c0-.7-.3-1.4-.6-1.9L20.4 0 10.2 11.2c-.6.5-.9 1.4-.9 2.4v17c0 1.9 1.4 3.4 3.1 3.4h13.9c1.2 0 2.3-.8 2.8-2l4.6-12.1c.2-.3.2-.9.2-1.2v-3.4h.1c0 .2 0 0 0 0zM0 34h6.2V13.6H0V34z"></path></svg>;

const ThumbDown = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><path d="M27.8 0v20.4H34V0h-6.2zm-6.2 0H7.7C6.5 0 5.4.9 4.9 2L.3 14.1c-.1.3-.3.7-.3 1.2v3.4c0 1.9 1.4 3.4 3.1 3.4h9.7l-1.5 7.8v.5c0 .7.3 1.4.6 1.9l1.7 1.7 10.2-11.2c.6-.7.9-1.5.9-2.4v-17c0-1.9-1.4-3.4-3.1-3.4z"></path></svg>;

export default Card;
