import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'
import {Validation, required, number} from '../validation'

export class AddAccountPagePresenter {
  account = {
    name: "",
    balance: 0
  }
  validation = new Validation({
    name: [required],
    balance: [required, number]
  })
  errors = {
    name: '',
    balance: ''
  }
  constructor(props){
    this.updateProps(props)
  }

  updateProps(props){
    this.inputProps = props
  }

  getProps(){
    return {
      account: this.account,
      errors: this.errors,
      addAccount: () => this.addAccount(),
      handleChange: name => this.handleChange(name)
    }
  }

  handleChange = name => event => {
    this.account[name] = event.target.value
    this.errors[name] = ''
    this.setState({account: this.account, errors: this.errors})
  }

  addAccount(){
    this.validation.validate(this.account,
      () => this.inputProps.addAccount(this.account, () => {this.inputProps.goBack()}),
      errors => {this.errors = errors;this.setState({errors})}
    )
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, AccountActions, NavigationActions), dispatch)
  }

}

export default present(AddAccountPagePresenter)
