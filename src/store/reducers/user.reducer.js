import { userService } from "../../services/user.service.js"




/// user
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    count: 101,
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {

    switch (action.type) {
        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        default:
            return state
    }
}
