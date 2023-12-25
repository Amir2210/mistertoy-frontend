// import { storageService } from "./storage.service.js"
import { storageService } from "./async-storage.service.js"


export const userService = {
    addActivity,
    getLoggedinUser,
    updateUserPreffs,
    updateBalance,
    query,
    signup,
    getById,
    logout,
    login
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

// login({username: 'muki', password: 'muki1'})

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 100, pref: { color: '#ffffff', bgColor: "#000000" } }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function updateUserPreffs(userToUpdate) {
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            user.fullname = userToUpdate.fullname
            user.pref.color = userToUpdate.color
            user.pref.bgColor = userToUpdate.bgColor
            return storageService.put(STORAGE_KEY, user)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function updateBalance(diff) {
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.balance
                })
        })
}

function addActivity(type, todoId) {
    const activity = {
        txt: `${type} a Todo with id : ${todoId}`,
        at: Date.now()
    }
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.push(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, pref: user.pref }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})