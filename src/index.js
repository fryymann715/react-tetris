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
  return ( isPaused === true ||
    (state.game1.isGameOver() === true || state.game2.isGameOver() === true ) )
}

const gameStream = ( state = { 'game1': new Game(), 'game2': new Game() }, action ) => {
  switch ( action.type ) {
    case types.TICK:
      const revedState = {'game1': state.game1.tick(), 'game2': state.game2.tick() }
      if ( !revedState.game1.isGameOver() &&
      !revedState.game2.isGameOver() &&
      isPaused === false ) {
        dispatchTick()
      }
      return revedState
    case types.ROTATE:
      return isGameInactive( state ) ?
        state :
        state = { 'game1': state.game1.rotate(), 'game2': state.game2 }
    case types.LEFT:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.left(), 'game2': state.game2 }
    case types.RIGHT:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.right(), 'game2': state.game2 }
    case types.DOWN:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.down(), 'game2': state.game2 }
    case types.ROTATE2:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.rotate() }
    case types.LEFT2:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.left() }
    case types.RIGHT2:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.right() }
    case types.DOWN2:
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.down() }
    case types.PAUSE:
      isPaused = ( isPaused === false ) ? true : false
      dispatchTick()
      return state

    case types.CAST_METEOR:
      dispatchTick()
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2 }
    default:
      return state
  }
}


const store = createStore( gameStream )
store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView
      game1={ store.getState().game1 }
      game2={ store.getState().game2 }
      height={ gameDimensions.rows * 25 }
      width={ gameDimensions.cols * 25 }
     />,
    document.getElementById( 'root' )
  )
})
store.dispatch({ type: types.TICK })

Mousetrap.bind( '0', () => store.dispatch({ type: types.CAST_METEOR }) )

Mousetrap.bind('w', () => store.dispatch({type: types.ROTATE }))
Mousetrap.bind('a', () => store.dispatch({type: types.LEFT }))
Mousetrap.bind('s', () => store.dispatch({type: types.DOWN} ))
Mousetrap.bind('d', () => store.dispatch({type: types.RIGHT }))
Mousetrap.bind('up', () => store.dispatch({type: types.ROTATE2 }))
Mousetrap.bind('left', () => store.dispatch({type: types.LEFT2 }))
Mousetrap.bind('down', () => store.dispatch({type: types.DOWN2 }))
Mousetrap.bind('right', () => store.dispatch({type: types.RIGHT2 }))
Mousetrap.bind('space', () => store.dispatch({type: types.PAUSE }) )
