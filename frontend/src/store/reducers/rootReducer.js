import { combineReducers } from 'redux'
import authReducer from './authReducer'
import timeLogReducer from './timeLogReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    timeLog: timeLogReducer
})

export default rootReducer