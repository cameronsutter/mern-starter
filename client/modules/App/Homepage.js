import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import styles from './Homepage.css'
import { STORAGE_KEY } from '../../util/apiCaller'

import { newAccount, loginAccount } from '../Account/AccountActions'

class Homepage extends Component {

  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.account && newProps.account.data && newProps.account.data.email) {
      var token = localStorage.getItem(STORAGE_KEY)
      if (token) {
        newProps.history.push('/albums')
      }
    }
  }

  handleLogin = () => {
    let email = this.loginEmail.value
    let password = this.loginPassword.value
    this.props.dispatch(loginAccount(email, password))
  }

  handleCreate = () => {
    let attrs = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    }
    this.props.dispatch(newAccount(attrs))
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Login</h1>
          <form>
            <FormGroup>
              <ControlLabel>email</ControlLabel>
              <FormControl
                type="email"
                inputRef={ref => { this.loginEmail = ref }}
              />
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                inputRef={ref => { this.loginPassword = ref }}
              />
            </FormGroup>
          </form>
          <Button bsStyle='danger' onClick={this.handleLogin}>Login</Button>
        </div>
        <div>
          <h1>Create a new account</h1>
          <form>
            <FormGroup>
              <ControlLabel>email</ControlLabel>
              <FormControl
                type="email"
                inputRef={ref => { this.email = ref }}
              />
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                inputRef={ref => { this.firstName = ref }}
              />
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                inputRef={ref => { this.lastName = ref }}
              />
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                inputRef={ref => { this.username = ref }}
              />
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                inputRef={ref => { this.password = ref }}
              />
            </FormGroup>
          </form>
          <Button bsStyle='danger' onClick={this.handleCreate}>Create</Button>
        </div>
      </div>
    )
  }
}

Homepage.need = []

function mapStateToProps(state) {
  return {
    account: state.account,
  }
}

Homepage.propTypes = {
  account: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

Homepage.contextTypes = {
  router: React.PropTypes.object,
}

export default connect(mapStateToProps)(Homepage)
