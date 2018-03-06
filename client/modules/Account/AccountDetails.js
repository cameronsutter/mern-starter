import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, Button } from 'react-bootstrap'

// Import Actions
import { fetchAccount, editAccount } from './AccountActions'

class AccountDetails extends Component {
  componentWillMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('c@s.com'))
    }
  }

  handleEdit = () => {
    this.props.dispatch(editAccount(account))
  }

  render () {
    if (!this.props.account) return <span>Loading...</span>
    const { account } = this.props
    return <div>
      <h1>{account.email}</h1>
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={account.firstName}
            placeholder="first name"
          />
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={account.lastName}
            placeholder="last name"
          />
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={account.username}
            placeholder="username"
          />
        </FormGroup>
      </form>
      <Button onClick={this.handleEdit}>Change Account</Button>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AccountDetails.need = [() => { return fetchAccount('c@s.com') }]

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    account: state.account,
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
