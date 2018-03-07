import { ADD_ACCOUNT, EDIT_ACCOUNT, EDIT_ALBUMS } from './AccountActions'

// Initial State
const initialState = { data: [] }

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT :
      return {
        data: action.account,
      }

    case EDIT_ACCOUNT :
      return {
        data: {
          ...state.data,
          firstName: action.firstName,
          lastName: action.lastName,
          username: action.username,
        }
      }

    case EDIT_ALBUMS:
      return {
        data: {
          ...state.data,
          albums: action.albums,
        }
      }

    default:
      return state
  }
}

// Export Reducer
export default AccountReducer
