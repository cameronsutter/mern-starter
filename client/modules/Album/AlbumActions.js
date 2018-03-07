import { callApi, uploadFile } from '../../util/apiCaller'

// Export Constants
export const ADD_PHOTO = 'ADD_PHOTO'
export const ADD_PHOTOS = 'ADD_PHOTOS'

export function addPhoto(album, name, url) {
  return {
    type: ADD_PHOTO,
    album,
    name,
    url,
  }
}

export function addPhotos(array) {
  return {
    type: ADD_PHOTOS,
    array,
  }
}

export function fetchAlbumPhotos(id, album) {
  return (dispatch) => {
    return callApi(`photos/${id}/${album}`).then(res => {
      let photos = res.map(url => {
        return {
          album,
          url,
        }
      })
      dispatch(addPhotos(photos))
    })
  }
}

export function addNewPhoto(metaData, file) {
  let data = new FormData()
  data.append('file', file)
  data.append('name', file.name)
  data.append('userID', metaData.userID)
  data.append('album', metaData.album)
  return (dispatch) => {
    return uploadFile('photos', data).then(res => {
      dispatch(addPhoto(metaData.album, file.name, res.data.photo))
    })
  }
}
