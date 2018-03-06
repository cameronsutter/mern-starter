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

  renderAlbumLink = (album, idx) => {
    let id = this.props.account._id
    return <li key={`album-${idx}`}>
      <Link to={`albums/${id}/${album}`}>{album}</Link>
    </li>
  }

  render () {
    let albums = this.props.account.albums.split('|')
    return <div>
      <h1>Your homes</h1>
      <ul>
        { albums.map(this.renderAlbumLink) }
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
