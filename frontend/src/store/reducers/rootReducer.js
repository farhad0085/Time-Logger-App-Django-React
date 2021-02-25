import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import authReducer from './authReducer'
import timeLogReducer from './timeLogReducer'
import userProfileReducer from './userProfileReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    timeLog: timeLogReducer,
    admin: adminReducer,
    userProfile: userProfileReducer,
})

export default rootReducer