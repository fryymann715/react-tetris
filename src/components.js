import * as React from 'react'

export class GameView extends React.Component {

  checkGameStatus() {
    return (this.props.game.isGameOver() )
  }

  render() {
    return (
      <div className='border' style={{ width: this.props.game.cols*25,
        height: this.props.game.rows*25}}>
        { this.checkGameStatus() ?
          <span>GAME OVER
            <PieceView piece={this.props.game.fallingPiece} />
            <RubbleView rubble={this.props.game.rubble} />
            <ScoreView score={this.props.game.score} />
          </span> :
          <span>
            <PieceView piece={this.props.game.fallingPiece} />
            <RubbleView rubble={this.props.game.rubble} />
            <ScoreView score={this.props.game.score} />
          </span>
         }
      </div>
    )
  }

}

interface ScoreViewProps { score:number }
export class ScoreView extends React.Component {
  render() {
    return <div className="score-display">
      { this.props.score }
    </div>
  }
}

export class PieceView extends React.Component {
  render() {
    let count = 0
    return (
      <div>
        { this.props.piece.points().map( square =>
          <Square
            key={count++}
            row={square.row}
            col={square.col}
            classString={this.props.piece.classString}
          /> )}
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
            col={square.col}
            classString='square rubble' /> )}
      </span>
    )
  }
}

export class Square extends React.Component {
  render() {
    const classString = this.props.classString
    const s = {
      left: ( this.props.col -1 ) * 25 + 'px',
      top: ( this.props.row -1 ) * 25 + 'px'
    }
    return <div className={classString} style={s}></div>
  }
}
