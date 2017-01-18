import React, { Component } from 'react'
import Square from './Square'

export default class L extends Component {
  render() {
    return (
      <div className="L">
        <Square row={this.props.row} col={this.props.col} shapetype='L'/>
        <Square row={this.props.row +1} col={this.props.col} shapetype='L'/>
        <Square row={this.props.row +2} col={this.props.col} shapetype='L'/>
        <Square row={this.props.row +2} col={this.props.col +1} shapetype='L'/>
      </div>
    )
  }

}
