import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Mousetrap from 'mousetrap'
import Game from './Game'
import * as types from './actions'
import { createStore } from 'redux'
import './index.css';

let isPaused = false
let isGameStarted = true

const startGame = () => {
  store.dispatch({ type: types.TICK })
  isGameStarted = true
}

let speed = 400

const gameDimensions = {
  rows: 20,
  cols: 10
}

const dispatchTick = () => {
  setTimeout( () => store.dispatch({ type: types.TICK }), speed )
}

const isGameInactive = ( state ) => {
  return ( state.game.isGameOver() === true )
}

const adjustSpeed = ( score ) => {
  if ( score < 50 ) {
    speed = 400
  }
  else if ( 50 < score && score < 100 ) {
    speed = 300
  }
  else if ( 100 < score && score < 1000 ) {
    speed = 200
  } else if ( 999 < score &&score < 2400 ) {
    speed = 150
  }
  else if ( 2399 < score ) {
    speed = 110
  }
  dispatchTick()
}

const gameStream = ( state = { 'game': new Game() }, action ) => {
  switch ( action.type ) {
    case types.TICK:
      const revedState = { 'game': state.game.tick() }
      adjustSpeed( revedState.game.score )
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
    case types.PAUSE:
      if ( isGameInactive( state ) ) {
        return state
      }
      let newState = state
      newState.game.paused = newState.game.paused ? false : true
      return newState
    default:
      return state
  }
}

const store = createStore( gameStream )
store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView
      isGameStarted={ isGameStarted }
      startGame={ startGame }
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
