import React, { Component } from 'react'
import Square from './Square'

export default class T extends Component {
  render() {
    return (
      <div className="T">
        <Square row={this.props.row } col={this.props.col } shapetype='T'/>
        <Square row={this.props.row } col={this.props.col +1 } shapetype='T'/>
        <Square row={this.props.row } col={this.props.col +2 } shapetype='T'/>
        <Square row={this.props.row +1 } col={this.props.col +1 } shapetype='T'/>
      </div>
    )
  }

}
