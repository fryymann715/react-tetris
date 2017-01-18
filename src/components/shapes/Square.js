import React, { Component } from 'react'

export default class Square extends Component {
  render() {

    let classString = 'square '

      switch (this.props.shapetype){
        case 'Z':
          classString += 'Z'
          break
        case 'bigO':
          classString += 'bigO'
          break
        case 'T':
          classString += 'T'
          break
        case 'I':
          classString += 'I'
          break
        case 'L':
          classString += 'L'
          break
        default:
      }

    let s = {
      left: ( this.props.col -1 ) * 35 + 'px',
      top: ( this.props.row -1 ) * 35 + 'px',
    }
    return <div className={ classString } style={s} ></div>
  }
}
