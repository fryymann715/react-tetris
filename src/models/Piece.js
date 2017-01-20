// import { Models.Point, Models.Rotation } from './index'
import * as Models from './index'

export default class Piece {
  constructor(shape, offset = new Models.Point (-2, 5) ) {
    this.shape = shape
    this.offset = offset
    this.rotation = 'N'
    this.classString = shape.classString
  }

  points() {
    return this.shape.pointsRotated( this.rotation )
      .map( ( point, ix ) => point.add( this.offset ) );
  }

  maxRow() {
    return Math.max.apply( null, this.points().map( point => point.row ))
  }

  maxCol() {
    return Math.max.apply( null, this.points().map( point => point.col ))
  }

  minCol() {
    return Math.min.apply( null, this.points().map( point => point.col ))
  }

  rotate() {
    this.rotation = (new Models.Rotation( this.rotation )).next()
  }

  unRotate() {
    this.rotation = (new Models.Rotation( this.rotation )).previous()
  }

  left() {
    this.offset = new Models.Point(this.offset.row, this.offset.col -1)
  }

  right() {
    this.offset = new Models.Point(this.offset.row, this.offset.col +1)
  }

  hasPoint(point) {
       return this.points().some( item => item.sameAs(point) )
   }

  fallOne() {
    if( ! this.pauseDown ) {
      this.offset = new Models.Point( this.offset.row +1, this.offset.col )
    }
  }

  liftOne() {
   this.offset = new Models.Point( this.offset.row -1, this.offset.col )
 }
}
