import Game from './Game'

let isPaused = false

const isGameInactive = ( state ) => {
  return ( isPaused === true || state.isGameOver() === true )
}

export default gameOneReducer = ( state = {new Game()}, action ) => {
  switch ( action.type ) {

    default:
      return state
  }

}
