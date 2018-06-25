import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List, ListItem, makeSelectable} from 'material-ui'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import AccountIcon from 'material-ui/svg-icons/action/euro-symbol'
import { routerActions } from 'connected-react-router'

let SelectableList = makeSelectable(List)

@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends React.Component {
  goTo(pathname){
    this.props.push(pathname)
  }
  render(){
    return (
      <SelectableList className={this.props.className} value={this.props.pathname} onChange={(event, value) => this.goTo(value)}>
        <ListItem value="/" primaryText="Dashboard" leftAvatar={<DashboardIcon />} />
        <ListItem value="/accounts" id="Accounts" primaryText="Accounts" leftAvatar={<AccountIcon />}/>
      </SelectableList>
    )
  }
}

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(routerActions, dispatch)
}

