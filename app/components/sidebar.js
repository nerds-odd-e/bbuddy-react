import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AccountIcon from '@material-ui/icons/EuroSymbol'
import { routerActions } from 'connected-react-router'

@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends React.Component {
  state = {
    items: [
      {
        text: 'Dashboard',
        url: '/',
        icon: <DashboardIcon/>
      },
      {
        text: 'Accounts',
        url: '/accounts',
        icon: <AccountIcon/>
      }
    ]
  }
  goTo(pathname){
    this.props.push(pathname)
  }
  render(){
    return (
      <List className={this.props.className} value={this.props.pathname} onChange={(event, value) => this.goTo(value)}>
        {this.state.items.map((item, index) =>
          <ListItem key={index} id={item.text} button onClick={() => this.goTo(item.url)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItem>
        )}
      </List>
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

