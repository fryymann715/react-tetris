import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Mousetrap from 'mousetrap'
import Game from './Game'
import { createStore } from 'redux'
import './index.css';

Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE'}))
Mousetrap.bind('left', () => store.dispatch({type: 'LEFT'}))
Mousetrap.bind('right', () => store.dispatch({type: 'RIGHT'}))

const reducer = ( state = new Game(), action ) => {
  switch (action.type) {
    case 'TICK':
      const revedState = state.tick()
      if ( !revedState.isGameOver() || !revedState.isPaused() ) {
        setTimeout( () => store.dispatch({ type: 'TICK' }), revedState.interval )
      }
      return revedState
    case 'ROTATE':
      return state.rotate()
    case 'LEFT':
      return state.left()
    case 'RIGHT':
      return state.right()
    default:
      return state
  }
}

let store = createStore( reducer )

store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView game={ store.getState() } />,
    document.getElementById( 'root' )
  )
})

store.dispatch({ type: 'TICK' })
