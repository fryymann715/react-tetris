import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Mousetrap from 'mousetrap'
import Game from './Game'
import { createStore } from 'redux'
import './index.css';

const gameStream = ( state = { 'game1': new Game(), 'game2': new Game() }, action ) => {
  console.log( "STATE", state )
  switch ( action.type ) {
    case 'TICK':
      const revedState = {'game1': state.game1.tick(), 'game2': state.game2.tick() }

      if ( !revedState.game1.isGameOver() && !revedState.game2.isGameOver() ) {
        setTimeout( () => store.dispatch({ type: 'TICK' }), revedState.game1.interval )
      }

      return revedState
    case 'ROTATE':
      return state = { 'game1': state.game1.rotate(), 'game2': state.game2 }
    case 'LEFT':
      return state = { 'game1': state.game1.left(), 'game2': state.game2 }
    case 'RIGHT':
      return state = { 'game1': state.game1.right(), 'game2': state.game2 }
    //case 'DOWN':
      //return state.game1.down()
    // case 'DBL_SPEED':
    //   return state.game1.doubleSpeed()
    // case 'NORMAL_SPEED':
    //   return state.game1.normalSpeed()
    case 'ROTATE2':
      return state = { 'game1': state.game1, 'game2': state.game2.rotate() }
    case 'LEFT2':
      return state = { 'game1': state.game1, 'game2': state.game2.left() }
    case 'RIGHT2':
      return state = { 'game1': state.game1, 'game2': state.game2.right() }
    // //case 'DOWN ':
    //   //return state.game2.down()
    // case 'DBL_SPEED':
    //   return state.game2.doubleSpeed()
    // case 'NORMAL_SPEED':
    //   return state.game2.normalSpeed()
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

Mousetrap.bind('space', () => store.dispatch({type: 'DBL_SPEED'}), 'keydown')
Mousetrap.bind('space', () => store.dispatch({type: 'NORMAL_SPEED'}), 'keyup')
