import present from './presenter'
import {bindActionCreators} from 'redux'
import assign from 'lodash/assign'
import * as AuthenticationActions from '../actions/authentication'
import {required, email, Validation} from '../validation'
import PagePresenter from "./pagePresenter";

export class SignInPagePresenter extends PagePresenter{
  credential = this.state('credential', {
    email: '',
    password: ''
  })
  validation = new Validation({email: [required, email], password: [required]})
  errors = this.state('errors', {
    email: '',
    password: ''
  })

  getProps(){
    return {
      credential: this.credential,
      theme: this.inputProps.theme,
      errors: this.errors,
      signIn: () => this.signIn(),
      handleChange: name => this.handleChange(name),
      keyPress: event => this.keyPress(event)
    }
  }
  signIn(){
    this.validation.validate(this.credential,
      () => this.inputProps.signIn(this.credential),
      errors => assign(this.errors, errors)
    )
  }
  handleChange = name => event => {
    this.credential[name] = event.target.value
    this.errors[name] = ''
  }
  keyPress(event){
    if (event.charCode === 13){
      event.preventDefault()
      this.signIn()
    }
  }
  static mapStateToProps(state){
    return {
      theme: state.pageStyle.muiTheme
    }
  }
  static mapDispatchToProps(dispatch){
    return bindActionCreators(AuthenticationActions, dispatch)
  }
}

export default present(SignInPagePresenter)
