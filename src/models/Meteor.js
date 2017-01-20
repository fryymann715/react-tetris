// import Models.Point from './index'
import * as Models from './index'

export default class Meteor {
  constructor( offset = new Models.Point (2, Math.floor(Math.random() * 10 ) )) {
    this.shape = new Models.Point(1,Math.floor(Math.random() * 10 ))
    this.offset = offset
  }

  maxRow() {
    return this.shape.row
  }

  hasPoint(point) {
       return this.points().some( item => item.sameAs(point) )
   }

  fallOne() {
    if( ! this.pauseDown ) {
      this.shape = new Models.Point( this.shape.row +1, this.shape.col )
    }
  }

  liftOne() {
   this.shape = new Models.Point( this.shape.row -1, this.shape.col )
 }
}
