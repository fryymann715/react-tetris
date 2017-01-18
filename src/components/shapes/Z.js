import React, { Component } from 'react'
import Square from './Square'

export default class Z extends Component {
  render() {
    return (
      <div className="Z">
        <Square row={this.props.row} col={this.props.col} shapetype='Z'/>
        <Square row={this.props.row +1} col={this.props.col} shapetype='Z'/>
        <Square row={this.props.row +1} col={this.props.col +1} shapetype='Z' />
        <Square row={this.props.row +2} col={this.props.col +1} shapetype='Z'/>
      </div>
    )
  }

}
