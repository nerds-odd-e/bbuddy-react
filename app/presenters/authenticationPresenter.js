import present from './presenter'
import {bindActionCreators} from 'redux'
import {routerActions} from 'connected-react-router'
import PagePresenter from "./pagePresenter";

export class AuthenticationPresenter extends PagePresenter{
  getProps() {
    return {
      checkAuth: () => this.checkAuth(),
      children: this.inputProps.children
    }
  }

  checkAuth() {
    if (!this.inputProps.isAuthenticated) {
      this.inputProps.replace({
        pathname: "/signin",
        state: {nextPathname: this.inputProps.pathname}
      })
    }
  }

  static mapStateToProps(state) {
    return {
      pathname: state.router.location.pathname,
      isAuthenticated: state.authentication.isAuthenticated
    }
  }

  static mapDispatchToProps(dispatch){
    return bindActionCreators(routerActions, dispatch)
  }

}

export default present(AuthenticationPresenter)
