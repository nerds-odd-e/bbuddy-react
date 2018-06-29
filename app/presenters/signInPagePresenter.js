import present from './presenter'
import {bindActionCreators} from 'redux'
import * as AuthenticationActions from '../actions/authentication'
import {required, email, Validation} from '../validation'

export class SignInPagePresenter {
  credential = {
    email: '',
    password: ''
  }
  validation = new Validation({email: [required, email], password: [required]})
  errors = {
    email: '',
    password: ''
  }

  constructor(props){
    this.updateProps(props)
  }
  updateProps(props){
    this.inputProps = props
  }
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
      errors => this.setState({errors}))
  }
  handleChange = name => event => {
    this.credential[name] = event.target.value
    this.setState({credential: this.credential})
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
