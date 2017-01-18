import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components'
import * as Model from './models'
import { createStore } from 'redux'
import './index.css';

const reducer = ( state = new Model.Game(), action ) => {
  switch (action.type) {
    case 'TICK':
    console.log('TICK')
      return state.tick()
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

setInterval( () => store.dispatch({ type: 'TICK' }), 500 )
