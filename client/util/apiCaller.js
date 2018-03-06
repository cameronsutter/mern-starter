import fetch from 'isomorphic-fetch'
import Config from '../../server/config'
import axios, { post } from 'axios'

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || ('http://redy.docker/api') :
  'http://redy.docker/api';

export function uploadFile(endpoint, file) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return post(`${API_URL}/${endpoint}`, file, config)
}

export function callApi(endpoint, method = 'get', body, contentType = 'application/json') {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': contentType },
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
