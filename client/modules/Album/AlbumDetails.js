import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import { fetchAlbumPhotos, addNewPhoto } from './AlbumActions'

import styles from './Album.css'

class AlbumDetails extends Component {
  componentDidMount () {
    if (this.props.photos.length < 1) {
      this.props.dispatch(fetchAlbumPhotos(this.props.params.id, this.props.params.albumName))
    }
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0]
    let data = {
      name: file.name,
      userID: this.props.params.id,
      album: this.props.params.albumName,
    }
    this.props.dispatch(addNewPhoto(data, file))
  }

  renderPhotos () {
    if (this.props.photos.length < 1) return null
    return this.props.photos.map((ph, idx) => {
      return <div className={styles['img_wrapper']} key={idx}>
        <img className={styles.img} src={ph.url}/>
      </div>
    })
  }

  render () {
    return <div>
      <h1>{this.props.params.albumName}</h1>
      <Link to={'/'}>Back to Albums</Link>
      <hr/>
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
      <hr/>
      <div className={styles['photos_container']}>
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
  if (state.photos && state.photos.length > 0) {
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
