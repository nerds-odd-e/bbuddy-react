import present from './presenter'
import {bindActionCreators} from 'redux'
import {routerActions} from 'connected-react-router'

export class AuthenticationPresenter {
  constructor(props) {
    this.updateProps(props)
  }

  updateProps(props) {
    this.inputProps = props
  }

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
