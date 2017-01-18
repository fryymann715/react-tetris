import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components/components'
import * as Model from './components/models'
// import Game from './components/Game'
import { createStore } from 'redux'
import './index.css';

// import App from './App';

const reducer = ( state = new Model.Game(), action ) => {
  switch (action.type) {
    case 'TICK':
    console.log('TICK')
      return state.tick()
    default:
      return state
  }
  //return state

}

let store = createStore( reducer )

store.subscribe( () => {
  ReactDOM.render(
    <Components.GameView game={ store.getState() } />,
    document.getElementById( 'root' )
  )
})

setInterval( () => store.dispatch({ type: 'TICK' }), 500 )



// ReactDOM.render(
//   <div>
//     { data.map( c => <Components.ShapeView shape={c} /> )}
//   </div>,
//   document.getElementById('root')
// )


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


{/*  */}
