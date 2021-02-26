import * as Types from '../actions/actionTypes'

const initialState = {
    loading: false,
    userPasswordUpdated: false,
    passwordUpdateErrors: {},
    userProfileUpdate: false,
    userProfileUpdateErrors: {},
    userProfileInformation: {}
}

function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case Types.USER_PROFILE_INFORMATION_LOADED: {
            return {
                ...state,
                userProfileInformation: action.payload
            }
        }
        case Types.USER_PROFILE_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case Types.USER_PASSWORD_UPDATED: {
            return {
                ...state,
                userPasswordUpdated: true
            }
        }
        case Types.USER_PASSWORD_UPDATE_ERROR: {
            return {
                ...state,
                passwordUpdateErrors: action.payload,
                userPasswordUpdated: false
            }
        }
        default: return state
    }
}

export default userProfileReducer