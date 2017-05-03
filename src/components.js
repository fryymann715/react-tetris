import * as React from 'react'

export class GameView extends React.Component {

  checkGameStatus() {
    return ( this.props.game.isGameOver() )
  }

  render() {
    return (
      <div>
      <NextPieceView piece={this.props.game.nextPiece} className='next'/>
      <div className='border game' style={{ width: this.props.width,
        height: this.props.height}}>
          <span>
            <MessageView game={this.props.game}/>
            <PieceView piece={this.props.game.fallingPiece} />
            <RubbleView rubble={this.props.game.rubble} />
            <ScoreView score={this.props.game.score} />
          </span>
      </div>
    </div>
    )
  }
}

export class MessageView extends React.Component {
  render() {
    if ( this.props.game.isGameOver() ) {
      return <h2 className="game-over">GAME OVER</h2>
    }
    return <div></div>
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
    return (
      <div>
        { this.props.piece.points().map( (square, key) =>
          <Square
            key={key}
            row={square.row}
            col={square.col}
            classString={this.props.piece.classString}
          /> )}
      </div>
    )
  }
}

export class NextPieceView extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        { this.props.piece.points().map( (square, key) =>
          <Square
            key={key}
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
