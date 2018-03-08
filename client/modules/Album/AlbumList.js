import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, FormControl } from 'react-bootstrap'

import { fetchAlbums } from './AlbumActions'
import { fetchAccount, addAlbum, logout } from '../Account/AccountActions'
import { STORAGE_KEY } from '../../util/apiCaller'

import styles from './Album.css'

class AlbumList extends Component {
  componentWillMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('cam@redx.com')) // hardcoded because of server rendering
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.account && !newProps.account.email) {
      var token = localStorage.getItem(STORAGE_KEY)
      if (!token) {
        newProps.history.push('/')
      }
    }
  }

  handleAddAlbum = () => {
    let newAlbum = this.newAlbumRef.value
    if (newAlbum) this.props.dispatch(addAlbum(this.props.account.email, newAlbum))
  }

  handleLogOut = () => {
    this.props.dispatch(logout())
  }

  renderAlbumLink = (album, idx) => {
    let id = this.props.account._id
    return <li key={`album-${idx}`}>
      <Link to={`albums/${id}/${album}`}>{album}</Link>
    </li>
  }

  renderAlbums = () => {
    if (!this.props.account) return null
    const { albums, username } = this.props.account
    if (!albums) return null
    return albums.split('|').map(this.renderAlbumLink)
  }

  render () {
    const { albums, username } = this.props.account
    return <div>
      <h1>{`${username}\'s`} homes</h1>
      <Button bsStyle='link' onClick={this.handleLogOut}>Logout</Button>
      <div className={styles['album_list']}>
        <FormControl className={styles.input} inputRef={ref => { this.newAlbumRef = ref }} type="text" />
        <Button bsStyle='danger' onClick={this.handleAddAlbum}>Add</Button>
      </div>
      <hr/>
      <ul>
        { this.renderAlbums() }
      </ul>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AlbumList.need = [() => { return fetchAccount('cam@redx.com') }]

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
