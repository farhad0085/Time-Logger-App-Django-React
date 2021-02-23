import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import authReducer from './authReducer'
import timeLogReducer from './timeLogReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    timeLog: timeLogReducer,
    admin: adminReducer,
})

export default rootReducer