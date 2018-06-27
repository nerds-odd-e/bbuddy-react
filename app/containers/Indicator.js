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

@connect(mapStateToProps)
export default class Indicator extends React.Component {
  render() {
    if (!this.props.open)
      return null;

    return (
      <div style={style.container}>
        <CircularProgress size={40} style={style.refresh} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.indicator.open
  }
}
