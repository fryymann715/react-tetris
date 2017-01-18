import * as React from 'react'

let count = 0

export class GameView extends React.Component {
  render() {
    return (
      <div className='border' style={{
        width: this.props.game.cols*25,
        height: this.props.game.rows*25}}>
        <PieceView piece={this.props.game.fallingPiece} />
        <RubbleView rubble={this.props.game.rubble} />
      </div>
    )
  }
}

export class PieceView extends React.Component {
  render() {
    return (
      <div>
        { this.props.piece.points().map( square =>
          <Square key={count++} row={square.row} col={square.col}/> )}
      </div>
    )
  }
}

export class RubbleView extends React.Component {
  render() {
    return (
      <span>
        { this.props.rubble.map( square =>
          <Square
            key={"row"+square.row+"col"+square.col}
            row={square.row}
            col={square.col} /> )}
      </span>
    )
  }
}

export class Square extends React.Component {
  render() {
    const s = {
      left: ( this.props.col -1 ) * 25 + 'px',
      top: ( this.props.row -1 ) * 25 + 'px'
    }
    return <div className="square" style={s}></div>
  }
}
