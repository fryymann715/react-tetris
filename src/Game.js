import * as _ from 'underscore'
import * as Models from './models'

export default class Game {
  constructor() {
    this.rows = 20
    this.cols = 10
    this.rubble = []
    this.score = 0
    this.interval = 400
    this.startAPiece()
  }

  tick() {
    this.transactionDo( ()=> this.fallingPiece.fallOne(), ()=> this.fallingPiece.liftOne() )
    if ( this.fallingPiece.maxRow() === this.rows ) {
      this.convertToRubble()
      return this
    }

    const nextPos = this.fallingPiece.points().map( point => new Models.Point( point.row +1, point.col ))
    if ( nextPos.some( point => this.rubble.some( rubble => rubble.sameAs( point ) ) ) ) {
      this.convertToRubble()
    }
    return this
  }

  convertToRubble() {
    this.rubble = this.rubble.concat( this.fallingPiece.points() )
    const completedRows = this.completedRows()
    completedRows.forEach( row => this.collapseRow( row ) )
    this.score += this.calculateAward(completedRows)
    if ( !this.isGameOver() ) {
      this.interval = 300
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
    this.rubble.filter( point => point.row < row ).forEach( point => point.row += 1)
  }

  rubbleHas(row, col) {
    return this.rubble.some( point => point.row === row && point.col === col)
  }

  startAPiece() {
    this.fallingPiece = new Models.Piece( Models.shapes.selectRandom() )
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

  pause() {
    this.isPaused = this.isPaused ? false : true
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
    return this.fallingPiece.points().some( p => this.rubble.some( r => r.sameAs(p) ) )
  }

  calculateAward(completedRows) {
    const scoreMap = {
      0: 0,
      1: 40,
      2: 100,
      3: 300,
      4: 1200
    }
    return scoreMap[completedRows.length]
  }

  isPaused() {
    return this.isPaused
  }

  isGameOver() {
    return this.rubble.some( point => point.row === 1 )
  }
}
