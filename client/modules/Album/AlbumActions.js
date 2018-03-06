import callApi from '../../util/apiCaller'

// Export Constants
export const ADD_ALBUMS = 'ADD_ALBUMS'
export const ADD_PHOTO = 'ADD_PHOTO'

export function addAlbums(albums) {
  return {
    type: ADD_ALBUMS,
    albums,
  }
}

export function addPhoto(photo) {
  return {
    type: ADD_PHOTO,
    photo,
  }
}

export function fetchAlbumPhotos(id, album) {
  return (dispatch) => {
    return callApi(`photos/${id}/${album}`).then(res => {
      dispatch(addAlbums(res.albums))
    })
  }
}

export function addNewPhoto(data, file) {
  let data = new FormData()
  data.append('file', file)
  data.append('name', data)
  return (dispatch) => {
    return callApi('photos', 'post', {data}).then(res => {
      dispatch(addPhoto(res.photo))
    })
  }
}
