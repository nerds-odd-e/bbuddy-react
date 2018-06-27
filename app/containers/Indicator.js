import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  container: {
    position: 'fixed',
    right: 100,
    bottom: 10,
    zIndex: 999999
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
};

const Indicator =  props => {
  return props.open &&
  <div style={style.container}>
    <CircularProgress size={40} style={style.refresh} />
  </div>
}

function mapStateToProps(state) {
  return {
    open: state.indicator.open
  }
}

export default connect(mapStateToProps)(Indicator)
