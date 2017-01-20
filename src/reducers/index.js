import gameOneReducer from './game_one'
import gameTwoReducer from './game_two'
import { combineReducers } from 'redux'

const gameReducer = () => {

}

export rootReducer = combineReducers( gameReducer, gameOneReducer, gameTwoReducer )
