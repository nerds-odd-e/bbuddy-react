import React from 'react';
import present from '../presenters/authenticationPresenter'

@present
export default class Authentication extends React.Component {

  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}


