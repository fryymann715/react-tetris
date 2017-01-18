import React, { Component } from 'react'
import Square from './Square'

export default class I extends Component {
  render() {
    return (
      <div>
        <Square row={this.props.row} col={this.props.col} shapetype='I'/>
        <Square row={this.props.row +1} col={this.props.col } shapetype='I'/>
        <Square row={this.props.row +2} col={this.props.col } shapetype='I'/>
        <Square row={this.props.row +3} col={this.props.col } shapetype='I'/>
      </div>
    )
  }
}
