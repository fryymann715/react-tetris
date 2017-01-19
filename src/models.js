import * as _ from 'underscore'


export class Point {
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

  sameAs( p2 ) {
    return this.row === p2.row && this.col === p2.col
  }

}

export class Shape {
  constructor( name, rotator ) {
    this.name = name
    this.rotator = rotator
    this.classString = `square ${name}`
    this.isPaused = false
  }
  pointsRotated( rotation ) {
    return this.rotator( rotation )
  }

}

export class Piece {
  constructor(shape, offset = new Point (1, 10) ) {
    this.shape = shape
    this.offset = offset
    this.rotation = 'N'
    this.classString = shape.classString
  }

  points() {
    return this.shape.pointsRotated( this.rotation ).map( ( point, ix ) => point.add( this.offset ) );
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
    this.rotation = Piece.rotations()[( Piece.rotations().indexOf( this.rotation ) +1) % 4 ]
  }

  unRotate() {
    this.rotation = Piece.roations()[( Piece.rotations().indexOf( this.rotation ) -1) % 4]
  }

  left() {
    this.offset = new Point(this.offset.row, this.offset.col -1)
  }

  right() {
    this.offset = new Point(this.offset.row, this.offset.col +1)
  }

  hasPoint(point) {
       return this.points().some( item => item.sameAs(point) )
   }

  fallOne() {
    this.offset = new Point( this.offset.row +1, this.offset.col )
  }

  liftOne() {
   this.offset = new Point( this.offset.row -1, this.offset.col )
  }

  static rotations() {
    return ['N', 'E', 'S', 'W']
  }

}

export const shapes = {
  'O': new Shape( 'O', rotation => [ new Point(1,1), new Point(1, 2), new Point(2, 1), new Point(2, 2) ] ),
  'I': new Shape( 'I', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]
      case 'E': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)]
      case 'S': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)]
      case 'W': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)]
      default:
    }
  }),
  'T': new Shape ( 'T', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)]
      case 'E': return [new Point(1,2), new Point(2,2),new Point(3,2), new Point(2,1)]
      case 'S': return [new Point(1,2), new Point(2,1),new Point(2,2), new Point(2,3)]
      case 'W': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(2,2)]
      default:
    }
  }),
  'L': new Shape ('L', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)]
      case 'E': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(3,2)]
      case 'S': return [new Point(1,3), new Point(2,1), new Point(2,2), new Point(2,3)]
      case 'W': return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(3,2)]
      default:
    }
  }),
  'Z': new Shape ('Z', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)]
      case 'E': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)]
      case 'S': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)]
      case 'W': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)]
      default:
    }
  })
}

shapes.selectRandom = () => {
  const index = Math.floor(Math.random()*1000000%5)
  return shapes[ Object.keys(shapes)[index] ]
}