import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

// Import Actions
import { fetchAccount, editAccount } from './AccountActions'

class AccountDetails extends Component {
  componentDidMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('cam@redx.com')) // hardcoded because of server rendering
    }
  }

  handleEdit = () => {
    let newAttrs = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
    }
    let newAccount = Object.assign({}, this.props.account, newAttrs)
    this.props.dispatch(editAccount(newAccount))
  }

  render () {
    if (!this.props.account) return <span>Loading...</span>
    const { account } = this.props
    return <div>
      <h1>{account.email}</h1>
      <Link to={'/albums'}>Back Home</Link>
      <form>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={account.firstName}
            placeholder="first name"
            inputRef={ref => { this.firstName = ref }}
          />
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={account.lastName}
            placeholder="last name"
            inputRef={ref => { this.lastName = ref }}
          />
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            defaultValue={account.username}
            placeholder="username"
            inputRef={ref => { this.username = ref }}
          />
        </FormGroup>
      </form>
      <Button bsStyle='danger' onClick={this.handleEdit}>Update Account Details</Button>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AccountDetails.need = [() => { return fetchAccount('cam@redx.com') }]

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    account: state.account.data,
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

AccountDetails.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(mapStateToProps)(AccountDetails)
