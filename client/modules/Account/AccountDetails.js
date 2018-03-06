import React, { Component, PropTypes } from 'react'


class AccountDetails extends Component {
  render () {
    <div>Account</div>
  }
}

// Actions required to provide data for this component to render in sever side.
AccountDetails.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

AccountDetails.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

AccountDetails.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AccountDetails)
