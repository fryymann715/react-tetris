import React, { Component } from 'react'
import Z from '../components/shapes/Z'
import I from '../components/shapes/I'
import O from '../components/shapes/O'
import L from '../components/shapes/L'
import T from '../components/shapes/T'

export default class Display extends Component {

render() {
  return (
    <div className="display">
      <O row={20} col={1} shapetype='bigO'/>
      <O row={10} col={3} shapetype='bigO'/>
      <I row={20} col={5} shapetype='I'/>
      <Z row={17} col={1} shapetype='Z'/>
      <L row={13} col={5} shapetype='L'/>
      <T row={10} col={8} shapetype='T'/>
    </div>
  )
}
}
