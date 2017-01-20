import * as React from 'react'

export class GameView extends React.Component {

  checkGameStatus() {
    return ( this.props.game1.isGameOver() || this.props.game2.isGameOver() )
  }

  render() {

    const playerOneMeteor = this.props.game2.meteor ?
    <Meteor square={this.props.game2.meteor} /> :
  <div></div>

  const playerTwoMeteor = this.props.game1.meteor ?
  <Meteor square={this.props.game1.meteor} /> :
<div></div>

    return (
      <div>
      <NextPieceView piece={this.props.game1.nextPiece} className='next1'/>
      <div className='border game-1' style={{ width: this.props.width,
        height: this.props.height}}>
        { this.checkGameStatus() ?
          <span>
            <h2 className="game-over">GAME OVER</h2>
            <PieceView piece={this.props.game1.fallingPiece} />
            <RubbleView rubble={this.props.game1.rubble} />
            <ScoreView score={this.props.game1.score} />
          </span> :
          <span>
            { playerOneMeteor }
            <PieceView piece={this.props.game1.fallingPiece} />
            <RubbleView rubble={this.props.game1.rubble} />
            <ScoreView score={this.props.game1.score} />
          </span>
         }
      </div>
      <NextPieceView piece={this.props.game2.nextPiece} className='next2'/>
      <div className='border game-2' style={{ width: this.props.width,
        height: this.props.height}}>
        { this.checkGameStatus() ?
          <span>
            <h2 className="game-over">GAME OVER</h2>
            <PieceView piece={this.props.game2.fallingPiece} />
            <RubbleView rubble={this.props.game2.rubble} />
            <ScoreView score={this.props.game2.score} />
          </span> :
          <span>
            { playerTwoMeteor }
            <PieceView piece={this.props.game2.fallingPiece} />
            <RubbleView rubble={this.props.game2.rubble} />
            <ScoreView score={this.props.game2.score} />
          </span>
         }
      </div>
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

export class Meteor extends React.Component {
  render() {
    return (
      <div>
        <Square
          classString='square meteor'
          col={ this.props.square.col }
          row={ this.props.square.row }
        />
      </div>

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
