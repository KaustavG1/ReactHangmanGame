import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord }  from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: {
      image: [img0, img1, img2, img3, img4, img5, img6],
      alt: ['0 of 6', '1 of 6', '2 of 6', '3 of 6', '4 of 6', '5 of 6', '6 of 6']
    }
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleRestart: handle the game restart
    - change the state to the initial conditions
   */
  handleRestart(evt) {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameStatus = (this.state.nWrong < this.props.maxWrong);
    const isWinner = (this.guessedWord().join("") === this.state.answer);
    let gameRender = this.generateButtons();
    if(!gameStatus) gameRender = "You Lose!";
    if(isWinner) gameRender = "You Win!";

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images.image[this.state.nWrong]} alt={this.props.images.alt[this.state.nWrong]}/>
        <p className='Hangman-word'>{this.state.nWrong}</p>        
        {gameStatus ? <p className='Hangman-word'>{this.guessedWord()}</p> : <p className='Hangman-word'>{this.state.answer}</p>}
        <p className='Hangman-btns'>{gameRender}</p> <br />
        {(!gameStatus || isWinner) && <button className='Hangman-btn-reset' onClick={this.handleRestart}>Restart</button>}
      </div>
    );
  }
}

export default Hangman;
