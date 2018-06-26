import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as AuthenticationActions from '../actions/authentication'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

@connect(mapStateToProps, mapDispatchToProps)
export default class SignInPage extends React.Component {
  state = {
    email: "",
    password: ""
  }
  signIn() {
    this.props.signIn(this.state)
  }

  keyPress(event){
    if (event.charCode === 13){
      event.preventDefault()
      this.signIn()
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const {pageStyle: {muiTheme}} = this.props
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Card>
          <CardHeader title='Sign In'/>
          <CardContent>
            <TextField fullWidth={true} id="email" label='Email' value={this.state.email} onChange={this.handleChange('email')} autoFocus />
            <TextField fullWidth={true} id="password" type="password" label='Password' value={this.state.password} onChange={this.handleChange('password')} onKeyPress={event => this.keyPress(event)} />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.signIn()}>Login</Button>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    pageStyle: state.pageStyle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthenticationActions, dispatch)
}
