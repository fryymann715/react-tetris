import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Mousetrap from 'mousetrap'
import Game from './Game'
import { createStore } from 'redux'
import './index.css';

let pausedBoolean = false

const dispatchTick = () => {
  setTimeout( () => store.dispatch({ type: 'TICK' }), 400 )
}

const isGameInactive = ( state ) => {
  return ( pausedBoolean === true ||
    (state.game1.isGameOver() === true || state.game2.isGameOver() === true ) )
}

const gameStream = ( state = { 'game1': new Game(), 'game2': new Game() }, action ) => {
  switch ( action.type ) {
    case 'TICK':
      const revedState = {'game1': state.game1.tick(), 'game2': state.game2.tick() }
      if ( !revedState.game1.isGameOver() &&
      !revedState.game2.isGameOver() &&
      pausedBoolean === false ) {
        dispatchTick()
      }
      return revedState
    case 'ROTATE':
      return isGameInactive( state ) ?
        state :
        state = { 'game1': state.game1.rotate(), 'game2': state.game2 }
    case 'LEFT':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.left(), 'game2': state.game2 }
    case 'RIGHT':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.right(), 'game2': state.game2 }
    case 'DOWN':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1.down(), 'game2': state.game2 }
    case 'ROTATE2':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.rotate() }
    case 'LEFT2':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.left() }
    case 'RIGHT2':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.right() }
    case 'DOWN2':
      return isGameInactive( state ) ?
      state :
      state = { 'game1': state.game1, 'game2': state.game2.down() }
    case 'PAUSE':
      pausedBoolean = ( pausedBoolean === false ) ? true : false
      dispatchTick()
      return state
    default:
      return state
  }
}

const store = createStore( gameStream )
store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView game={ store.getState() } />,
    document.getElementById( 'root' )
  )
})
store.dispatch({ type: 'TICK' })

Mousetrap.bind('w', () => store.dispatch({type: 'ROTATE'}))
Mousetrap.bind('a', () => store.dispatch({type: 'LEFT'}))
Mousetrap.bind('s', () => store.dispatch({type: 'DOWN'}))
Mousetrap.bind('d', () => store.dispatch({type: 'RIGHT'}))
Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE2'}))
Mousetrap.bind('left', () => store.dispatch({type: 'LEFT2'}))
Mousetrap.bind('down', () => store.dispatch({type: 'DOWN2'}))
Mousetrap.bind('right', () => store.dispatch({type: 'RIGHT2'}))
Mousetrap.bind('space', () => store.dispatch({type: 'PAUSE'}) )
