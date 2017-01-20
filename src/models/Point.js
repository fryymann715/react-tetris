export default class Point {
  constructor( row, col ) {
    this.row = row
    this.col = col
    this.key = Math.random().toString()
  }

  add( otherPoint ) {
    const p = new Point( this.row -1 + otherPoint.row, this.col -1 + otherPoint.col )
    p.key = this.key
    return p
  }

  fallOne() {
    return new Point(this.row +1, this.col)
  }

  isAbove( p2 ) {
    return this.row === p2.row +1 && this.col === p2.col
  }

  sameAs( p2 ) {
    return this.row === p2.row && this.col === p2.col
  }
}
