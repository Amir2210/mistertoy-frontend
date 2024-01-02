import { userService } from "../../services/user.service.js"




/// user
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    watchedUser : null
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
