import fetch from 'isomorphic-fetch'
import Config from '../../server/config'
import axios, { post } from 'axios'

export const API_URL = (typeof window === 'undefined') ?
  process.env.API_URL || 'http://localhost:8000/api' :
  `${window.location.origin}/api`

export const STORAGE_KEY = 'redYToken'

export function uploadFile(endpoint, file) {
  let token = null
  if (typeof window !== 'undefined') token = localStorage.getItem(STORAGE_KEY)
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': token || null,
    }
  }
  return post(`${API_URL}/${endpoint}`, file, config)
}

export function callApi(endpoint, method = 'get', body, contentType = 'application/json') {
  let token = null
  if (typeof window !== 'undefined') token = localStorage.getItem(STORAGE_KEY)
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': contentType,
      'authorization': token || null,
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
