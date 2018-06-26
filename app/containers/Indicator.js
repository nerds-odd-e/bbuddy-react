import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        <LinearProgress
          size={40}
          left={70}
          top={0}
          style={style.refresh} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.indicator.open
  }
}
