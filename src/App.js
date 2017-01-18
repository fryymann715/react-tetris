import React, { Component } from 'react';
import './App.css';
import Game from './containers/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tetris</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
