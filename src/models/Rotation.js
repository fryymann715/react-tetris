
export default class Rotation {
  constructor( current ) {
    this.index = Rotation.ROTATIONS.indexOf( current )
  }

  next() {
    return Rotation.ROTATIONS[ ( this.index + 1 ) % 4 ]
  }

  previous() {
    return Rotation.ROTATIONS[ ( this.index - 1 ) % 4 ]
  }

  static ROTATIONS = ['N', 'E', 'S', 'W']
}
