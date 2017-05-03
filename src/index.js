import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Mousetrap from 'mousetrap'
import Game from './Game'
import * as types from './actions'
import { createStore } from 'redux'
import './index.css';

let isPaused = false

const gameDimensions = {
  rows: 20,
  cols: 10
}

const dispatchTick = () => {
  setTimeout( () => store.dispatch({ type: types.TICK }), 400 )
}

const isGameInactive = ( state ) => {
  return ( isPaused === true || state.game.isGameOver() === true )
}

const gameStream = ( state = { 'game': new Game() }, action ) => {
  switch ( action.type ) {
    case types.TICK:
      const revedState = { 'game': state.game.tick() }
      if ( !revedState.game.isGameOver() &&
        isPaused === false ) {
          dispatchTick()
      }
      return revedState
    case types.ROTATE:
      return isGameInactive( state ) ?
        state :
        state = { 'game': state.game.rotate() }
    case types.LEFT:
      return isGameInactive( state ) ?
      state :
      state = { 'game': state.game.left() }
    case types.RIGHT:
      return isGameInactive( state ) ?
      state :
      state = { 'game': state.game.right() }
    case types.DOWN:
      return isGameInactive( state ) ?
      state :
      state = { 'game': state.game.down() }
  /*
    FIXME: This currently dispatches an extra TICK, causing the game to
           run at a faster pace.

    case types.PAUSE:
      isPaused = ( isPaused === false ) ? true : false
      dispatchTick()
      return state
  */
    default:
      return state
  }
}

const store = createStore( gameStream )
store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView
      game={ store.getState().game }
      height={ gameDimensions.rows * 25 }
      width={ gameDimensions.cols * 25 }
     />,
    document.getElementById( 'root' )
  )
})
store.dispatch({ type: types.TICK })

Mousetrap.bind('up', event => {
  event.preventDefault()
  store.dispatch({type: types.ROTATE })
})
Mousetrap.bind('left', () => {
  event.preventDefault()
  store.dispatch({type: types.LEFT })
})
Mousetrap.bind('right', () => {
  event.preventDefault()
  store.dispatch({type: types.RIGHT })
})
Mousetrap.bind('down', () => {
  event.preventDefault()
  store.dispatch({type: types.DOWN} )
})
Mousetrap.bind('space', () => {
  event.preventDefault()
  store.dispatch({type: types.PAUSE })
})
