import axios from 'axios'
import { updateDB, getFavs } from '../firebase'

//constants
let initialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: []
}
let URL = "https://rickandmortyapi.com/api/character"

let GET_CHAR = "GET_CHAR"
let GET_CHAR_SUCCESS = "GET_CHAR_SUCCESS"
let GET_CHAR_ERROR = "GET_CHAR_ERROR"

let REMOVE_CHARACTER = "REMOVE_CHARACTER"

let ADD_TO_FAVS = "ADD_TO_FAVS"

let GET_FAVS = "GET_FAVS"
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"
let GET_FAVS_ERROR = "GET_FAVS_ERROR"

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_CHAR:
            return {...state, fetching: true}
        case GET_CHAR_SUCCESS:
            return {...state, array: action.payload, fetching: false}
        case GET_CHAR_ERROR:
            return {...state, fetching: false, error: action.payload}
        case REMOVE_CHARACTER: 
            return {...state, array: action.payload}
        case ADD_TO_FAVS:
            return {...state, ...action.payload}
        case GET_FAVS:
            return {...state, fetching: true}
        case GET_FAVS_SUCCESS:
            return {...state, fetching: false, favorites: action.payload}
        case GET_FAVS_ERROR:
            return {...state, fetching: false, payload: action.payload}
        default:
            return state
    }
}

//action creators (thunk)
// la api trae los personajes en una llave "results", y axios te trae eso en la llave "data"
// hecha sin arrow function
export function getCharactersAction() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CHAR
        })
        axios.get(URL)
            .then(res => {
                dispatch({
                    type: GET_CHAR_SUCCESS,
                    payload: res.data.results
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_CHAR_ERROR,
                    payload: error.response.message
                })
            })
    }
}

// hecha con arrow function
export let retrieveFavs = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVS
    })
    let { uid } = getState().user
    return getFavs(uid)
        .then(array => {
            dispatch({
                type: GET_FAVS_SUCCESS,
                payload: [...array]
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: GET_FAVS_ERROR,
                payload: error.message
            })
        })
}

export let addToFavoritesAction = () => (dispatch, getState) => {
    let {array, favorites} = getState().characters
    let {uid} = getState().user
    let char = array.shift()
    favorites.push(char)
    updateDB(favorites, uid)
    dispatch({
        type: ADD_TO_FAVS,
        payload: {array: [...array], favorites: [...favorites]}
    })
}

export let removeCharacterAction = () => (dispatch, getState) => {
    let {array} = getState().characters
    array.shift()
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })
}