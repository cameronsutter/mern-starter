import { ADD_PHOTOS, ADD_PHOTO } from './AlbumActions'

// Initial State
const initialState = []

const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO :
      return [
        ...state,
        {
          name: action.name,
          album: action.album,
          url: action.url,
        }
      ]

    case ADD_PHOTOS:
      return [
        ...state,
        ...action.array,
      ]

    default:
      return state
  }
}

// Export Reducer
export default AlbumReducer
