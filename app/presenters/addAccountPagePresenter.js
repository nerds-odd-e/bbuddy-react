import present from './presenter'
import PagePresenter from "./pagePresenter";
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import assign from 'lodash/assign'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'
import {number, required, Validation} from '../validation'

export class AddAccountPagePresenter extends PagePresenter {
  account = this.state('account', {
    name: "",
    balance: 0
  })
  validation = new Validation({
    name: [required],
    balance: [required, number]
  })
  errors = this.state('errors', {
    name: '',
    balance: ''
  })

  getProps() {
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
  }

  addAccount() {
    this.validation.validate(this.account,
      () => this.inputProps.addAccount(this.account, () => this.inputProps.goBack()),
      errors => assign(this.errors, errors)
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
