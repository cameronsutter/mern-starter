import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchAlbums } from './AlbumActions'
import { fetchAccount } from '../Account/AccountActions'


class AlbumList extends Component {
  componentWillMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('c@s.com'))
    }
  }

  renderAlbumLink = (album) => {
    return <Link to={`albums/${album}`}>{album}</Link>
  }

  render () {
    let albums = this.props.account.albums.split('|')
    return albums.map(this.renderAlbumLink)
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
