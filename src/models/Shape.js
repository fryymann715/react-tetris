// import Models.Point from './index'
//import Rotation from './index'
import * as Models from './index'

export default class Shape {
  constructor( name, rotator ) {
    this.name = name
    this.rotator = rotator
    this.classString = `square ${name}`
  }
  pointsRotated( rotation ) {
    return this.rotator( rotation )
  }

  static selectRandom() {
    const index = Math.floor(Math.random()*1000000%5)
    return Shape.shapes[ Object.keys(Shape.shapes)[index] ]
  }

  static shapes = {

    'O': new Shape( 'O', rotation => [ new Models.Point(1,1), new Models.Point(1, 2), new Models.Point(2, 1), new Models.Point(2, 2) ] ),

    'I': new Shape( 'I', rotation => {
      switch (rotation) {
        case 'N': return [new Models.Point(2,1), new Models.Point(2,2),new Models.Point(2,3), new Models.Point(2,4)]
        case 'E': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(4,1)]
        case 'S': return [new Models.Point(2,1), new Models.Point(2,2),new Models.Point(2,3), new Models.Point(2,4)]
        case 'W': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(4,1)]
        default:
      }
    }),

    'T': new Shape ( 'T', rotation => {
      switch (rotation) {
        case 'N': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(1,3)]
        case 'E': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(3,2), new Models.Point(2,1)]
        case 'S': return [new Models.Point(1,2), new Models.Point(2,1),new Models.Point(2,2), new Models.Point(2,3)]
        case 'W': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(2,2)]
        default:
      }
    }),
    'L': new Shape ('L', rotation => {
      switch (rotation) {
        case 'N': return [new Models.Point(1,1), new Models.Point(2,1), new Models.Point(1,2), new Models.Point(1,3)]
        case 'E': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(3,2)]
        case 'S': return [new Models.Point(1,3), new Models.Point(2,1), new Models.Point(2,2), new Models.Point(2,3)]
        case 'W': return [new Models.Point(1,1), new Models.Point(2,1), new Models.Point(3,1), new Models.Point(3,2)]
        default:
      }
    }),
    'Z': new Shape ('Z', rotation => {
      switch (rotation) {
        case 'N': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(2,3)]
        case 'E': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(2,1), new Models.Point(3,1)]
        case 'S': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(2,3)]
        case 'W': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(2,1), new Models.Point(3,1)]
        default:
      }
    })
  }

}

const ROTATIONS = ['N', 'E', 'S', 'W']


export class Rotation {
  constructor( current ) {
    this.index = ROTATIONS.indexOf( current )
  }

  next() {
    return ROTATIONS[ ( this.index + 1 ) % 4 ]
  }

  previous() {
    return ROTATIONS[ ( this.index - 1 ) % 4 ]
  }

  //static ROTATIONS = ['N', 'E', 'S', 'W']
}


// export const shapes = {
//   'O': new Shape( 'O', rotation =>
//     [ new Models.Point(1,1), new Models.Point(1, 2), new Models.Point(2, 1), new Models.Point(2, 2) ] ),
//   'I': new Shape( 'I', rotation => {
//     switch (rotation) {
//       case 'N': return [new Models.Point(2,1), new Models.Point(2,2),new Models.Point(2,3), new Models.Point(2,4)]
//       case 'E': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(4,1)]
//       case 'S': return [new Models.Point(2,1), new Models.Point(2,2),new Models.Point(2,3), new Models.Point(2,4)]
//       case 'W': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(4,1)]
//       default:
//     }
//   }),
//   'T': new Shape ( 'T', rotation => {
//     switch (rotation) {
//       case 'N': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(1,3)]
//       case 'E': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(3,2), new Models.Point(2,1)]
//       case 'S': return [new Models.Point(1,2), new Models.Point(2,1),new Models.Point(2,2), new Models.Point(2,3)]
//       case 'W': return [new Models.Point(1,1), new Models.Point(2,1),new Models.Point(3,1), new Models.Point(2,2)]
//       default:
//     }
//   }),
//   'L': new Shape ('L', rotation => {
//     switch (rotation) {
//       case 'N': return [new Models.Point(1,1), new Models.Point(2,1), new Models.Point(1,2), new Models.Point(1,3)]
//       case 'E': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(3,2)]
//       case 'S': return [new Models.Point(1,3), new Models.Point(2,1), new Models.Point(2,2), new Models.Point(2,3)]
//       case 'W': return [new Models.Point(1,1), new Models.Point(2,1), new Models.Point(3,1), new Models.Point(3,2)]
//       default:
//     }
//   }),
//   'Z': new Shape ('Z', rotation => {
//     switch (rotation) {
//       case 'N': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(2,3)]
//       case 'E': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(2,1), new Models.Point(3,1)]
//       case 'S': return [new Models.Point(1,1), new Models.Point(1,2), new Models.Point(2,2), new Models.Point(2,3)]
//       case 'W': return [new Models.Point(1,2), new Models.Point(2,2),new Models.Point(2,1), new Models.Point(3,1)]
//       default:
//     }
//   })
// }

// shapes.selectRandom = () => {
//   const index = Math.floor(Math.random()*1000000%5)
//   return shapes[ Object.keys(shapes)[index] ]
// }
