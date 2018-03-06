import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import { fetchAlbumPhotos, addNewPhoto } from './AlbumActions'

class AlbumDetails extends Component {
  componentDidMount () {
    if (this.props.photos.length < 1) {
      this.props.dispatch(fetchAlbumPhotos(this.props.params.id, this.props.params.albumName))
    }
  }

  // Component method
  handleFileUpload(event, obj, obj2, obj3) {
    console.log(obj.target)
    console.log(obj2)
    console.log('3', obj3)
    const { files } = obj
    const file = files[0]
    console.log(file)
    this.props.dispatch(addNewPhoto(data: 'stuff', file))
  }

  renderPhotos () {
    return null
  }

  render () {
    console.log('render', this.props.photos)
    return <div>
      <h1>{this.props.params.albumName}</h1>
      <form>
        <FormGroup>
          <ControlLabel>Upload a file</ControlLabel>
          <FormControl
            ref='photo'
            type="file"
            onChange={this.handleFileUpload}
          />
        </FormGroup>
      </form>
      <div className='photos__container'>
        { this.renderPhotos() }
      </div>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AlbumDetails.need = [params => { return fetchAlbumPhotos(params.id, params.albumName) }]

// Retrieve data from store as props
function mapStateToProps(state, props) {
  let photos = []
  if (state.photos) {
    photos = state.photos.filter(ph => ph.album === props.params.albumName)
  }
  return {
    photos,
  }
}

AlbumDetails.propTypes = {
  photos: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
}

AlbumDetails.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(mapStateToProps)(AlbumDetails)
