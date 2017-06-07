import * as _ from 'underscore'
import * as Models from './models/'

export default class Game {
  constructor() {
    this.rows = 20
    this.cols = 10
    this.rubble = []
    this.score = 0
    this.paused = false
    this.initPiece()
  }

  tick() {
    if ( this.paused ) {
      return this
    }
    this.transactionDo(
      ()=> this.fallingPiece.fallOne(),
      ()=> this.fallingPiece.liftOne() )
    if ( this.fallingPiece.maxRow() === this.rows ) {
      setTimeout( () => this.convertToRubble(), 100 )
      return this
    }
    if ( this.nextPositionIsRubble() ) {
      setTimeout( () => this.checkIfRubble(), 100 )
    }
    return this
  }

  checkIfRubble() {
    if ( this.nextPositionIsRubble() ) {
      this.convertToRubble()
    }
  }

  nextPositionIsRubble() {
    const nextPosition = this.fallingPiece.points().map( point =>
      new Models.Point( point.row +1, point.col ))

    return  nextPosition.some( point =>
      this.rubble.some( rubble => rubble.sameAs( point ) ))
  }

  convertToRubble() {
    this.rubble = this.rubble.concat( this.fallingPiece.points() )
    const completedRows = this.completedRows()
    completedRows.forEach( row => this.collapseRow( row ) )
    this.score += this.calculateAward(completedRows)
    if ( this.isGameOver() ) {
        this.paused = true
      } else {
        this.startAPiece()
      }
  }

  completedRows() {
    return _.range(1, this.rows +1).filter(row =>
      _.range(1, this.cols +1).every( col => this.rubbleHas( row, col ) )
    )
  }

  collapseRow(row) {
    this.rubble = this.rubble.filter(point => point.row !== row)
    this.rubble
    .filter( point => point.row < row )
    .forEach( point => point.row += 1)
  }

  rubbleHas(row, col) {
    return this.rubble.some( point => point.row === row && point.col === col)
  }

  initPiece() {
    this.fallingPiece = new Models.Piece( Models.Shape.selectRandom() )
    this.nextPiece = new Models.Piece( Models.Shape.selectRandom() )
  }

  startAPiece() {
    this.fallingPiece = this.nextPiece
    this.nextPiece = new Models.Piece( Models.Shape.selectRandom() )
  }

  rotate() {
    this.transactionDo(
      () => this.fallingPiece.rotate(),
      () => this.fallingPiece.unRotate()
    )
    return this
  }

  left() {
    this.transactionDo(
      () => this.fallingPiece.left(),
      () => this.fallingPiece.right()
    )
    return this
  }

  right() {
    this.transactionDo(
      () => this.fallingPiece.right(),
      () => this.fallingPiece.left()
    )
    return this
  }

  down() {
    while ( this.pieceIsInAValidPosition() )
      {
        this.fallingPiece.fallOne()
      }
      this.fallingPiece.liftOne()
      return this
  }

  pieceIsInAValidPosition() {
    return !( this.fallingPieceIsOutOfBounds() || this.fallingPieceOverlapsRubble() )
  }

  transactionDo(thing, compensation) {
    thing()
    if (this.fallingPieceIsOutOfBounds() || this.fallingPieceOverlapsRubble() ) {
      compensation()
    }
  }

  fallingPieceIsOutOfBounds() {
    return this.fallingPiece.minCol() < 1 ||
      this.fallingPiece.maxCol() > this.cols ||
      this.fallingPiece.maxRow() > this.rows
  }

  fallingPieceOverlapsRubble() {
    return this.fallingPiece.points().some( point =>
      this.rubble.some( rubble => rubble.sameAs(point) ) )
  }

  calculateAward(completedRows) {
    const scoreMap = {
      0: 0,
      1: 20,
      2: 50,
      3: 200,
      4: 800
    }
    return scoreMap[completedRows.length]
  }

  isGameOver() {
    return this.rubble.some( point => point.row === 1 )
  }
}
