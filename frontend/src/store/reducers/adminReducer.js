import * as Types from '../actions/actionTypes'

const initialState = {
    users: [],
    usersLoading: false
}

function adminReducer(state = initialState, action) {
    switch (action.type) {
        case Types.USERS_LOADED: {
            return {
                ...state,
                users: action.payload
            }
        }
        case Types.USERS_LOADING: {
            return {
                ...state,
                usersLoading: action.payload
            }
        }
        default: return state
    }
}

export default adminReducer