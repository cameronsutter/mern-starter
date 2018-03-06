import { ADD_ALBUMS, ADD_PHOTO } from './AlbumActions'

// Initial State
const initialState = []

const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO :
      console.log('reducer')
      console.log(action)
      return [
        ...state,
        {
          name: action.name,
          album: action.album,
          url: action.url,
        }
      ]

    default:
      return state
  }
}

// Export Reducer
export default AlbumReducer
