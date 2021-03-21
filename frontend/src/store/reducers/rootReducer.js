import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import authReducer from './authReducer'
import forgetPasswordReducer from './forgetPasswordReducer'
import timeLogReducer from './timeLogReducer'
import userProfileReducer from './userProfileReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    timeLog: timeLogReducer,
    admin: adminReducer,
    userProfile: userProfileReducer,
    forgetPassword: forgetPasswordReducer,
})

export default rootReducer