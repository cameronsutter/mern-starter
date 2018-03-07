import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

// Import Actions
import { fetchAccount, editAccount } from './AccountActions'

class AccountDetails extends Component {
  componentDidMount () {
    if (!this.props.account) {
      this.props.dispatch(fetchAccount('c@s.com'))
    }
  }

  handleEdit = () => {
    let newAttrs = {
      firstName: this.refs.firstName.getValue(),
      lastName: this.refs.lastName.getValue(),
      username: this.refs.username.getValue(),
    }
    let newAccount = Object.assign({}, this.props.account, newAttrs)
    this.props.dispatch(editAccount(newAccount))
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
            ref='firstName'
            type="text"
            defaultValue={account.firstName}
            placeholder="first name"
          />
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            ref='lastName'
            type="text"
            defaultValue={account.lastName}
            placeholder="last name"
          />
          <ControlLabel>Username</ControlLabel>
          <FormControl
            ref='username'
            type="text"
            defaultValue={account.username}
            placeholder="username"
          />
        </FormGroup>
      </form>
      <Button bsStyle='danger' onClick={this.handleEdit}>Update Account Details</Button>
    </div>
  }
}

// Actions required to provide data for this component to render server side.
AccountDetails.need = [() => { return fetchAccount('c@s.com') }]

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
