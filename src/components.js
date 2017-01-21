import * as React from 'react'
import Sound from 'react-sound'

export class GameView extends React.Component {
  constructor( props ){
    super( props )
    this.play = this.play.bind( this )
  }

  checkGameStatus() {
    return ( this.props.game1.isGameOver() || this.props.game2.isGameOver() )
  }

  componentDidMount() {
    this.play()
  }


  play() {
    var audio = document.getElementById("audio")
    audio.play()
  }

  render() {
    const playerOneMeteor = this.props.game1.meteor ?
      <Meteor piece={this.props.game1.meteor} classString="square meteor"/> :
      <div></div>

    const playerTwoMeteor = this.props.game2.meteor ?
      <Meteor piece={this.props.game2.meteor} classString="square meteor" /> :
      <div></div>

    return (
      <div>
      <NextPieceView piece={this.props.game1.nextPiece} className='next1'/>
      <div className='border game-1' style={{ width: this.props.width,
        height: this.props.height}}>
          <span>
            <MessageView game={this.props.game1}/>
            <PieceView piece={this.props.game1.fallingPiece} />
            <RubbleView rubble={this.props.game1.rubble} />
            <ScoreView score={this.props.game1.score} />
          </span>
      </div>
      <NextPieceView piece={this.props.game2.nextPiece} className='next2'/>
      <div className='border game-2' style={{ width: this.props.width,
        height: this.props.height}}>
          <span>
            <MessageView game= {this.props.game2} />
            <PieceView piece={this.props.game2.fallingPiece} />
            <RubbleView rubble={this.props.game2.rubble} />
            <ScoreView score={this.props.game2.score} />
          </span>
      </div>
      <iframe className='iframe' width="0px" height="0px" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/120364266&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false"></iframe>
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

export class Meteor extends React.Component {
  render() {
    return (
      <div>
          { this.props.piece.points().map( (square, key) =>
            <Square
              key={key}
              row={square.row}
              col={square.col}
              classString={this.props.classString}
            /> )}
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
