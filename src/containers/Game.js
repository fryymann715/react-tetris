import React, { Component } from 'react'
import '../App.css'
import SNES from '../components/SNES'

export default class Game extends Component {

render() {
  return (
    <div className="game-container">
      <SNES />
    </div>
  )
}
}
