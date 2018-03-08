import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

// Import Style
import styles from './Homepage.css'

export class Homepage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
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
