import axios from 'axios'

//constants
let initialData = {
    fetching: false,
    array: [],
    current: {}
}
let URL = "https://rickandmortyapi.com/api/character"
let GET_CHAR = "GET_CHAR"
let GET_CHAR_SUCCESS = "GET_CHAR_SUCCESS"
let GET_CHAR_ERROR = "GET_CHAR_ERROR"

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_CHAR:
            return {}
        case GET_CHAR_SUCCESS:
            return {...state, array: action.payload}
        case GET_CHAR_ERROR:
            return {}
        default:
            return state
    }
}

//action creators (thunk)
// la api trae los personajes en una llave "results", y axios te trae eso en la llave "data"
export function getCharactersAction() {
    return (dispatch, getState) => {
        axios.get(URL)
            .then(res => {
                dispatch({
                    type: GET_CHAR_SUCCESS,
                    payload: res.data.results
                })
            })
    }
}