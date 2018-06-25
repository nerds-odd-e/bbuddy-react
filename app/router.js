import React from 'react'
import {Route, Switch, Redirect} from 'react-router'
import Authentication from './containers/Authentication'
import SignInPage from './containers/SignInPage'
import Page from './containers/Page'
import DashboardPage from './containers/DashboardPage'
import AccountsPage from './containers/AccountsPage'
import AddAccountPage from './containers/AddAccountPage'

const Parent = () => (
  <Page>
    <Authentication>
      <Route path="/" component={DashboardPage}/>
      <Route path="accounts" component={AccountsPage}/>
      <Route path="accounts/add" component={AddAccountPage}/>
    </Authentication>
  </Page>
)

const Accounts = () => (
  <Switch>
    <Route exact path="/" component={layout(AccountsPage)}/>
    <Route path="add" component={layout(AddAccountPage)}/>
  </Switch>
)
const layout = Component => props => (
  <Page>
    <Authentication>
      <Component/>
    </Authentication>
  </Page>
)

export default () => {
  return (
    <Switch>
      <Route path="/signin" component={SignInPage}/>
      <Route exact path="/" component={layout(DashboardPage)}/>
      <Route exact path="/accounts" component={layout(AccountsPage)}/>
      <Route exact path="/accounts/add" component={layout(AddAccountPage)}/>
    </Switch>
  )
}
