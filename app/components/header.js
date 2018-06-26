import React from 'react';
import Paper from '@material-ui/core/Paper';
import common from '@material-ui/core/colors/common';
import orange from '@material-ui/core/colors/orange';
const black = common.black;
const orange700 = orange['700'];

export default class Header extends React.Component {
  render() {
    let styles = {
      root: {
        backgroundColor: black,
        position: 'fixed',
        height: 75,
        top: 0,
        right: 0,
        zIndex: 1101,
        width: '100%',
      },
      span: {
        color: orange700,
        fontSize: 26,
        position: 'relative',
        paddingLeft: 15,
        top: 15,
      },
      home: {
        textDecoration: 'none'
      },
      container: {
        position: 'absolute',
        right: 48,
        bottom: 15,
      }
    };
    return(
      <Paper zdepth={0} square={true} style={styles.root}>
        <a href="/" style={styles.home}>
          <span className='hidden-on-mobile' style={styles.span}>BBuddy</span>
        </a>
        <div style={styles.container}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
}
