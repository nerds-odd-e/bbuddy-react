import React from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Notification from '../containers/Notification'
import Indicator from '../containers/Indicator'
import present from '../presenters/signInPagePresenter'

const SignInPage = props => (
  <MuiThemeProvider theme={props.theme}>
    <Card>
      <CardHeader title='Sign In'/>
      <CardContent>
        <TextField fullWidth={true} id="email" label='Email' value={props.credential.email} onChange={props.handleChange('email')} autoFocus />
        <TextField fullWidth={true} id="password" type="password" label='Password' value={props.credential.password} onChange={props.handleChange('password')} onKeyPress={props.keyPress} />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => props.signIn()}>Login</Button>
      </CardActions>
    </Card>
    <Notification />
    <Indicator />
  </MuiThemeProvider>
)

export default present(SignInPage)
