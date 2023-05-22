import { loginWithGoogle } from "../firebase"

//constants
let initialData = {
    loggedIn: false,
    fetching: false,
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, fetching: true}
        case LOGIN_ERROR: 
            return {...state, fetching: false, error: action.payload}
        case LOGIN_SUCCESS:
            return {...state, fetching: false, ...action.payload, loggedIn: true}
        default:
            return state
    }
}

// auxiliar
function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage)
}

//action creators
export let doGoogleLoginAction = () => async (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    try {
        const user = await loginWithGoogle()
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { 
                uid: user.uid,
                name : user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
        })
        saveStorage(getState())
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message
        })
    }
}