import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AccountIcon from '@material-ui/icons/EuroSymbol'
import withTheme from '@material-ui/core/styles/withTheme'
import {routerActions} from 'connected-react-router'

@connect(mapStateToProps, mapDispatchToProps)
class Sidebar extends React.Component {
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

  goTo(pathname) {
    this.props.push(pathname)
  }

  static getDerivedStateFromProps(props, state){
    state.items.find(item => item.url === props.pathname).selected = true
    return state
  }

  render() {
    return (
      <List className={this.props.className}>
        {this.state.items.map((item, index) =>
          <ListItem key={index} id={item.text} button={!item.selected} onClick={() => this.goTo(item.url)}
                    style={{backgroundColor: item.selected ? this.props.theme.palette.divider : 'transparent'}}>
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

export default withTheme()(Sidebar)
