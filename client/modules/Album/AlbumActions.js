import callApi from '../../util/apiCaller'

// Export Constants
export const ADD_ALBUMS = 'ADD_ALBUMS'

export function addAlbums(albums) {
  return {
    type: ADD_ALBUMS,
    albums,
  }
}

export function fetchAlbumPhotos(id, album) {
  return (dispatch) => {
    return callApi(`photos/${id}/${album}`).then(res => {
      dispatch(addAlbums(res.albums))
    })
  }
}
