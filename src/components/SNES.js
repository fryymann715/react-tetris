import React, { Component } from 'react'
import Display from '../containers/Display'
import UI from '../containers/UI'
import Z from '../components/shapes/Z'
import I from '../components/shapes/I'
import O from '../components/shapes/O'
import L from '../components/shapes/L'
import T from '../components/shapes/T'



export default class SNES extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      shapes: [
        <O row={20} col={1} shapetype='bigO'/>,
        <O row={10} col={3} shapetype='bigO'/>,
        <I row={20} col={5} shapetype='I'/>,
        <Z row={17} col={1} shapetype='Z'/>,
        <L row={13} col={5} shapetype='L'/>,
        <T row={10} col={8} shapetype='T'/>
      ]

    }
  }

render() {
  return (
    <div className="game-window">
    <Display shapes={this.state.shapes}/>
    <UI />

    </div>
  )
}
}
