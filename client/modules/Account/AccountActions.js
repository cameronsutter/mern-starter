import { callApi } from '../../util/apiCaller'

import { STORAGE_KEY } from '../../util/apiCaller'

// Export Constants
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const EDIT_ALBUMS = 'EDIT_ALBUMS'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'

export function editAccountAction(account) {
  return {
    type: EDIT_ACCOUNT,
    firstName: account.firstName,
    lastName: account.lastName,
    username: account.username,
  }
}

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    account,
  }
}

export function editAlbums(albums) {
  return {
    type: EDIT_ALBUMS,
    albums,
  }
}

export function removeAccount() {
  return { type: REMOVE_ACCOUNT }
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
      // save token to localStorage
      localStorage.setItem(STORAGE_KEY, res.token)
      dispatch(addAccount(res.account))
    })
  }
}

export function addAlbum(email, album) {
  return (dispatch) => {
    return callApi('account/albums', 'post', {email, album}).then(res => {
      dispatch(editAlbums(res.albums))
    })
  }
}

export function editAccount(account) {
  return (dispatch) => {
    return callApi('account', 'post', {account}).then(res => {
      dispatch(editAccountAction(res.account))
    })
  }
}

export function loginAccount(email, password) {
  return (dispatch) => {
    return callApi('account/login', 'post', {email, password}).then(res => {
      // save token to localStorage
      localStorage.setItem(STORAGE_KEY, res.token)
      dispatch(addAccount(res.account))
    })
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch(removeAccount())
  }
}
