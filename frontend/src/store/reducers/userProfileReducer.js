import * as Types from '../actions/actionTypes'

const initialState = {
    loading: false
}

function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case Types.USER_PROFILE_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        default: return state
    }
}

export default userProfileReducer