import { callApi } from '../../util/apiCaller'

// Export Constants
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'

export function editAccount(account) {
  return {
    type: EDIT_ACCOUNT,
    account,
  }
}

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    account,
  }
}

export function fetchAccount(email) {
  return (dispatch) => {
    return callApi(`account/${email}`).then(res => {
      dispatch(addAccount(res.account))
    })
  }
}

export function newAccount(account) {
  return (dispatch) => {
    return callApi('account/new', 'post', {account}).then(res => {
      dispatch(addAccount(res.account))
    })
  }
}
