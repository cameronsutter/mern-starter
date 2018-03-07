import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, FormControl } from 'react-bootstrap'

import { fetchAlbums } from './AlbumActions'
import { fetchAccount, addAlbum } from '../Account/AccountActions'

import styles from './Album.css'

class AlbumList extends Component {
  componentWillMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('c@s.com'))
    }
  }

  handleAddAlbum = () => {
    let newAlbum = this.newAlbumRef.value
    if (newAlbum) this.props.dispatch(addAlbum(this.props.account.email, newAlbum))
  }

  renderAlbumLink = (album, idx) => {
    let id = this.props.account._id
    return <li key={`album-${idx}`}>
      <Link to={`albums/${id}/${album}`}>{album}</Link>
    </li>
  }

  render () {
    const { albums, username } = this.props.account
    let renderedAlbums = albums.split('|').map(this.renderAlbumLink)
    return <div>
      <h1>{`${username}\'s`} homes</h1>
      <div className={styles['album_list']}>
        <FormControl className={styles.input} inputRef={ref => { this.newAlbumRef = ref }} type="text" />
        <Button bsStyle='danger' onClick={this.handleAddAlbum}>Add</Button>
      </div>
      <hr/>
      <ul>
        { renderedAlbums }
      </ul>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AlbumList.need = [() => { return fetchAccount('c@s.com') }]

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    account: state.account.data,
  }
}

AlbumList.propTypes = {
  account: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

AlbumList.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(mapStateToProps)(AlbumList)
