import React, { Component } from 'react'
import Square from './Square'

export default class O extends Component {
  render() {
    return (
      <div className="O">
        <Square row={this.props.row} col={this.props.col} shapetype='bigO'/>
        <Square row={this.props.row +1} col={this.props.col +1} shapetype='bigO'/>
        <Square row={this.props.row } col={this.props.col +1} shapetype='bigO'/>
        <Square row={this.props.row +1} col={this.props.col } shapetype='bigO'/>
      </div>
    )
  }
}
