import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'

export class AddAccountPagePresenter {
  account = {
    name: "",
    balance: 0
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
      addAccount: () => this.addAccount(),
      handleChange: name => this.handleChange(name)
    }
  }

  handleChange = name => event => {
    this.account[name] = event.target.value
    this.setState({account: this.account})
  }

  addAccount(){
    this.inputProps.addAccount(this.account, () => {this.inputProps.goBack()})
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, AccountActions, NavigationActions), dispatch)
  }

}

export default present(AddAccountPagePresenter)
